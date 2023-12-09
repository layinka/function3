import { useEffect, useState } from 'react'
import { BaseError, encodeAbiParameters, keccak256, parseAbiParameters, parseEther, toHex, zeroAddress } from 'viem'
import {
  sepolia,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi'

import { wagmiContractConfig } from './contracts'
import { useDebounce } from '../hooks/useDebounce'
import { stringify } from '../utils/stringify'

import { ethers } from 'ethers'

import {sendMessage, transferToken} from 'function3/lib/wagmi'
import {  polygonMumbai } from 'wagmi/chains'
import { PaymentCurrency } from 'function3/lib/constants'




export function Function3() {
  const [tokenId, setTokenId] = useState('')
  const [hash, setHash] = useState<string>()
  const debouncedTokenId = useDebounce(tokenId)
  
  const { data: walletClient, status } = useWalletClient()

  const {
    data: receipt,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useWaitForTransaction({ hash: hash as any })

  useEffect(()=>{
    refetch()
  }, [hash])

  
  // transferToken()

  return (
    <>
      <h3>Transfer Tokens Test</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          

          if(confirm('This wil transfer 0.0001 CCIP-BnM from Sepolia to Mumbai. Continue? ')){
            transferToken(sepolia.id, polygonMumbai.id, '0x8853161EE7A92E2c5c634647b323a7CcB31EF2CD', '0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05', parseEther('0.0001'), zeroAddress, walletClient)
            .then((rs)=>{
              console.log('Hash: ', rs.sendHash)
              console.log('Message: ', rs.messageId)
              setHash(rs.sendHash)

              alert("Message: " + rs.messageId)
            })
            .catch((err)=>{

            })
          }
          
          
          

          // write?.()
        }}
      >
        
        <button  type="submit">
          Transfer
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {/* {isPending && <div>Transaction pending...</div>} */}
      {isSuccess && (
        <>
          <div>Transaction Hash: {hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
