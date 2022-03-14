import * as React from "react";
import type { LoaderFunction } from "remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { detectCurrencyOnServer } from "./utils/currency";
import PRELOADED_ASSETS from "./constants/preloaded-assets";
import { ThemeProvider } from "./utils/theme";

export const meta: MetaFunction = () => {
  return { title: "GPUMINE POOL" };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      crossOrigin: "anonymous",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Noto+Sans+TC:wght@400;500;700&display=swap",
    },
    ...PRELOADED_ASSETS.map((asset) => ({
      rel: "preload",
      href: asset.href,
      as: asset.as,
    })),
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const currency = detectCurrencyOnServer(request);

  return { currency };
};

type LoaderData = {
  currency: string;
};

const initThemeScript = `
  (function () {
    function getUserPreference() {
      if(window.localStorage.getItem('color-mode')) {
        return window.localStorage.getItem('color-mode')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    const theme = getUserPreference()
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  })()
`;

export default function App() {
  const { currency } = useLoaderData<LoaderData>();
  const [localCurrency, setLocalCurrency] = React.useState(currency);

  return (
    // Possible different from ssr due to dark mode
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: initThemeScript }} />
      </head>
      <body className="bg-primary transition-colors">
        <div className="root">
          <ThemeProvider>
            <div className="sticky top-0 z-10">
              <Navbar />
            </div>
            <Outlet context={{ currency: localCurrency }} />
            <div className="mt-[50px] lg:mt-[100px]">
              <Footer currency={localCurrency} setCurrency={setLocalCurrency} />
            </div>
          </ThemeProvider>
        </div>
        {/* <ScrollRestoration /> */}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
