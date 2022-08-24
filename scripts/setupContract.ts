import { ethers } from 'hardhat';
import { formatUnits } from "ethers/lib/utils";
import { PolarBearNFTContract } from "../typechain-types";

import 'dotenv/config';
import { load } from "./utils"
import {
  getBigNumber,
} from '../test/utils'

import { Signer } from 'ethers';

async function main () {
  let signer: Signer
  let nftContract: PolarBearNFTContract

  const DECIMALS = 6;
  const PRIVATE_SALE_PRICE = 250;
  const PUBLIC_SALE_PRICE = 300;
  const ROYALTY_FEE = 500;   // 5% royalty fee

  const royaltyAddress = String(process.env.ROYALTY_ADDRESS)
  const verifyAddress = String(process.env.VERIFY_ACCOUNT)
  const baseURI = String(process.env.BASE_URI)
  const nftContractAddress = (await load('PolarBearNFTContract')).address

  nftContract = (await ethers.getContractAt("PolarBearNFTContract", nftContractAddress)) as PolarBearNFTContract;
  [signer] = await ethers.getSigners()
  
  await (
    await nftContract
    .connect(signer)
    .setRoyalty(royaltyAddress, ROYALTY_FEE)
  ).wait();
  
  await (
    await nftContract
    .connect(signer)
    .setupVerifyRole(verifyAddress)
  ).wait();
  
  await (
    await nftContract
    .connect(signer)
    .setBaseURI(baseURI)
  ).wait();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });