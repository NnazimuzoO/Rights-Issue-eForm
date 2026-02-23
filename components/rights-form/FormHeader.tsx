'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormHeaderProps {
  mode: 'shareholder' | 'registrar' | 'stockbroker';
  status?: string | 'draft' | 'submitted' | 'in-review' | 'completed' | 'Draft (Broker)' | 'SubmittedByBroker' | 'ApprovedByRegistrar' | 'RejectedByRegistrar';
}

export function FormHeader({ mode, status }: FormHeaderProps) {
  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    draft: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Draft' },
    'Draft (Broker)': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-300', label: 'Draft (Broker)' },
    submitted: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300', label: 'Submitted by Shareholder' },
    SubmittedByBroker: { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-700 dark:text-indigo-300', label: 'Submitted by Broker' },
    'in-review': { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-700 dark:text-yellow-300', label: 'In Registrar Review' },
    ApprovedByRegistrar: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', label: 'Approved by Registrar' },
    RejectedByRegistrar: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', label: 'Rejected by Registrar' },
    completed: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', label: 'Submitted to Issuing House' },
  };

  const currentStatus = status || 'draft';
  const statusConfig = statusColors[currentStatus];

  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top bar with status and mode */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Acceptance / Renunciation Form
            </h1>
            <p className="text-muted-foreground mt-1">
              {mode === 'shareholder' 
                ? 'Complete your rights issue application'
                : mode === 'stockbroker'
                  ? 'Register subscriber applications and submit to registrar'
                  : 'Review and process shareholder application'}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${statusConfig.bg} ${statusConfig.text}`}>
            <div className="text-sm font-semibold">{statusConfig.label}</div>
          </div>
        </div>

        {/* Company details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border pt-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Issuing House
            </p>
            <p className="text-lg font-semibold text-foreground mt-1">
              NSL Capital Partners Limited
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Company
            </p>
            <p className="text-lg font-semibold text-foreground mt-1">
              SUNU Assurances Nigeria Plc
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Offer Period
            </p>
            <p className="text-lg font-semibold text-foreground mt-1">
              Jan 15 - Mar 31, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
