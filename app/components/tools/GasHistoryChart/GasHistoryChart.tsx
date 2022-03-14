import type { OneGasHistoryRecord } from "~/models/eth";
import { toGWei } from "~/utils/calcutate";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import formatISO from "date-fns/formatISO";
import format from "date-fns/format";
import cx from "classnames";
import { Popover } from "@headlessui/react";

const DAY_TIME_PERIODS = [
  "00",
  "02",
  "04",
  "06",
  "08",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
];

const GRADIENTS = {
  light: {
    "base-fee": "from-[#f4f6fd] via-[#91adf8] to-[#376cfd]",
    tip: "from-[#f5f5f5] via-[#d6d6d6] to-[#7c7c7c]",
  },
  dark: {
    "base-fee": "from-[#edeeef] via-[#aebbe0] to-[#5079e8]",
    tip: "from-[#e3e3e3] via-[#bcbcbc] to-[#575757]",
  },
};

type HistoryType = "base-fee" | "tip";

type Props = {
  data: OneGasHistoryRecord[];
  historyType: HistoryType;
};

function GasHistoryChart({ data, historyType }: Props) {
  const last7d = eachDayOfInterval({
    start: new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  return (
    <div>
      <div className="grid grid-rows-[repeat(24,_minmax(0,_1fr))] grid-cols-7 grid-flow-col border-l-2 border-l-primary-500 border-b-2 border-b-primary-500 ml-8 lg:ml-6 mb-16 relative bg-[#dedede] gap-[1px]">
        <div className="absolute inset-y-0 left-0 -translate-x-[calc(100%+12px)] -translate-y-[7px] space-y-[19px] lg:space-y-[26px]">
          {DAY_TIME_PERIODS.map((period) => (
            <div
              key={period}
              className="text-xs font-medium font-mono text-primary-400"
            >
              <span>{period}</span>
              <span className="hidden lg:inline">:00</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-between lg:justify-around translate-y-[calc(100%+12px)]">
          {last7d.map((day, index) => (
            <div
              key={formatISO(day)}
              className={cx(
                "text-xs font-medium font-mono text-primary-400 lg:block",
                {
                  hidden: index !== 0 && index !== last7d.length - 1,
                }
              )}
            >
              {format(day, "yyyy-MM-dd")}
            </div>
          ))}
        </div>
        {data.map((d) => (
          <Cell
            key={d.time}
            time={d.time * 1000}
            data={
              historyType === "base-fee"
                ? toGWei(d.basefee, 1)
                : toGWei(d.tip, 1)
            }
            type={historyType}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="w-[224px]">
          <div
            className={cx(
              "h-[12px] bg-gradient-to-r mb-1",
              GRADIENTS.light[historyType]
            )}
          />
          <div className="flex justify-between text-xs font-medium text-[#2a61f6]">
            <div>0</div>
            <div>300</div>
            <div>500</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CellColors = {
  light: {
    "base-fee": (fee: number) => {
      if (fee < 30) {
        return "#f4f6fd";
      } else if (fee < 101) {
        return "#e4ebfe";
      } else if (fee < 126) {
        return "#d0ddfd";
      } else if (fee < 151) {
        return "#91adf8";
      } else if (fee < 176) {
        return "#648cf8";
      } else if (fee < 201) {
        return "#5c86f8";
      } else if (fee < 501) {
        return "#4e7dfd";
      } else {
        return "#376cfd";
      }
    },
    tip: (tip: number) => {
      if (tip < 31) {
        return "#f5f5f5";
      } else if (tip < 101) {
        return "#ebebeb";
      } else if (tip < 126) {
        return "#e1e1e1";
      } else if (tip < 151) {
        return "#d6d6d6";
      } else if (tip < 176) {
        return "#acacac";
      } else if (tip < 201) {
        return "#9c9c9c";
      } else if (tip < 501) {
        return "#8e8e8e";
      } else {
        return "#7c7c7c";
      }
    },
  },
  dark: {
    "base-fee": (fee: number) => {
      if (fee < 30) {
        return "#edeeef";
      } else if (fee < 101) {
        return "#d9deea";
      } else if (fee < 126) {
        return "#bfcae5";
      } else if (fee < 151) {
        return "#aebbe0";
      } else if (fee < 176) {
        return "#8ea2db";
      } else if (fee < 201) {
        return "#7a96e2";
      } else if (fee < 501) {
        return "#6487e6";
      } else {
        return "#5079e8";
      }
    },
    tip: (tip: number) => {
      if (tip < 31) {
        return "#e3e3e3";
      } else if (tip < 101) {
        return "#d8d8d8";
      } else if (tip < 126) {
        return "#d3d3d3";
      } else if (tip < 151) {
        return "#bcbcbc";
      } else if (tip < 176) {
        return "#959595";
      } else if (tip < 201) {
        return "#808080";
      } else if (tip < 501) {
        return "#696969";
      } else {
        return "#575757";
      }
    },
  },
};

type CellProps = {
  time: number;
  data: string;
  type: HistoryType;
};

function Cell({ time, data, type }: CellProps) {
  return (
    <Popover className="relative group">
      <Popover.Button className="block w-full">
        <div
          className="flex items-center justify-center text-[11px] font-mono text-default-light lg:text-sm dark:hidden"
          style={{ backgroundColor: CellColors.light[type](Number(data)) }}
        >
          {data}
        </div>
        <div
          className="items-center justify-center text-[11px] font-mono text-default-light hidden lg:text-sm dark:flex"
          style={{ backgroundColor: CellColors.dark[type](Number(data)) }}
        >
          {data}
        </div>
      </Popover.Button>

      <Popover.Panel
        static
        className="absolute translate-y-[4px] z-10 hidden group-hover:block px-3 py-2 rounded-[8px] border border-primary-400 bg-white text-[#434343] w-[160px] text-sm space-y-1 font-medium"
      >
        <div className="flex justify-between">
          <span>{format(time, "yyyy-MM-dd")}</span>
          <span>{format(time, "HH:mm")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-primary-400">
            {type === "base-fee" ? "Gas price" : "Tip"}
          </span>
          <span>{data}GWei</span>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

export default GasHistoryChart;
