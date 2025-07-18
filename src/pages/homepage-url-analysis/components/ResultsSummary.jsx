import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsSummary = ({ results, isAuthenticated }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const summaryCards = [
    {
      id: 'structured-data',
      title: 'Structured Data',
      icon: 'Database',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      summary: results.structuredData.summary,
      details: results.structuredData.details,
      count: results.structuredData.found.length
    },
    {
      id: 'robots-analysis',
      title: 'Robots.txt Analysis',
      icon: 'Shield',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      summary: results.robotsAnalysis.summary,
      details: results.robotsAnalysis.details,
      status: results.robotsAnalysis.status
    },
    {
      id: 'ai-summary',
      title: 'AI-Generated Summary',
      icon: 'Brain',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      summary: results.aiSummary.summary,
      details: results.aiSummary.details,
      insights: results.aiSummary.insights
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Analysis Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Detailed breakdown of your website's AI optimization status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className={`bg-card rounded-2xl border ${card.borderColor} shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}
            >
              <div className={`${card.bgColor} p-6 border-b border-border`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                      <Icon name={card.icon} size={24} className={card.color} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  
                  {card.count !== undefined && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${card.bgColor} ${card.color}`}>
                      {card.count} found
                    </span>
                  )}
                  
                  {card.status && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      card.status === 'allowed' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                    }`}>
                      {card.status}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.summary}
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {card.details.slice(0, isAuthenticated ? card.details.length : 2).map((detail, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon 
                        name={detail.type === 'success' ? 'CheckCircle' : detail.type === 'warning' ? 'AlertTriangle' : 'XCircle'} 
                        size={16} 
                        className={`mt-0.5 ${
                          detail.type === 'success' ? 'text-success' : 
                          detail.type === 'warning' ? 'text-warning' : 'text-destructive'
                        }`} 
                      />
                      <span className="text-sm text-foreground">{detail.message}</span>
                    </div>
                  ))}
                </div>

                {!isAuthenticated && card.details.length > 2 && (
                  <div className="border-t border-border pt-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        {card.details.length - 2} more insights available
                      </p>
                      <Link to="/user-registration">
                        <Button variant="outline" size="sm" iconName="Lock" iconPosition="left">
                          Sign Up for Full Results
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCard(card.id)}
                    iconName={expandedCard === card.id ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                    className="w-full mt-4"
                  >
                    {expandedCard === card.id ? 'Show Less' : 'Show More Details'}
                  </Button>
                )}

                {expandedCard === card.id && isAuthenticated && card.insights && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">AI Insights:</h4>
                    <ul className="space-y-2">
                      {card.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Icon name="Lightbulb" size={14} className="mt-0.5 text-warning" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <div className="max-w-2xl mx-auto">
              <Icon name="Star" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Unlock Premium Analysis
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Get comprehensive structured data listings, missing metadata reports, detailed improvement suggestions, PDF reports, and scan history management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/user-registration">
                  <Button variant="default" size="lg" iconName="UserPlus" iconPosition="left">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/user-login">
                  <Button variant="outline" size="lg" iconName="LogIn" iconPosition="left">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {isAuthenticated && (
          <div className="text-center">
            <Link to="/premium-analysis-results">
              <Button variant="default" size="lg" iconName="FileText" iconPosition="left">
                View Full Analysis Report
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSummary;