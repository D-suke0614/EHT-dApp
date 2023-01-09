// WavePortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("Here is my first smart contract!");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waves!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
