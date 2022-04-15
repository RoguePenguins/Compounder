const hre = require("hardhat");


// console out a account value from mainchain to test that the fork is working correctly

async function main() {
    
    await ethers.provider.send('hardhat_impersonateAccount', ['0x6914FC70fAC4caB20a8922E900C4BA57fEECf8E1']);
    const account = await hre.ethers.provider.getSigner('0x6914FC70fAC4caB20a8922E900C4BA57fEECf8E1');

    let balance = await hre.ethers.provider.getBalance("0x6914FC70fAC4caB20a8922E900C4BA57fEECf8E1")
    console.log(balance)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
