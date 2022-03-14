import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/src/component/DefaultTooltipContent";
import type { OneDifficultyRecord } from "~/models/eth";
import format from "date-fns/format";
import { toEth, toT } from "~/utils/calcutate";
import { useTranslation } from "react-i18next";
import ShiftBy from "~/components/ShiftBy";

type Props = {
  data: OneDifficultyRecord[];
};

function DifficultyChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} stroke="#AAC0FB" strokeWidth="2px" />
        <XAxis
          dataKey="time"
          dy={16}
          tick={{ fill: "#2b62f6", fontSize: "14px", fontWeight: "500" }}
          tickFormatter={(value) => format(value * 1000, "yyyy-MM-dd")}
          stroke="#3569F5"
          strokeWidth={2}
        />
        <YAxis
          yAxisId={0}
          dataKey="difficulty"
          tick={{ fill: "#2b62f6", fontSize: "14px", fontWeight: "500" }}
          tickFormatter={(value) => toT(value)}
          stroke="#3569F5"
          strokeWidth={2}
        />
        <YAxis
          yAxisId={1}
          dataKey="tip"
          tick={{ fill: "#2b62f6", fontSize: "14px", fontWeight: "500" }}
          tickFormatter={(value) => toEth(value, 1)}
          orientation="right"
          stroke="#3569F5"
          strokeWidth={2}
        />
        <Line dataKey="tip" stroke="#22b573" strokeWidth={4} yAxisId={1} />
        <Line
          dataKey="difficulty"
          stroke="#faa44f"
          strokeWidth={4}
          yAxisId={0}
        />
        <Legend content={<CustomLegend />} />
        <Tooltip cursor={{ stroke: "#7c7c7c" }} content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) {
  const { t } = useTranslation("tools");

  if (active) {
    const time = Number(label);

    return (
      <div className="p-3 rounded-[8px] border border-primary-400 bg-white text-[#434343] w-[185px] text-sm space-y-1 font-medium">
        <div className="flex justify-between">
          <div>{format(time * 1000, "yyyy-MM-dd")}</div>
          <div>{format(time * 1000, "HH:mm")}</div>
        </div>
        <div className="flex justify-between text-[#22b573]">
          <div>{t("tx-fees")}</div>
          <div>{toEth(payload?.[0].value as string, 2)}</div>
        </div>
        <div className="flex justify-between text-[#faa44f]">
          <div>{t("difficulty")}(T)</div>
          <div>{toT(payload?.[1].value as string, 2)}</div>
        </div>
      </div>
    );
  }

  return null;
}

function CustomLegend() {
  const { t } = useTranslation("tools");

  return (
    <div className="flex items-center space-x-[30px] justify-center mt-10">
      <div className="flex space-x-3 items-center">
        <ShiftBy y={1}>
          <div className="w-[28px] h-[8px] bg-[#22b573] rounded-full" />
        </ShiftBy>
        <div className="text-[#22b573] text-sm font-medium">{t("tx-fees")}</div>
      </div>
      <div className="flex space-x-3 items-center">
        <ShiftBy y={1}>
          <div className="w-[28px] h-[8px] bg-[#faa44f] rounded-full" />
        </ShiftBy>
        <div className="text-[#faa44f] text-sm font-medium">
          {t("difficulty")}(T)
        </div>
      </div>
    </div>
  );
}

export default DifficultyChart;
