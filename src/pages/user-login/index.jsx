import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import LoginBenefits from './components/LoginBenefits';

const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user credentials for demonstration
  const mockCredentials = {
    email: "demo@agentscanner.com",
    password: "demo123"
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      const from = location.state?.from || '/user-dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social login
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        subscription: "Premium Plan",
        provider: provider
      };

      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockUser));

      const from = location.state?.from || '/user-dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => handleSocialLogin('Google');
  const handleGithubLogin = () => handleSocialLogin('GitHub');

  const handleFormSubmit = async (formData, rememberMe) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        const mockUser = {
          id: 1,
          name: "Demo User",
          email: formData.email,
          avatar: null,
          subscription: "Free Plan",
          joinedDate: "2024-01-15",
          lastLogin: new Date().toISOString()
        };

        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        const from = location.state?.from || '/user-dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Use demo@agentscanner.com / demo123');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <LoginHeader />
            
            <div className="space-y-6">
              <SocialLoginButtons
                onGoogleLogin={handleGoogleLogin}
                onGithubLogin={handleGithubLogin}
                isLoading={isLoading}
              />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
              
              <LoginForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>

        {/* Right side - Benefits (Desktop only) */}
        <LoginBenefits />
      </div>
    </div>
  );
};

export default UserLogin;