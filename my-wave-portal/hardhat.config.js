// local環境で使用
// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

// テストネットで使用
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/3AXrSYMeRVciOxAXAQLjB1ridIL89ryM",
      accounts: ["b3881d38958e041cc4a37ae2460d5c2aca5a66e12e6dfb0a91ac39e0fb6857e6"],
    },
  },
};
