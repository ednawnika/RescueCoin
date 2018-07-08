const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const web3 = new Web3(ganache.provider());

const compiledRescue = require('../ethereum/build/RescueCoin.json');

let accounts;
let rescue;
let rescueAddress;
let rescuer;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    rescue = await new web3.eth.Contract(JSON.parse(compiledRescue.interface))
        .deploy({ data: compiledRescue.bytecode
                }).send({
                    from: accounts[0],
                    gas: '1000000'
                });

            await rescue.methods.rescue('100').send({
                from: accounts[0],
                gas: '1000000'

            });

            [rescueAddress] = await rescue.methods.getdonors().call()
                rescuer = await new web3.eth.Contract(
                    JSON.parse(compiledRescue.interface),
                    rescueAddress
                );

        });
        

        describe('Rescue', () => {
            it('deploys a rescue contract', () => {
                assert.ok(rescue.options.address);

            });

            it('donor able to donate to platform', async () => {
                await rescue.methods.donorcontribute().send({
                    value: '200',
                    from: accounts[0]
            });
            const isContributor = await rescuer.methods.getdonors(accounts[0]).call()
            assert(isContributor);
        });
    });