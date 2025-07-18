import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLoginButtons = ({ onGoogleLogin, onGithubLogin, isLoading }) => {
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        fullWidth
        onClick={onGoogleLogin}
        disabled={isLoading}
        iconName="Chrome"
        iconPosition="left"
        iconSize={20}
        className="h-12"
      >
        Continue with Google
      </Button>
      
      <Button
        variant="outline"
        fullWidth
        onClick={onGithubLogin}
        disabled={isLoading}
        iconName="Github"
        iconPosition="left"
        iconSize={20}
        className="h-12"
      >
        Continue with GitHub
      </Button>
    </div>
  );
};

export default SocialLoginButtons;