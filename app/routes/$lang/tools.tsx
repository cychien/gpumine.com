import { useTranslation } from "react-i18next";
import { LoaderFunction, useOutletContext, useSearchParams } from "remix";
import { useLoaderData } from "remix";
import Card from "~/components/Card";
import fireSvg from "~/assets/icons/tools/fire.svg";
import gasStationSvg from "~/assets/icons/tools/gas-station.svg";
import ShiftBy from "~/components/ShiftBy";
import { getDifficulties, getStats, getGasHistory } from "~/models/eth";
import { toEth, toGWei } from "~/utils/calcutate";
import GasFeeSection from "~/components/tools/GasFeeSection";
import DifficultySection from "~/components/tools/DifficultySection";
import GasHistorySection from "~/components/tools/GasHistorySection";

async function getLoaderData() {
  const stats = await getStats();
  const difficulties = await getDifficulties();
  const gasHistory = await getGasHistory();

  return { stats, difficulties, gasHistory };
}

export const loader: LoaderFunction = async () => {
  try {
    return await getLoaderData();
  } catch (err) {
    return { error: "Something error" };
  }
};

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

function Tools() {
  const { t } = useTranslation("tools");
  const { stats, difficulties, gasHistory } = useLoaderData<LoaderData>();
  const { currency } = useOutletContext<{ currency: string }>();
  const [searchParams] = useSearchParams();

  const currencyKey = currency.toLowerCase() as
    | "usd"
    | "twd"
    | "cny"
    | "hkd"
    | "gbp";

  return (
    <main className="max-w-[1280px] mx-auto px-[20px] lg:px-[48px]">
      <h1 className="flex mt-8 lg:mt-4">
        <span className="mr-3 w-[6px] bg-default" />
        <span className="text-default text-lg font-bold">{t("heading")}</span>
      </h1>

      <div className="min-h-[30px] h-[30px]" />

      <div className="space-y-5">
        <Card className="min-h-[100px] flex items-center justify-center !px-[14px] !py-[20px]">
          <div className="flex items-center">
            <ShiftBy y={2} className="self-start">
              <img
                src={fireSvg}
                alt="fire icon"
                className="min-w-[40px] min-h-[40px]"
                width={40}
                height={40}
              />
            </ShiftBy>
            <div className="text-default font-bold">
              <div
                dangerouslySetInnerHTML={{
                  __html: t("total-burned", {
                    ethBurnedHtml: `<span class='text-primary-400'><span class='font-number'>${toEth(
                      stats.totalburn
                    )}</span> ETH</span>`,
                    fiatHtml: `<span class='ml-1 text-xs text-gray-500 font-medium whitespace-nowrap'>${stats.eth[currencyKey]} ${currency}</span>`,
                  }),
                }}
              />
            </div>
          </div>
        </Card>

        <Card className="min-h-[160px] flex items-center !px-[14px] !py-[20px]">
          <div className="grid grid-cols-2 w-full gap-y-[20px] lg:grid-cols-4 lg:gay-y-0 lg:justify-between lg:px-[90px]">
            <div>
              <StatsColLabel icon={gasStationSvg} name={t("base-fee")} />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toGWei(stats.basefee)} />
            </div>
            <div>
              <StatsColLabel
                icon={fireSvg}
                name={t("burn-rate")}
                subText="(10mins)"
              />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toEth(stats.burn10m)} />
            </div>
            <div>
              <StatsColLabel
                icon={fireSvg}
                name={t("burn-rate")}
                subText="(1h)"
              />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toEth(stats.burn1h)} />
            </div>
            <div>
              <StatsColLabel
                icon={fireSvg}
                name={t("burn-rate")}
                subText="(24h)"
              />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toEth(stats.burn24h)} />
            </div>
          </div>
        </Card>

        <Card className="!px-[10px] !py-[10px] lg:!px-[24px] lg:!py-[28px]">
          <GasFeeSection
            stats={stats}
            defaultTimePeriod={
              (searchParams.get("stats_time_period") as "24h" | "7d" | "1m") ||
              "24h"
            }
          />
        </Card>

        <Card className="!px-[10px] !py-[10px] lg:!px-[24px] lg:!py-[28px]">
          <GasHistorySection
            gasHistory={gasHistory}
            defaultType={
              (searchParams.get("gas_history_type") as "base-fee" | "tip") ||
              "base-fee"
            }
          />
        </Card>

        <Card className="!px-[10px] !py-[10px] lg:!px-[24px] lg:!py-[28px]">
          <DifficultySection
            difficulties={difficulties}
            defaultTimePeriod={
              (searchParams.get("difficulty_time_period") as
                | "3m"
                | "6m"
                | "1y"
                | "all") || "3m"
            }
          />
        </Card>
      </div>
    </main>
  );
}

function StatsColLabel({
  icon,
  name,
  subText,
}: {
  icon: string;
  name: string;
  subText?: string;
}) {
  return (
    <div className="flex items-center">
      <img src={icon} alt="icon" width={40} height={40} />
      <div className="ml-1 flex flex-wrap items-baseline">
        <div className="text-primary-400 font-bold text-md">{name}</div>
        {subText && (
          <div className="ml-[2px] text-primary-400 font-bold text-xs">
            {subText}
          </div>
        )}
      </div>
    </div>
  );
}

function StatsColData({
  data,
  inFiat,
  currency,
}: {
  data: string;
  inFiat?: string;
  currency?: string;
}) {
  return (
    <div className="pl-[44px]">
      <div className="mb-1 font-number text-xl text-[#222222]">{data}</div>
      {inFiat && currency && (
        <div className="text-gray-500 text-xs font-medium">
          <span className="font-number">{inFiat}</span>
          <span>{currency}</span>
        </div>
      )}
    </div>
  );
}

export default Tools;
