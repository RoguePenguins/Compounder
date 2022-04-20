
const fs = require('fs');
const hre = require("hardhat");

async function main() {

  let addresses = {}

  const Farms = await hre.ethers.getContractFactory("GetFarms");
  const farms = await Farms.deploy();
  await farms.deployed();
  console.log("GetFarms deployed to:", farms.address);

  const Compound = await ethers.getContractFactory("Compounder");
  compound = await Compound.deploy();
  await compound.deployed();
  console.log("Compounder deployed to:", compound.address);
  
  addresses['GetFarms'] = farms.address
  addresses['Compounder'] = compound.address

  console.log(JSON.stringify(addresses))

  fs.writeFileSync("src/helpers/Addresses.json", JSON.stringify(addresses), function(err) {
    if (err) throw err;
    console.log('Deployed Addresses Written');
    })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
