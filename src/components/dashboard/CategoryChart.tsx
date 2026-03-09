"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartEntry {
  name: string;
  score: number;
  fill: string;
}

export function CategoryChart({ data }: { data: ChartEntry[] }) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 0, right: 20 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {data.map((_entry, i) => (
              <Cell key={i} fill={data[i]?.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
