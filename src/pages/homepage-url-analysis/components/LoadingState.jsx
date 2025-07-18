import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ currentStep, progress }) => {
  const steps = [
    {
      id: 1,
      title: "Fetching Page",
      description: "Retrieving your webpage content...",
      icon: "Download"
    },
    {
      id: 2,
      title: "Analyzing Structure",
      description: "Scanning for structured data and metadata...",
      icon: "Search"
    },
    {
      id: 3,
      title: "Checking Crawlability",
      description: "Examining robots.txt and AI crawler permissions...",
      icon: "Shield"
    },
    {
      id: 4,
      title: "AI Processing",
      description: "Generating insights with Gemini LLM...",
      icon: "Brain"
    },
    {
      id: 5,
      title: "Calculating Score",
      description: "Computing your Agent Readiness Score...",
      icon: "Calculator"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Icon name="Loader2" size={32} color="white" className="animate-spin" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Analyzing Your Website
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Please wait while we analyze your website for AI agent optimization...
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/10 border border-primary/20' 
                      : isCompleted 
                        ? 'bg-success/10 border border-success/20' :'bg-muted/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : isCompleted 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted-foreground/20 text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={20} />
                    ) : isActive ? (
                      <Icon name="Loader2" size={20} className="animate-spin" />
                    ) : (
                      <Icon name={step.icon} size={20} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingState;