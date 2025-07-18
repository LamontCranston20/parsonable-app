import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeCard = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getSubscriptionBadge = () => {
    const subscription = user?.subscription || 'Free Plan';
    const badgeColors = {
      'Free Plan': 'bg-muted text-muted-foreground',
      'Pro Plan': 'bg-primary/10 text-primary',
      'Enterprise': 'bg-accent/10 text-accent'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeColors[subscription] || badgeColors['Free Plan']}`}>
        {subscription}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-lg">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || 'U'
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {getGreeting()}, {user?.name || 'User'}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back to your Agent Readiness Dashboard
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:items-end space-y-2">
          {getSubscriptionBadge()}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Last login: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;