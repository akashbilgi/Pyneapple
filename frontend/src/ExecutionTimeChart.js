import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExecutionTimeChart = ({ data }) => {
  return (
    <div className="execution-time-chart-container">
      <h2>Execution Time Comparison Chart</h2>
      <BarChart width={300} height={300} data={data}>
        <CartesianGrid strokeDasharray="7" />
        <XAxis dataKey="name" tickFormatter={() => ''} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="Execution Time" />
      </BarChart>
    </div>
  );
};

export default ExecutionTimeChart;
