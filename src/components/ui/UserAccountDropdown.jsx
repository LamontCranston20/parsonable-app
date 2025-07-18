import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserAccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsOpen(false);
    navigate('/homepage-url-analysis');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  if (!user) {
    return null;
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserDisplayName = () => {
    return user.name || user.email || 'User';
  };

  const getSubscriptionStatus = () => {
    return user.subscription || 'Free Plan';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-xs">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={getUserDisplayName()} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(getUserDisplayName())
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium">{getUserDisplayName()}</div>
          <div className="text-xs text-muted-foreground">{getSubscriptionStatus()}</div>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="transition-transform duration-200"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-elevation-3 z-50 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={getUserDisplayName()} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(getUserDisplayName())
                )}
              </div>
              <div>
                <div className="font-medium text-popover-foreground">{getUserDisplayName()}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {getSubscriptionStatus()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              to="/user-dashboard"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={closeDropdown}
            >
              <Icon name="LayoutDashboard" size={16} />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/premium-analysis-results"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={closeDropdown}
            >
              <Icon name="BarChart3" size={16} />
              <span>Analysis Results</span>
            </Link>

            <Link
              to="/account-settings"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={closeDropdown}
            >
              <Icon name="Settings" size={16} />
              <span>Account Settings</span>
            </Link>

            <hr className="my-2 border-border" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountDropdown;