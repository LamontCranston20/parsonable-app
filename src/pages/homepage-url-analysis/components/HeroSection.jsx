import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = ({ url, setUrl, onAnalyze, isAnalyzing, urlError }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Bot" size={32} color="white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Optimize Your Website for
            <span className="text-primary block mt-2">AI Agents</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Analyze how well your web pages are optimized for AI agents like ChatGPT, Perplexity, and Gemini. Get actionable insights to improve your AI visibility.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-card rounded-2xl shadow-lg border border-border">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Enter your website URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  error={urlError}
                  className="border-0 bg-transparent text-lg h-14"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isAnalyzing}
                iconName="Search"
                iconPosition="left"
                className="h-14 px-8 whitespace-nowrap"
                disabled={!url.trim() || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
              </Button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Free Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={16} className="text-warning" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Lock" size={16} className="text-accent" />
              <span>No Registration Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;