const path = require('path');
const fs = require('fs');
const solc = require('solc');



const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
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
    JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox; 
 
module.exports = { interface, object }; // object is the actual name of the bytecode

// console.log('abi: ' + JSON.stringify(interface) + ' bytecode: ' + object);
