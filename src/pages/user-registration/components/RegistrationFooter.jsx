import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationFooter = () => {
  return (
    <div className="space-y-4">
      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link 
            to="/user-login" 
            className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center">
        <Link 
          to="/homepage-url-analysis" 
          className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <span>← Back to Home</span>
        </Link>
      </div>

      {/* Legal Links */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-muted-foreground">
        <Link to="#" className="hover:text-primary transition-colors duration-200">
          Terms of Service
        </Link>
        <Link to="#" className="hover:text-primary transition-colors duration-200">
          Privacy Policy
        </Link>
        <Link to="#" className="hover:text-primary transition-colors duration-200">
          Cookie Policy
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
        <p>&copy; {new Date().getFullYear()} Agent Readiness Scanner. All rights reserved.</p>
      </div>
    </div>
  );
};

export default RegistrationFooter;