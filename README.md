# Basic Manual Compounder for Trader Joe yield farms
This is a demo project for adding to Trader Joe v2 yield farms in one transaction. It is setup to run on a local fork of the Avalanche blockchain

# Setup
```shell
npm install
npx hardhat node
```
creates the local blockchain and gives you a list of precreated accounts and their private keys. One of thses will need to be used.

```shell
npx hardhat run scripts/getDeployer.js --network localhost
```
deploys the smart contracts needed and saves the address to Addresses.json 

```shell
npm start
```
Starts the react frontend


## Wallet Setup 
Configure Metamask or similar crypto wallet with the local network.

Typically it is the following but when you start the node hardhat tells you the rpc address and the chainid is in hardhat.config

rpc: http://localhost:8545 <br />
chainid: 1337

Finally make sure to import an account seeded with eth from the hardhat node creation. Note, you have to reset the metamask if you have sent a transaction and later turn off the hardhat node. The nonce metamask keeps track off is from the 'old' network which causes an error.



