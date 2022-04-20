import { ethers } from 'ethers'

// import abis
import Compounder from '../artifacts/contracts/Compound.sol/Compounder.json';
import Chef from '../artifacts/contracts/V2Chef.sol/V2Chef.json';
import IERC20 from '../artifacts/contracts/IERC20.sol/IERC20.json';
const {BigNumber} = require("bignumber.js");

// addresses
const JOE_CHEF = "0xd6a4F121CA35509aF06A0Be99093d08462f53052";
const Addresses = require('./Addresses.json');
const Compound_Address = Addresses['Compounder'];

// constants needed
const gwei = '80'
const amountToSwap = '10';
const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
  gasPrice: gasPrice,
  gasLimit: 2000000
}
const AVAXAmount = ethers.utils.parseEther(amountToSwap)


async function addLiquidity(_pid){
    if (typeof window.ethereum !== 'undefined') {

        // setup to interact with contracts
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const compound = new ethers.Contract(Compound_Address, Compounder.abi, signer);
        const chef = new ethers.Contract(JOE_CHEF, Chef.abi, signer);
        const poolAddress = await compound.poolInfo(_pid);
        const pool =  new ethers.Contract(poolAddress, IERC20.abi, signer);

        // filter to be used later to get amount of liquidity tokens to deposit
        let Eventsfilter = compound.filters.LiquidityAdd();

        // send transaction to add
        let tx = await compound.AddToFarm(_pid, {
            ...gas,
            value: AVAXAmount
        })

        // capture the event with the token amount then approve approve the chef to use the token finally deposit
        compound.once(Eventsfilter, async (value, event) => {
            await pool.approve(JOE_CHEF, value)
            await chef.deposit(_pid,value)
        });


    }
}

export default addLiquidity