import invariant from "tiny-invariant";
import type { GasHistory } from "./types";

function isValidData(data: any): data is GasHistory {
  return Array.isArray(data?.history);
}

async function getGasHistory() {
  const data = await fetch(`https://gasnow.gpumine.org/api/gashistory`).then(
    (response) => response.json()
  );

  invariant(
    isValidData(data),
    `https://gasnow.gpumine.org/api/gashistory has bad data!`
  );

  return data;
}

export { getGasHistory };
