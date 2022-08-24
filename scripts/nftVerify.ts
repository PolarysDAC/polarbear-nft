import hre from "hardhat";
import { ethers } from 'hardhat'
import { load } from "./utils"

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const contractAddress = (await load('PolarBearNFTContract')).address
    await hre.run("verify:verify", {
        address: contractAddress,
        // constructorArguments: ["Polarys Polar Bears", "POLARBEAR"],
        constructorArguments: ["TestToken", "PPP"],
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});