import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "solidity-coverage";

import * as dotenv from "dotenv";
dotenv.config();

const chainIds = {
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  mumbai: 80001,
  polygon: 137,
};


const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";

const PRIVATE_KEY = process.env.PK || "";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY || "";
const ETH_RPC_URL = process.env.ETH_RPC_URL

const config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    mainnet: {
      url: ETH_RPC_URL,
      chainId: chainIds.mainnet,
      accounts: [PRIVATE_KEY],
      gasMultiplier: 1.25
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
      chainId: chainIds.rinkeby,
      accounts: [PRIVATE_KEY],
      gasMultiplier: 1.25
    },
  },
  etherscan: {
    apiKey: {
      // ethereum
      mainnet: ETHERSCAN_KEY,
      rinkeby: ETHERSCAN_KEY,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 30000,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  }
};

export default config;
