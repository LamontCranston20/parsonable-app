import React, { useState, useEffect } from 'react';
import AuthenticationStateHeader from '../../components/ui/AuthenticationStateHeader';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import ProtectedRouteWrapper from '../../components/ui/ProtectedRouteWrapper';
import ProfileSection from './components/ProfileSection';
import SubscriptionSection from './components/SubscriptionSection';
import NotificationSection from './components/NotificationSection';
import SecuritySection from './components/SecuritySection';
import DataManagementSection from './components/DataManagementSection';
import ApiAccessSection from './components/ApiAccessSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AccountSettings = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const settingSections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      component: ProfileSection
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: 'CreditCard',
      component: SubscriptionSection
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationSection
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecuritySection
    },
    {
      id: 'data',
      label: 'Data Management',
      icon: 'Database',
      component: DataManagementSection
    },
    {
      id: 'api',
      label: 'API Access',
      icon: 'Code',
      component: ApiAccessSection
    }
  ];

  const getCurrentSection = () => {
    return settingSections.find(section => section.id === activeSection);
  };

  const renderActiveSection = () => {
    const currentSection = getCurrentSection();
    if (!currentSection) return null;

    const Component = currentSection.component;
    
    switch (activeSection) {
      case 'profile':
        return <Component user={user} onUpdateProfile={handleUpdateProfile} />;
      case 'subscription':
        return <Component user={user} />;
      case 'api':
        return <Component user={user} />;
      default:
        return <Component />;
    }
  };

  return (
    <ProtectedRouteWrapper>
      <div className="min-h-screen bg-background">
        <AuthenticationStateHeader />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NavigationBreadcrumbs />
            
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage your account preferences, security settings, and subscription details
                  </p>
                </div>
                
                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                  <Button
                    variant="outline"
                    size="icon"
                    iconName={isMobileMenuOpen ? "X" : "Menu"}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <span className="sr-only">Toggle settings menu</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Settings Navigation - Desktop Sidebar */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                  <nav className="space-y-2">
                    {settingSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon 
                          name={section.icon} 
                          size={18} 
                          color={activeSection === section.id ? 'white' : 'currentColor'}
                        />
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Settings Navigation - Mobile Dropdown */}
              {isMobileMenuOpen && (
                <div className="lg:hidden mb-6">
                  <div className="bg-card rounded-lg border border-border p-4">
                    <nav className="space-y-2">
                      {settingSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => {
                            setActiveSection(section.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                            activeSection === section.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          <Icon 
                            name={section.icon} 
                            size={18} 
                            color={activeSection === section.id ? 'white' : 'currentColor'}
                          />
                          <span className="font-medium">{section.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              )}

              {/* Mobile Section Header */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getCurrentSection()?.icon || 'Settings'} 
                    size={20} 
                    className="text-primary" 
                  />
                  <h2 className="text-xl font-semibold text-foreground">
                    {getCurrentSection()?.label || 'Settings'}
                  </h2>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Icon name="Zap" size={14} color="white" />
                </div>
                <span className="font-semibold text-foreground">Agent Readiness Scanner</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Agent Readiness Scanner. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRouteWrapper>
  );
};

export default AccountSettings;