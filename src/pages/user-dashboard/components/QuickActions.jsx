import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleNewAnalysis = () => {
    navigate('/homepage-url-analysis');
  };

  const handleViewResults = () => {
    navigate('/premium-analysis-results');
  };

  const quickActions = [
    {
      id: 1,
      title: 'New URL Analysis',
      description: 'Analyze a new website for AI agent readiness',
      icon: 'Plus',
      action: handleNewAnalysis,
      variant: 'default',
      primary: true
    },
    {
      id: 2,
      title: 'View All Results',
      description: 'Browse your complete analysis history',
      icon: 'BarChart3',
      action: handleViewResults,
      variant: 'outline'
    },
    {
      id: 3,
      title: 'Bulk Upload',
      description: 'Analyze multiple URLs at once',
      icon: 'Upload',
      action: () => console.log('Bulk upload clicked'),
      variant: 'outline',
      disabled: true
    },
    {
      id: 4,
      title: 'Export Reports',
      description: 'Download PDF reports of your scans',
      icon: 'Download',
      action: () => console.log('Export clicked'),
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <div key={action.id} className={`p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-200 ${action.primary ? 'bg-primary/5' : 'bg-muted/30'}`}>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 ${action.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg flex items-center justify-center`}>
                <Icon name={action.icon} size={24} />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
              </div>
              <Button
                variant={action.variant}
                size="sm"
                onClick={action.action}
                disabled={action.disabled}
                fullWidth
              >
                {action.title}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;