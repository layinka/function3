export const TokenPoolABI = [
    {
      "inputs": [],
      "name": "AllowListNotEnabled",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BadARMSignal",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ramp",
          "type": "address"
        }
      ],
      "name": "NonExistentRamp",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PermissionsError",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ramp",
          "type": "address"
        }
      ],
      "name": "RampAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "SenderNotAllowed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddressNotAllowed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "AllowListAdd",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "AllowListRemove",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Burned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Locked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Minted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "offRamp",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "indexed": false,
          "internalType": "struct RateLimiter.Config",
          "name": "rateLimiterConfig",
          "type": "tuple"
        }
      ],
      "name": "OffRampAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "offRamp",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "indexed": false,
          "internalType": "struct RateLimiter.Config",
          "name": "rateLimiterConfig",
          "type": "tuple"
        }
      ],
      "name": "OffRampConfigured",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "offRamp",
          "type": "address"
        }
      ],
      "name": "OffRampRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "onRamp",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "indexed": false,
          "internalType": "struct RateLimiter.Config",
          "name": "rateLimiterConfig",
          "type": "tuple"
        }
      ],
      "name": "OnRampAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "onRamp",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "indexed": false,
          "internalType": "struct RateLimiter.Config",
          "name": "rateLimiterConfig",
          "type": "tuple"
        }
      ],
      "name": "OnRampConfigured",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "onRamp",
          "type": "address"
        }
      ],
      "name": "OnRampRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Released",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "removes",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "adds",
          "type": "address[]"
        }
      ],
      "name": "applyAllowListUpdates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "ramp",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "allowed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "isEnabled",
                  "type": "bool"
                },
                {
                  "internalType": "uint128",
                  "name": "capacity",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "rate",
                  "type": "uint128"
                }
              ],
              "internalType": "struct RateLimiter.Config",
              "name": "rateLimiterConfig",
              "type": "tuple"
            }
          ],
          "internalType": "struct TokenPool.RampUpdate[]",
          "name": "onRamps",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "ramp",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "allowed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "isEnabled",
                  "type": "bool"
                },
                {
                  "internalType": "uint128",
                  "name": "capacity",
                  "type": "uint128"
                },
                {
                  "internalType": "uint128",
                  "name": "rate",
                  "type": "uint128"
                }
              ],
              "internalType": "struct RateLimiter.Config",
              "name": "rateLimiterConfig",
              "type": "tuple"
            }
          ],
          "internalType": "struct TokenPool.RampUpdate[]",
          "name": "offRamps",
          "type": "tuple[]"
        }
      ],
      "name": "applyRampUpdates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "offRamp",
          "type": "address"
        }
      ],
      "name": "currentOffRampRateLimiterState",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "tokens",
              "type": "uint128"
            },
            {
              "internalType": "uint32",
              "name": "lastUpdated",
              "type": "uint32"
            },
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "internalType": "struct RateLimiter.TokenBucket",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "onRamp",
          "type": "address"
        }
      ],
      "name": "currentOnRampRateLimiterState",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint128",
              "name": "tokens",
              "type": "uint128"
            },
            {
              "internalType": "uint32",
              "name": "lastUpdated",
              "type": "uint32"
            },
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "internalType": "struct RateLimiter.TokenBucket",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllowList",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllowListEnabled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getArmProxy",
      "outputs": [
        {
          "internalType": "address",
          "name": "armProxy",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOffRamps",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOnRamps",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "offRamp",
          "type": "address"
        }
      ],
      "name": "isOffRamp",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "onRamp",
          "type": "address"
        }
      ],
      "name": "isOnRamp",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "originalSender",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "receiver",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "destChainSelector",
          "type": "uint64"
        },
        {
          "internalType": "bytes",
          "name": "extraArgs",
          "type": "bytes"
        }
      ],
      "name": "lockOrBurn",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "originalSender",
          "type": "bytes"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "sourceChainSelector",
          "type": "uint64"
        },
        {
          "internalType": "bytes",
          "name": "extraData",
          "type": "bytes"
        }
      ],
      "name": "releaseOrMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "offRamp",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "internalType": "struct RateLimiter.Config",
          "name": "config",
          "type": "tuple"
        }
      ],
      "name": "setOffRampRateLimiterConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "onRamp",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "isEnabled",
              "type": "bool"
            },
            {
              "internalType": "uint128",
              "name": "capacity",
              "type": "uint128"
            },
            {
              "internalType": "uint128",
              "name": "rate",
              "type": "uint128"
            }
          ],
          "internalType": "struct RateLimiter.Config",
          "name": "config",
          "type": "tuple"
        }
      ],
      "name": "setOnRampRateLimiterConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]