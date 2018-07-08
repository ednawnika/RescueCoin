const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledRescue = require('./build/RescueCoin.json');

const provider = new HDWalletProvider(
    'ripple live skin island earn couch pupil physical earn credit boat hover',
    'https://rinkeby.infura.io/pCJssTsPrA07DkHy7rbR');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledRescue.interface)
    ).deploy({
        data: '0x' + compiledRescue.bytecode
    }).send({
        gas: '1000000',
        from: accounts[0]
    });


    console.log('Contract deployed to', result.options.address);
};

deploy();