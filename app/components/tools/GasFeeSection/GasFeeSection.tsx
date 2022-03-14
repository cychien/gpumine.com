import * as React from "react";
import { useLocation } from "remix";
import gasStationSvg from "~/assets/icons/tools/gas-station.svg";
import AjaxLink from "~/components/AjaxLink";
import type { Stats, GasFeeTimePeriod } from "~/models/eth";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import GasFeeChart from "../GasFeeChart";
import cx from "classnames";

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
          <img
            src={gasStationSvg}
            alt="icon"
            className="min-w-[40px] min-h-[40px] mr-2"
            width={40}
            height={40}
          />
          <div className="text-primary-400 font-bold">Gas Fee(GWei)</div>
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
        isActive ? "bg-primary-400 text-white" : "bg-white text-primary-400",
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
