import * as React from "react";
import { useLocation } from "remix";
import type { Difficulties, DifficultyTimePeriod } from "~/models/eth";
import { useTranslation } from "react-i18next";
import AjaxLink from "~/components/AjaxLink";
import cx from "classnames";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import DifficultyChart from "../DifficultyChart";
import svgSprites from "~/assets/icons/tools/sprites.svg";

const TABS: { name: string; value: DifficultyTimePeriod }[] = [
  { name: "3M", value: "3m" },
  { name: "6M", value: "6m" },
  { name: "1Y", value: "1y" },
  { name: "ALL", value: "all" },
];

type Props = {
  data: Difficulties;
  defaultTimePeriod: DifficultyTimePeriod;
};

function DifficultySection({ data, defaultTimePeriod }: Props) {
  const { t } = useTranslation("tools");
  const { pathname, search } = useLocation();
  const [timePeriod, setTimePeriod] =
    React.useState<DifficultyTimePeriod>(defaultTimePeriod);

  const displayDataMap = {
    "3m": data.history3m,
    "6m": data.history6m,
    "1y": data.history1y,
    all: data.totalhistory,
  };

  return (
    <>
      <div className="block lg:flex lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center mb-[9px] lg:mb-0">
          <span className="mr-2">
            <svg className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] text-primary-400 dark:text-primary-200">
              <use href={`${svgSprites}#dashboard`} />
            </svg>
          </span>
          <div className="text-primary-400 dark:text-[#5783f7] font-bold">
            {t("tx-fees-and-difficulty")}
          </div>
        </div>
        <div className="inline-flex rounded-[5px] border border-[#d6d6d6] overflow-hidden">
          {TABS.map((tab, index) => (
            <Tab
              key={tab.value}
              isActive={timePeriod === tab.value}
              url={appendSearchObj(pathname, {
                ...getSearchObj(search),
                difficulty_time_period: tab.value,
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

      <div className="ml-[-16px] mr-[-32px] lg:mx-0 lg:px-[32px]">
        <DifficultyChart data={displayDataMap[timePeriod]} />
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

export default DifficultySection;
