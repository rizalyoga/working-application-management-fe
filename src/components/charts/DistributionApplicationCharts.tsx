import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { TotalApplicationDataBasedOnStatus } from "@/types/job-application-types";
import {
  chartDistributionStatusConfig,
  formatLabel,
  colorMap,
} from "@/lib/helper-chart";

interface RecruitmentBarChartProps {
  data: TotalApplicationDataBasedOnStatus;
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

const DistributionApplicationChart = ({ data }: RecruitmentBarChartProps) => {
  // Format data for the chart (excluding total_application)
  const chartData: ChartDataItem[] = Object.entries(data)
    .filter(([key]) => key !== "total_application")
    .map(([key, value]) => ({
      name: formatLabel(key),
      value,
      color: colorMap[key] || "#9CA3AF", // Default color if not found
    }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-primary-foreground p-4 shadow-lg border rounded-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            <span className="font-medium">Count:</span> {data.value}
          </p>
        </div>
      );
    }
    return null;
  };

  const chartConfig = {
    ...chartDistributionStatusConfig,
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart layout="vertical" data={chartData}>
        <CartesianGrid horizontal={false} />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          width={120}
        />
        <XAxis
          type="number"
          tickLine={false}
          tick={false}
          tickMargin={10}
          axisLine={false}
          //   tickFormatter={(value) => Math.round(value).toString()}
          //   domain={[0, "dataMax + 1"]}
          //   interval={0}
        />
        <ChartTooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={4}>
          <LabelList dataKey="value" position="right" />
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default DistributionApplicationChart;
