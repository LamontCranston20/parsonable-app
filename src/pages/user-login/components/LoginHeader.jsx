import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
          <Icon name="Zap" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Welcome Back
      </h1>
      
      <p className="text-muted-foreground mb-6">
        Sign in to access your dashboard and premium features
      </p>
      
      <div className="text-sm text-muted-foreground">
        New to Agent Readiness Scanner?{' '}
        <Link
          to="/user-registration"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;