import * as React from "react";
import { useLocation } from "remix";
import AjaxLink from "~/components/AjaxLink";
import type { Stats, GasFeeTimePeriod } from "~/models/eth";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import GasFeeChart from "../GasFeeChart";
import cx from "classnames";
import gasStationSvg from "~/assets/icons/tools/gas-station.svg";
import gasStationDarkSvg from "~/assets/icons/tools/gas-station-dark.svg";

const TABS: { name: string; value: GasFeeTimePeriod }[] = [
  { name: "24H", value: "24h" },
  { name: "7D", value: "7d" },
  { name: "1M", value: "1m" },
];

type Props = {
  data: Pick<Stats, "gasfee24h" | "gasfee7d" | "gasfee1m">;
  defaultTimePeriod: GasFeeTimePeriod;
};

function GasFeeSection({ data, defaultTimePeriod }: Props) {
  const { pathname, search } = useLocation();
  const [timePeriod, setTimePeriod] =
    React.useState<GasFeeTimePeriod>(defaultTimePeriod);

  const displayDataMap = {
    "24h": data.gasfee24h,
    "7d": data.gasfee7d,
    "1m": data.gasfee1m,
  };

  return (
    <>
      <div className="block lg:flex lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center mb-[9px] lg:mb-0">
          <span className="mr-2 min-w-[40px] min-h-[40px] w-[40px] h-[40px]">
            <img src={gasStationSvg} alt="" className="block dark:hidden" />
            <img src={gasStationDarkSvg} alt="" className="hidden dark:block" />
          </span>
          <div className="text-primary-400 dark:text-[#5783f7] font-bold">
            Gas Fee(GWei)
          </div>
        </div>
        <div className="inline-flex rounded-[5px] border border-[#d6d6d6] overflow-hidden">
          {TABS.map((tab, index) => (
            <Tab
              key={tab.value}
              isActive={timePeriod === tab.value}
              url={appendSearchObj(pathname, {
                ...getSearchObj(search),
                gas_fee_time_period: tab.value,
              })}
              onClick={() => {
                setTimePeriod(tab.value);
              }}
              className={
                index < TABS.length - 1 ? "border-r border-[#d6d6d6]" : ""
              }
            >
              {tab.name}
            </Tab>
          ))}
        </div>
      </div>

      <div className="min-h-[28px] h-[28px]" />

      <div className="ml-[-16px] lg:ml-0 lg:px-[32px]">
        <GasFeeChart data={displayDataMap[timePeriod]} />
      </div>
    </>
  );
}

function Tab({
  isActive,
  url,
  onClick,
  children,
  className,
}: {
  isActive: boolean;
  url: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AjaxLink
      className={cx(
        "px-4 py-[9px] text-xs font-medium",
        isActive
          ? "bg-primary-400 dark:bg-primary-200 text-white"
          : "text-primary-400 dark:text-primary-200",
        className
      )}
      url={url}
      onClick={onClick}
    >
      {children}
    </AjaxLink>
  );
}

export default GasFeeSection;
