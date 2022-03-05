import type { LoaderFunction } from "remix";
import { redirect } from "remix";
import { detectLanguageOnServer } from "~/utils/i18n";

export const loader: LoaderFunction = ({ request }) => {
  let lng = detectLanguageOnServer(request);
  if (lng === "zh-TW") lng = "tw";

  return redirect(`/${lng}`);
};
