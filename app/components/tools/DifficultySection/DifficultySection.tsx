import * as React from "react";
import { useLocation } from "remix";
import type { Difficulties } from "~/models/eth";
import dashboardSvg from "~/assets/icons/tools/dashboard.svg";
import { useTranslation } from "react-i18next";
import AjaxLink from "~/components/AjaxLink";
import cx from "classnames";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import DifficultyChart from "../DifficultyChart";

type TimePeriod = "3m" | "6m" | "1y" | "all";

type Props = {
  difficulties: Difficulties;
  defaultTimePeriod: TimePeriod;
};

function DifficultySection({ difficulties, defaultTimePeriod }: Props) {
  const { t } = useTranslation("tools");
  const { pathname, search } = useLocation();
  const [timePeriod, setTimePeriod] =
    React.useState<TimePeriod>(defaultTimePeriod);

  const displayDataMap = {
    "3m": difficulties.history3m,
    "6m": difficulties.history6m,
    "1y": difficulties.history1y,
    all: difficulties.totalhistory,
  };

  return (
    <>
      <div className="block lg:flex lg:flex-row lg:items-center lg:justify-between mb-[28px]">
        <div className="flex items-center mb-[9px] lg:mb-0">
          <img
            src={dashboardSvg}
            alt="icon"
            className="min-w-[40px] min-h-[40px] mr-2"
            width={40}
            height={40}
          />
          <div className="text-primary-400 font-bold">
            {t("tx-fees-and-difficulty")}
          </div>
        </div>
        <div className="flex">
          <AjaxLink
            className={cx(
              "rounded-l-[5px] px-4 py-[9px] border-y border-l border-[#d6d6d6] text-xs font-medium",
              timePeriod === "3m"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              difficulty_time_period: "3m",
            })}
            onClick={() => {
              setTimePeriod("3m");
            }}
          >
            3M
          </AjaxLink>
          <AjaxLink
            className={cx(
              "px-4 py-[9px] border-y border-l border-[#d6d6d6] text-xs font-medium",
              timePeriod === "6m"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              difficulty_time_period: "6m",
            })}
            onClick={() => {
              setTimePeriod("6m");
            }}
          >
            6M
          </AjaxLink>
          <AjaxLink
            className={cx(
              "px-4 py-[9px] border-y border-l border-[#d6d6d6] text-xs font-medium",
              timePeriod === "1y"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              difficulty_time_period: "1y",
            })}
            onClick={() => {
              setTimePeriod("1y");
            }}
          >
            1Y
          </AjaxLink>
          <AjaxLink
            className={cx(
              "rounded-r-[5px] px-4 py-[9px] border border-[#d6d6d6] text-xs font-medium",
              timePeriod === "all"
                ? "bg-primary-400 text-white"
                : "bg-white text-primary-400"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              difficulty_time_period: "all",
            })}
            onClick={() => {
              setTimePeriod("all");
            }}
          >
            ALL
          </AjaxLink>
        </div>
      </div>

      <div className="lg:px-[32px]">
        <DifficultyChart data={displayDataMap[timePeriod]} />
      </div>
    </>
  );
}

export default DifficultySection;
