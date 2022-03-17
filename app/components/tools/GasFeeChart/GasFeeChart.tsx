import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import type { OneGasFeeRecord } from "~/models/eth";
import format from "date-fns/format";
import { toGWei } from "~/utils/calcutate";
import ShiftBy from "~/components/ShiftBy";
import { useTheme } from "~/utils/theme";

type Props = {
  data: OneGasFeeRecord[];
};

function GasFeeChart({ data }: Props) {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data}>
        <CartesianGrid
          vertical={false}
          stroke={theme === "light" ? "#AAC0FB" : "rgba(100,133,221, 40%)"}
          strokeWidth="2px"
        />
        <XAxis
          xAxisId={0}
          dataKey="time"
          dy={12}
          tick={{
            fill: theme === "light" ? "#2b62f6" : "#6485dd",
            fontSize: "14px",
            fontWeight: "500",
          }}
          tickFormatter={(value) => format(value * 1000, "HH:mm")}
          stroke={theme === "light" ? "#3569f5" : "#6485dd"}
          strokeWidth={2}
        />
        <XAxis
          xAxisId={1}
          axisLine={false}
          tickLine={false}
          dataKey="time"
          dy={2}
          tick={{
            fill: theme === "light" ? "#2b62f6" : "#6485dd",
            fontSize: "14px",
            fontWeight: "500",
          }}
          tickFormatter={(value) => format(value * 1000, "MM-dd")}
        />
        <YAxis
          tick={{
            fill: theme === "light" ? "#2b62f6" : "#6485dd",
            fontSize: "14px",
            fontWeight: "500",
          }}
          tickFormatter={(value) => toGWei(value, 1)}
          axisLine={false}
        />
        <Bar
          dataKey="basefee"
          stackId="gas-fee"
          fill={theme === "light" ? "#2b62f6" : "#6485dd"}
        />
        <Bar dataKey="tip" stackId="gas-fee" fill="#9d9d9d" />
        <Legend content={<CustomLegend />} />
        <Tooltip cursor={<CustomCursor />} content={<CustomTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  payload,
  label,
  active,
}: TooltipProps<ValueType, NameType>) {
  if (active) {
    const time = Number(label);

    return (
      <div className="p-3 rounded-[8px] border border-primary-400 dark:border-primary-200 bg-white dark:bg-[rgba(41,40,41,0.8)] text-[#434343] dark:text-white w-[180px] text-sm space-y-1 font-medium">
        <div className="flex justify-between">
          <div>{format(time * 1000, "yyyy-MM-dd")}</div>
          <div>{format(time * 1000, "HH:mm")}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-300">Tip</div>
          <div>{toGWei(payload?.[1].value as string)} GWei</div>
        </div>
        <div className="flex justify-between">
          <div className="text-primary-500 dark:text-primary-200">Base fee</div>
          <div>{toGWei(payload?.[0].value as string)} GWei</div>
        </div>
      </div>
    );
  }

  return null;
}

function CustomLegend() {
  return (
    <div className="flex items-center space-x-[30px] justify-center mt-[22px]">
      <div className="flex space-x-3 items-center">
        <ShiftBy y={1}>
          <div className="w-[28px] h-[8px] bg-primary-500 dark:bg-primary-200 rounded-full" />
        </ShiftBy>
        <div className="text-default text-sm font-medium">Base fee</div>
      </div>
      <div className="flex space-x-3 items-center">
        <ShiftBy y={1}>
          <div className="w-[28px] h-[8px] bg-gray-300 rounded-full" />
        </ShiftBy>
        <div className="text-default text-sm font-medium">Tip</div>
      </div>
    </div>
  );
}

function CustomCursor(props: any) {
  const { x, y, width, height } = props;
  const cursorWidth = 1;
  const centerX = x + width / 2 - cursorWidth / 2;
  return (
    <rect
      fill="#7c7c7c"
      stroke="none"
      x={centerX}
      y={y}
      width={cursorWidth}
      height={height}
    />
  );
}

export default GasFeeChart;
