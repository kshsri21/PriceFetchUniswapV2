require('dotenv').config();
const ethers = require('ethers');
const { erc20ABI, routerABI } = require('./AbiInfo');
const { routerAddress, fromAddress, toAddress } = require('./AddressList');

const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

const createContractInstance = (address, abi, provider) => {
  return new ethers.Contract(address, abi, provider);
};

const routerInstance = createContractInstance(routerAddress, routerABI, provider);

const priceFetch = async (humanFormat) => {
  try {
    const token1 = createContractInstance(fromAddress, erc20ABI, provider);
    const token2 = createContractInstance(toAddress, erc20ABI, provider);

    const [decimal1, decimal2] = await Promise.all([
      token1.decimals(),
      token2.decimals(),
    ]);

    const amountIn = ethers.parseUnits(humanFormat, decimal1).toString();

    const amountsOut = await routerInstance.getAmountsOut(amountIn, [
      fromAddress,
      toAddress,
    ]);

    const humanOutput = ethers.formatUnits(amountsOut[1].toString(), decimal2);

    console.log(`This is the number of DAI: ${humanOutput}`);
  } catch (error) {
    console.error('Error fetching price:', error);
  }
};

// Example usage
const humanFormat = '1';
priceFetch(humanFormat);
