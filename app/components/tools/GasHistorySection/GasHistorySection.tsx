import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "remix";
import type { GasHistory } from "~/models/eth";
import listSvg from "~/assets/icons/tools/list.svg";
import AjaxLink from "~/components/AjaxLink";
import cx from "classnames";
import { appendSearchObj, getSearchObj } from "~/utils/url";
import GasHistoryChart from "../GasHistoryChart";

type HistoryType = "base-fee" | "tip";

type Props = {
  gasHistory: GasHistory;
  defaultType: HistoryType;
};

function GasHistorySection({ gasHistory, defaultType }: Props) {
  const { t } = useTranslation("tools");
  const { pathname, search } = useLocation();
  const [historyType, setHistoryType] =
    React.useState<HistoryType>(defaultType);

  return (
    <>
      <div className="block lg:flex lg:flex-row lg:items-center lg:justify-between mb-[28px]">
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
        <div className="inline-flex px-[10px] py-[5px] rounded-full space-x-1 border border-[#d6d6d6] bg-[#fafafa]">
          <AjaxLink
            className={cx(
              "text-xs font-medium px-[10px] py-[6.5px] whitespace-nowrap",
              historyType === "base-fee"
                ? "bg-primary-400 text-white rounded-full"
                : "text-gray-[#7c7c7c]"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              gas_history_type: "base-fee",
            })}
            onClick={() => {
              setHistoryType("base-fee");
            }}
          >
            Base fee
          </AjaxLink>
          <AjaxLink
            className={cx(
              "text-xs font-medium px-[10px] py-[6.5px]",
              historyType === "tip"
                ? "bg-primary-400 text-white rounded-full"
                : "text-gray-[#7c7c7c]"
            )}
            url={appendSearchObj(pathname, {
              ...getSearchObj(search),
              gas_history_type: "tip",
            })}
            onClick={() => {
              setHistoryType("tip");
            }}
          >
            Tip
          </AjaxLink>
        </div>
      </div>

      <div className="lg:px-[32px]">
        <GasHistoryChart data={gasHistory.history} historyType={historyType} />
      </div>
    </>
  );
}

export default GasHistorySection;
