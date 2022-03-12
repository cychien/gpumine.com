import BigNumber from "bignumber.js";

function toGWei(raw: string | number | BigNumber) {
  return new BigNumber(raw).dividedBy(new BigNumber("1e+9")).toString();
}

function toEth(raw: string | number | BigNumber) {
  return new BigNumber(raw).dividedBy(new BigNumber("1e+18")).toString();
}

export { toGWei, toEth };
