'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export interface BrokerCompanyDetailsData {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

interface BrokerCompanyDetailsProps {
  onSubmit?: (data: BrokerCompanyDetailsData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<BrokerCompanyDetailsData>;
}

export function BrokerCompanyDetails({
  onSubmit,
  isLoading = false,
  defaultValues,
}: BrokerCompanyDetailsProps) {
  const [formData, setFormData] = useState<BrokerCompanyDetailsData>({
    companyName: defaultValues?.companyName || '',
    companyPhone: defaultValues?.companyPhone || '',
    companyEmail: defaultValues?.companyEmail || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Stockbroker company name is required';
    }

    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone = 'Company phone number is required';
    } else if (!/^(\+?234|0)[789]\d{9}$/.test(formData.companyPhone.replace(/\s|-/g, ''))) {
      newErrors.companyPhone = 'Invalid phone number format';
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Stockbroker Company Details</h2>
        <p className="text-muted-foreground mt-2">
          Enter your stockbroking company information to proceed with subscriber registrations
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 flex gap-3">
        <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-blue-900 dark:text-blue-300">
          <p className="font-semibold mb-1">Company Information</p>
          <p>
            These details will be linked to all subscriber applications you register and displayed on the 
            broker dashboard and registrar reports for easy reconciliation.
          </p>
        </div>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="text-sm font-medium text-foreground flex items-center gap-1"
            >
              Stockbroker Company Name <span className="text-destructive">**</span>
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="e.g., Premier Securities Limited"
              value={formData.companyName}
              onChange={(e) => {
                setFormData({ ...formData, companyName: e.target.value });
                if (errors.companyName) {
                  setErrors({ ...errors, companyName: '' });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.companyName ? 'border-destructive' : 'border-border'
              }`}
              disabled={isLoading}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.companyName}
              </p>
            )}
          </div>

          {/* Company Phone */}
          <div className="space-y-2">
            <label
              htmlFor="companyPhone"
              className="text-sm font-medium text-foreground flex items-center gap-1"
            >
              Company Phone Number <span className="text-destructive">**</span>
            </label>
            <input
              id="companyPhone"
              type="tel"
              placeholder="+234 (0)1 234 5678 or 0801 234 5678"
              value={formData.companyPhone}
              onChange={(e) => {
                setFormData({ ...formData, companyPhone: e.target.value });
                if (errors.companyPhone) {
                  setErrors({ ...errors, companyPhone: '' });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.companyPhone ? 'border-destructive' : 'border-border'
              }`}
              disabled={isLoading}
            />
            {errors.companyPhone && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.companyPhone}
              </p>
            )}
            <p className="text-xs text-muted-foreground">Nigerian phone number format: +234 or 0 prefix</p>
          </div>

          {/* Company Email */}
          <div className="space-y-2">
            <label
              htmlFor="companyEmail"
              className="text-sm font-medium text-foreground flex items-center gap-1"
            >
              Company Email Address <span className="text-destructive">**</span>
            </label>
            <input
              id="companyEmail"
              type="email"
              placeholder="info@premierbrokers.com"
              value={formData.companyEmail}
              onChange={(e) => {
                setFormData({ ...formData, companyEmail: e.target.value });
                if (errors.companyEmail) {
                  setErrors({ ...errors, companyEmail: '' });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                errors.companyEmail ? 'border-destructive' : 'border-border'
              }`}
              disabled={isLoading}
            />
            {errors.companyEmail && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.companyEmail}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? 'Saving...' : 'Continue to Search'}
          </Button>
        </div>
      </form>
    </div>
  );
}
