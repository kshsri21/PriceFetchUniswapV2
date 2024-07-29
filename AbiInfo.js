const erc20ABI=["function decimals() public view returns (uint8)"]

const pairABI=[
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
]

const routerABI=[
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
]

module.exports = { erc20ABI,pairABI,routerABI };