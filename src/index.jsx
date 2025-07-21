import { performCompleteAnalysis } from '../../services/analysisService';
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
  const [stats, setStats] = useState(null);
  const [scans, setScans] = useState([]);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState([]);
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

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      // Load user (still from localStorage for now)
      const userData = localStorage.getItem('userData');
      const parsedUser = userData ? JSON.parse(userData) : mockUser;
      setUser(parsedUser);

      const url = 'https://www.bbc.com'; // 🔁 Replace this with dynamic input later
      const result = await performCompleteAnalysis(url);

      // Build dashboard view from real result
      setStats({
        totalScans: 1,
        averageScore: result.score,
        monthlyScans: 1,
        improvedSites: 0 // or calculate from activity
      });

      setScans([
        {
          id: 1,
          url: url,
          score: result.score,
          date: new Date().toISOString(),
          issues: result.aiSummary?.insights || []
        }
      ]);

      setActivities([
        {
          id: 1,
          type: "scan",
          message: `Scanned ${url} with score ${result.score}/100`,
          timestamp: new Date().toISOString()
        }
      ]);

      setChartData([
        { date: 'Today', score: result.score }
      ]);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();
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
          
          <StatsCards stats={stats} />
          
          <QuickActions />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RecentScans scans={scans} />
            </div>
            <div className="lg:col-span-1">
              <ActivityFeed activities={activities} />
            </div>
          </div>
          
          <ProgressChart chartData={chartData} />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
