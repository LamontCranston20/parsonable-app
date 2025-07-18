import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBenefits = () => {
  const benefits = [
    {
      icon: "BarChart3",
      title: "Premium Analysis",
      description: "Get detailed AI readiness reports with actionable insights"
    },
    {
      icon: "History",
      title: "Scan History",
      description: "Access all your previous scans and track improvements"
    },
    {
      icon: "Download",
      title: "PDF Reports",
      description: "Download comprehensive reports for your team"
    },
    {
      icon: "Shield",
      title: "Secure Dashboard",
      description: "Manage your account and preferences safely"
    }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-muted/30 p-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Unlock Premium Features
        </h2>
        
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">New Feature</span>
          </div>
          <p className="text-sm text-foreground">
            AI-powered recommendations now include competitor analysis and trending optimization strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginBenefits;