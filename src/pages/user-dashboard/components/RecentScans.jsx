import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RecentScans = ({ scans }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterScore, setFilterScore] = useState('all');
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'date', label: 'Latest First' },
    { value: 'score', label: 'Highest Score' },
    { value: 'url', label: 'URL (A-Z)' }
  ];

  const scoreFilterOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'excellent', label: 'Excellent (80-100)' },
    { value: 'good', label: 'Good (60-79)' },
    { value: 'fair', label: 'Fair (40-59)' },
    { value: 'poor', label: 'Poor (0-39)' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success bg-success/10';
    if (score >= 60) return 'text-accent bg-accent/10';
    if (score >= 40) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const filteredAndSortedScans = scans
    .filter(scan => {
      const matchesSearch = scan.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesScore = filterScore === 'all' || 
        (filterScore === 'excellent' && scan.score >= 80) ||
        (filterScore === 'good' && scan.score >= 60 && scan.score < 80) ||
        (filterScore === 'fair' && scan.score >= 40 && scan.score < 60) ||
        (filterScore === 'poor' && scan.score < 40);
      return matchesSearch && matchesScore;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'url':
          return a.url.localeCompare(b.url);
        case 'date':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const handleViewReport = (scanId) => {
    navigate('/premium-analysis-results', { state: { scanId } });
  };

  const handleRescan = (url) => {
    navigate('/homepage-url-analysis', { state: { url } });
  };

  if (scans.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Scans Yet</h3>
        <p className="text-muted-foreground mb-6">
          Start analyzing your websites to see how ready they are for AI agents
        </p>
        <Button onClick={() => navigate('/homepage-url-analysis')}>
          Start Your First Analysis
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Recent Scans</h2>
          <span className="text-sm text-muted-foreground">({scans.length})</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/premium-analysis-results')}
        >
          View All
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search by URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by..."
        />
        <Select
          options={scoreFilterOptions}
          value={filterScore}
          onChange={setFilterScore}
          placeholder="Filter by score..."
        />
      </div>

      {/* Scans List */}
      <div className="space-y-4">
        {filteredAndSortedScans.slice(0, 5).map((scan) => (
          <div key={scan.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(scan.score)}`}>
                      {scan.score}/100
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{scan.url}</h3>
                    <p className="text-xs text-muted-foreground">
                      {getScoreLabel(scan.score)} • Scanned on {new Date(scan.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scan.issues.slice(0, 3).map((issue, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                      <Icon name="AlertCircle" size={12} className="mr-1" />
                      {issue}
                    </span>
                  ))}
                  {scan.issues.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{scan.issues.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRescan(scan.url)}
                  iconName="RefreshCw"
                  iconSize={14}
                >
                  Re-scan
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleViewReport(scan.id)}
                  iconName="Eye"
                  iconSize={14}
                >
                  View Report
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedScans.length > 5 && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/premium-analysis-results')}
          >
            View All {filteredAndSortedScans.length} Scans
          </Button>
        </div>
      )}

      {filteredAndSortedScans.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No scans found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default RecentScans;