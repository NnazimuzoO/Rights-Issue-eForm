'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Plus } from 'lucide-react';

interface BrokerMetrics {
  subscriberCount: number;
  totalUnitsSubscribed: number;
  totalAmountProcessed: number;
  pendingApplications: number;
}

interface BrokerDashboardProps {
  metrics: BrokerMetrics;
  brokerName: string;
  onCreateNew?: () => void;
  applications?: Array<{
    id: string;
    shareholderName: string;
    status: string;
    unitsSubscribed: number;
    amountPayable: number;
    createdDate: string;
  }>;
}

export function BrokerDashboard({
  metrics,
  brokerName,
  onCreateNew,
  applications = [],
}: BrokerDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Stockbroker Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">Welcome, {brokerName}</p>
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus size={18} />
          New Subscription
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Subscriber Count */}
        <Card className="p-6 border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Subscribers Registered</p>
              <p className="text-3xl font-bold text-primary">{metrics.subscriberCount}</p>
              <p className="text-xs text-muted-foreground mt-2">Active subscriptions</p>
            </div>
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
          </div>
        </Card>

        {/* Total Units */}
        <Card className="p-6 border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Units Subscribed</p>
              <p className="text-3xl font-bold text-primary">
                {metrics.totalUnitsSubscribed.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Across all subscribers</p>
            </div>
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-primary" />
            </div>
          </div>
        </Card>

        {/* Amount Processed */}
        <Card className="p-6 border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Amount Processed</p>
              <p className="text-3xl font-bold text-primary">
                ₦{metrics.totalAmountProcessed.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Total payments</p>
            </div>
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">₦</span>
            </div>
          </div>
        </Card>

        {/* Pending Applications */}
        <Card className="p-6 border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Applications</p>
              <p className="text-3xl font-bold text-primary">{metrics.pendingApplications}</p>
              <p className="text-xs text-muted-foreground mt-2">Awaiting registrar review</p>
            </div>
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">!</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Applications Table */}
      {applications.length > 0 && (
        <Card className="border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold text-primary">Recent Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Shareholder Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-foreground">
                    Units
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-foreground">
                    Amount (₦)
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 text-foreground">{app.shareholderName}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'Draft'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'Submitted'
                              ? 'bg-blue-100 text-blue-800'
                              : app.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-foreground">
                      {app.unitsSubscribed.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-right text-foreground">
                      ₦{app.amountPayable.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-foreground">{app.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
