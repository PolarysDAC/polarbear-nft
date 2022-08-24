import { ethers, upgrades } from 'hardhat'
import { save } from "./utils"

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const factory = await ethers.getContractFactory("PolarBearNFTContract");
    // let contract = await factory.deploy("Polarys Polar Bears", "POLARBEAR");
    let contract = await factory.deploy("TestToken", "PPP");
    await contract.deployed();
    console.log("PolarBearNFTContract deployed to:", contract.address);
    await save('PolarBearNFTContract', {
        address: contract.address
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});