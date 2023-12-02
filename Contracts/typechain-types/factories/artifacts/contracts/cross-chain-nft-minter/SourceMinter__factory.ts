/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  SourceMinter,
  SourceMinterInterface,
} from "../../../../artifacts/contracts/cross-chain-nft-minter/SourceMinter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        internalType: "address",
        name: "link",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "FailedToWithdrawEth",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "enum SourceMinter.PayFeesIn",
        name: "payFeesIn",
        type: "uint8",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620018e7380380620018e78339818101604052810190620000379190620003e7565b338060008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620000ac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000a3906200048f565b60405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614620001335762000132816200024e60201b60201c565b5b5050508173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff168152505060a05173ffffffffffffffffffffffffffffffffffffffff1663095ea7b36080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6040518363ffffffff1660e01b8152600401620001ff929190620004dd565b6020604051808303816000875af11580156200021f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000245919062000547565b505050620005eb565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620002bf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002b690620005c9565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003af8262000382565b9050919050565b620003c181620003a2565b8114620003cd57600080fd5b50565b600081519050620003e181620003b6565b92915050565b600080604083850312156200040157620004006200037d565b5b60006200041185828601620003d0565b92505060206200042485828601620003d0565b9150509250929050565b600082825260208201905092915050565b7f43616e6e6f7420736574206f776e657220746f207a65726f0000000000000000600082015250565b6000620004776018836200042e565b915062000484826200043f565b602082019050919050565b60006020820190508181036000830152620004aa8162000468565b9050919050565b620004bc81620003a2565b82525050565b6000819050919050565b620004d781620004c2565b82525050565b6000604082019050620004f46000830185620004b1565b620005036020830184620004cc565b9392505050565b60008115159050919050565b62000521816200050a565b81146200052d57600080fd5b50565b600081519050620005418162000516565b92915050565b60006020828403121562000560576200055f6200037d565b5b6000620005708482850162000530565b91505092915050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b6000620005b16017836200042e565b9150620005be8262000579565b602082019050919050565b60006020820190508181036000830152620005e481620005a2565b9050919050565b60805160a0516112c86200061f600039600061062a01526000818161067e0152818161074901526107ee01526112c86000f3fe6080604052600436106100595760003560e01c80633aeac4e11461006557806351cff8d91461008e57806379ba5097146100b75780638da5cb5b146100ce578063ec99afa2146100f9578063f2fde38b1461012257610060565b3661006057005b600080fd5b34801561007157600080fd5b5061008c60048036038101906100879190610b30565b61014b565b005b34801561009a57600080fd5b506100b560048036038101906100b09190610b70565b610255565b005b3480156100c357600080fd5b506100cc610319565b005b3480156100da57600080fd5b506100e36104ae565b6040516100f09190610bac565b60405180910390f35b34801561010557600080fd5b50610120600480360381019061011b9190610c2c565b6104d7565b005b34801561012e57600080fd5b5061014960048036038101906101449190610b70565b6108cd565b005b6101536108e1565b60008173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161018e9190610bac565b602060405180830381865afa1580156101ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101cf9190610cb5565b90508173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84836040518363ffffffff1660e01b815260040161020c929190610cf1565b6020604051808303816000875af115801561022b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024f9190610d52565b50505050565b61025d6108e1565b600047905060008273ffffffffffffffffffffffffffffffffffffffff168260405161028890610db0565b60006040518083038185875af1925050503d80600081146102c5576040519150601f19603f3d011682016040523d82523d6000602084013e6102ca565b606091505b5050905080610314573383836040517f9d11f56300000000000000000000000000000000000000000000000000000000815260040161030b93929190610dc5565b60405180910390fd5b505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a090610e59565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006040518060a00160405280846040516020016104f59190610bac565b60405160208183030381529060405281526020013360405160240161051a9190610bac565b6040516020818303038152906040527f6a627842000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050508152602001600067ffffffffffffffff8111156105b7576105b6610e79565b5b6040519080825280602002602001820160405280156105f057816020015b6105dd610a9d565b8152602001906001900390816105d55790505b50815260200160018081111561060957610608610ea8565b5b84600181111561061c5761061b610ea8565b5b1461062857600061064a565b7f00000000000000000000000000000000000000000000000000000000000000005b73ffffffffffffffffffffffffffffffffffffffff16815260200160405180602001604052806000815250815250905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166320487ded86846040518363ffffffff1660e01b81526004016106d79291906110fd565b602060405180830381865afa1580156106f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107189190610cb5565b9050600060018081111561072f5761072e610ea8565b5b84600181111561074257610741610ea8565b5b036107ec577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166396f4e9f987856040518363ffffffff1660e01b81526004016107a29291906110fd565b6020604051808303816000875af11580156107c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e59190611163565b905061088e565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166396f4e9f98388866040518463ffffffff1660e01b81526004016108489291906110fd565b60206040518083038185885af1158015610866573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061088b9190611163565b90505b7f54791b38f3859327992a1ca0590ad3c0f08feba98d1a4f56ab0dca74d203392a816040516108bd919061119f565b60405180910390a1505050505050565b6108d56108e1565b6108de81610971565b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461096f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096690611206565b60405180910390fd5b565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036109df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d690611272565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610afd82610ad2565b9050919050565b610b0d81610af2565b8114610b1857600080fd5b50565b600081359050610b2a81610b04565b92915050565b60008060408385031215610b4757610b46610acd565b5b6000610b5585828601610b1b565b9250506020610b6685828601610b1b565b9150509250929050565b600060208284031215610b8657610b85610acd565b5b6000610b9484828501610b1b565b91505092915050565b610ba681610af2565b82525050565b6000602082019050610bc16000830184610b9d565b92915050565b600067ffffffffffffffff82169050919050565b610be481610bc7565b8114610bef57600080fd5b50565b600081359050610c0181610bdb565b92915050565b60028110610c1457600080fd5b50565b600081359050610c2681610c07565b92915050565b600080600060608486031215610c4557610c44610acd565b5b6000610c5386828701610bf2565b9350506020610c6486828701610b1b565b9250506040610c7586828701610c17565b9150509250925092565b6000819050919050565b610c9281610c7f565b8114610c9d57600080fd5b50565b600081519050610caf81610c89565b92915050565b600060208284031215610ccb57610cca610acd565b5b6000610cd984828501610ca0565b91505092915050565b610ceb81610c7f565b82525050565b6000604082019050610d066000830185610b9d565b610d136020830184610ce2565b9392505050565b60008115159050919050565b610d2f81610d1a565b8114610d3a57600080fd5b50565b600081519050610d4c81610d26565b92915050565b600060208284031215610d6857610d67610acd565b5b6000610d7684828501610d3d565b91505092915050565b600081905092915050565b50565b6000610d9a600083610d7f565b9150610da582610d8a565b600082019050919050565b6000610dbb82610d8d565b9150819050919050565b6000606082019050610dda6000830186610b9d565b610de76020830185610b9d565b610df46040830184610ce2565b949350505050565b600082825260208201905092915050565b7f4d7573742062652070726f706f736564206f776e657200000000000000000000600082015250565b6000610e43601683610dfc565b9150610e4e82610e0d565b602082019050919050565b60006020820190508181036000830152610e7281610e36565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b610ee081610bc7565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610f20578082015181840152602081019050610f05565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f4882610ee6565b610f528185610ef1565b9350610f62818560208601610f02565b610f6b81610f2c565b840191505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610fab81610af2565b82525050565b610fba81610c7f565b82525050565b604082016000820151610fd66000850182610fa2565b506020820151610fe96020850182610fb1565b50505050565b6000610ffb8383610fc0565b60408301905092915050565b6000602082019050919050565b600061101f82610f76565b6110298185610f81565b935061103483610f92565b8060005b8381101561106557815161104c8882610fef565b975061105783611007565b925050600181019050611038565b5085935050505092915050565b600060a083016000830151848203600086015261108f8282610f3d565b915050602083015184820360208601526110a98282610f3d565b915050604083015184820360408601526110c38282611014565b91505060608301516110d86060860182610fa2565b50608083015184820360808601526110f08282610f3d565b9150508091505092915050565b60006040820190506111126000830185610ed7565b81810360208301526111248184611072565b90509392505050565b6000819050919050565b6111408161112d565b811461114b57600080fd5b50565b60008151905061115d81611137565b92915050565b60006020828403121561117957611178610acd565b5b60006111878482850161114e565b91505092915050565b6111998161112d565b82525050565b60006020820190506111b46000830184611190565b92915050565b7f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000600082015250565b60006111f0601683610dfc565b91506111fb826111ba565b602082019050919050565b6000602082019050818103600083015261121f816111e3565b9050919050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b600061125c601783610dfc565b915061126782611226565b602082019050919050565b6000602082019050818103600083015261128b8161124f565b905091905056fea2646970667358221220aad0725d1977da99ceb07094dfd2c4e1cbe199868b8203b2747d0139829f2d8064736f6c63430008130033";

type SourceMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SourceMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SourceMinter__factory extends ContractFactory {
  constructor(...args: SourceMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    router: PromiseOrValue<string>,
    link: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SourceMinter> {
    return super.deploy(router, link, overrides || {}) as Promise<SourceMinter>;
  }
  override getDeployTransaction(
    router: PromiseOrValue<string>,
    link: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(router, link, overrides || {});
  }
  override attach(address: string): SourceMinter {
    return super.attach(address) as SourceMinter;
  }
  override connect(signer: Signer): SourceMinter__factory {
    return super.connect(signer) as SourceMinter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SourceMinterInterface {
    return new utils.Interface(_abi) as SourceMinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SourceMinter {
    return new Contract(address, _abi, signerOrProvider) as SourceMinter;
  }
}