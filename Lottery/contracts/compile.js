const path = require('path');
const fs = require('fs');
const solc = require('solc');



const LotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(LotteryPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
}; 
const { abi: interface, evm: { bytecode: { object } } } = 
    JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery; // 
 
module.exports = { interface, object }; // object is the actual name of the bytecode

// console.log('abi: ' + JSON.stringify(interface)+ '\n\n' + 'bytecode: ' + object);
