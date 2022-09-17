import { ethers } from "ethers";

export const whitelistMint = async (
  contract: ethers.Contract,
  dates: string[],
  proof: string[],
  amount = 1
) => {
  console.log(dates, proof);
  const tx = await contract.whitelistMint(amount, dates, proof, {
    value: ethers.utils.parseEther("0.1").mul(amount),
  });
  await tx.wait();
};

export const whitelistRandomMint = async (
  contract: ethers.Contract,
  proof: string[],
  amount = 1
) => {
  console.log(proof);
  const tx = await contract.whitelistRandomMint(amount, proof, {
    value: ethers.utils.parseEther("0.05").mul(amount), //.(amount),
  });
  await tx.wait();
};
