import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitCards = () => {
  const benefits = [
    {
      id: 1,
      icon: "Bot",
      title: "AI Agent Optimization",
      description: "Analyze how well your website is optimized for AI agents like ChatGPT, Perplexity, and Gemini to improve discoverability.",
      color: "text-primary"
    },
    {
      id: 2,
      icon: "Database",
      title: "Structured Data Analysis",
      description: "Detect and validate Schema.org structured data including Product, FAQ, and Organization schemas for better AI understanding.",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Improvement Recommendations",
      description: "Get actionable insights and specific recommendations to enhance your website's visibility to AI crawlers and agents.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Optimize for AI Agents?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI agents are becoming the primary way users discover and interact with content. Make sure your website is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${benefit.color.split('-')[1]}/10 to-${benefit.color.split('-')[1]}/20 flex items-center justify-center mb-6`}>
                <Icon name={benefit.icon} size={28} className={benefit.color} />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitCards;