import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GetStartedSection = () => {
  const features = [
    {
      icon: "Zap",
      title: "Instant Analysis",
      description: "Get results in seconds with our AI-powered analysis engine"
    },
    {
      icon: "Shield",
      title: "Comprehensive Scanning",
      description: "Check structured data, robots.txt, and AI crawler permissions"
    },
    {
      icon: "TrendingUp",
      title: "Actionable Insights",
      description: "Receive specific recommendations to improve AI visibility"
    },
    {
      icon: "FileText",
      title: "Detailed Reports",
      description: "Download PDF reports and track your optimization progress"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-card to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Optimize Your Website?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of website owners who are already optimizing their content for AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Start Your Free Analysis Today
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                No credit card required. Get instant insights into your website's AI optimization status and discover opportunities for improvement.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Icon name="Check" size={20} className="text-success" />
                  <span className="text-foreground">Free basic analysis with Agent Readiness Score</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" size={20} className="text-success" />
                  <span className="text-foreground">Structured data and robots.txt analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" size={20} className="text-success" />
                  <span className="text-foreground">AI-generated summary and basic recommendations</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="ArrowUp" 
                  iconPosition="left"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Analyze Your Website
                </Button>
                <Link to="/user-registration">
                  <Button variant="outline" size="lg" iconName="UserPlus" iconPosition="left">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} color="white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    Premium Features
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Unlock advanced analysis with detailed reports
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                    <li>• Complete structured data listings</li>
                    <li>• Missing metadata identification</li>
                    <li>• PDF report generation</li>
                    <li>• Scan history management</li>
                    <li>• Priority support</li>
                  </ul>
                  <Link to="/user-registration">
                    <Button variant="secondary" size="sm" iconName="Crown" iconPosition="left">
                      Upgrade to Premium
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;