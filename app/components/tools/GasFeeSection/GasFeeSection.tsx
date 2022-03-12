import * as React from "react";
import { useLocation } from "remix";
import gasStationSvg from "~/assets/icons/tools/gas-station.svg";
import AjaxLink from "~/components/AjaxLink";
import type { Stats } from "~/models/eth";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import GasFeeChart from "../GasFeeChart";
import cx from "classnames";

type TimePeriod = "24h" | "7d" | "1m";

type Props = {
  stats: Stats;
  defaultTimePeriod: TimePeriod;
};

function GasFeeSection({ stats, defaultTimePeriod }: Props) {
  const { pathname, search } = useLocation();
  const [timePeriod, setTimePeriod] =
    React.useState<TimePeriod>(defaultTimePeriod);

  const displayDataMap = {
    "24h": stats.gasfee24h,
    "7d": stats.gasfee7d,
    "1m": stats.gasfee1m,
  };

  return (
    <>
      <div className="block lg:flex lg:flex-row lg:items-center lg:justify-between mb-[28px]">
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
        <div className="flex">
          <AjaxLink
            className={cx(
              "rounded-l-[5px] px-4 py-[9px] border-y border-l border-[#d6d6d6] text-xs font-medium",
              timePeriod === "24h"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              stats_time_period: "24h",
            })}
            onClick={() => {
              setTimePeriod("24h");
            }}
          >
            24H
          </AjaxLink>
          <AjaxLink
            className={cx(
              "px-4 py-[9px] border border-[#d6d6d6] text-xs font-medium",
              timePeriod === "7d"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              stats_time_period: "7d",
            })}
            onClick={() => {
              setTimePeriod("7d");
            }}
          >
            7D
          </AjaxLink>
          <AjaxLink
            className={cx(
              "rounded-r-[5px] px-4 py-[9px] border-y border-r border-[#d6d6d6] text-xs font-medium",
              timePeriod === "1m"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              stats_time_period: "1m",
            })}
            onClick={() => {
              setTimePeriod("1m");
            }}
          >
            1M
          </AjaxLink>
        </div>
      </div>

      <div className="lg:px-[32px]">
        <GasFeeChart data={displayDataMap[timePeriod]} />
      </div>
    </>
  );
}

export default GasFeeSection;
