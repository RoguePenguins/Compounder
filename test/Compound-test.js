const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require("bignumber.js");

describe("Pool types", function () {

    let compound;
    let pool;
   
    this.beforeEach(async function() {
        const Compound = await ethers.getContractFactory("Compounder");
        compound = await Compound.deploy();
        await compound.deployed();
    });
    
    it("Should return 0", async function () {
        pool = '0xc992Ab46428a5a2eDeB8F44D946CE5642F97EF71';
        expect(await compound.PoolType(pool)).to.equal(0);
    });

    it("Should return 1", async function () {
        pool = "0xbeB0b5FBd99b8e7498A4063CB419646922F6Eef8"
        expect(await compound.PoolType(pool)).to.equal(1);
    });

    it("Should return 2", async function () {
        pool = '0x454E67025631C065d3cFAD6d71E6892f74487a15';
        expect(await compound.PoolType(pool)).to.equal(2);
    });
    it("Should return 3", async function () {
        pool = "0xE4B66cA7a32DDc21df3c1233866957573e7EC744"
        expect(await compound.PoolType(pool)).to.equal(3);
    });
    it("Should return 4", async function () {
        pool = "0x943EDD46Fb9573A0b0517C0ce010791Bd5Ca0A15"
        expect(await compound.PoolType(pool)).to.equal(4);
    });
});

    describe("Add to Farms", function () {

        let compound;   
        let chef
        let gas;
        let AVAXAmount;
        this.beforeEach(async function() {
        const gwei = '80'

        const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
        gas = {
        gasPrice: gasPrice,
        gasLimit: 30000000
        }
            AVAXAmount = '10';
            const Compound = await ethers.getContractFactory("Compounder");
            compound = await Compound.deploy();
            await compound.deployed();



            const JOE_CHEF = "0xd6a4F121CA35509aF06A0Be99093d08462f53052";
            chef = await hre.ethers.getContractAt("V2Chef", JOE_CHEF);

        });

    it("Should type 0 farm", async function () {
        let _pid = 0;
        // Declare event filter to get value of pool tokens
        let Eventsfilter = compound.filters.LiquidityAdd(); 

        await compound.AddToFarm(_pid, {
            ...gas,
            value: ethers.utils.parseEther(AVAXAmount)
        })
        

        compound.on(Eventsfilter, async (res) => {
            expect(BigNumber(res).isZero()).to.false()
        }); 
    });

    it("Should type 1 farm", async function () {
        let _pid = 1;
        // Declare event filter to get value of pool tokens
        let Eventsfilter = compound.filters.LiquidityAdd(); 

        await compound.AddToFarm(_pid, {
            ...gas,
            value: ethers.utils.parseEther(AVAXAmount)
        })
        

        compound.on(Eventsfilter, async (res) => {
            expect(BigNumber(res).isZero()).to.false()
        }); 
    });

    it("Should type 2 farm", async function () {
        let _pid = 13;
        // Declare event filter to get value of pool tokens
        let Eventsfilter = compound.filters.LiquidityAdd(); 

        await compound.AddToFarm(_pid, {
            ...gas,
            value: ethers.utils.parseEther(AVAXAmount)
        })
        

        compound.on(Eventsfilter, async (res) => {
            expect(BigNumber(res).isZero()).to.false()
        }); 
    });

    it("Should type 3 farm", async function () {
        let _pid = 18;
        // Declare event filter to get value of pool tokens
        let Eventsfilter = compound.filters.LiquidityAdd(); 

        await compound.AddToFarm(_pid, {
            ...gas,
            value: ethers.utils.parseEther(AVAXAmount)
        })
        

        compound.on(Eventsfilter, async (res) => {
            expect(BigNumber(res).isZero()).to.false()
        }); 
    });

    it("Should type 4 farm", async function () {
        let _pid = 16;
        // Declare event filter to get value of pool tokens
        let Eventsfilter = compound.filters.LiquidityAdd(); 

        await compound.AddToFarm(_pid, {
            ...gas,
            value: ethers.utils.parseEther(AVAXAmount)
        })
        

        compound.on(Eventsfilter, async (res) => {
            expect(BigNumber(res).isZero()).to.false()
        }); 
    });
    
});

