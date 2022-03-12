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

export type { OneGasFeeRecord, Stats };
