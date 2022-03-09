type CoinType = {
  name: string;
  value: string;
  iconId: string;
};

const SUPPORTED_COINS: CoinType[] = [
  { name: "ETH", value: "eth", iconId: "eth" },
];

export default SUPPORTED_COINS;
