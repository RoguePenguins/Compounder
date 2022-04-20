// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

interface V2Chef  {
    function poolLength() external view returns (uint256);
    function poolInfo(uint256) external view returns(address,uint256,uint256,uint256,address);
    function userInfo(uint256,address) external view returns (uint256 amount, uint256 rewardDebt);
    function deposit(uint256 _pid,uint256 _amount) external;
    function withdrawl(uint256 _pid, uint256 _amount) external;
}