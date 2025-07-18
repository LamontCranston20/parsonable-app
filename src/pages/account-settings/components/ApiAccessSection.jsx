import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApiAccessSection = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const apiKey = "ars_live_sk_1234567890abcdef1234567890abcdef";
  const maskedApiKey = "ars_live_sk_••••••••••••••••••••••••••••••••";

  const apiUsage = {
    currentMonth: {
      requests: 1247,
      limit: 5000,
      percentage: 24.94
    },
    lastMonth: {
      requests: 3891,
      limit: 5000
    }
  };

  const recentApiCalls = [
    {
      id: 1,
      endpoint: "/api/v1/analyze",
      method: "POST",
      status: 200,
      timestamp: "2025-01-16T15:30:00Z",
      responseTime: 1.2
    },
    {
      id: 2,
      endpoint: "/api/v1/reports",
      method: "GET",
      status: 200,
      timestamp: "2025-01-16T15:25:00Z",
      responseTime: 0.8
    },
    {
      id: 3,
      endpoint: "/api/v1/analyze",
      method: "POST",
      status: 429,
      timestamp: "2025-01-16T15:20:00Z",
      responseTime: 0.3
    },
    {
      id: 4,
      endpoint: "/api/v1/history",
      method: "GET",
      status: 200,
      timestamp: "2025-01-16T15:15:00Z",
      responseTime: 0.6
    }
  ];

  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('New API key generated');
    } catch (error) {
      console.error('Error generating API key:', error);
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // You could add a toast notification here
    console.log('API key copied to clipboard');
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-success';
    if (status >= 400 && status < 500) return 'text-warning';
    if (status >= 500) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getStatusBadgeColor = (status) => {
    if (status >= 200 && status < 300) return 'bg-success/10 text-success';
    if (status >= 400 && status < 500) return 'bg-warning/10 text-warning';
    if (status >= 500) return 'bg-destructive/10 text-destructive';
    return 'bg-muted text-muted-foreground';
  };

  // Only show API section for Pro and Enterprise users
  if (!user?.subscription || user.subscription === 'Free Plan') {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Code" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">API Access</h2>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">API Access Unavailable</h3>
          <p className="text-muted-foreground mb-4">
            API access is available for Pro and Enterprise subscribers only.
          </p>
          <Button
            variant="default"
            iconName="Zap"
            iconPosition="left"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Code" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">API Access</h2>
      </div>

      <div className="space-y-6">
        {/* API Key Management */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">API Key</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Input
                  label="Your API Key"
                  type="text"
                  value={showApiKey ? apiKey : maskedApiKey}
                  disabled
                  description="Keep your API key secure and never share it publicly"
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName={showApiKey ? "EyeOff" : "Eye"}
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? 'Hide' : 'Show'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                  onClick={handleCopyApiKey}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-muted-foreground">
                Created on January 10, 2025
              </div>
              <Button
                variant="destructive"
                size="sm"
                loading={isGeneratingKey}
                iconName="RotateCcw"
                iconPosition="left"
                onClick={handleGenerateApiKey}
              >
                Regenerate Key
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Usage Statistics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Current Month</span>
                <span className="text-sm text-muted-foreground">
                  {apiUsage.currentMonth.requests.toLocaleString()} / {apiUsage.currentMonth.limit.toLocaleString()} requests
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${apiUsage.currentMonth.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {apiUsage.currentMonth.percentage.toFixed(1)}% of monthly limit used
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {apiUsage.currentMonth.requests.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {apiUsage.lastMonth.requests.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Last Month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent API Calls */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">Recent API Calls</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View Logs
            </Button>
          </div>

          <div className="space-y-2">
            {recentApiCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                      {call.method}
                    </span>
                    <span className="text-sm font-mono text-foreground">
                      {call.endpoint}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`text-xs font-mono ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {call.responseTime}s
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(call.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Documentation */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Documentation & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              iconName="Book"
              iconPosition="left"
              className="justify-start"
            >
              API Documentation
            </Button>
            <Button
              variant="outline"
              iconName="Code"
              iconPosition="left"
              className="justify-start"
            >
              Code Examples
            </Button>
            <Button
              variant="outline"
              iconName="MessageCircle"
              iconPosition="left"
              className="justify-start"
            >
              Developer Support
            </Button>
            <Button
              variant="outline"
              iconName="Zap"
              iconPosition="left"
              className="justify-start"
            >
              Rate Limits
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiAccessSection;