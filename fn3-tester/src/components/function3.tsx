import { useState } from 'react'
import { BaseError, encodeAbiParameters, keccak256, parseAbiParameters, toHex } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi'

import { wagmiContractConfig } from './contracts'
import { useDebounce } from '../hooks/useDebounce'
import { stringify } from '../utils/stringify'
import {mintTestCCIPTokens} from 'function3/lib/utils/wagmi'
import { ethers } from 'ethers'
import { PaymentCurrency } from 'function3'
import {transferToken} from 'function3/lib/wagmi'


const BurnMintERC677HelperABI = [
  { 
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [{ "internalType": "uint256", "name": "supplyAfterMint", "type": "uint256" }], "name": "MaxSupplyExceeded", "type": "error" },
  { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "SenderNotBurner", "type": "error" },
  { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "SenderNotMinter", "type": "error" },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "burner", "type": "address" }],
    "name": "BurnAccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "burner", "type": "address" }],
    "name": "BurnAccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "minter", "type": "address" }],
    "name": "MintAccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "minter", "type": "address" }],
    "name": "MintAccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "OwnershipTransferRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" },
      { "indexed": false, "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "burnFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }
    ],
    "name": "decreaseAllowance",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }
    ],
    "name": "decreaseApproval",
    "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "drip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBurners",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMinters",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "burner", "type": "address" }],
    "name": "grantBurnRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "burnAndMinter", "type": "address" }],
    "name": "grantMintAndBurnRoles",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "minter", "type": "address" }],
    "name": "grantMintRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
    ],
    "name": "increaseAllowance",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
    ],
    "name": "increaseApproval",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "burner", "type": "address" }],
    "name": "isBurner",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "minter", "type": "address" }],
    "name": "isMinter",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "burner", "type": "address" }],
    "name": "revokeBurnRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "minter", "type": "address" }],
    "name": "revokeMintRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "transferAndCall",
    "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


export function Function3() {
  const [tokenId, setTokenId] = useState('')
  const debouncedTokenId = useDebounce(tokenId)
  transferToken
  const { data: walletClient, status } = useWalletClient()

  const { config } = usePrepareContractWrite({
    abi: BurnMintERC677HelperABI,
    address: '0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05',
    functionName: 'drip',
    args: ['0x4ABda0097D7545dE58608F7E36e0C1cac68b4943'],
    enabled: Boolean(debouncedTokenId),
  })
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  //@ts-ignore
  const extraArgsW = encodeAbiParameters(
    //@ts-ignore
    parseAbiParameters('uint256 x, bool b'),
    //@ts-ignore
    [1455554233356, false]
  );

  

  const extraArgsE = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bool"],
    [1455554233356, false]
  );

  console.log('wagmiEnc: ', extraArgsW, ', ethers: ', extraArgsE, ' ,   equals: ' , extraArgsW==extraArgsE)

  const t = "CCIP EVMExtraArgsV1"
  const wagmihash = keccak256(toHex(t))

  const etherhash = ethers.utils.id(t);

  console.log('wagmihash: ', wagmihash, ', ethers: ', etherhash, ' ,   equals: ' , wagmihash==etherhash)

  transferToken()

  return (
    <>
      <h3>Try out</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          mintTestCCIPTokens('0x4ABda0097D7545dE58608F7E36e0C1cac68b4943', walletClient, 11155111)
            .then((receipt) => {
              console.log('receipt:', receipt)
            })
            .catch((err) => {
              console.log('err:', err)
            })

          // write?.()
        }}
      >
        
        <button disabled={!write} type="submit">
          Try
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
