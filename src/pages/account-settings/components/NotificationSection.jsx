import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const NotificationSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    scanCompletion: true,
    weeklyReports: true,
    featureAnnouncements: false,
    securityAlerts: true,
    billingUpdates: true,
    marketingEmails: false,
    systemMaintenance: true,
    apiUsageAlerts: false
  });

  const handleNotificationChange = (key, checked) => {
    setNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('notificationSettings', JSON.stringify(notifications));
      
      // Show success message (you could add a toast here)
      console.log('Notification preferences saved successfully');
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const notificationGroups = [
    {
      title: "Scan & Analysis",
      description: "Notifications related to your URL scans and analysis results",
      icon: "Search",
      settings: [
        {
          key: "scanCompletion",
          label: "Scan Completion",
          description: "Get notified when your URL analysis is complete"
        },
        {
          key: "weeklyReports",
          label: "Weekly Summary Reports",
          description: "Receive weekly summaries of your scanning activity"
        }
      ]
    },
    {
      title: "Product Updates",
      description: "Stay informed about new features and improvements",
      icon: "Bell",
      settings: [
        {
          key: "featureAnnouncements",
          label: "Feature Announcements",
          description: "Learn about new features and product updates"
        },
        {
          key: "systemMaintenance",
          label: "System Maintenance",
          description: "Important notifications about scheduled maintenance"
        }
      ]
    },
    {
      title: "Account & Security",
      description: "Critical notifications about your account security",
      icon: "Shield",
      settings: [
        {
          key: "securityAlerts",
          label: "Security Alerts",
          description: "Important security notifications and login alerts"
        },
        {
          key: "billingUpdates",
          label: "Billing Updates",
          description: "Notifications about payments, invoices, and billing changes"
        }
      ]
    },
    {
      title: "Marketing & API",
      description: "Optional notifications for marketing and API usage",
      icon: "Mail",
      settings: [
        {
          key: "marketingEmails",
          label: "Marketing Emails",
          description: "Promotional emails about tips, tutorials, and offers"
        },
        {
          key: "apiUsageAlerts",
          label: "API Usage Alerts",
          description: "Notifications when approaching API usage limits"
        }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
        </div>
        <Button
          variant="default"
          size="sm"
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          onClick={handleSaveNotifications}
        >
          Save Preferences
        </Button>
      </div>

      <div className="space-y-6">
        {notificationGroups.map((group) => (
          <div key={group.title} className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={group.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{group.title}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {group.settings.map((setting) => (
                <div key={setting.key} className="flex items-start space-x-3">
                  <Checkbox
                    checked={notifications[setting.key]}
                    onChange={(e) => handleNotificationChange(setting.key, e.target.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label className="font-medium text-foreground cursor-pointer">
                      {setting.label}
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {setting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allEnabled = Object.fromEntries(
                  Object.keys(notifications).map(key => [key, true])
                );
                setNotifications(allEnabled);
              }}
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const allDisabled = Object.fromEntries(
                  Object.keys(notifications).map(key => [key, false])
                );
                setNotifications(allDisabled);
              }}
            >
              Disable All
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {Object.values(notifications).filter(Boolean).length} of {Object.keys(notifications).length} enabled
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;