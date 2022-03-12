import invariant from "tiny-invariant";
import type { Stats } from "./types";

function isValidStats(data: any): data is Stats {
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
    isValidStats(data),
    `https://gasnow.gpumine.org/api/stats has bad meta data!`
  );

  return data;
}

export { getStats };
