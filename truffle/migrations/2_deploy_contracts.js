//const ConvertLib = artifacts.require("ConvertLib");
//const MetaCoin = artifacts.require("MetaCoin");

const SimpleStorage = artifacts.require("SimpleStorage")
const Payment_validation = artifacts.require("Payment_validation")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Payment_validation);
};
