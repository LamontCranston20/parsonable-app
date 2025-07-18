import React from 'react';
import Icon from '../../../components/AppIcon';

const AgentReadinessScore = ({ overallScore, categoryScores, trends }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-destructive' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Agent Readiness Score</h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Overall Score */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-8">
        <div className="flex flex-col items-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getScoreBackground(overallScore)} border-4 ${getScoreColor(overallScore)} border-current`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div className="text-sm text-muted-foreground">/ 100</div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="font-medium text-foreground">Overall Score</div>
            <div className="text-sm text-muted-foreground">
              {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {categoryScores.map((category) => {
            const trendIcon = getTrendIcon(category.trend);
            return (
              <div key={category.name} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={category.icon} size={20} className="text-primary" />
                    <span className="font-medium text-foreground">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name={trendIcon.name} size={16} className={trendIcon.color} />
                    <span className="text-sm text-muted-foreground">
                      {category.trend > 0 ? '+' : ''}{category.trend}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                    {category.score}
                  </div>
                  <div className="text-sm text-muted-foreground">/ 100</div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        category.score >= 80 ? 'bg-success' : 
                        category.score >= 60 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {category.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryScores.map((category) => 
          category.subScores?.map((subScore) => (
            <div key={`${category.name}-${subScore.name}`} className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{subScore.name}</span>
                <span className={`text-sm font-semibold ${getScoreColor(subScore.score)}`}>
                  {subScore.score}
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    subScore.score >= 80 ? 'bg-success' : 
                    subScore.score >= 60 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${subScore.score}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentReadinessScore;