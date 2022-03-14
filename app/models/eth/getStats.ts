import invariant from "tiny-invariant";

type GasFeeTimePeriod = "24h" | "7d" | "1m";

type OneGasFeeRecord = {
  time: number;
  basefee: string;
  tip: string;
};

type Stats = {
  basefee: string;
  totalburn: string;
  burn10m: string;
  burn1h: string;
  burn24h: string;
  gasfee24h: OneGasFeeRecord[];
  gasfee7d: OneGasFeeRecord[];
  gasfee1m: OneGasFeeRecord[];
  eth: {
    usd: number;
    twd: number;
    cny: number;
    hkd: number;
    gbp: number;
  };
};

function isValidData(data: any): data is Stats {
  return (
    data?.basefee &&
    data?.totalburn &&
    data?.burn10m &&
    data?.burn1h &&
    data?.burn24h &&
    Array.isArray(data?.gasfee24h) &&
    Array.isArray(data?.gasfee7d) &&
    Array.isArray(data?.gasfee1m) &&
    data?.eth
  );
}

async function getStats() {
  const data = await fetch(`https://gasnow.gpumine.org/api/stats`).then(
    (response) => response.json()
  );

  invariant(
    isValidData(data),
    `https://gasnow.gpumine.org/api/stats has bad data!`
  );

  return data;
}

export { getStats };
export type { GasFeeTimePeriod, OneGasFeeRecord, Stats };
