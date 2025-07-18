import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationStateHeader from '../../components/ui/AuthenticationStateHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import WelcomeCard from './components/WelcomeCard';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import RecentScans from './components/RecentScans';
import ActivityFeed from './components/ActivityFeed';
import ProgressChart from './components/ProgressChart';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subscription: "Pro Plan",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c3c8e4?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-01-15",
    lastLogin: new Date().toISOString()
  };

  // Mock statistics data
  const mockStats = {
    totalScans: 47,
    averageScore: 73,
    monthlyScans: 12,
    improvedSites: 8
  };

  // Mock recent scans data
  const mockScans = [
    {
      id: 1,
      url: "https://techstartup.com",
      score: 85,
      date: "2025-01-15T10:30:00Z",
      issues: ["Missing FAQ schema", "Robots.txt optimization"]
    },
    {
      id: 2,
      url: "https://ecommerce-store.com",
      score: 72,
      date: "2025-01-14T15:45:00Z",
      issues: ["Product schema incomplete", "Meta descriptions", "Image alt tags"]
    },
    {
      id: 3,
      url: "https://consulting-firm.net",
      score: 91,
      date: "2025-01-13T09:20:00Z",
      issues: ["Minor structured data"]
    },
    {
      id: 4,
      url: "https://restaurant-website.com",
      score: 58,
      date: "2025-01-12T14:10:00Z",
      issues: ["Missing organization schema", "Poor crawlability", "No sitemap", "Meta tags missing"]
    },
    {
      id: 5,
      url: "https://portfolio-site.dev",
      score: 79,
      date: "2025-01-11T11:30:00Z",
      issues: ["Social media meta tags", "Schema markup"]
    },
    {
      id: 6,
      url: "https://news-blog.org",
      score: 66,
      date: "2025-01-10T16:20:00Z",
      issues: ["Article schema", "Breadcrumb navigation", "Image optimization"]
    }
  ];

  // Mock activity feed data
  const mockActivities = [
    {
      id: 1,
      type: "scan",
      message: "Completed analysis for techstartup.com with score 85/100",
      timestamp: "2025-01-15T10:30:00Z"
    },
    {
      id: 2,
      type: "improvement",
      message: "ecommerce-store.com score improved from 65 to 72",
      timestamp: "2025-01-14T15:45:00Z"
    },
    {
      id: 3,
      type: "report",
      message: "Downloaded PDF report for consulting-firm.net",
      timestamp: "2025-01-13T09:20:00Z"
    },
    {
      id: 4,
      type: "scan",
      message: "New analysis started for restaurant-website.com",
      timestamp: "2025-01-12T14:10:00Z"
    },
    {
      id: 5,
      type: "account",
      message: "Upgraded to Pro Plan subscription",
      timestamp: "2025-01-10T12:00:00Z"
    },
    {
      id: 6,
      type: "improvement",
      message: "portfolio-site.dev achieved 79/100 score",
      timestamp: "2025-01-11T11:30:00Z"
    }
  ];

  // Mock chart data
  const mockChartData = [
    { date: "Jan 1", score: 65 },
    { date: "Jan 3", score: 68 },
    { date: "Jan 5", score: 71 },
    { date: "Jan 7", score: 69 },
    { date: "Jan 9", score: 74 },
    { date: "Jan 11", score: 79 },
    { date: "Jan 13", score: 91 },
    { date: "Jan 15", score: 85 }
  ];

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          // Use mock data if no user data in localStorage
          setUser(mockUser);
          localStorage.setItem('userData', JSON.stringify(mockUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser(mockUser);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticationStateHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Agent Readiness Scanner</title>
        <meta name="description" content="Monitor your website's AI agent readiness with comprehensive analytics and insights." />
      </Helmet>

      <AuthenticationStateHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NavigationBreadcrumbs />
          
          <WelcomeCard user={user} />
          
          <StatsCards stats={mockStats} />
          
          <QuickActions />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RecentScans scans={mockScans} />
            </div>
            <div className="lg:col-span-1">
              <ActivityFeed activities={mockActivities} />
            </div>
          </div>
          
          <ProgressChart chartData={mockChartData} />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;