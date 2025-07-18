import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { generatePageAnalysis } from '../../../services/geminiService';

const EnhancedAISummary = ({ url, analysisData }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (url && analysisData) {
      generateEnhancedSummary();
    }
  }, [url, analysisData]);

  const generateEnhancedSummary = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const summary = await generatePageAnalysis(url, analysisData);
      setAiSummary(summary);
    } catch (err) {
      setError(err.message);
      // Fallback to mock data
      setAiSummary(
        "This webpage demonstrates good foundational structure for AI agent optimization. The page contains relevant content that AI agents can parse and understand, with clear navigation and semantic organization. However, there are opportunities to enhance AI visibility through improved structured data implementation, more comprehensive meta descriptions, and better content organization. The current setup allows AI agents to extract key information, but additional schema markup would significantly improve how agents like ChatGPT, Perplexity, and Gemini interpret and present this content to users."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const refreshSummary = () => {
    generateEnhancedSummary();
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <Icon name="Brain" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Enhanced AI Summary
              </h3>
              <p className="text-muted-foreground text-sm">
                Powered by Gemini AI
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshSummary}
            loading={isGenerating}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="p-6">
        {isGenerating && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Generating enhanced AI analysis...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-destructive mb-4">
            <Icon name="AlertCircle" size={20} />
            <span>{error}</span>
          </div>
        )}

        {aiSummary && !isGenerating && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className={`text-foreground leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
                {aiSummary}
              </div>
            </div>

            {aiSummary.length > 300 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </Button>
            )}

            <div className="border-t border-border pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Icon name="Eye" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">AI Visibility</p>
                    <p className="text-muted-foreground text-xs">How agents see your content</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="MessageSquare" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Response Quality</p>
                    <p className="text-muted-foreground text-xs">How well agents can respond</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="Target" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Optimization Level</p>
                    <p className="text-muted-foreground text-xs">Current AI readiness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAISummary;