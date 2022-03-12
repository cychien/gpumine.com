const SUPPORTED_CURRENCIES = ["USD", "TWD", "CNY", "HKD", "GBP"] as const;
const FALLBACK_CURRENCY = "USD";

function getFromSupported(str: string | null) {
  if (
    str &&
    SUPPORTED_CURRENCIES.find((currency) => currency === str.toUpperCase())
  )
    return str.toUpperCase() as typeof SUPPORTED_CURRENCIES[number];
  return FALLBACK_CURRENCY;
}

function detectCurrencyOnServer(request: Request) {
  // Priorities: search params(currency) -> cookies(gm-fiat)
  const url = new URL(request.url);
  if (url.searchParams.has("currency")) {
    return getFromSupported(url.searchParams.get("currency"));
  }

  const cookies = Object.fromEntries(
    request.headers
      .get("Cookie")
      ?.split(";")
      .map((cookie) => cookie.trim())
      .map((cookie) => cookie.split("=")) ?? []
  ) as { "gm-fiat"?: string };
  // To be compatible with old next site
  if (cookies["gm-fiat"]) {
    return getFromSupported(cookies["gm-fiat"]);
  }

  return FALLBACK_CURRENCY;
}

export { detectCurrencyOnServer };
