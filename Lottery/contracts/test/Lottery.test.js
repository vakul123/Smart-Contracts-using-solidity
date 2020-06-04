const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, object: bytecode } = require('../compile');
// i've renamed object with bytecode  

let lottery;
let accounts;

beforeEach( async () => {
	accounts = await web3.eth.getAccounts();

	lottery = await new web3.eth.Contract(interface)
	.deploy({ data: bytecode})
	.send({ from: accounts[0], gas: '1000000'});

	lottery.setProvider(provider);
});

describe('Lottery contract', ()=>{

	it('deploys a contract', ()=>{
		assert.ok(lottery.options.address);	
	});


	it('allows one account to enter', async ()=> {
            await lottery.methods.enter().send({
   	    	 from: accounts[0],
  		     value: web3.utils.toWei('0.2', 'ether')
    });
 
const players = await lottery.methods.getPlayers().call({
                from: accounts[0]
      });
 
      assert.equal(players.length, 1);
      assert.equal(players[0], accounts[0]);
    });
  
   
   it('allows multiple account to enter', async ()=> {
  		   	await lottery.methods.enter().send({
   		    from: accounts[0],
   		    value: web3.utils.toWei('0.2', 'ether')
  });
            await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.3', 'ether')
  });
 		    await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.2', 'ether')
  });

 
const players = await lottery.methods.getPlayers().call({
                from: accounts[0]
               });
 
      assert.equal(players.length, 3);
      assert.equal(players[0], accounts[0]);
      assert.equal(players[1], accounts[1]);
      assert.equal(players[2], accounts[2]);
 
    });

  it('requires a minimum value', async()=>{
  	try{
  		await lottery.methods.enter().send({
  			from: accounts[0],
  			value: 0
  		});
  		
  		}
  	catch(err){
  		assert(err);
  	}
  });

  it('Only manager can call pickWinner', async()=>{
  	try{
          await lottery.methods.pickWinner().send({
          	from: accounts[1]
          });
          assert(false);
  	} catch(err){
  		assert(err);
  	}
  	
  });

  it('winner receives the ether and resets the players array', async()=>{
  	await lottery.methods.enter().send({
  		from: accounts[0],
  		value: web3.utils.toWei('2','ether')
  	});
    
    const initialBal = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({
    	from: accounts[0]
    });
    
    const finalBal = await web3.eth.getBalance(accounts[0]);

    const diff = finalBal - initialBal;
    assert(diff > web3.utils.toWei('1.8','ether'));

  });

});