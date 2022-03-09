import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { detectCurrencyOnServer } from "~/utils/currency";

export const loader: LoaderFunction = async ({ request }) => {
  const currency = detectCurrencyOnServer(request);

  return { currency };
};

function Tools() {
  const data = useLoaderData<{ currency: string }>();

  return <div>{data.currency}</div>;
}

export default Tools;
