const HDWalletProvider = require ('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, object: bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'tissue under chase hand dish produce actress together cart mass sample depart',
	'https://rinkeby.infura.io/v3/9330a254491e4ed5afef31bf2f59b4fb'
);

const web3  = new Web3(provider);

const deploy = async() => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account',accounts[0]);

	const result = await new web3.eth.Contract(interface)
     .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
     .send({from: accounts[0]}); // remove 'gas'

     console.log('Contract deployed to: ',result.options.address);

};
deploy();