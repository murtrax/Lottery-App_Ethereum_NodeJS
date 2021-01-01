const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const contract = require('./compile');

let accounts;
let inbox;
const initialMessage = 'Hi there';

beforeEach(async () => {
  //Get list of accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(contract.abi)
    .deploy({
      data: contract.evm.bytecode.object,
      arguments: [initialMessage],
    })
    .send({ from: accounts[0], gas: '1000000' });
  //Use one of the accounts to deploy contracts
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    //value exists
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });

  it('can change the message', async () => {
    //returns txs hash
    const updatedMessage = await inbox.methods.setMessage('Bye there').send({
      from: accounts[0],
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye there');
  });
});
