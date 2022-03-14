import invariant from "tiny-invariant";

type DifficultyTimePeriod = "3m" | "6m" | "1y" | "all";

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

function isValidData(data: any): data is Difficulties {
  return (
    Array.isArray(data?.history3m) &&
    Array.isArray(data?.history6m) &&
    Array.isArray(data?.history1y) &&
    Array.isArray(data?.totalhistory)
  );
}

async function getDifficulties() {
  const data = await fetch(`https://gasnow.gpumine.org/api/diff`).then(
    (response) => response.json()
  );

  invariant(
    isValidData(data),
    `https://gasnow.gpumine.org/api/diff has bad data!`
  );

  return data;
}

export { getDifficulties };
export type { DifficultyTimePeriod, OneDifficultyRecord, Difficulties };
