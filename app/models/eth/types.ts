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

type OneDifficultyRecord = {
  time: number;
  difficulty: string;
  tip: string;
};

type Difficulties = {
  history3m: OneDifficultyRecord[];
  history6m: OneDifficultyRecord[];
  history1y: OneDifficultyRecord[];
  totalhistory: OneDifficultyRecord[];
};

type OneGasHistoryRecord = {
  time: number;
  basefee: string;
  tip: string;
};

type GasHistory = { history: OneGasHistoryRecord[] };

export type {
  OneGasFeeRecord,
  Stats,
  OneDifficultyRecord,
  Difficulties,
  OneGasHistoryRecord,
  GasHistory,
};
