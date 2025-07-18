import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RobotsAnalysis = ({ robotsData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'allowed': return 'text-success';
      case 'disallowed': return 'text-destructive';
      case 'partial': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case 'allowed': return 'CheckCircle';
      case 'disallowed': return 'XCircle';
      case 'partial': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  const getPermissionBackground = (permission) => {
    switch (permission) {
      case 'allowed': return 'bg-success/10';
      case 'disallowed': return 'bg-destructive/10';
      case 'partial': return 'bg-warning/10';
      default: return 'bg-muted/50';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'crawlers', label: 'AI Crawlers', icon: 'Bot' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Shield" size={24} className="text-primary" />
          <span>Robots.txt Analysis</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Status: {robotsData.exists ? 'Found' : 'Not Found'}
          </span>
          <div className={`w-3 h-3 rounded-full ${robotsData.exists ? 'bg-success' : 'bg-destructive'}`}></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {robotsData.crawlers.filter(c => c.permission === 'allowed').length}
              </div>
              <div className="text-sm text-muted-foreground">Allowed Crawlers</div>
            </div>
            <div className="bg-destructive/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-destructive">
                {robotsData.crawlers.filter(c => c.permission === 'disallowed').length}
              </div>
              <div className="text-sm text-muted-foreground">Blocked Crawlers</div>
            </div>
            <div className="bg-warning/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {robotsData.crawlers.filter(c => c.permission === 'partial').length}
              </div>
              <div className="text-sm text-muted-foreground">Partial Access</div>
            </div>
            <div className="bg-success/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {robotsData.optimizationScore}%
              </div>
              <div className="text-sm text-muted-foreground">Optimization Score</div>
            </div>
          </div>

          {/* Robots.txt Content */}
          {robotsData.exists && (
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                <Icon name="FileText" size={20} className="text-primary" />
                <span>Current Robots.txt Content</span>
              </h3>
              <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                  {robotsData.content}
                </pre>
              </div>
            </div>
          )}

          {!robotsData.exists && (
            <div className="text-center py-8 bg-warning/5 rounded-lg border border-warning/20">
              <Icon name="AlertTriangle" size={48} className="text-warning mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Robots.txt Found</h3>
              <p className="text-muted-foreground mb-4">
                Your website doesn't have a robots.txt file. This means AI crawlers will use default behavior.
              </p>
              <Button variant="outline" iconName="Plus" iconPosition="left">
                Create Robots.txt
              </Button>
            </div>
          )}
        </div>
      )}

      {/* AI Crawlers Tab */}
      {activeTab === 'crawlers' && (
        <div className="space-y-4">
          {robotsData.crawlers.map((crawler) => (
            <div key={crawler.id} className={`rounded-lg border border-border ${getPermissionBackground(crawler.permission)}`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getPermissionIcon(crawler.permission)} 
                      size={24} 
                      className={getPermissionColor(crawler.permission)} 
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{crawler.name}</h3>
                      <p className="text-sm text-muted-foreground">{crawler.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPermissionColor(crawler.permission)} ${getPermissionBackground(crawler.permission)}`}>
                      {crawler.permission.charAt(0).toUpperCase() + crawler.permission.slice(1)}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      User-Agent: {crawler.userAgent}
                    </div>
                  </div>
                </div>

                {/* Crawler Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Access Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Crawl Delay:</span>
                        <span className="text-foreground">{crawler.crawlDelay || 'None'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Last Crawled:</span>
                        <span className="text-foreground">{crawler.lastCrawled}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span className="text-foreground">{crawler.frequency}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Allowed/Disallowed Paths</h4>
                    <div className="space-y-1">
                      {crawler.allowedPaths?.map((path, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="Check" size={14} className="text-success" />
                          <span className="text-foreground font-mono">{path}</span>
                        </div>
                      ))}
                      {crawler.disallowedPaths?.map((path, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="X" size={14} className="text-destructive" />
                          <span className="text-foreground font-mono">{path}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact Assessment */}
                <div className="mt-4 p-3 bg-background rounded border border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-primary" />
                    <span>Impact Assessment</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">{crawler.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {robotsData.recommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-background rounded-lg border border-border p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  recommendation.priority === 'high' ? 'bg-destructive/10' :
                  recommendation.priority === 'medium'? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={recommendation.icon} 
                    size={20} 
                    className={
                      recommendation.priority === 'high' ? 'text-destructive' :
                      recommendation.priority === 'medium'? 'text-warning' : 'text-primary'
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{recommendation.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        recommendation.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                        recommendation.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                      }`}>
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Impact: {recommendation.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
                  
                  {recommendation.codeExample && (
                    <div className="bg-muted rounded p-3 mb-3">
                      <div className="text-xs text-muted-foreground mb-2">Suggested Implementation:</div>
                      <pre className="text-sm text-foreground font-mono">
                        <code>{recommendation.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Difficulty: {recommendation.difficulty}</span>
                      <span>Est. Time: {recommendation.estimatedTime}</span>
                    </div>
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RobotsAnalysis;