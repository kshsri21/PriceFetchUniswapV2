# Token Price Fetcher

This project fetches the price of a token pair using the Uniswap V2 router contract on the Ethereum mainnet. It uses `ethers.js` for interacting with the Ethereum blockchain.

## Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- Alchemy API Key

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/PriceFetchUniswapV2.git
    cd token-price-fetcher
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Alchemy API key:
    ```
    ALCHEMY_KEY=your_alchemy_api_key
    ```

4. Update the `AbiInfo.js` and `AddressList.js` files with the appropriate ABI and address information for the tokens and router you want to use.

## Project Structure

- `index.js`: Main file containing the code to fetch token prices.
- `AbiInfo.js`: Contains the ABI information for the ERC20 tokens and the Uniswap router.
- `AddressList.js`: Contains the addresses of the tokens and the Uniswap router.

## Usage

To fetch the price of a token pair, run:

```bash
node index.js
```

The code will fetch the price of the token pair specified in the `AddressList.js` file and log the output to the console.

## Code Explanation

The main logic is in `index.js`:

- Load environment variables from a `.env` file.
- Import required modules and ABI/address information.
- Create a provider using Alchemy.
- Create instances of the ERC20 token contracts and the Uniswap router contract.
- Fetch the decimals for the tokens.
- Convert the human-readable input amount to the smallest unit.
- Use the Uniswap router to fetch the output amount for the token swap.
- Convert the output amount to a human-readable format and log it to the console.

### Example

Here's an example of how the `AddressList.js` file should look:

```javascript
module.exports = {
  routerAddress: '0xUniswapV2RouterAddress',
  fromAddress: '0xFromTokenAddress',
  toAddress: '0xToTokenAddress'
};
```

And the `AbiInfo.js` file:

```javascript
module.exports = {
  erc20ABI: [
    // ERC20 ABI JSON array
  ],
  routerABI: [
    // Uniswap V2 Router ABI JSON array
  ]
};
```

### Running the Code

To fetch the price of 1 unit of the `fromAddress` token in terms of the `toAddress` token, run:

```bash
node index.js
```

## Error Handling

The code includes error handling to catch and log any issues that arise during execution.

## Useful Links
UniswapV2 Factory Contract
UniswapV2 Router 2
WETH
Dai Stablecoin

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue if you find a bug or have a feature request.

## Contact

For any questions or suggestions, please contact [(https://www.instagram.com/codeeater21/)].
