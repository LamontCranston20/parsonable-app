import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataManagementSection = () => {
  const [isLoading, setIsLoading] = useState({
    export: false,
    download: false,
    delete: false
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dataStats = {
    totalScans: 127,
    reportsGenerated: 45,
    dataSize: "2.3 MB",
    accountCreated: "2024-08-15",
    lastBackup: "2025-01-10"
  };

  const handleExportHistory = async () => {
    setIsLoading(prev => ({ ...prev, export: true }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock CSV data
      const csvData = `Date,URL,Score,Status
2025-01-16,https://example.com,85,Completed
2025-01-15,https://test.com,72,Completed
2025-01-14,https://demo.com,91,Completed`;
      
      // Create and download file
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scan-history-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error exporting scan history:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, export: false }));
    }
  };

  const handleDownloadData = async () => {
    setIsLoading(prev => ({ ...prev, download: true }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Create mock JSON data
      const userData = {
        profile: {
          name: "John Doe",
          email: "john@example.com",
          company: "Tech Corp",
          createdAt: "2024-08-15T10:30:00Z"
        },
        scans: [
          {
            id: 1,
            url: "https://example.com",
            score: 85,
            date: "2025-01-16T15:30:00Z",
            status: "completed"
          }
        ],
        settings: {
          notifications: true,
          twoFactor: false
        }
      };
      
      // Create and download file
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `account-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading account data:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, download: false }));
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(prev => ({ ...prev, delete: true }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear localStorage and redirect
      localStorage.clear();
      window.location.href = '/homepage-url-analysis';
      
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false }));
      setShowDeleteConfirmation(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Database" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Data Management</h2>
      </div>

      <div className="space-y-6">
        {/* Data Overview */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Account Data Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{dataStats.totalScans}</div>
              <div className="text-sm text-muted-foreground">Total Scans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{dataStats.reportsGenerated}</div>
              <div className="text-sm text-muted-foreground">Reports Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{dataStats.dataSize}</div>
              <div className="text-sm text-muted-foreground">Data Size</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">
                {formatDate(dataStats.accountCreated)}
              </div>
              <div className="text-sm text-muted-foreground">Account Created</div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Export Your Data</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Scan History</h4>
                <p className="text-sm text-muted-foreground">
                  Export all your URL scan results and analysis data as CSV
                </p>
              </div>
              <Button
                variant="outline"
                loading={isLoading.export}
                iconName="Download"
                iconPosition="left"
                onClick={handleExportHistory}
              >
                Export CSV
              </Button>
            </div>

            <hr className="border-border" />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Complete Account Data</h4>
                <p className="text-sm text-muted-foreground">
                  Download all your account information, settings, and scan data
                </p>
              </div>
              <Button
                variant="outline"
                loading={isLoading.download}
                iconName="Package"
                iconPosition="left"
                onClick={handleDownloadData}
              >
                Download JSON
              </Button>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Data Retention</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Scan History Retention</span>
              <span className="text-sm text-muted-foreground">12 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Report Storage</span>
              <span className="text-sm text-muted-foreground">6 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Last Data Backup</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(dataStats.lastBackup)}
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/20 bg-destructive/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
            <h3 className="font-medium text-destructive">Danger Zone</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              
              {!showDeleteConfirmation ? (
                <Button
                  variant="destructive"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete Account
                </Button>
              ) : (
                <div className="bg-card border border-destructive rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="AlertCircle" size={16} className="text-destructive" />
                    <span className="font-medium text-destructive">Confirm Account Deletion</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Are you absolutely sure? This will permanently delete your account, 
                    all scan history, reports, and settings. This action cannot be undone.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDeleteConfirmation(false)}
                      disabled={isLoading.delete}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      loading={isLoading.delete}
                      iconName="Trash2"
                      iconPosition="left"
                      onClick={handleDeleteAccount}
                    >
                      Yes, Delete My Account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagementSection;