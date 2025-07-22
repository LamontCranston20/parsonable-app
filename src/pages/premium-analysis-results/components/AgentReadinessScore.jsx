import React from 'react';
import Icon from '../../../components/AppIcon';

const AgentReadinessScore = ({ overallScore, categoryScores }) => {
  if (!Array.isArray(categoryScores)) {
    console.error("AgentReadinessScore: categoryScores is not an array", categoryScores);
    return (
      <div className="p-4 border border-warning rounded-md bg-warning/10 text-warning">
        <p className="font-semibold mb-2">Missing readiness data</p>
        <p>We couldn't display the category breakdown. Try analyzing a different page.</p>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 border border-border rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
        <Icon name="BarChart3" size={20} />
        <span>Agent Readiness Overview</span>
      </h2>

      <div className="mb-6">
        <p className="text-4xl font-bold text-primary">{overallScore}/100</p>
        <p className="text-muted-foreground">Overall AI-readiness score</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryScores.map((score, index) => (
          <div key={index} className="p-4 border border-muted rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground mb-1">{score.label}</p>
            <p className="text-lg font-semibold">{score.value}/100</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentReadinessScore;
