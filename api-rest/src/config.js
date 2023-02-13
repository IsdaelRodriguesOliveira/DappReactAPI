const CONTRACT_INFO = require('../../client/src/contracts/Payment_validation.json')
const ABI = CONTRACT_INFO.abi
const ADDRESS = CONTRACT_INFO.networks[5777].address

module.exports = {
    CONTRACT_INFO,
    ABI,
    ADDRESS,
  };