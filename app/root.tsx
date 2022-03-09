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
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap",
    },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const currency = detectCurrencyOnServer(request);

  return { currency };
};

type LoaderData = {
  currency: string;
};

export default function App() {
  const { currency } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="root">
          <div className="sticky top-0">
            <Navbar />
          </div>
          <Outlet />
          <div className="mt-[50px] lg:mt-[100px]">
            <Footer currency={currency} />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
