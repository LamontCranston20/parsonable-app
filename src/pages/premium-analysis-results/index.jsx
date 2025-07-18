import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticationStateHeader from '../../components/ui/AuthenticationStateHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProtectedRouteWrapper from '../../components/ui/ProtectedRouteWrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
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
    // Simulate loading analysis data
    const loadAnalysisData = async () => {
      try {
        // Mock analysis data
        const mockData = {
          url: "https://example.com",
          analyzedAt: new Date().toISOString(),
          overallScore: 78,
          categoryScores: [
            {
              name: "Structured Data",
              icon: "Code",
              score: 85,
              trend: 5,
              description: "Schema.org markup implementation",
              subScores: [
                { name: "Product Schema", score: 90 },
                { name: "FAQ Schema", score: 80 },
                { name: "Organization Schema", score: 85 }
              ]
            },
            {
              name: "Crawlability",
              icon: "Search",
              score: 72,
              trend: -2,
              description: "AI crawler accessibility",
              subScores: [
                { name: "Robots.txt", score: 70 },
                { name: "Sitemap", score: 75 },
                { name: "Internal Links", score: 72 }
              ]
            },
            {
              name: "Content Quality",
              icon: "FileText",
              score: 76,
              trend: 8,
              description: "Content structure and semantics",
              subScores: [
                { name: "Heading Structure", score: 80 },
                { name: "Content Depth", score: 75 },
                { name: "Semantic Markup", score: 73 }
              ]
            }
          ],
          structuredData: [
            {
              id: 1,
              type: "Product",
              description: "E-commerce product information",
              status: "valid",
              detectedFields: [
                { name: "name", value: "Premium Headphones" },
                { name: "price", value: "$299.99" },
                { name: "availability", value: "InStock" }
              ],
              missingFields: [
                { name: "brand", priority: "high", description: "Product brand information" },
                { name: "review", priority: "medium", description: "Customer reviews and ratings" }
              ],
              suggestions: [
                "Add brand information to improve product visibility",
                "Include customer reviews for better trust signals"
              ],
              codeExample: `{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Premium Headphones",
  "brand": "AudioTech",
  "price": "299.99",
  "priceCurrency": "USD"
}`
            },
            {
              id: 2,
              type: "FAQ",
              description: "Frequently asked questions",
              status: "warning",
              detectedFields: [
                { name: "question", value: "What is the warranty?" },
                { name: "answer", value: "2 years limited warranty" }
              ],
              missingFields: [
                { name: "acceptedAnswer", priority: "medium", description: "Structured answer format" }
              ],
              suggestions: [
                "Use proper acceptedAnswer structure for better AI understanding"
              ],
              codeExample: `{
  "@context": "https://schema.org/",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is the warranty?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "2 years limited warranty"
    }
  }]
}`
            }
          ],
          robotsData: {
            exists: true,
            content: `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Gemini
Allow: /

Sitemap: https://example.com/sitemap.xml`,
            optimizationScore: 85,
            crawlers: [
              {
                id: 1,
                name: "GPTBot",
                userAgent: "GPTBot",
                description: "OpenAI\'s web crawler for ChatGPT",
                permission: "allowed",
                crawlDelay: null,
                lastCrawled: "2025-01-15",
                frequency: "Daily",
                allowedPaths: ["/", "/products/*", "/blog/*"],
                disallowedPaths: [],
                impact: "High visibility in ChatGPT responses and citations"
              },
              {
                id: 2,
                name: "PerplexityBot",
                userAgent: "PerplexityBot",
                description: "Perplexity AI\'s search crawler",
                permission: "allowed",
                crawlDelay: "1",
                lastCrawled: "2025-01-14",
                frequency: "Every 2 days",
                allowedPaths: ["/", "/products/*"],
                disallowedPaths: ["/admin/*"],
                impact: "Enhanced presence in Perplexity search results"
              },
              {
                id: 3,
                name: "Gemini",
                userAgent: "Gemini",
                description: "Google\'s Gemini AI crawler",
                permission: "partial",
                crawlDelay: null,
                lastCrawled: "2025-01-13",
                frequency: "Weekly",
                allowedPaths: ["/"],
                disallowedPaths: ["/private/*", "/admin/*"],
                impact: "Limited access may reduce Gemini AI understanding"
              }
            ],
            recommendations: [
              {
                id: 1,
                title: "Optimize Gemini Access",
                description: "Allow broader access to Gemini crawler for better AI understanding",
                priority: "high",
                impact: "High",
                difficulty: "Easy",
                estimatedTime: "15 minutes",
                icon: "Bot",
                codeExample: `User-agent: Gemini
Allow: /
Allow: /products/*
Allow: /blog/*
Disallow: /admin/*`
              },
              {
                id: 2,
                title: "Add Crawl Delay Optimization",
                description: "Fine-tune crawl delays for better server performance",
                priority: "medium",
                impact: "Medium",
                difficulty: "Easy",
                estimatedTime: "10 minutes",
                icon: "Clock",
                codeExample: `User-agent: *
Crawl-delay: 1

User-agent: GPTBot
Crawl-delay: 0.5`
              }
            ]
          },
          summaryData: {
            overview: {
              aiReadiness: 78,
              aiReadinessDescription: "Good optimization with room for improvement",
              discoverability: 82,
              discoverabilityDescription: "Well-structured for AI discovery",
              performance: 74,
              performanceDescription: "Moderate performance optimization",
              executiveSummary: `This website demonstrates good AI readiness with a score of 78/100. The structured data implementation is strong, particularly for product information. However, there are opportunities to improve crawlability and content quality. Key areas for improvement include enhancing robots.txt configuration for AI crawlers and optimizing metadata for better semantic understanding.`,
              keyFindings: [
                {
                  title: "Strong Product Schema",
                  description: "Well-implemented product structured data",
                  score: 85,
                  icon: "ShoppingCart"
                },
                {
                  title: "Good Content Structure",
                  description: "Proper heading hierarchy and semantic markup",
                  score: 76,
                  icon: "FileText"
                },
                {
                  title: "Crawler Accessibility",
                  description: "Most AI crawlers have proper access",
                  score: 72,
                  icon: "Search"
                }
              ]
            },
            contentQuality: {
              metrics: [
                { label: "Readability", value: "8.2/10", score: 82 },
                { label: "Semantic Depth", value: "7.1/10", score: 71 },
                { label: "Entity Coverage", value: "6.8/10", score: 68 },
                { label: "Topic Authority", value: "7.5/10", score: 75 }
              ],
              analysis: [
                {
                  aspect: "Content Structure",
                  assessment: "Well-organized with clear heading hierarchy and logical flow",
                  suggestions: [
                    "Add more descriptive subheadings",
                    "Include topic clusters for better semantic understanding"
                  ]
                },
                {
                  aspect: "Entity Recognition",
                  assessment: "Good coverage of main entities but missing some contextual relationships",
                  suggestions: [
                    "Add more entity markup",
                    "Improve entity relationship definitions"
                  ]
                }
              ]
            },
            semanticStructure: {
              hierarchy: [
                { tag: "H1", count: 1, depth: 0, quality: "Good", score: 85, icon: "Heading1" },
                { tag: "H2", count: 4, depth: 1, quality: "Excellent", score: 90, icon: "Heading2" },
                { tag: "H3", count: 8, depth: 2, quality: "Good", score: 80, icon: "Heading3" }
              ],
              entities: [
                {
                  type: "Products",
                  items: ["Premium Headphones", "Wireless Earbuds", "Audio Accessories"]
                },
                {
                  type: "Brands",
                  items: ["AudioTech", "SoundPro", "TechAudio"]
                },
                {
                  type: "Categories",
                  items: ["Electronics", "Audio Equipment", "Consumer Tech"]
                }
              ]
            },
            competitiveAnalysis: {
              positioning: [
                { category: "AI Readiness", rank: "#3", competitors: 10, score: 78 },
                { category: "Structured Data", rank: "#2", competitors: 10, score: 85 },
                { category: "Content Quality", rank: "#4", competitors: 10, score: 76 }
              ],
              strengths: [
                "Comprehensive product schema implementation",
                "Strong technical SEO foundation",
                "Good content organization and structure",
                "Effective use of semantic markup"
              ],
              opportunities: [
                "Improve FAQ schema implementation",
                "Enhance robots.txt for AI crawlers",
                "Add more entity relationship markup",
                "Optimize metadata for better AI understanding"
              ]
            },
            nextSteps: [
              {
                title: "Fix FAQ Schema",
                description: "Implement proper FAQ structured data format",
                priority: "high",
                icon: "AlertTriangle"
              },
              {
                title: "Optimize Robots.txt",
                description: "Improve AI crawler access permissions",
                priority: "high",
                icon: "Shield"
              },
              {
                title: "Enhance Metadata",
                description: "Add missing Open Graph and meta tags",
                priority: "medium",
                icon: "Tag"
              },
              {
                title: "Content Optimization",
                description: "Improve semantic markup and entity coverage",
                priority: "medium",
                icon: "FileText"
              }
            ]
          },
          recommendations: [
            {
              id: 1,
              title: "Implement Missing Brand Schema",
              description: "Add brand information to product schema for better AI understanding and trust signals",
              priority: "high",
              impact: "high",
              expectedImpact: 15,
              difficulty: 2,
              estimatedTime: "30 minutes",
              category: "Structured Data",
              icon: "Tag",
              steps: [
                "Identify all products missing brand information",
                "Add brand schema markup to product pages",
                "Test implementation with Google\'s Rich Results Test",
                "Monitor for improved AI agent recognition"
              ],
              codeExample: `{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Premium Headphones",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  }
}`,
              resources: [
                { title: "Schema.org Product Documentation", url: "#" },
                { title: "Google Rich Results Guide", url: "#" }
              ],
              affectedAreas: ["Product Pages", "Search Results", "AI Responses"]
            },
            {
              id: 2,
              title: "Optimize FAQ Schema Structure",
              description: "Fix FAQ schema implementation to use proper acceptedAnswer format",
              priority: "high",
              impact: "medium",
              expectedImpact: 12,
              difficulty: 1,
              estimatedTime: "20 minutes",
              category: "Structured Data",
              icon: "HelpCircle",
              steps: [
                "Review current FAQ schema implementation",
                "Update to use acceptedAnswer structure",
                "Validate with structured data testing tool",
                "Deploy changes to production"
              ],
              codeExample: `{
  "@context": "https://schema.org/",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is the warranty?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "2 years limited warranty"
    }
  }]
}`,
              resources: [
                { title: "FAQ Schema Guidelines", url: "#" }
              ],
              affectedAreas: ["FAQ Pages", "Voice Search", "AI Responses"]
            },
            {
              id: 3,
              title: "Enhance Robots.txt for AI Crawlers",
              description: "Optimize robots.txt configuration to improve AI crawler access and indexing",
              priority: "medium",
              impact: "high",
              expectedImpact: 18,
              difficulty: 2,
              estimatedTime: "45 minutes",
              category: "Crawlability",
              icon: "Shield",
              steps: [
                "Audit current robots.txt configuration",
                "Research AI crawler user agents",
                "Update robots.txt with optimized rules",
                "Test crawler access and monitor results"
              ],
              codeExample: `User-agent: GPTBot
Allow: /
Allow: /products/*
Allow: /blog/*
Crawl-delay: 0.5

User-agent: PerplexityBot
Allow: /
Crawl-delay: 1`,
              resources: [
                { title: "AI Crawler Documentation", url: "#" },
                { title: "Robots.txt Best Practices", url: "#" }
              ],
              affectedAreas: ["Site Crawling", "AI Indexing", "Search Visibility"]
            }
          ],
          metadataData: {
            overallScore: 72,
            summary: {
              present: 12,
              missing: 5,
              suboptimal: 3,
              total: 20
            },
            criticalIssues: [
              {
                title: "Missing Open Graph Image",
                description: "No og:image meta tag found, affecting social media sharing",
                impact: "Reduced social media visibility and click-through rates"
              },
              {
                title: "Suboptimal Meta Description",
                description: "Meta description is too short and not descriptive enough",
                impact: "Lower search engine click-through rates"
              }
            ],
            quickWins: [
              {
                title: "Add Missing Alt Tags",
                description: "Several images are missing alt attributes",
                estimatedTime: "15 minutes"
              },
              {
                title: "Optimize Title Tags",
                description: "Some title tags exceed recommended length",
                estimatedTime: "20 minutes"
              }
            ],
            metaTags: [
              {
                id: 1,
                name: "Title Tag",
                description: "HTML page title",
                status: "suboptimal",
                currentValue: "Premium Headphones - AudioTech Store",
                issues: ["Title is too short", "Missing brand positioning"],
                recommendations: ["Extend to 50-60 characters", "Include key benefits"],
                suggestedValue: "<title>Premium Wireless Headphones - Noise Cancelling Audio | AudioTech</title>"
              },
              {
                id: 2,
                name: "Meta Description",
                description: "Page description for search results",
                status: "missing",
                issues: ["No meta description found"],
                recommendations: ["Add compelling 150-160 character description"],
                suggestedValue: "<meta name=\"description\" content=\"Discover premium wireless headphones with advanced noise cancelling technology. Free shipping, 2-year warranty, and 30-day returns at AudioTech.\">"
              }
            ],
            openGraph: {
              score: 45,
              preview: {
                title: "Premium Headphones - AudioTech Store",
                description: null,
                url: "https://example.com"
              },
              properties: [
                {
                  id: 1,
                  property: "og:title",
                  description: "Social media title",
                  status: "present",
                  currentValue: "Premium Headphones - AudioTech Store"
                },
                {
                  id: 2,
                  property: "og:description",
                  description: "Social media description",
                  status: "missing",
                  recommendation: "Add compelling description for social sharing"
                },
                {
                  id: 3,
                  property: "og:image",
                  description: "Social media image",
                  status: "missing",
                  recommendation: "Add high-quality product image (1200x630px)"
                }
              ]
            },
            jsonLd: {
              implementationScore: 78,
              schemasFound: 2,
              validationErrors: 1,
              schemas: [
                {
                  id: 1,
                  type: "Product",
                  description: "Product information schema",
                  status: "present",
                  currentImplementation: {
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": "Premium Headphones",
                    "price": "299.99"
                  },
                  errors: [],
                  suggestions: ["Add brand information", "Include customer reviews"]
                },
                {
                  id: 2,
                  type: "Organization",
                  description: "Company information schema",
                  status: "suboptimal",
                  currentImplementation: {
                    "@context": "https://schema.org/",
                    "@type": "Organization",
                    "name": "AudioTech"
                  },
                  errors: ["Missing contact information"],
                  suggestions: ["Add address and contact details", "Include social media profiles"]
                }
              ]
            }
          }
        };

        setAnalysisData(mockData);
      } catch (error) {
        console.error('Failed to load analysis data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysisData();
  }, []);

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