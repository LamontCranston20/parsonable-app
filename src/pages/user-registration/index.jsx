import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import SocialAuthButtons from './components/SocialAuthButtons';
import RegistrationForm from './components/RegistrationForm';
import RegistrationFooter from './components/RegistrationFooter';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      navigate('/user-dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser = {
        id: Date.now(),
        name: `${provider} User`,
        email: `${provider.toLowerCase()}_user@agentscanner.com`,
        subscription: 'Free Plan',
        provider,
        avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop&crop=face',
        joinedDate: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockUser));

      navigate('/user-dashboard', { replace: true });
    } catch (err) {
      setError(`Registration with ${provider} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => handleSocialRegister('Google');
  const handleGithubRegister = () => handleSocialRegister('GitHub');

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app: validate uniqueness, password strength, etc.
      const mockUser = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subscription: 'Free Plan',
        avatar: null,
        joinedDate: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockUser));

      navigate('/user-dashboard', { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <RegistrationHeader />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card py-8 px-4 shadow-elevation-2 sm:rounded-lg sm:px-10 border border-border">
            <div className="space-y-6">
              <SocialAuthButtons
                onGoogleRegister={handleGoogleRegister}
                onGithubRegister={handleGithubRegister}
                isLoading={isLoading}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <RegistrationForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>

          <div className="mt-8">
            <RegistrationFooter />
          </div>
        </div>
      </div>

      {/* Decorative blurred background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default UserRegistration;
