import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/app.css";
import Navbar from "./components/Navbar";

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

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style>{".showWhenNoJS {display: none}"}</style>
      </head>
      <body>
        <div className="root">
          <Navbar />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/* If user disable JS, hide all components that need JS and replace them with pure html version */}
        <noscript>
          <style type="text/css">
            {".hideWhenNoJS {display:none} .showWhenNoJS {display: block}"}
          </style>
        </noscript>
      </body>
    </html>
  );
}
