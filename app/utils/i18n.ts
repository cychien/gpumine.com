import parser from "accept-language-parser";
import i18n from "i18next";
import type { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import fsBackend from "i18next-fs-backend";
import httpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import type { CustomDetector } from "i18next-browser-languagedetector";

type DefaultInitOptions = Omit<InitOptions, "fallbackLng" | "supportedLngs"> & {
  fallbackLng: string;
  supportedLngs: string[];
};

const DEFAULT_OPTIONS: DefaultInitOptions = {
  fallbackLng: "zh-TW",
  supportedLngs: ["zh-TW", "en"],
  // 'React will escape by default'
  interpolation: { escapeValue: false },
  // Suspense is experiment feature, so we wait in another way.
  react: { useSuspense: false },
  // String or array of namespaces to load
  ns: ["common", "tools"],
  // Default namespace used if not passed to translation function
  defaultNS: "common",
};

function getFromSupported(language: string | null) {
  return (
    parser.pick(
      DEFAULT_OPTIONS.supportedLngs,
      language ?? DEFAULT_OPTIONS.fallbackLng,
      {
        loose: true,
      }
    ) ?? DEFAULT_OPTIONS.fallbackLng
  );
}

function detectLanguageOnServer(request: Request) {
  // Priorities: search params(lng) -> path params(/{{lng}}/) -> cookies(next-i18next) -> header(accept-language)
  const url = new URL(request.url);
  if (url.searchParams.has("lng")) {
    return getFromSupported(url.searchParams.get("lng"));
  }

  // Should have path params because frontend will help redirect to correct url
  // If no path params detected, pass to next priority
  const pathParams = url.pathname.split("/");
  // `tw` should be recognized too
  if ([...DEFAULT_OPTIONS.supportedLngs, "tw"].includes(pathParams[1])) {
    return getFromSupported(pathParams[1]);
  }

  const cookies = Object.fromEntries(
    request.headers
      .get("Cookie")
      ?.split(";")
      .map((cookie) => cookie.trim())
      .map((cookie) => cookie.split("=")) ?? []
  ) as { "next-i18next"?: string };
  // To be compatible with old next site
  if (cookies["next-i18next"]) {
    return getFromSupported(cookies["next-i18next"]);
  }

  if (request.headers.has("accept-language")) {
    return getFromSupported(request.headers.get("accept-language"));
  }

  return DEFAULT_OPTIONS.fallbackLng;
}

async function initI18NextOnServer(
  i18nInstance: typeof i18n,
  language?: string
) {
  const validLanguage = language ?? DEFAULT_OPTIONS.fallbackLng;

  const options = {
    ...DEFAULT_OPTIONS,
    lng: validLanguage,
    // Extra config that i18next-fs-backend provides
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
    },
  };

  await i18nInstance.use(fsBackend).use(initReactI18next).init(options);
}

async function initI18NextOnClient(i18nInstance: typeof i18n) {
  const options = {
    ...DEFAULT_OPTIONS,
    // Extra config that i18next-http-backend provides
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      // cache user language on
      caches: ["cookie"],
      order: ["querystring", "customPathDetector", "cookie"],
      lookupCookie: "next-i18next",
      lookupFromPathIndex: 0,
    },
  };

  const customPathDetector: CustomDetector = {
    name: "customPathDetector",
    lookup: (options) => {
      let found;
      if (typeof window !== "undefined") {
        const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
        if (language instanceof Array) {
          if (typeof options.lookupFromPathIndex === "number") {
            if (typeof language[options.lookupFromPathIndex] !== "string") {
              return undefined;
            }
            found = language[options.lookupFromPathIndex].replace("/", "");
          } else {
            found = language[0].replace("/", "");
          }
        }
      }
      return found === "tw" ? "zh-TW" : found;
    },
  };

  const languageDetector = new LanguageDetector();
  languageDetector.addDetector(customPathDetector);

  await i18nInstance
    .use(languageDetector)
    .use(httpBackend)
    .use(initReactI18next)
    .init(options);
}

export { detectLanguageOnServer, initI18NextOnServer, initI18NextOnClient };
