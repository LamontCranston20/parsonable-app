import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { generateImprovementSuggestions } from '../../../services/geminiService';

const ImprovementRecommendations = ({ url, analysisData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (url && analysisData) {
      generateSuggestions();
    }
  }, [url, analysisData]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const recommendations = await generateImprovementSuggestions(url, analysisData);
      setSuggestions(recommendations);
    } catch (err) {
      setError(err.message);
      // Fallback to mock suggestions
      setSuggestions([
        'Implement comprehensive schema.org markup including Product, FAQ, and Organization schemas',
        'Add structured data for breadcrumb navigation to improve AI understanding of site hierarchy',
        'Optimize meta descriptions to be more descriptive and informative for AI summarization',
        'Include semantic HTML5 elements like <article>, <section>, and <aside> for better content structure',
        'Add JSON-LD structured data for enhanced machine-readable content interpretation',
        'Implement proper heading hierarchy (H1-H6) with descriptive, keyword-rich titles',
        'Consider adding FAQ sections with structured data to improve question-answering capabilities'
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const refreshSuggestions = () => {
    generateSuggestions();
  };

  const getPriorityIcon = (index) => {
    if (index < 2) return { name: 'AlertCircle', color: 'text-destructive' };
    if (index < 4) return { name: 'AlertTriangle', color: 'text-warning' };
    return { name: 'Info', color: 'text-info' };
  };

  const getPriorityLabel = (index) => {
    if (index < 2) return 'High Priority';
    if (index < 4) return 'Medium Priority';
    return 'Low Priority';
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Icon name="Lightbulb" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                AI-Powered Recommendations
              </h3>
              <p className="text-muted-foreground text-sm">
                Personalized suggestions to improve your AI readiness
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshSuggestions}
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
            <span>Generating personalized recommendations...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-destructive mb-4">
            <Icon name="AlertCircle" size={20} />
            <span>{error}</span>
          </div>
        )}

        {suggestions.length > 0 && !isGenerating && (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => {
              const priorityIcon = getPriorityIcon(index);
              const priorityLabel = getPriorityLabel(index);
              
              return (
                <div key={index} className="border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={priorityIcon.name} size={20} className={priorityIcon.color} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          index < 2 ? 'bg-destructive/10 text-destructive' :
                          index < 4 ? 'bg-warning/10 text-warning': 'bg-info/10 text-info'
                        }`}>
                          {priorityLabel}
                        </span>
                      </div>
                      
                      <p className="text-foreground leading-relaxed">
                        {suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} className="text-info" />
              <span className="font-medium text-foreground text-sm">Implementation Tips</span>
            </div>
            <ul className="text-muted-foreground text-sm space-y-1 ml-6">
              <li>• Start with high-priority recommendations for maximum impact</li>
              <li>• Test changes on a staging environment before deploying to production</li>
              <li>• Monitor your AI readiness score after implementing changes</li>
              <li>• Consider implementing JSON-LD structured data for better compatibility</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovementRecommendations;