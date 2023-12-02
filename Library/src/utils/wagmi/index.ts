import { getNetwork, sepolia,  waitForTransaction } from "@wagmi/core"
import {prepareWriteContract, writeContract } from "wagmi/actions";
import { BurnMintERC677HelperABI } from "../../abis";
import { CCIP_BnM_ADDRESSES } from "../../constants";


/**
 * Mints 10**18 units of CCIP-BnM and CCIP-LnM tokens to receiver address
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