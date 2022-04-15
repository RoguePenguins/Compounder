const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const BATCH_CONTRACT = "0x809d550fca64d94Bd9F66E60752A544199cfAC3D"
const Address = "0x6914FC70fAC4caB20a8922E900C4BA57fEECf8E1"
const JOE_CHEF = "0xd6a4F121CA35509aF06A0Be99093d08462f53052";

async function main() {
    
    await hre.ethers.provider.send('hardhat_impersonateAccount', ['0x6914FC70fAC4caB20a8922E900C4BA57fEECf8E1']);
    const account = await hre.ethers.provider.getSigner('0x6914FC70fAC4caB20a8922E900C4BA57fEECf8E1');

    const Factory = await hre.ethers.getContractFactory("GetFarms");
    const contract = await Factory.attach(BATCH_CONTRACT);
    let farms = []
    let newFarms;
    let i=0
    let length = await contract.functions.getLength(JOE_CHEF)
    console.log(length)
    while(i<length){
      newFarms = await contract.functions.getBatchFarms(JOE_CHEF, Address, i)
      newFarms[0].forEach(
        x => {
          farms.push(x)
        })
        i += 10
        console.log(i)
    }
    let usedfarmsIndex = []
    for(let i=0;i<farms.length;i++){
      if(farms[i][0] > 0){
        usedfarmsIndex.push(i)
      }
    }
    console.log(usedfarmsIndex)
    console.log(await contract.functions.getInfoSymbol(JOE_CHEF,usedfarmsIndex))
    console.log(await contract.functions.getInfoAddress(JOE_CHEF,usedfarmsIndex))

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
