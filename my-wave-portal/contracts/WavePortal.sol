// WavePortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    /**
     * NewWaveイベント
     */
    event NewWave(address indexed from, uint256 timestamp, string message);

    /**
     * Waveという構造体を作成
     * 構造体の中身はカスタマイズすることができる
     */
    struct Wave {
        address waver; //👋（wave）を送ったユーザのアドレス
        string message;
        uint256 timestamp;
    }

    /**
     * 構造体の配列を格納するための変数waves
     * これでユーザが送った全ての👋（wave）を保持することができる
     */
    Wave[] waves;
    constructor() {
        console.log('WavePortal - Smart Contract!');
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log('%s waved w/ message &s', msg.sender, _message);
        /**
         * 「👋（wave）」とメッセージを配列に格納。
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));
        /**
         * コントラクト側でemitされたイベントに関する通知をフロントで取得できるようにする
         */
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    /**
     * 構造体配列のwavesを返す関数
     * この関数でWEBアプリからwavesを取得することができる
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
