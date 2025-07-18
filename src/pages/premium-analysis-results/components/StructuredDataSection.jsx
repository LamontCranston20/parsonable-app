import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StructuredDataSection = ({ structuredData }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'valid': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'valid': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'valid': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-destructive/10';
      default: return 'bg-muted/50';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Code" size={24} className="text-primary" />
          <span>Structured Data Analysis</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {structuredData.filter(item => item.status === 'valid').length} of {structuredData.length} valid
          </span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-success/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {structuredData.filter(item => item.status === 'valid').length}
          </div>
          <div className="text-sm text-muted-foreground">Valid Schemas</div>
        </div>
        <div className="bg-warning/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {structuredData.filter(item => item.status === 'warning').length}
          </div>
          <div className="text-sm text-muted-foreground">Warnings</div>
        </div>
        <div className="bg-destructive/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-destructive">
            {structuredData.filter(item => item.status === 'error').length}
          </div>
          <div className="text-sm text-muted-foreground">Errors</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {structuredData.reduce((acc, item) => acc + (item.missingFields?.length || 0), 0)}
          </div>
          <div className="text-sm text-muted-foreground">Missing Fields</div>
        </div>
      </div>

      {/* Structured Data Items */}
      <div className="space-y-4">
        {structuredData.map((item) => (
          <div key={item.id} className={`rounded-lg border border-border ${getStatusBackground(item.status)}`}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(item.status)} 
                    size={20} 
                    className={getStatusColor(item.status)} 
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.type}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} ${getStatusBackground(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(item.id)}
                    iconName={expandedItems[item.id] ? "ChevronUp" : "ChevronDown"}
                    iconSize={16}
                  >
                    Details
                  </Button>
                </div>
              </div>

              {expandedItems[item.id] && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Detected Fields */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span>Detected Fields</span>
                      </h4>
                      <div className="space-y-2">
                        {item.detectedFields.map((field, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-background rounded border border-border">
                            <span className="text-sm font-medium text-foreground">{field.name}</span>
                            <span className="text-sm text-muted-foreground">{field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Fields */}
                    {item.missingFields && item.missingFields.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                          <Icon name="AlertCircle" size={16} className="text-warning" />
                          <span>Missing Recommended Fields</span>
                        </h4>
                        <div className="space-y-2">
                          {item.missingFields.map((field, index) => (
                            <div key={index} className="p-2 bg-background rounded border border-border">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-foreground">{field.name}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  field.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                                  field.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                                }`}>
                                  {field.priority}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">{field.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Implementation Suggestions */}
                  {item.suggestions && item.suggestions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                        <Icon name="Lightbulb" size={16} className="text-primary" />
                        <span>Implementation Suggestions</span>
                      </h4>
                      <div className="space-y-2">
                        {item.suggestions.map((suggestion, index) => (
                          <div key={index} className="p-3 bg-primary/5 rounded border border-primary/20">
                            <p className="text-sm text-foreground">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Code Example */}
                  {item.codeExample && (
                    <div className="mt-4">
                      <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                        <Icon name="Code2" size={16} className="text-primary" />
                        <span>Code Example</span>
                      </h4>
                      <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-foreground font-mono">
                          <code>{item.codeExample}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {structuredData.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Structured Data Found</h3>
          <p className="text-muted-foreground mb-4">
            No Schema.org markup was detected on this page. Adding structured data can significantly improve AI agent understanding.
          </p>
          <Button variant="outline" iconName="ExternalLink" iconPosition="right">
            Learn About Schema.org
          </Button>
        </div>
      )}
    </div>
  );
};

export default StructuredDataSection;