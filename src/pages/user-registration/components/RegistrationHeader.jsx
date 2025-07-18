import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <Link to="/homepage-url-analysis" className="inline-flex items-center space-x-2">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={24} color="white" />
        </div>
        <span className="text-2xl font-semibold text-foreground">Agent Readiness Scanner</span>
      </Link>

      {/* Header Content */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Join thousands of users optimizing their websites for AI agents and unlock premium features.
        </p>
      </div>

      {/* Benefits List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Check" size={16} className="text-success" />
          <span>Unlimited scans</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Check" size={16} className="text-success" />
          <span>Detailed reports</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Check" size={16} className="text-success" />
          <span>Scan history</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;