import type { LoaderFunction } from "remix";
import { redirect } from "remix";
import { detectLanguageOnServer } from "~/utils/i18n";

// This is catch-all path, and we use it to append locale at first

export const loader: LoaderFunction = ({ request, params }) => {
  const path = params["*"] as string;
  const pathParts = path.split("/");

  if (["zh-TW", "en", "tw"].includes(pathParts[0])) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  let lng = detectLanguageOnServer(request);
  if (lng === "zh-TW") lng = "tw";

  return redirect(`/${lng}/${path}`);
};
