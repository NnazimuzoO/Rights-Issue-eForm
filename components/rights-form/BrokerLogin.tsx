'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, LogIn } from 'lucide-react';

export interface BrokerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface BrokerLoginProps {
  onSelectBroker: (broker: BrokerInfo) => void;
  availableBrokers: BrokerInfo[];
  isLoading?: boolean;
}

export function BrokerLogin({ onSelectBroker, availableBrokers, isLoading = false }: BrokerLoginProps) {
  const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSelectPredefinedBroker = (broker: BrokerInfo) => {
    setSelectedBrokerId(broker.id);
    onSelectBroker(broker);
  };

  const handleManualSubmit = () => {
    if (manualEntry.name.trim() && manualEntry.email.trim() && manualEntry.phone.trim()) {
      onSelectBroker({
        id: 'custom',
        name: manualEntry.name,
        email: manualEntry.email,
        phone: manualEntry.phone,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Stockbroker Access</h1>
          <p className="text-muted-foreground">
            Select your stockbroking firm to register subscriber applications
          </p>
        </div>

        {/* Available Brokers */}
        {!showManualEntry && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Select Your Firm</h2>
            <div className="space-y-3">
              {availableBrokers.map((broker) => (
                <button
                  key={broker.id}
                  onClick={() => handleSelectPredefinedBroker(broker)}
                  disabled={isLoading}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedBrokerId === broker.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/30'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <p className="font-semibold text-foreground">{broker.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{broker.email}</p>
                  <p className="text-sm text-muted-foreground">{broker.phone}</p>
                </button>
              ))}
            </div>

            {/* Manual Entry Option */}
            <Button
              onClick={() => setShowManualEntry(true)}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              Don't see your firm? Enter manually
            </Button>
          </div>
        )}

        {/* Manual Entry Form */}
        {showManualEntry && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Enter Your Firm Details</h2>
              <button
                onClick={() => {
                  setShowManualEntry(false);
                  setSelectedBrokerId(null);
                  setManualEntry({ name: '', email: '', phone: '' });
                }}
                className="text-sm text-primary hover:underline"
              >
                Back
              </button>
            </div>

            <Card className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 flex gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-amber-900 dark:text-amber-300">
                Enter your stockbroking firm details. This will be linked to all your subscriber applications.
              </p>
            </Card>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g., Premier Securities Limited"
                  value={manualEntry.name}
                  onChange={(e) => setManualEntry({ ...manualEntry, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  placeholder="info@broker.com"
                  value={manualEntry.email}
                  onChange={(e) => setManualEntry({ ...manualEntry, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+234 (0)1 234 5678"
                  value={manualEntry.phone}
                  onChange={(e) => setManualEntry({ ...manualEntry, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleManualSubmit}
                disabled={
                  isLoading ||
                  !manualEntry.name.trim() ||
                  !manualEntry.email.trim() ||
                  !manualEntry.phone.trim()
                }
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                Enter Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
