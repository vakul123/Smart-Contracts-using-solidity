const assert = require ('assert');
const ganache = require ('ganache-cli');     //npm run test
const Web3 = require ('Web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, object: bytecode } = require('../compile');
// i've renamed object with bytecode 


let accounts;
let inbox;

beforeEach( async () => {
	// get the list of accounts
	accounts = await web3.eth.getAccounts();
	inbox = await new web3.eth.Contract(interface)
	        .deploy({ data: bytecode, arguments: ['Hi there'] }) // arguments is an array
	        .send({ from: accounts[0], gas: '1000000'});

	        inbox.setProvider(provider);
	    });
	//Use one of the fetched accounts to deploy
	// the contract

describe('Inbox', ()=>{
	it ('deploys a contract',()=>{
		assert.ok(inbox.options.address);
	});

	it ('default message has been set', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi there');
	});

	it ('can change the message', async () => {
		await inbox.methods.setMessage('Bye').send( { from: accounts[0] })
	    const message = await inbox.methods.message().call();
	    assert.equal(message,'Bye');
	});
});