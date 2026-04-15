// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

/**
 * @title IPyth
 * @dev Low-level interface for Pyth Network Pull Oracle
 */
interface IPyth {
    struct Price {
        int64 price;
        uint64 conf;
        int32 expo;
        uint256 publishTime;
    }
    function getPriceUnsafe(bytes32 id) external view returns (Price memory price);
}

/**
 * @title HashOracle
 * @author Timothy0987
 * @notice A prediction market dApp built on Hedera Hashgraph.
 */
contract HashOracle is Initializable, UUPSUpgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    
    // Constants
    uint256 public constant MIN_STAKE = 5 * 10**8; // 5 HBAR (in tinybars)
    uint256 public constant MAX_STAKE = 50 * 10**8; // 50 HBAR
    uint256 public constant PAYOUT_MULTIPLIER = 2; // 2x Payout

    // Addresses
    address public treasury;
    address public pythContract;

    // Events
    event PredictionMade(address indexed user, uint256 marketId, uint256 amount, bool prediction, uint256 timestamp, uint256 xpGained);
    event MarketResolved(uint256 indexed marketId, bool result, int64 finalPrice);
    event PayoutClaimed(address indexed user, uint256 marketId, uint256 amount);
    event TreasuryUpdated(address indexed newTreasury);

    struct Market {
        bytes32 priceFeedId;
        uint256 targetPrice;
        uint256 expiration;
        bool resolved;
        bool result; // true for Over, false for Under
    }

    struct UserPrediction {
        uint256 amount;
        bool prediction;
        bool claimed;
    }

    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => UserPrediction)) public predictions;
    uint256 public marketCount;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _treasury, address _pyth) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        
        treasury = _treasury;
        pythContract = _pyth;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @notice Place a prediction on a market
     * @param _marketId The ID of the market
     * @param _prediction True for 'Over', False for 'Under'
     */
    function predict(uint256 _marketId, bool _prediction) external payable nonReentrant {
        require(msg.value >= MIN_STAKE && msg.value <= MAX_STAKE, "Invalid stake amount");
        require(!markets[_marketId].resolved, "Market already resolved");
        require(block.timestamp < markets[_marketId].expiration, "Market expired");
        require(predictions[_marketId][msg.sender].amount == 0, "Already predicted");

        predictions[_marketId][msg.sender] = UserPrediction({
            amount: msg.value,
            prediction: _prediction,
            claimed: false
        });

        // XP is calculated as 1 XP per HBAR staked
        uint256 xp = msg.value / (10**8);
        emit PredictionMade(msg.sender, _marketId, msg.value, _prediction, block.timestamp, xp);
    }

    /**
     * @notice Claim winnings for a resolved market
     * @param _marketId The ID of the market
     */
    function claim(uint256 _marketId) external nonReentrant {
        Market storage market = markets[_marketId];
        UserPrediction storage userPred = predictions[_marketId][msg.sender];

        require(market.resolved, "Market not yet resolved");
        require(userPred.amount > 0, "No prediction found");
        require(!userPred.claimed, "Already claimed");
        require(userPred.prediction == market.result, "Prediction incorrect");

        uint256 payout = userPred.amount * PAYOUT_MULTIPLIER;
        userPred.claimed = true;

        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Payout failed");

        emit PayoutClaimed(msg.sender, _marketId, payout);
    }

    /**
     * @notice Create a new prediction market
     */
    function createMarket(bytes32 _priceFeedId, uint256 _targetPrice, uint256 _duration) external onlyOwner {
        marketCount++;
        markets[marketCount] = Market({
            priceFeedId: _priceFeedId,
            targetPrice: _targetPrice,
            expiration: block.timestamp + _duration,
            resolved: false,
            result: false
        });
    }

    /**
     * @notice Resolve a market using Pyth Oracle
     */
    function resolveMarket(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(!market.resolved, "Already resolved");
        require(block.timestamp >= market.expiration, "Not yet expired");

        IPyth.Price memory pythPrice = IPyth(pythContract).getPriceUnsafe(market.priceFeedId);
        
        // Convert target price mapping (assuming 8 decimals for HBAR/USD target)
        // Pyth expo is usually negative, e.g., -8
        market.result = uint256(int256(pythPrice.price)) > market.targetPrice;
        market.resolved = true;

        emit MarketResolved(_marketId, market.result, pythPrice.price);
    }

    /**
     * @notice Set the treasury address
     */
    function setTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid address");
        treasury = _newTreasury;
        emit TreasuryUpdated(_newTreasury);
    }

    /**
     * @notice Withdraw protocol fees/surplus to treasury
     */
    function withdrawToTreasury() external {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        (bool success, ) = payable(treasury).call{value: balance}("");
        require(success, "Transfer to treasury failed");
    }

    receive() external payable {}
}
