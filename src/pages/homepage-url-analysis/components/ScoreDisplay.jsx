import React from 'react';
import Icon from '../../../components/AppIcon';

const ScoreDisplay = ({ score, url }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-success to-success/80';
    if (score >= 60) return 'from-warning to-warning/80';
    return 'from-destructive to-destructive/80';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Analysis Complete!
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's how well your website is optimized for AI agents
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Agent Readiness Score
                </h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${getScoreGradient(score)} text-white font-medium`}>
                  <Icon name="Award" size={20} className="mr-2" />
                  {getScoreLabel(score)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Globe" size={20} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Analyzed URL:</span>
                  <span className="text-foreground font-medium break-all">{url}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Icon name="Calendar" size={20} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Analysis Date:</span>
                  <span className="text-foreground font-medium">
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  Your website has been analyzed for AI agent optimization. 
                  {score >= 80 
                    ? " Excellent work! Your site is well-optimized for AI discovery."
                    : score >= 60
                      ? " Good foundation, but there's room for improvement."
                      : " Significant improvements needed to enhance AI visibility."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoreDisplay;