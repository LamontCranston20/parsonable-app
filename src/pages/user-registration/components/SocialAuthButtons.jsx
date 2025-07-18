import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialAuthButtons = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialAuth = async (provider) => {
    setLoadingProvider(provider);

    try {
      // Simulate social auth API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful social authentication
      const userData = {
        id: Date.now(),
        name: provider === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider === 'google' ? 'john.doe@gmail.com' : 'jane.smith@github.com',
        avatar: provider === 'google' ?'https://randomuser.me/api/portraits/men/32.jpg' :'https://randomuser.me/api/portraits/women/44.jpg',
        subscription: 'Free Plan',
        provider: provider,
        createdAt: new Date().toISOString()
      };

      // Store user data and auth token
      localStorage.setItem('authToken', `mock-${provider}-token-` + Date.now());
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirect to dashboard
      navigate('/user-dashboard', {
        state: {
          message: `Welcome! You've successfully signed up with ${provider === 'google' ? 'Google' : 'GitHub'}.`,
          type: 'success'
        }
      });

    } catch (error) {
      console.error(`${provider} authentication failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={() => handleSocialAuth('google')}
        loading={loadingProvider === 'google'}
        disabled={loadingProvider !== null}
        iconName="Chrome"
        iconPosition="left"
      >
        Continue with Google
      </Button>

      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={() => handleSocialAuth('github')}
        loading={loadingProvider === 'github'}
        disabled={loadingProvider !== null}
        iconName="Github"
        iconPosition="left"
      >
        Continue with GitHub
      </Button>
    </div>
  );
};

export default SocialAuthButtons;