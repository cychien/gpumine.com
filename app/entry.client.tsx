import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import i18n from "i18next";
import { initI18NextOnClient } from "./utils/i18n";
import { I18nextProvider } from "react-i18next";

initI18NextOnClient(i18n)
  .then(() => {
    // Hydrate after init to ensure translations prepared
    hydrate(
      <I18nextProvider i18n={i18n}>
        <RemixBrowser />
      </I18nextProvider>,
      document
    );
  })
  .catch((error) => console.error(error));
