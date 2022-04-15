const { ethers } = require('hardhat');

async function main() {

    const sevenDays = 7 * 24 * 60 * 60;

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const before = blockBefore.timestamp;
    console.log('Timestamp before: %s',before)
    
    await ethers.provider.send('evm_increaseTime', [3600]);
    await ethers.provider.send('evm_mine');

    const block = await ethers.provider.getBlockNumber();
    const blockAfter = await ethers.provider.getBlock(block);
    const after = blockAfter.timestamp;
    console.log('Timestamp after: %s',after)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
