import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      title: 'Total Scans',
      value: stats.totalScans || 0,
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      id: 2,
      title: 'Average Score',
      value: `${stats.averageScore || 0}/100`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      id: 3,
      title: 'This Month',
      value: stats.monthlyScans || 0,
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      id: 4,
      title: 'Improved Sites',
      value: stats.improvedSites || 0,
      icon: 'ArrowUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat) => (
        <div key={stat.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className={`flex items-center space-x-1 text-xs ${stat.changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
              <Icon name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} size={12} />
              <span>{stat.change}</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;