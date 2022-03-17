import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "remix";
import type { GasHistory, GasHistoryType } from "~/models/eth";
import AjaxLink from "~/components/AjaxLink";
import cx from "classnames";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import GasHistoryChart from "../GasHistoryChart";
import svgSprites from "~/assets/icons/tools/sprites.svg";

const TABS: { name: string; value: GasHistoryType }[] = [
  { name: "Base fee", value: "base-fee" },
  { name: "Tip", value: "tip" },
];

type Props = {
  data: GasHistory;
  defaultType: GasHistoryType;
};

function GasHistorySection({ data, defaultType }: Props) {
  const { t } = useTranslation("tools");
  const { pathname, search } = useLocation();
  const [historyType, setHistoryType] =
    React.useState<GasHistoryType>(defaultType);

  return (
    <>
      <div className="block lg:flex lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center mb-[9px] lg:mb-0">
          <span className="mr-2">
            <svg className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] text-primary-400 dark:text-primary-200">
              <use href={`${svgSprites}#list`} />
            </svg>
          </span>
          <div className="text-primary-400 dark:text-[#5783f7] font-bold">
            {t("gas-price-history")}
          </div>
        </div>
        <div className="inline-flex px-[10px] py-[5px] rounded-full space-x-1 border border-[#d6d6d6] bg-[#fafafa] dark:bg-[transparent] overflow-hidden">
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              isActive={historyType === tab.value}
              url={appendSearchObj(pathname, {
                ...getSearchObj(search),
                gas_history_type: tab.value,
              })}
              onClick={() => {
                setHistoryType(tab.value);
              }}
            >
              {tab.name}
            </Tab>
          ))}
        </div>
      </div>

      <div className="min-h-[28px] h-[28px]" />

      <div className="lg:px-[32px]">
        <GasHistoryChart data={data.history} historyType={historyType} />
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
        "text-xs font-medium px-[10px] py-[6.5px] whitespace-nowrap",
        isActive
          ? "bg-primary-400 dark:bg-primary-200 text-white rounded-full"
          : "text-gray-[#7c7c7c] dark:text-white",
        className
      )}
      url={url}
      onClick={onClick}
    >
      {children}
    </AjaxLink>
  );
}

export default GasHistorySection;
