import type { LoaderFunction } from "remix";
import { redirect } from "remix";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const addressType = url.searchParams.get("address_type") || "";
  const address = url.searchParams.get("address") || "";

  return redirect(`${url.pathname}/${addressType}/${address}`);
};
