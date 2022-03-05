import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { detectLanguageOnServer, initI18NextOnServer } from "./utils/i18n";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // Create an instance so every request will have a copy and don't re-use the i18n object
  const i18nInstance = i18n.createInstance();

  await initI18NextOnServer(i18nInstance, detectLanguageOnServer(request));

  const markup = renderToString(
    <I18nextProvider i18n={i18nInstance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
