export const HASH_ORACLE_ABI = [
  "function initialize(address _treasury, address _pyth) public",
  "function predict(uint256 _marketId, bool _prediction) external payable",
  "function claim(uint256 _marketId) external",
  "function createMarket(bytes32 _priceFeedId, uint256 _targetPrice, uint256 _duration) external",
  "function resolveMarket(uint256 _marketId) external",
  "function marketCount() view returns (uint256)",
  "function markets(uint256) view returns (bytes32 priceFeedId, uint256 targetPrice, uint256 expiration, bool resolved, bool result)",
  "function predictions(uint256, address) view returns (uint256 amount, bool prediction, bool claimed)",
  "event PredictionMade(address indexed user, uint256 marketId, uint256 amount, bool prediction, uint256 timestamp, uint256 xpGained)",
  "event MarketResolved(uint256 indexed marketId, bool result, int64 finalPrice)",
  "event PayoutClaimed(address indexed user, uint256 marketId, uint256 amount)"
];

export const CONTRACT_CONFIG = {
  TREASURY_EVM_ADDRESS: "0x7cbff11440099db224d2b54d12e1116eb565c8fe",
  PYTH_NETWORK_TESTNET: "0x2880aB155794e7179c9eE2e38200202908C17B43",
  HASH_ORACLE_PROXY_TESTNET: "0x0000000000000000000000000000000000000000" // Placeholder until deployment
};
