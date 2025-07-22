import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { performCompleteAnalysis } from '../../services/analysisService';
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

const PremiumAnalysisResults = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

useEffect(() => {
  try {
    let url = location?.state?.url;

    if (!url) {
      url = localStorage.getItem('lastAnalyzedUrl');
    }

    if (!url) {
      console.warn("No URL found in location.state or localStorage. Redirecting.");
      navigate('/homepage-url-analysis');
      return;
    }

    const loadAnalysis = async () => {
      try {
        console.log("Loading analysis for:", url);
        const data = await performCompleteAnalysis(url);

        if (!data || typeof data !== 'object') {
          throw new Error('Analysis data is undefined or invalid');
        }

        setAnalysisData({ ...data, url, analyzedAt: new Date() });
      } catch (err) {
        console.error('Error during performCompleteAnalysis:', err);
        setAnalysisData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  } catch (outerErr) {
    console.error('Unexpected error in PremiumAnalysisResults useEffect:', outerErr);
    setIsLoading(false);
  }
}, [location, navigate]);


    const loadAnalysis = async () => {
      try {
        const data = await performCompleteAnalysis(url);
        setAnalysisData({ ...data, url, analyzedAt: new Date() });
      } catch (err) {
        console.error('Error loading analysis:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [location, navigate]);

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'structured-data', label: 'Structured Data', icon: 'Code' },
    { id: 'robots', label: 'Robots Analysis', icon: 'Shield' },
    { id: 'ai-summary', label: 'AI Summary', icon: 'Brain' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Target' },
    { id: 'metadata', label: 'Metadata', icon: 'Settings' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  if (isLoading) {
    return (
      <ProtectedRouteWrapper>
        <div className="min-h-screen bg-background">
          <AuthenticationStateHeader />
          <div className="pt-16 flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading your results...</p>
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
          <div className="pt-16 text-center py-12">
            <Icon name="AlertTriangle" size={48} className="text-warning mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Analysis Data Found</h2>
            <p className="text-muted-foreground mb-6">Try running a new analysis.</p>
            <Button onClick={() => navigate('/homepage-url-analysis')} iconName="Search" iconPosition="left">
              Start New Analysis
            </Button>
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

            {/* Header */}
            <div className="mb-8 flex justify-between flex-wrap items-center">
              <div>
                <h1 className="text-3xl font-bold">Premium Analysis Results</h1>
                <div className="text-sm text-muted-foreground space-x-2">
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

              <div className="flex space-x-3 mt-4 lg:mt-0">
                <Button onClick={() => navigate('/homepage-url-analysis')} iconName="Plus" iconPosition="left">
                  New Analysis
                </Button>
                <Button onClick={() => setActiveSection('export')} iconName="Download" iconPosition="left">
                  Export Report
                </Button>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
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

            {/* Section Content */}
            <div className="space-y-6">
              {activeSection === 'overview' && (
                <AgentReadinessScore
                  overallScore={analysisData.overallScore}
                  categoryScores={analysisData.categoryScores}
                />
              )}
              {activeSection === 'structured-data' && (
                <StructuredDataSection structuredData={analysisData.structuredData} />
              )}
              {activeSection === 'robots' && (
                <RobotsAnalysis robotsData={analysisData.robotsData} />
              )}
              {activeSection === 'ai-summary' && (
                <EnhancedAISummary summaryData={analysisData.summaryData} />
              )}
              {activeSection === 'recommendations' && (
                <ImprovementRecommendations recommendations={analysisData.recommendations} />
              )}
              {activeSection === 'metadata' && (
                <TechnicalMetadataAnalysis metadataData={analysisData.metadataData} />
              )}
              {activeSection === 'export' && (
                <ExportFunctionality analysisData={analysisData} />
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <Button onClick={() => navigate('/user-dashboard')} iconName="ArrowLeft" iconPosition="left" variant="outline">
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
