// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "./IPair.sol";
import "./V2Chef.sol";
import "./IERC20.sol";
import "./Router.sol";

contract Compounder {
address JOE_ROUTER = 0x60aE616a2155Ee3d9A68541Ba4544862310933d4;
address JOE_CHEF = 0xd6a4F121CA35509aF06A0Be99093d08462f53052;
address WAVAX = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;
address JOE_TOKEN = 0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd;

event LiquidityAdd(uint256);

// returns pool address
function poolInfo(uint _pid) public view returns(address){
       (address pool,,,,) = V2Chef(JOE_CHEF).poolInfo(_pid); 
        return pool;
    }

// returns 0,1,2,3 or 4
// 0 if token 0 is avax
// 1 if token 1 is avax
// 2 if token 0 is joe
// 3 if token 1 is joe
// 4 if neither
function PoolType(address _lp) public view returns(uint){
    address token0 = IPair(_lp).token0();
    address token1 = IPair(_lp).token1();
    
    // we do this first b/c the joe/wavax pair should be handled as a joe pair would
    if(token0 == JOE_TOKEN){
        return 2;
    }
    else if(token0 == WAVAX){
        return 0;
    }
    else if(token1 == WAVAX){
        return 1;
    }
    
    else if(token1 == JOE_TOKEN){
        return 3;
    }
    else{
        return 4;
    }
    
}

// Will spend the amount specified on tokens and add them to the farm
// so if its a avax/joe farm. Spend half of amount on joe
// if usdc/usdt spend half on each
function AddToFarm(uint _pid) public payable {

    bool avaxPool = false; 
    address other_token;
    uint other_tracker;
    (address pool,,,,) =  V2Chef(JOE_CHEF).poolInfo(_pid);

    // Amounts of each non-avax token swapped for.
    // if its an avax pair only one will be set and tracked with the other_tracker
    uint[2] memory amounts = [uint256(0), uint256(0)];

    // test is the pool uses avax. If so we need to use addAvaxLiquidity later
    if(IPair(pool).token0() == WAVAX || IPair(pool).token1() == WAVAX){
        avaxPool = true;
    }

    // Swap avax for token 0 and approve the router to spend it for later.
    if(IPair(pool).token0() != WAVAX){
        other_token = IPair(pool).token0();
        other_tracker = 0;
        address[] memory path = new address[](2);
        path[0] = WAVAX;
        path[1] = other_token;
        uint[] memory out = IJoeRouter01(JOE_ROUTER).swapExactAVAXForTokens{value:msg.value/2}(0, path, address(this), block.timestamp);
        amounts[other_tracker] = out[1];
        require(IERC20(other_token).approve(address(JOE_ROUTER), out[1]), 'approve failed.');
    }

    // same as above but for token 1
    if(IPair(pool).token1() != WAVAX){
        other_token = IPair(pool).token1();
        other_tracker = 1;
        address[] memory path = new address[](2);
        path[0] = WAVAX;
        path[1] = other_token;
        uint[] memory out = IJoeRouter01(JOE_ROUTER).swapExactAVAXForTokens{value:msg.value/2}(0, path, msg.sender, block.timestamp);
        amounts[other_tracker] = out[1];
        require(IERC20(other_token).approve(address(JOE_ROUTER), out[1]), 'approve failed.');
    }

    // add liquidity 
    uint lp_tokens;
    if(avaxPool) {
        (,,lp_tokens) = IJoeRouter01(JOE_ROUTER).addLiquidityAVAX{value:msg.value/2}(other_token, amounts[other_tracker], 0, 0, msg.sender, block.timestamp);
    }

    else {
        (,,lp_tokens) = IJoeRouter01(JOE_ROUTER).addLiquidity(IPair(pool).token0(), IPair(pool).token1(), amounts[0], amounts[1], 0, 0, msg.sender, block.timestamp);
    }
    emit LiquidityAdd(lp_tokens);
    }

    receive() external payable {

    }

}