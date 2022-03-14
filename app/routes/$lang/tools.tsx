import * as React from "react";
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
import type {
  GasFeeTimePeriod,
  DifficultyTimePeriod,
  GasHistoryType,
} from "~/models/eth";

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
    console.log(err);
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
        <Card className="flex items-center justify-center min-h-[100px]">
          <div className="flex items-center">
            <ShiftBy y={2} className="self-start min-w-[40px] min-h-[40px]">
              <img src={fireSvg} alt="fire icon" width={40} height={40} />
            </ShiftBy>
            <div className="text-default font-bold">
              <div
                dangerouslySetInnerHTML={{
                  __html: t("total-burned", {
                    ethBurnedHtml: `<span class='text-primary-400'>${toEth(
                      stats.totalburn
                    )} ETH</span>`,
                    fiatHtml: `<span class='ml-1 text-xs text-gray-500 font-medium whitespace-nowrap'>${stats.eth[currencyKey]} ${currency}</span>`,
                  }),
                }}
              />
            </div>
          </div>
        </Card>

        <Card className="flex items-center min-h-[160px]">
          <div className="grid grid-cols-2 gap-y-[20px] w-full lg:grid-cols-4 lg:gay-y-0 lg:justify-between lg:px-[90px]">
            <div>
              <StatsColLabel icon={gasStationSvg} name={t("base-fee")} />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toGWei(stats.basefee, 1)} />
            </div>
            <div>
              <StatsColLabel
                icon={fireSvg}
                name={t("burn-rate")}
                subText="(10mins)"
              />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toEth(stats.burn10m, 2)} />
            </div>
            <div>
              <StatsColLabel
                icon={fireSvg}
                name={t("burn-rate")}
                subText="(1h)"
              />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toEth(stats.burn1h, 2)} />
            </div>
            <div>
              <StatsColLabel
                icon={fireSvg}
                name={t("burn-rate")}
                subText="(24h)"
              />
              <div className="min-h-[16px] h-[16px]" />
              <StatsColData data={toEth(stats.burn24h, 2)} />
            </div>
          </div>
        </Card>

        <ChartCard>
          <GasFeeSection
            data={{
              gasfee24h: stats.gasfee24h,
              gasfee7d: stats.gasfee7d,
              gasfee1m: stats.gasfee1m,
            }}
            defaultTimePeriod={
              (searchParams.get("gas_fee_time_period") as GasFeeTimePeriod) ||
              "24h"
            }
          />
        </ChartCard>

        <ChartCard>
          <GasHistorySection
            data={gasHistory}
            defaultType={
              (searchParams.get("gas_history_type") as GasHistoryType) ||
              "base-fee"
            }
          />
        </ChartCard>

        <ChartCard>
          <DifficultySection
            data={difficulties}
            defaultTimePeriod={
              (searchParams.get(
                "difficulty_time_period"
              ) as DifficultyTimePeriod) || "3m"
            }
          />
        </ChartCard>
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
      <div className="mb-1 text-xl text-[#222222] font-medium">{data}</div>
      {inFiat && currency && (
        <div className="text-gray-500 text-xs font-medium">
          <span>{inFiat}</span>
          <span>{currency}</span>
        </div>
      )}
    </div>
  );
}

function ChartCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <Card className={className} children={children} />;
}

export default Tools;
