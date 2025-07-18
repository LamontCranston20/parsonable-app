import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TechnicalMetadataAnalysis = ({ metadataData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'meta-tags', label: 'Meta Tags', icon: 'Tag' },
    { id: 'open-graph', label: 'Open Graph', icon: 'Share2' },
    { id: 'json-ld', label: 'JSON-LD', icon: 'Code' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-success';
      case 'missing': return 'text-destructive';
      case 'suboptimal': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return 'CheckCircle';
      case 'missing': return 'XCircle';
      case 'suboptimal': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'present': return 'bg-success/10';
      case 'missing': return 'bg-destructive/10';
      case 'suboptimal': return 'bg-warning/10';
      default: return 'bg-muted/50';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings" size={24} className="text-primary" />
          <span>Technical Metadata Analysis</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Score: {metadataData.overallScore}/100
          </span>
          <div className={`w-3 h-3 rounded-full ${
            metadataData.overallScore >= 80 ? 'bg-success' :
            metadataData.overallScore >= 60 ? 'bg-warning' : 'bg-destructive'
          }`}></div>
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
            <div className="bg-success/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {metadataData.summary.present}
              </div>
              <div className="text-sm text-muted-foreground">Present</div>
            </div>
            <div className="bg-destructive/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-destructive">
                {metadataData.summary.missing}
              </div>
              <div className="text-sm text-muted-foreground">Missing</div>
            </div>
            <div className="bg-warning/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {metadataData.summary.suboptimal}
              </div>
              <div className="text-sm text-muted-foreground">Suboptimal</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {metadataData.summary.total}
              </div>
              <div className="text-sm text-muted-foreground">Total Checked</div>
            </div>
          </div>

          {/* Critical Issues */}
          <div className="bg-destructive/5 rounded-lg border border-destructive/20 p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
              <span>Critical Issues</span>
            </h3>
            <div className="space-y-2">
              {metadataData.criticalIssues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="X" size={16} className="text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{issue.title}</h4>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                    <p className="text-xs text-destructive mt-1">Impact: {issue.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins */}
          <div className="bg-success/5 rounded-lg border border-success/20 p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-success" />
              <span>Quick Wins</span>
            </h3>
            <div className="space-y-2">
              {metadataData.quickWins.map((win, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{win.title}</h4>
                    <p className="text-sm text-muted-foreground">{win.description}</p>
                    <p className="text-xs text-success mt-1">Est. time: {win.estimatedTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meta Tags Tab */}
      {activeTab === 'meta-tags' && (
        <div className="space-y-4">
          {metadataData.metaTags.map((tag) => (
            <div key={tag.id} className={`rounded-lg border border-border ${getStatusBackground(tag.status)}`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getStatusIcon(tag.status)} 
                      size={20} 
                      className={getStatusColor(tag.status)} 
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{tag.name}</h3>
                      <p className="text-sm text-muted-foreground">{tag.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tag.status)} ${getStatusBackground(tag.status)}`}>
                    {tag.status.charAt(0).toUpperCase() + tag.status.slice(1)}
                  </span>
                </div>

                {tag.currentValue && (
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground mb-1">Current Value:</h4>
                    <div className="bg-background rounded p-2 border border-border">
                      <code className="text-sm text-foreground">{tag.currentValue}</code>
                    </div>
                  </div>
                )}

                {tag.issues && tag.issues.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground mb-2">Issues:</h4>
                    <ul className="space-y-1">
                      {tag.issues.map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="AlertCircle" size={14} className="text-warning mt-0.5" />
                          <span className="text-sm text-foreground">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tag.recommendations && tag.recommendations.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {tag.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                          <span className="text-sm text-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tag.suggestedValue && (
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Suggested Implementation:</h4>
                    <div className="bg-muted rounded p-2">
                      <code className="text-sm text-foreground">{tag.suggestedValue}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Open Graph Tab */}
      {activeTab === 'open-graph' && (
        <div className="space-y-4">
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Share2" size={20} className="text-primary" />
              <span>Open Graph Analysis</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Coverage Score</h4>
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl font-bold ${
                    metadataData.openGraph.score >= 80 ? 'text-success' :
                    metadataData.openGraph.score >= 60 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {metadataData.openGraph.score}%
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          metadataData.openGraph.score >= 80 ? 'bg-success' :
                          metadataData.openGraph.score >= 60 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${metadataData.openGraph.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Social Preview</h4>
                <div className="bg-muted rounded p-3 text-sm">
                  <div className="font-medium text-foreground mb-1">
                    {metadataData.openGraph.preview.title || 'No title set'}
                  </div>
                  <div className="text-muted-foreground mb-2">
                    {metadataData.openGraph.preview.description || 'No description set'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metadataData.openGraph.preview.url}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {metadataData.openGraph.properties.map((property) => (
            <div key={property.id} className={`rounded-lg border border-border ${getStatusBackground(property.status)}`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getStatusIcon(property.status)} 
                      size={20} 
                      className={getStatusColor(property.status)} 
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{property.property}</h3>
                      <p className="text-sm text-muted-foreground">{property.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)} ${getStatusBackground(property.status)}`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>

                {property.currentValue && (
                  <div className="mb-2">
                    <div className="bg-background rounded p-2 border border-border">
                      <code className="text-sm text-foreground">{property.currentValue}</code>
                    </div>
                  </div>
                )}

                {property.recommendation && (
                  <div className="text-sm text-muted-foreground">
                    <Icon name="Lightbulb" size={14} className="text-primary inline mr-1" />
                    {property.recommendation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* JSON-LD Tab */}
      {activeTab === 'json-ld' && (
        <div className="space-y-4">
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Code" size={20} className="text-primary" />
              <span>JSON-LD Implementation</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  metadataData.jsonLd.implementationScore >= 80 ? 'text-success' :
                  metadataData.jsonLd.implementationScore >= 60 ? 'text-warning' : 'text-destructive'
                }`}>
                  {metadataData.jsonLd.implementationScore}%
                </div>
                <div className="text-sm text-muted-foreground">Implementation Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {metadataData.jsonLd.schemasFound}
                </div>
                <div className="text-sm text-muted-foreground">Schemas Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {metadataData.jsonLd.validationErrors}
                </div>
                <div className="text-sm text-muted-foreground">Validation Errors</div>
              </div>
            </div>
          </div>

          {metadataData.jsonLd.schemas.map((schema) => (
            <div key={schema.id} className={`rounded-lg border border-border ${getStatusBackground(schema.status)}`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getStatusIcon(schema.status)} 
                      size={20} 
                      className={getStatusColor(schema.status)} 
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{schema.type}</h3>
                      <p className="text-sm text-muted-foreground">{schema.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schema.status)} ${getStatusBackground(schema.status)}`}>
                    {schema.status.charAt(0).toUpperCase() + schema.status.slice(1)}
                  </span>
                </div>

                {schema.currentImplementation && (
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground mb-2">Current Implementation:</h4>
                    <div className="bg-muted rounded p-3 overflow-x-auto">
                      <pre className="text-sm text-foreground">
                        <code>{JSON.stringify(schema.currentImplementation, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {schema.errors && schema.errors.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-medium text-foreground mb-2">Validation Errors:</h4>
                    <ul className="space-y-1">
                      {schema.errors.map((error, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="AlertCircle" size={14} className="text-destructive mt-0.5" />
                          <span className="text-sm text-foreground">{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {schema.suggestions && schema.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Improvement Suggestions:</h4>
                    <ul className="space-y-1">
                      {schema.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                          <span className="text-sm text-foreground">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export Button */}
      <div className="mt-6 pt-6 border-t border-border flex justify-end">
        <Button variant="outline" iconName="Download" iconPosition="left">
          Export Metadata Report
        </Button>
      </div>
    </div>
  );
};

export default TechnicalMetadataAnalysis;