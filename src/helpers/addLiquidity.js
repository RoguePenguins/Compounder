import { ethers } from 'ethers'

import Router from '../artifacts/contracts/Router.sol/IJoeRouter01.json'
import Chef from '../artifacts/contracts/V2Chef.sol/V2Chef.json'
import IPair from '../artifacts/contracts/IPair.sol/IPair.json'
const JOE_ROUTER = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4';
const JOE_CHEF = "0xd6a4F121CA35509aF06A0Be99093d08462f53052";
const WAVAX = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
const amountToSwap = '10';
const gwei = '80'


const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
  gasPrice: gasPrice,
  gasLimit: 2000000
}

const AVAXAmount = ethers.utils.parseEther(amountToSwap).toHexString();



// only gets path for when one token is AVAX. Need other logic for when neither is
async function getPath(_pid, _provider){
    const chef = new ethers.Contract(JOE_CHEF, Chef.abi, _provider);
    const poolAddress = (await chef.poolInfo(_pid))[0];

    const pool = new ethers.Contract(poolAddress, IPair.abi, _provider);

    const token0 = await pool.token0()
    const token1 = await pool.token1()
    let res = []
    res.push(WAVAX);
    if(token0 == WAVAX){
        res. push(token1);
    }
    else{
        res.push(token0)
    }

    return res;

}

async function Swap(_pid, _signer){

}

async function addLiquidity(_pid, _amount){
    if (typeof window.ethereum !== 'undefined') {
        let data;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Address = signer.getAddress();
        const contract = new ethers.Contract(JOE_ROUTER, Router.abi, signer);

        let path = await getPath(_pid,signer)
        let deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        await contract.swapExactAVAXForTokens(0 , path, Address, deadline,
        {
            ...gas,
            value: AVAXAmount
        }
        );

        await router.addLiquidityAVAX(path[1], moreArg, moreArg, avaxArg, Address, deadline, {
            value: AVAXAmount
          });
        

        // create contract with address from deployer script and abi from artifacts folder


    }
}

export default addLiquidity