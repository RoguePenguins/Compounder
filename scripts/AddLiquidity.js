const JOE_ROUTER = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4';

async function addLiquidity(_pid, _amount){
    if (typeof window.ethereum !== 'undefined') {
        let data;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Address = signer.getAddress();

        // create contract with address from deployer script and abi from artifacts folder
        const contract = new ethers.Contract(JOE_ROUTER, Router.abi, provider);

        let res = await contract.WAVAX()

        console.log(res)
    }
}