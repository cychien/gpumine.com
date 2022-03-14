import invariant from "tiny-invariant";

type GasHistoryType = "base-fee" | "tip";

type OneGasHistoryRecord = {
  time: number;
  basefee: string;
  tip: string;
};

type GasHistory = { history: OneGasHistoryRecord[] };

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
export type { GasHistoryType, OneGasHistoryRecord, GasHistory };
