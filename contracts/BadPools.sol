// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract BadPools
{
    uint[] pools = [24,35,36,66,67,69];

    function AddPool(uint256 pool) public{
        pools.push(pool);    
        }

    function contains(uint256 pool) public view returns (bool){
    for (uint256 i = 0; i < pools.length; i++) {
    if (pools[i] == pool) {
      return true;
    }
  }
  return false;
}
}