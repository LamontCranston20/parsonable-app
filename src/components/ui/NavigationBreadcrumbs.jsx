import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/user-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/premium-analysis-results': { label: 'Analysis Results', icon: 'BarChart3' },
    '/account-settings': { label: 'Account Settings', icon: 'Settings' },
    '/homepage-url-analysis': { label: 'URL Analysis', icon: 'Search' },
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    if (pathSegments.length === 0) {
      return breadcrumbs;
    }

    breadcrumbs.push({
      label: 'Home',
      path: '/user-dashboard',
      icon: 'Home'
    });

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const breadcrumbInfo = breadcrumbMap[currentPath];
      
      if (breadcrumbInfo && currentPath !== '/user-dashboard') {
        breadcrumbs.push({
          label: breadcrumbInfo.label,
          path: currentPath,
          icon: breadcrumbInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground" 
              />
            )}
            {breadcrumb.isLast ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={breadcrumb.icon} size={16} />
                <span>{breadcrumb.label}</span>
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
              >
                <Icon name={breadcrumb.icon} size={16} />
                <span>{breadcrumb.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;