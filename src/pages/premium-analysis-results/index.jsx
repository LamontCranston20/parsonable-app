import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticationStateHeader from '../../components/ui/AuthenticationStateHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProtectedRouteWrapper from '../../components/ui/ProtectedRouteWrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import AgentReadinessScore from './components/AgentReadinessScore';
import StructuredDataSection from './components/StructuredDataSection';
import RobotsAnalysis from './components/RobotsAnalysis';
import EnhancedAISummary from './components/EnhancedAISummary';
import ImprovementRecommendations from './components/ImprovementRecommendations';
import TechnicalMetadataAnalysis from './components/TechnicalMetadataAnalysis';
import ExportFunctionality from './components/ExportFunctionality';

import { performCompleteAnalysis } from '../../services/analysisService';

const PremiumAnalysisResults = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  const { url } = location.state || {};

  useEffect(() => {
    const loadAnalysisData = async () => {
      if (!url) {
        console.error('No URL provided to premium results page.');
        setIsLoading(false);
        return;
      }

      try {
        const result = await performCompleteAnalysis(url);

        if (result?.error) {
          console.error('Analysis failed:', result.message);
          setAnalysisData(null);
        } else {
          setAnalysisData({
            ...result,
            url,
            analyzedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Failed to fetch analysis:', error);
        setAnalysisData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysisData();
  }, [url]);

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'structured-data', label: 'Structured Data', icon: 'Code' },
    { id: 'robots', label: 'Robots Analysis', icon: 'Shield' },
    { id: 'ai-summary', label: 'AI Summary', icon: 'Brain' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Target' },
    { id: 'metadata', label: 'Metadata', icon: 'Settings' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  if (!url) {
    navigate('/homepage-url-analysis');
    return null;
  }

  if (isLoading) {
    return (
      <ProtectedRouteWrapper>
        <div className="min-h-screen bg-background">
          <AuthenticationStateHeader />
          <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Loading Analysis Results</h2>
                  <p className="text-muted-foreground">Please wait while we prepare your comprehensive report...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRouteWrapper>
    );
  }

  if (!analysisData) {
    return (
      <ProtectedRouteWrapper>
        <div className="min-h-screen bg-background">
          <AuthenticationStateHeader />
          <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center py-12">
                <Icon name="AlertTriangle" size={48} className="text-warning mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No Analysis Data Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any analysis results. Please run a new analysis.
                </p>
                <Button
                  variant="default"
                  onClick={() => navigate('/homepage-url-analysis')}
                  iconName="Search"
                  iconPosition="left"
                >
                  Start New Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRouteWrapper>
    );
  }

  return (
    <ProtectedRouteWrapper>
      <div className="min-h-screen bg-background">
        <AuthenticationStateHeader />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NavigationBreadcrumbs />

            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Premium Analysis Results</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>URL: {analysisData.url}</span>
                    <span>•</span>
                    <span>Analyzed: {new Date(analysisData.analyzedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className={`font-medium ${
                      analysisData.overallScore >= 80 ? 'text-success' :
                      analysisData.overallScore >= 60 ? 'text-warning' : 'text-destructive'
                    }`}>
                      Score: {analysisData.overallScore}/100
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/homepage-url-analysis')}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    New Analysis
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => setActiveSection('export')}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon name={section.icon} size={16} />
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {(activeSection === 'overview' || activeSection === 'all') && (
                <AgentReadinessScore
                  overallScore={analysisData.overallScore}
                  categoryScores={analysisData.categoryScores}
                  trends={analysisData.trends}
                />
              )}

              {(activeSection === 'structured-data' || activeSection === 'all') && (
                <StructuredDataSection structuredData={analysisData.structuredData} />
              )}

              {(activeSection === 'robots' || activeSection === 'all') && (
                <RobotsAnalysis robotsData={analysisData.robotsData} />
              )}

              {(activeSection === 'ai-summary' || activeSection === 'all') && (
                <EnhancedAISummary summaryData={analysisData.summaryData} />
              )}

              {(activeSection === 'recommendations' || activeSection === 'all') && (
                <ImprovementRecommendations recommendations={analysisData.recommendations} />
              )}

              {(activeSection === 'metadata' || activeSection === 'all') && (
                <TechnicalMetadataAnalysis metadataData={analysisData.metadataData} />
              )}

              {(activeSection === 'export' || activeSection === 'all') && (
                <ExportFunctionality analysisData={analysisData} />
              )}
            </div>

            {/* Back to Dashboard */}
            <div className="mt-12 pt-8 border-t border-border text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/user-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRouteWrapper>
  );
};

export default PremiumAnalysisResults;
