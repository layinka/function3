# Function3
Typescript/JavaScript library for easy crosschain integrations via CCIP

# The purpose of Function3
Integrate Crosschain functionality directly into your dApp without having to write smart contracts.

# Function3 features templates for

- Get List of Supported Chains on CCIP
- Transfer Tokens Crosschain
- Send CrossChain Messages


## Usage

### Transfer Tokens ( WAGMI)

```ts
import {transferToken} from 'function3/lib/wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'
import {  parseEther, toHex, zeroAddress } from 'viem'


const {sendHash, messageId} = await transferToken(sepolia.id, polygonMumbai.id, 'receveAddress', 'tokenAddress', parseEther('0.0001'), zeroAddress, walletClient)


```



### Send Message ( WAGMI)

```ts
import {sendMessage} from 'function3/lib/wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'
import {  parseEther, toHex, zeroAddress } from 'viem'


const {sendHash, messageId} = await sendMessage(sepolia.id, polygonMumbai.id, 'receiver','message', PaymentCurrency.Native, walletClient)


```

### Get Supported Tokens

```ts
import {getSupportedTokens} from 'function3/lib/wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'
import {  parseEther, toHex, zeroAddress } from 'viem'


const data = await getSupportedTokens(sepolia.id, polygonMumbai.id)


```




**Transfer Tokens ( Ethers)** - Coming Soon



**Send Message ( Ethers)**  - Coming soon



## Supported Chains
- Polygon Mumbai
- Ethereum Sepolia
