require('dotenv').config();
const ethers = require('ethers');
const { erc20ABI, routerABI,factoryABI } = require('./AbiInfo');
const { routerAddress, fromAddress, toAddress,factoryAddress } = require('./AddressList');

const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

const createContractInstance = (address, abi, provider) => {
  return new ethers.Contract(address, abi, provider);
};




const getPairAddress = async () => {
  try {
    const factoryInstance = createContractInstance(factoryAddress, factoryABI, provider);
    const pairAddress = await factoryInstance.getPair(toAddress,fromAddress);

    if (pairAddress === '0x0000000000000000000000000000000000000000') {
        return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error fetching pair address:", error);
  }
};


const priceFetch = async (humanFormat) => {
  try {
    if(await getPairAddress()){
      const token1 = createContractInstance(fromAddress, erc20ABI, provider);
      const token2 = createContractInstance(toAddress, erc20ABI, provider);
  
      const [decimal1, decimal2] = await Promise.all([
        token1.decimals(),
        token2.decimals(),
      ]);
  
      const amountIn = ethers.parseUnits(humanFormat, decimal1); // Ensure proper parsing
      const routerInstance = createContractInstance(routerAddress, routerABI, provider);
      const amountsOut = await routerInstance.getAmountsOut(amountIn, [
        fromAddress,
        toAddress,
      ]);
  
      const humanOutput = ethers.formatUnits(amountsOut[1], decimal2); // Ensure proper formatting
  
      console.log(`This is the number of DAI: ${humanOutput}`);
    } else{
      console.log("Pair does not exist")
    }

  } catch (error) {
    console.error('Error fetching price:', error);
  }
};


// Example usage
const humanFormat = '1';
priceFetch(humanFormat);
