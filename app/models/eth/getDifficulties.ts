import invariant from "tiny-invariant";
import type { Difficulties } from "./types";

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
