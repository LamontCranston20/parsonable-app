import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressChart = ({ chartData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground">{`Date: ${label}`}</p>
          <p className="text-sm text-accent">
            {`Score: ${payload[0].value}/100`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Progress Over Time</h2>
        </div>
        <div className="text-center py-8">
          <Icon name="BarChart3" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No data available for chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Progress Over Time</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Average Score</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 100]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-foreground">
            {Math.max(...chartData.map(d => d.score))}
          </p>
          <p className="text-xs text-muted-foreground">Best Score</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(chartData.reduce((sum, d) => sum + d.score, 0) / chartData.length)}
          </p>
          <p className="text-xs text-muted-foreground">Average</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            {chartData.length}
          </p>
          <p className="text-xs text-muted-foreground">Total Scans</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;