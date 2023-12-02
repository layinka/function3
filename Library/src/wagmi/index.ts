import { fetchToken, getContract, getNetwork, getPublicClient, getWalletClient, readContract, sepolia,  waitForTransaction, erc20ABI } from "@wagmi/core"
import {prepareWriteContract, writeContract } from "wagmi/actions";
import { BasicTokenSenderABI, BurnMintERC677HelperABI } from "../abis";
import { CCIP_BnM_ADDRESSES, PaymentCurrency } from "../constants";
import { RouterABI } from "../abis";
import { routerConfig, supportedChains } from "../constants";
import { keccak256, toHex, encodeAbiParameters, parseAbiParameters, getContract as getViemContract } from "viem";
import { zeroAddress } from "viem/_types/constants/address";
import { simulateContract } from "viem/_types/actions/public/simulateContract";

const MAX_TOKENS_LENGTH = 5;

/**
 * Transfers tokens from one blockchain to another using Chainlink CCIP 
 * @param receiver  The address to receive tokens
 * @param chainId Chain Id
 */
export const mintTestCCIPTokens = async (receiver: `0x${string}`, walletClient: any, chainId?: number) =>{

    console.log('mintingn')
    const network = getNetwork();
    if(!chainId){
        if(network && !network.chain?.unsupported){
            chainId= network.chain?.id
        }
    }

    chainId=chainId || sepolia.id //default is sepolia    
    
    const ccipBnmAddress = CCIP_BnM_ADDRESSES[chainId]
    console.log('chainId: ', chainId, ', ccipBnmAddress: ', ccipBnmAddress )
    const prpped = await prepareWriteContract({
        chainId,
        abi: BurnMintERC677HelperABI,
        address: ccipBnmAddress as any,
        functionName: 'drip',
        args: [receiver],
        walletClient: walletClient


    })

    console.log('prpepped: ', prpped)
    const {hash} = await writeContract(prpped)

    console.log('hash: ', hash)

    return await waitForTransaction({hash, chainId})
}


/**
 * Function to fetch and display supported tokens
 * @param chainId 
 * @param targetChainId 
 * @returns 
 */
export const getSupportedTokens = async (chainId: number, targetChainId: number) => {
   
    if(!supportedChains.some(s=>s==chainId)){
        throw Error(`Chain ${chainId} is not supported`)
    }

    if(!supportedChains.some(s=>s==targetChainId)){
        throw Error(`Target Chain ${targetChainId} is not supported`)
    }
  
    // const publicClient = getPublicClient({chainId})
  
    // Get the router's address for the specified chain
    const routerAddress = routerConfig[chainId].address;
    // Get the chain selector for the target chain
    const targetChainSelector = routerConfig[targetChainId].chainSelector;

    const supportedTokens = (await readContract({
        chainId: chainId,
        abi: RouterABI,
        address: routerAddress as any,
        functionName: 'getSupportedTokens',
        args: [targetChainSelector]
    }) ) as unknown as string[];

    const tokens: {
        name: string,
        symbol: string,
        address: string,
        decimals: number
    }[] = [];
      
    // For each supported token, print its name, symbol, and decimal precision
    for (const supportedToken of supportedTokens) {
      const erc20 = await fetchToken({
        chainId, 
        address: supportedToken as `0x${string}`,

      })

      tokens.push({
        address: supportedToken,
        name: erc20.name,
        symbol: erc20.symbol,
        decimals: erc20.decimals
      })
    
      
    }

    return tokens;

};



/**
 * Transfers a token from one blockchain to another using Chainlink CCIP. Pay in Link, Native or other supported token
 * @param sourceChainId Source Chain
 * @param destinationChainId Destination Chain
 * @param destinationAccount Receivers account
 * @param tokenAddress Supported Token on CCIP to sen
 * @param amount Amout to send
 * @param feeTokenAddress Address of Token to pay fees in
 * @param walletClient WalletClient to sign the TX
 * @returns 
 */
export const transferToken = async (sourceChainId: number, destinationChainId: number, destinationAccount: string, tokenAddress: string,
    amount: bigint, feeTokenAddress: string , walletClient?: any) => {
    
  
    /* 
    ==================================================
        Section: INITIALIZATION
        This section of the code parses the source and 
        destination router addresses and blockchain 
        selectors.
        It also initialized the ethers providers 
        to communicate with the blockchains.
    ==================================================
    */

    if(!walletClient){
        walletClient = await getWalletClient({chainId: sourceChainId})
    }
    
    // Get the router's address for the specified chain
    const sourceRouterAddress = routerConfig[sourceChainId].address;
    const sourceChainIdSelector = routerConfig[sourceChainId].chainSelector;
    // Get the chain selector for the target chain
    const destinationChainIdSelector = routerConfig[destinationChainId].chainSelector;
  
    // Create a contract instance for the router using its ABI and address
    const sourceRouter = getContract({
        address: sourceRouterAddress as `0x${string}`,
        chainId: sourceChainId,
        abi: RouterABI,
        walletClient
    });
  
    /* 
    ==================================================
        Section: Check token validity
        Check first if the token you would like to 
        transfer is supported.
    ==================================================
    */
  
    // Fetch the list of supported tokens
    
    const supportedTokens = (await sourceRouter.read.getSupportedTokens([destinationChainIdSelector]) as unknown as string[]);
  
    if (!supportedTokens.includes(tokenAddress)) {
      throw Error(
        `Token address ${tokenAddress} not in the list of supportedTokens ${supportedTokens}`
      );
    }
  
    /* 
    ==================================================
        Section: BUILD CCIP MESSAGE
        build CCIP message that you will send to the
        Router contract.
    ==================================================
    */
  
    // build message
    const tokenAmounts = [
      {
        token: tokenAddress,
        amount: amount,
      },
    ];
  
    // Encoding the data
  
    const functionSelector = keccak256(toHex("CCIP EVMExtraArgsV1")).slice(0, 10);
    //  "extraArgs" is a structure that can be represented as [ 'uint256', 'bool' ]
    // extraArgs are { gasLimit: 0, strict: false }
    // 
  
    const gasLimitValue =0 ;//we set gasLimit specifically to 0 because we are not sending any data so we are not expecting a receiving contract to handle data
    // gasLimit ? taskArguments.gasLimit : 200_000;

    //@ts-ignore
    const extraArgs = encodeAbiParameters(
        //@ts-ignore
        parseAbiParameters('uint256 x, bool b'),
        //@ts-ignore
        [gasLimitValue, false]
    );
  
    const encodedExtraArgs = functionSelector + extraArgs.slice(2);
  
    const message = {
      receiver: encodeAbiParameters(
        //@ts-ignore
        parseAbiParameters("address a"),
        [destinationAccount as `0x${string}`]
      ),
      data: "0x", // no data
      tokenAmounts: tokenAmounts,
      feeToken: feeTokenAddress ? feeTokenAddress : zeroAddress, // If fee token address is provided then fees must be paid in fee token.
      extraArgs: encodedExtraArgs,
    };
  
    /* 
    ==================================================
        Section: CALCULATE THE FEES
        Call the Router to estimate the fees for sending tokens.
    ==================================================
    */
  
    const fees = await sourceRouter.read.getFee([destinationChainIdSelector, message]);
    console.log(`Estimated fees (wei): ${fees}`);
  
    /* 
    ==================================================
        Section: SEND tokens
        This code block initializes an ERC20 token contract for token transfer across chains. It handles three cases:
        1. If the fee token is the native blockchain token, it makes one approval for the transfer amount. The fees are included in the msg.value field.
        2. If the fee token is different from both the native blockchain token and the transfer token, it makes two approvals: one for the transfer amount and another for the fees. The fees are part of the message.
        3. If the fee token is the same as the transfer token but not the native blockchain token, it makes a single approval for the sum of the transfer amount and fees. The fees are part of the message.
        The code waits for the transaction to be mined and stores the transaction receipt.
    ==================================================
    */
  
    // Create a contract instance for the token using its ABI and address
    const erc20 = getContract({
        address: tokenAddress as any, 
        abi: erc20ABI,
        walletClient,
        chainId: sourceChainId,

    } )

   
    
    let sendHash: string, approvalHash: any;
  
    if (!feeTokenAddress) {
      // Pay native
      // First approve the router to spend tokens
      //@ts-ignore
      const approvalTx = await erc20.write.approve([sourceRouterAddress, amount]);
      approvalHash=approvalTx.hash;
      await waitForTransaction({hash: approvalHash}); // wait for the transaction to be mined
      console.log(
        `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalHash}`
      );
    
      //@ts-ignore
      const sendTx = await sourceRouter.write.ccipSend([destinationChainIdSelector, message], {
        value: fees,
      }); // fees are send as value since we are paying the fees in native
      sendHash=sendTx.hash;
    } else {
      if (tokenAddress.toUpperCase() === feeTokenAddress.toUpperCase()) {
        // fee token is the same as the token to transfer
        // Amount tokens to approve are transfer amount + fees
        //@ts-ignore
        const approvalTx = await erc20.write.approve([sourceRouterAddress, amount + fees]);
        approvalHash= approvalTx.hash;
        await waitForTransaction({hash: approvalHash});

        
        console.log(
          `approved router ${sourceRouterAddress} to spend ${amount} and fees ${fees} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
        );
      } else {
        // fee token is different than the token to transfer
        // 2 approvals
        //@ts-ignore
        const approvalTx = await erc20.write.approve([sourceRouterAddress, amount]); // 1 approval for the tokens to transfer
        approvalHash= approvalTx.hash;
        await waitForTransaction({hash: approvalHash});
        console.log(
          `approved router ${sourceRouterAddress} to spend ${amount} of token ${tokenAddress}. Transaction: ${approvalTx.hash}`
        );
        const approveFeeTx = await writeContract({ // approval for the fees token
            abi: erc20ABI,
            address: feeTokenAddress as any,
            functionName: 'approve',
            args: [sourceRouterAddress as any, fees as any],
            chainId: sourceChainId,
            // account: walletClient.
            // walletClient: walletClient

        })

        

        await waitForTransaction({
            hash:approveFeeTx.hash
        })
        
        console.log(
          `approved router ${sourceRouterAddress} to spend  fees ${fees} of token ${feeTokenAddress}. Transaction: ${approvalTx.hash}`
        );
      }

      // @ts-ignore
      const sendTx = await sourceRouter.write.ccipSend([destinationChainIdSelector, message]);
      sendHash = sendTx.hash
    }
  
    const receipt = await waitForTransaction({
        hash: sendHash as any
    }); // wait for the transaction to be mined
  
    /* 
    ==================================================
        Section: Fetch message ID
        The Router ccipSend function returns the messageId.
        This section makes a call (simulation) to the blockchain
        to fetch the messageId that was returned by the Router.
    ==================================================
    */
  
    // Simulate a call to the router to fetch the messageID
    // const call = {
    //   from: sendTx.from,
    //   to: sendTx.to,
    //   data: sendTx.data,
    //   gasLimit: sendTx.gasLimit,
    //   gasPrice: sendTx.gasPrice,
    //   value: sendTx.value,
    // };  
    // // Simulate a contract call with the transaction data at the block before the transaction
    // const messageId = await provider.call(call, receipt.blockNumber - 1);

    const pClient = getPublicClient({chainId: sourceChainId})
  
  
    //@ts-ignore
    const messageId = await simulateContract(pClient, {
        address: sourceRouterAddress as `0x${string}`,
        abi: RouterABI,
        functionName: 'ccipSend',
        args: [destinationChainIdSelector, message],
        account: pClient.account,
        blockNumber: receipt.blockNumber-BigInt(1)
      })

    
  
    console.log(
      `\n✅ ${amount} of Tokens(${tokenAddress}) Sent to account ${destinationAccount} on destination chain ${destinationChainId} using CCIP. Transaction hash ${sendHash} -  Message id is ${messageId}`
    );

    console.log(`✅ You can now monitor the token transfer status via CCIP Explorer (https://ccip.chain.link) by searching for CCIP Message ID: ${messageId}`);

    return {
        sendHash,
        messageId
    }
  
    // /* 
    // ==================================================
    //     Section: Check status of the destination chain
    //     Poll the off-ramps contracts of the destination chain
    //     to wait for the message to be executed then return
    //     the status.
    // ==================================================
    // */
  
    // // Fetch status on destination chain
    // const destinationRpcUrl = getProviderRpcUrl(destinationChainId);
  
    // // Initialize providers for interacting with the blockchains
    // const destinationProvider = new ethers.providers.JsonRpcProvider(
    //   destinationRpcUrl
    // );
    // const destinationRouterAddress = getRouterConfig(destinationChainId).address;
  
    // // Instantiate the router contract on the destination chain
    // const destinationRouterContract = new ethers.Contract(
    //   destinationRouterAddress,
    //   routerAbi,
    //   destinationProvider
    // );
  
    // // CHECK DESTINATION CHAIN - POLL UNTIL the messageID is found or timeout
  
    // const POLLING_INTERVAL = 60000; // Poll every 60 seconds
    // const TIMEOUT = 40 * 60 * 1000; // 40 minutes in milliseconds
  
    // let pollingId;
    // let timeoutId;
  
    // const pollStatus = async () => {
    //   // Fetch the OffRamp contract addresses on the destination chain
    //   const offRamps = await destinationRouterContract.getOffRamps();
  
    //   // Iterate through OffRamps to find the one linked to the source chain and check message status
    //   for (const offRamp of offRamps) {
    //     if (offRamp.sourceChainIdSelector.toString() === sourceChainIdSelector) {
    //       const offRampContract = new ethers.Contract(
    //         offRamp.offRamp,
    //         offRampAbi,
    //         destinationProvider
    //       );
    //       const events = await offRampContract.queryFilter(
    //         "ExecutionStateChanged"
    //       );
  
    //       // Check if an event with the specific messageId exists and log its status
    //       for (let event of events) {
    //         if (event.args && event.args.messageId === messageId) {
    //           const state = event.args.state;
    //           const status = getMessageState(state);
    //           console.log(
    //             `\n✅Status of message ${messageId} is ${status} - Check the explorer https://ccip.chain.link/msg/${messageId}`
    //           );
  
    //           // Clear the polling and the timeout
    //           clearInterval(pollingId);
    //           clearTimeout(timeoutId);
    //           return;
    //         }
    //       }
    //     }
    //   }
    //   // If no event found, the message has not yet been processed on the destination chain
    //   console.log(
    //     `Message ${messageId} has not been processed yet on the destination chain.Try again in 60sec - Check the explorer https://ccip.chain.link/msg/${messageId}`
    //   );
    // };
  
    // // Start polling
    // console.log(
    //   `\nWait for message ${messageId} to be executed on the destination chain - Check the explorer https://ccip.chain.link/msg/${messageId}`
    // );
    // pollingId = setInterval(pollStatus, POLLING_INTERVAL);
  
    // // Set timeout to stop polling after 40 minutes
    // timeoutId = setTimeout(() => {
    //   console.log(
    //     "\nTimeout reached. Stopping polling - check again later (Run `get-status` script) Or check the explorer https://ccip.chain.link/msg/${messageId}"
    //   );
    //   clearInterval(pollingId);
    // }, TIMEOUT);
};

/**
 * Transfers tokens from one blockchain to another using Chainlink CCIP via BasicTokenSender.sol
 * @param sourceChainId Source Chain
 * @param destinationChainId Destination Chain
 * @param destinationAccount Receivers account
 * @param tokenAmounts The array of {token,amount} objects of tokens to send
 * @param feeCurrency Choose between 'Native' and 'LINK'
 * @param walletClient WalletClient to sign the TX
 * @returns 
 */
export const transferTokens = async (sourceChainId: number, destinationChainId: number, destinationAccount: string,
    tokenAmounts: {tokenAddress: string, amount: bigint}[], feeCurrency: PaymentCurrency, walletClient?: any) => {
    
  
    /* 
    ==================================================
        Section: INITIALIZATION
        This section of the code parses the source and 
        destination router addresses and blockchain 
        selectors.
        It also initialized the ethers providers 
        to communicate with the blockchains.
    ==================================================
    */

    if(!walletClient){
        walletClient = await getWalletClient({chainId: sourceChainId})
    }
    if (tokenAmounts.length > MAX_TOKENS_LENGTH) {
        throw Error(`❌ Maximum ${MAX_TOKENS_LENGTH} different tokens can be sent per CCIP Message`);
    }
    
    // Get the router's address for the specified chain
    const sourceRouterAddress = routerConfig[sourceChainId].address;
    const sourceChainIdSelector = routerConfig[sourceChainId].chainSelector;
    // Get the chain selector for the target chain
    const destinationChainIdSelector = routerConfig[destinationChainId].chainSelector;
  
    // Create a contract instance for the router using its ABI and address
    const sourceRouter = getContract({
        address: sourceRouterAddress as `0x${string}`,
        chainId: sourceChainId,
        abi: RouterABI,
        walletClient
    });
  
    /* 
    ==================================================
        Section: Check token validity
        Check first if the token you would like to 
        transfer is supported.
    ==================================================
    */
  
    // Fetch the list of supported tokens
    
    const supportedTokens = (await sourceRouter.read.getSupportedTokens([destinationChainIdSelector]) as unknown as string[]);
  
    tokenAmounts.forEach(async (tokenAmount)=>{
        if (!supportedTokens.includes(tokenAmount.tokenAddress)) {
            throw Error(
              `Token address ${tokenAmount.tokenAddress} not in the list of supportedTokens ${supportedTokens}`
            );
        }

        //Approve
        // Create a contract instance for the token using its ABI and address
        const erc20 = getContract({
            address: tokenAmount.tokenAddress as any, 
            abi: erc20ABI,
            walletClient,
            chainId: sourceChainId
        } )

        //@ts-ignore
        const approvalTx = await erc20.write.approve([routerConfig[sourceChainId].tokenSender, tokenAmount.amount]);
        await waitForTransaction({
            hash: approvalTx.hash
        });
    })

    const prepareCfx = await prepareWriteContract({
        address: routerConfig[sourceChainId].tokenSender as any,
        abi: BasicTokenSenderABI,
        functionName: 'send',
        args:[routerConfig[destinationChainId].chainSelector, destinationAccount, tokenAmounts, feeCurrency ],
        chainId: sourceChainId,
        walletClient
    })

    const sendTx = await writeContract(prepareCfx);
    const receipt = await waitForTransaction({hash: sendTx.hash})

    //simulate to get message id
    const publicClient = getPublicClient({chainId: sourceChainId})
      
    //@ts-ignore
    const messageId: string = await simulateContract(publicClient, {
        address: sourceRouterAddress as `0x${string}`,
        abi: RouterABI,
        functionName: 'ccipSend',
        args: [routerConfig[destinationChainId].chainSelector, destinationAccount, tokenAmounts, feeCurrency ],
        account: publicClient.account,
        blockNumber: receipt.blockNumber-BigInt(1)
      })

    return {
        sendHash: sendTx.hash,
        messageId
    }

    
};




