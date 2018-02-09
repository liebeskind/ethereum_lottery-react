import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); //We want to use newer version of web3, but grab the provider provided by the version of web3 running in browser.
//Gives us access to Rinkeby public & private keys.

export default web3;
