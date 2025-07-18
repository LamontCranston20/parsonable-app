import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionSection = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showBillingHistory, setShowBillingHistory] = useState(false);

  const currentPlan = user?.subscription || 'Free Plan';
  const usageData = {
    scansUsed: 15,
    scansLimit: 50,
    reportsGenerated: 8,
    reportsLimit: 20
  };

  const billingHistory = [
    {
      id: 1,
      date: "2025-01-16",
      amount: 29.99,
      status: "Paid",
      plan: "Pro Plan",
      invoice: "INV-2025-001"
    },
    {
      id: 2,
      date: "2024-12-16",
      amount: 29.99,
      status: "Paid",
      plan: "Pro Plan",
      invoice: "INV-2024-012"
    },
    {
      id: 3,
      date: "2024-11-16",
      amount: 29.99,
      status: "Paid",
      plan: "Pro Plan",
      invoice: "INV-2024-011"
    }
  ];

  const plans = [
    {
      name: "Free Plan",
      price: 0,
      features: [
        "5 URL scans per month",
        "Basic AI readiness score",
        "Public summary view",
        "Email support"
      ],
      current: currentPlan === 'Free Plan'
    },
    {
      name: "Pro Plan",
      price: 29.99,
      features: [
        "Unlimited URL scans",
        "Detailed analysis reports",
        "PDF report downloads",
        "Scan history storage",
        "Priority support",
        "API access"
      ],
      current: currentPlan === 'Pro Plan',
      popular: true
    },
    {
      name: "Enterprise",
      price: 99.99,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "White-label reports"
      ],
      current: currentPlan === 'Enterprise'
    }
  ];

  const handlePlanChange = async (planName) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user data
      const updatedUser = {
        ...user,
        subscription: planName
      };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      // Reload page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Error updating subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUsagePercentage = (used, limit) => {
    return Math.min((used / limit) * 100, 100);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Subscription & Billing</h2>
      </div>

      <div className="space-y-6">
        {/* Current Plan Status */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-foreground">Current Plan</h3>
              <p className="text-2xl font-bold text-primary">{currentPlan}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next billing</p>
              <p className="font-medium text-foreground">
                {currentPlan === 'Free Plan' ? 'N/A' : 'February 16, 2025'}
              </p>
            </div>
          </div>

          {/* Usage Statistics */}
          {currentPlan !== 'Free Plan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>URL Scans</span>
                  <span>{usageData.scansUsed}/{usageData.scansLimit}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getUsagePercentage(usageData.scansUsed, usageData.scansLimit)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Reports Generated</span>
                  <span>{usageData.reportsGenerated}/{usageData.reportsLimit}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getUsagePercentage(usageData.reportsGenerated, usageData.reportsLimit)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Available Plans */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative border rounded-lg p-4 ${
                  plan.current 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                } ${plan.popular ? 'ring-2 ring-primary/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h4 className="font-medium text-foreground">{plan.name}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Icon name="Check" size={16} className="text-accent mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.current ? "outline" : "default"}
                  fullWidth
                  disabled={plan.current || isLoading}
                  loading={isLoading}
                  onClick={() => handlePlanChange(plan.name)}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        {currentPlan !== 'Free Plan' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Billing History</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName={showBillingHistory ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                onClick={() => setShowBillingHistory(!showBillingHistory)}
              >
                {showBillingHistory ? 'Hide' : 'Show'} History
              </Button>
            </div>

            {showBillingHistory && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Date</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Plan</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Amount</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-foreground">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item) => (
                        <tr key={item.id} className="border-t border-border">
                          <td className="p-3 text-sm text-foreground">
                            {formatDate(item.date)}
                          </td>
                          <td className="p-3 text-sm text-foreground">{item.plan}</td>
                          <td className="p-3 text-sm text-foreground">${item.amount}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Download"
                              iconPosition="left"
                            >
                              {item.invoice}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionSection;