import web3 from './web3';

import Rescue from './build/RescueCoin.json';

const instance = new web3.eth.Contract(JSON.parse(Rescue.interface),
    '0x05B3C818D156DCcD2FfF97Ce7bCE5FE4Cb8E20BE');

export default instance;