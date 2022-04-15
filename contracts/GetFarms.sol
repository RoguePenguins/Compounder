// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "./IPair.sol";
import "./BadPools.sol";
import "./V2Chef.sol";

interface IERC20Metadata {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

interface IUniswapV2Pair {
    function token0() external view returns (address);
    function token1() external view returns (address);
}




contract GetFarms{

    uint BATCH_SIZE = 10;
    uint[] BAD_POOLS = [24,35,36,66,67,69];

    function contains(uint256 pool) public view returns (bool){
        for (uint256 i = 0; i < BAD_POOLS.length; i++) {
            if (BAD_POOLS[i] == pool) {
                return true;
            }
        }
  return false;
}


    // get batches of 10 farms
    function getBatchFarms(address _chef, address _address, uint _start) external view returns(uint256[2][] memory){
        uint256 length = V2Chef(_chef).poolLength();
        uint end = _start + BATCH_SIZE;
        if(end>length){
            end = length;
        }
        uint256[2][] memory pools = new uint256[2][](BATCH_SIZE);
        for(uint i=0; i+_start<end; i++){
            (pools[i][0], pools[i][1]) = V2Chef(_chef).userInfo(i+_start, _address);
            console.log("Getting Pool '%s''", i+_start);

            
        }
        return pools;
    }

    function getSymbols(address _chef, uint _start) external view returns(string[2][] memory){
        uint256 length = V2Chef(_chef).poolLength();
        uint end = _start + BATCH_SIZE;
        if(end>length){
            end = length;
        }
        string[2][] memory tokens = new string[2][](BATCH_SIZE);
        for(uint i=0; i+_start<end; i++){
            console.log("Getting Pool info '%s', '%s'", i+_start, !contains(i+_start));                  
            if(!contains(i+_start)){
                (address pool,,,,) = V2Chef(_chef).poolInfo(i+_start);
                address token0 = IPair(pool).token0();
                address token1 = IPair(pool).token1();
                tokens[i][0] = IERC20Metadata(token0).symbol();
                tokens[i][1] = IERC20Metadata(token1).symbol();
            }
            else {
                string memory err = "Error";
                tokens[i][0] = err;
                tokens[i][1] = err;
            }
            }
           

        return tokens;
    }

    // returns only the pool value from V2Chef's pool info function.
    // to be used with the try catch since we can't specify ignored return values there
    function poolInfo(address _chef, uint _pid) public view returns(address){
       (address pool,,,,) = V2Chef(_chef).poolInfo(_pid); 
        return pool;
    }

    function getLength(address _chef) external view returns(uint){
        return V2Chef(_chef).poolLength();
    }

     function getInfoAddress(address _chef, uint[] calldata _pids) external view returns(address[2][] memory){
        address[2][] memory tokens = new address[2][](_pids.length);
        for(uint i=0; i<_pids.length;i++){
            (address pool,,,,) = V2Chef(_chef).poolInfo(_pids[i]);
            tokens[i][0] = IPair(pool).token0();
            tokens[i][1] = IPair(pool).token1();
        }

        return tokens;
    }
}