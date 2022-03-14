import BigNumber from "bignumber.js";

function toGWei(raw: string | number | BigNumber, toFixed?: number) {
  return new BigNumber(raw)
    .dividedBy(new BigNumber("1e+9"))
    .toFixed(toFixed || 0)
    .toString();
}

function toEth(raw: string | number | BigNumber, toFixed?: number) {
  return new BigNumber(raw)
    .dividedBy(new BigNumber("1e+18"))
    .toFixed(toFixed || 0)
    .toString();
}

function toT(raw: string | number | BigNumber, toFixed?: number) {
  return new BigNumber(raw)
    .dividedBy(new BigNumber("1e+12"))
    .toFixed(toFixed || 0)
    .toString();
}

export { toGWei, toEth, toT };
