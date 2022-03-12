import BigNumber from "bignumber.js";

function toGWei(raw: string | number | BigNumber) {
  return new BigNumber(raw)
    .dividedBy(new BigNumber("1e+9"))
    .toFixed(2)
    .toString();
}

function toEth(raw: string | number | BigNumber) {
  return new BigNumber(raw)
    .dividedBy(new BigNumber("1e+18"))
    .toFixed(2)
    .toString();
}

function toT(raw: string | number | BigNumber) {
  return new BigNumber(raw)
    .dividedBy(new BigNumber("1e+12"))
    .toFixed(2)
    .toString();
}

export { toGWei, toEth, toT };
