import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "remix";
import type { GasHistory, GasHistoryType } from "~/models/eth";
import listSvg from "~/assets/icons/tools/list.svg";
import AjaxLink from "~/components/AjaxLink";
import cx from "classnames";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import GasHistoryChart from "../GasHistoryChart";

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
          <img
            src={listSvg}
            alt="icon"
            className="min-w-[40px] min-h-[40px] mr-2"
            width={40}
            height={40}
          />
          <div className="text-primary-400 font-bold">
            {t("gas-price-history")}
          </div>
        </div>
        <div className="inline-flex px-[10px] py-[5px] rounded-full space-x-1 border border-[#d6d6d6] bg-[#fafafa] overflow-hidden">
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
          ? "bg-primary-400 text-white rounded-full"
          : "text-gray-[#7c7c7c]",
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
