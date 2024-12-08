// src/components/ProgressPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const ProgressPieChart = ({ progress }) => {
  const data = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  const COLORS = ['#0088FE', '#FF8042']; // Customize your colors

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default ProgressPieChart;
