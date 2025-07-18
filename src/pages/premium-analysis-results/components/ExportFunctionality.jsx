import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportFunctionality = ({ analysisData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeOptions, setIncludeOptions] = useState({
    summary: true,
    recommendations: true,
    technicalDetails: true,
    codeExamples: false,
    charts: true
  });

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Professional PDF document' },
    { id: 'json', label: 'JSON Data', icon: 'Code', description: 'Raw analysis data' },
    { id: 'csv', label: 'CSV Export', icon: 'Table', description: 'Spreadsheet format' },
    { id: 'html', label: 'HTML Report', icon: 'Globe', description: 'Web-friendly format' }
  ];

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate export generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock download
      const filename = `agent-readiness-report-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      const blob = new Blob(['Mock report content'], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionChange = (option) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const getEstimatedSize = () => {
    let size = 0.5; // Base size in MB
    if (includeOptions.technicalDetails) size += 0.3;
    if (includeOptions.codeExamples) size += 0.2;
    if (includeOptions.charts) size += 0.4;
    if (includeOptions.recommendations) size += 0.1;
    
    return size.toFixed(1);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Download" size={24} className="text-primary" />
          <span>Export Analysis Report</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Format Selection */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="FileType" size={20} className="text-primary" />
            <span>Export Format</span>
          </h3>
          <div className="space-y-3">
            {exportFormats.map((format) => (
              <label key={format.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="exportFormat"
                  value={format.id}
                  checked={exportFormat === format.id}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={format.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{format.label}</div>
                    <div className="text-sm text-muted-foreground">{format.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Include Options */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <span>Include in Report</span>
          </h3>
          <div className="space-y-3">
            {Object.entries(includeOptions).map(([option, checked]) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleOptionChange(option)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="font-medium text-foreground capitalize">
                    {option.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {option === 'summary' && 'Executive summary and key findings'}
                    {option === 'recommendations' && 'Actionable improvement suggestions'}
                    {option === 'technicalDetails' && 'Detailed technical analysis'}
                    {option === 'codeExamples' && 'Implementation code snippets'}
                    {option === 'charts' && 'Visual charts and graphs'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="mt-6 p-4 bg-background rounded-lg border border-border">
        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-primary" />
          <span>Report Preview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{getEstimatedSize()} MB</div>
            <div className="text-sm text-muted-foreground">Estimated Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Object.values(includeOptions).filter(Boolean).length}
            </div>
            <div className="text-sm text-muted-foreground">Sections Included</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {exportFormat.toUpperCase()}
            </div>
            <div className="text-sm text-muted-foreground">Format</div>
          </div>
        </div>
      </div>

      {/* Report Contents */}
      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="List" size={20} className="text-primary" />
          <span>Report Contents</span>
        </h3>
        <div className="space-y-2">
          {includeOptions.summary && (
            <div className="flex items-center space-x-3 p-2 bg-success/5 rounded border border-success/20">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">Executive Summary & Key Metrics</span>
            </div>
          )}
          {includeOptions.recommendations && (
            <div className="flex items-center space-x-3 p-2 bg-success/5 rounded border border-success/20">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">Improvement Recommendations ({analysisData?.recommendations?.length || 0} items)</span>
            </div>
          )}
          {includeOptions.technicalDetails && (
            <div className="flex items-center space-x-3 p-2 bg-success/5 rounded border border-success/20">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">Technical Analysis & Metadata Review</span>
            </div>
          )}
          {includeOptions.codeExamples && (
            <div className="flex items-center space-x-3 p-2 bg-success/5 rounded border border-success/20">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">Implementation Code Examples</span>
            </div>
          )}
          {includeOptions.charts && (
            <div className="flex items-center space-x-3 p-2 bg-success/5 rounded border border-success/20">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">Visual Charts & Performance Graphs</span>
            </div>
          )}
        </div>
      </div>

      {/* Export Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Report will be generated in {exportFormat.toUpperCase()} format</span>
            <span>•</span>
            <span>Estimated size: {getEstimatedSize()} MB</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              disabled={isGenerating}
            >
              Preview Report
            </Button>
            <Button
              variant="default"
              iconName={isGenerating ? "Loader2" : "Download"}
              iconPosition="left"
              loading={isGenerating}
              onClick={handleExport}
            >
              {isGenerating ? 'Generating Report...' : 'Generate & Download'}
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <span>Recent Exports</span>
        </h3>
        <div className="space-y-2">
          {[
            { date: '2025-01-15', format: 'PDF', size: '2.1 MB', status: 'completed' },
            { date: '2025-01-14', format: 'JSON', size: '0.8 MB', status: 'completed' },
            { date: '2025-01-13', format: 'HTML', size: '1.5 MB', status: 'completed' }
          ].map((export_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background rounded border border-border">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-primary" />
                <div>
                  <div className="font-medium text-foreground">
                    Agent Readiness Report - {export_.date}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {export_.format} • {export_.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-success/10 text-success rounded text-xs">
                  {export_.status}
                </span>
                <Button variant="ghost" size="sm" iconName="Download" iconSize={14}>
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportFunctionality;