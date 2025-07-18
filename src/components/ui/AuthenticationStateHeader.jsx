import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationStateHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/homepage-url-analysis');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to={isAuthenticated ? "/user-dashboard" : "/homepage-url-analysis"} className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Zap" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">Agent Readiness Scanner</span>
    </Link>
  );

  const NavigationItems = ({ mobile = false }) => {
    const baseClasses = mobile 
      ? "block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-primary hover:bg-muted rounded-md" :"px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary rounded-md";

    const activeClasses = mobile
      ? "text-primary bg-muted" :"text-primary";

    if (!isAuthenticated) {
      return (
        <>
          <Link
            to="/homepage-url-analysis"
            className={`${baseClasses} ${isActivePath('/homepage-url-analysis') ? activeClasses : 'text-foreground'}`}
            onClick={mobile ? closeMobileMenu : undefined}
          >
            URL Analysis
          </Link>
          <Link
            to="/user-login"
            className={`${baseClasses} ${isActivePath('/user-login') ? activeClasses : 'text-foreground'}`}
            onClick={mobile ? closeMobileMenu : undefined}
          >
            Login
          </Link>
          <Link
            to="/user-registration"
            className={`${baseClasses} ${isActivePath('/user-registration') ? activeClasses : 'text-foreground'}`}
            onClick={mobile ? closeMobileMenu : undefined}
          >
            Register
          </Link>
        </>
      );
    }

    return (
      <>
        <Link
          to="/user-dashboard"
          className={`${baseClasses} ${isActivePath('/user-dashboard') ? activeClasses : 'text-foreground'}`}
          onClick={mobile ? closeMobileMenu : undefined}
        >
          Dashboard
        </Link>
        <Link
          to="/premium-analysis-results"
          className={`${baseClasses} ${isActivePath('/premium-analysis-results') ? activeClasses : 'text-foreground'}`}
          onClick={mobile ? closeMobileMenu : undefined}
        >
          Analysis Results
        </Link>
      </>
    );
  };

  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={toggleUserDropdown}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 rounded-md"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <span>{user?.name || 'User'}</span>
        <Icon name="ChevronDown" size={16} />
      </button>

      {isUserDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-50">
          <div className="py-1">
            <Link
              to="/account-settings"
              className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Settings" size={16} />
                <span>Account Settings</span>
              </div>
            </Link>
            <hr className="my-1 border-border" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <Icon name="LogOut" size={16} />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationItems />
            {isAuthenticated && <UserDropdown />}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            >
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavigationItems mobile />
            {isAuthenticated && (
              <>
                <hr className="my-2 border-border" />
                <Link
                  to="/account-settings"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors duration-200 rounded-md"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors duration-200 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthenticationStateHeader;