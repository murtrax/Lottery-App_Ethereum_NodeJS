const HDWalletProivder = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const contract = require('./compile');

const provider = new HDWalletProivder(
  'warfare nose bitter tissue travel sword theme web story oil bacon copy',
  'https://rinkeby.infura.io/v3/8cb9bdea85e44f3ab0b9ddbffc950d45'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from Account', accounts[0]);

  const result = await new web3.eth.Contract(contract.abi)
    .deploy({
      data: contract.evm.bytecode.object,
      arguments: ['Hi there'],
    })
    .send({ gas: '10000000', from: accounts[0] });
  console.log('Contract Address', result.options.address);

  //   const result = await web3.eth.getTransactionCount(accounts[0]);
  //   console.log(result);
};

deploy();
