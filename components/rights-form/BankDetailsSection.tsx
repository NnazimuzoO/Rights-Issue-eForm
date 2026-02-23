'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface BankDetailsData {
  bankName: string;
  branch: string;
  accountNumber: string;
  bvn: string;
}

interface BankDetailsSectionProps {
  onChange?: (data: BankDetailsData) => void;
  initialData?: BankDetailsData;
}

export function BankDetailsSection({
  onChange,
  initialData,
}: BankDetailsSectionProps) {
  const [formData, setFormData] = useState<BankDetailsData>(
    initialData || {
      bankName: '',
      branch: '',
      accountNumber: '',
      bvn: '',
    }
  );

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleChange = (field: keyof BankDetailsData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Bank Details (For E-Dividend)
        </h2>
        <p className="text-muted-foreground">
          Provide your bank account details for future dividend payments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bank Name */}
        <div>
          <Label htmlFor="bank-name" className="text-sm font-semibold mb-2 block">
            Name of Bank (**)
          </Label>
          <Input
            id="bank-name"
            type="text"
            placeholder="e.g., Access Bank, GTBank, First Bank"
            value={formData.bankName}
            onChange={(e) => handleChange('bankName', e.target.value)}
            required
            aria-label="Bank name"
          />
        </div>

        {/* Branch */}
        <div>
          <Label htmlFor="branch" className="text-sm font-semibold mb-2 block">
            Branch (*)
          </Label>
          <Input
            id="branch"
            type="text"
            placeholder="e.g., VI Branch, Lekki Branch"
            value={formData.branch}
            onChange={(e) => handleChange('branch', e.target.value)}
            aria-label="Bank branch"
          />
          <p className="text-xs text-muted-foreground mt-1">* Optional</p>
        </div>

        {/* Account Number */}
        <div>
          <Label htmlFor="account-number" className="text-sm font-semibold mb-2 block">
            Account Number (**)
          </Label>
          <Input
            id="account-number"
            type="text"
            placeholder="10 digit account number"
            value={formData.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
            required
            maxLength={10}
            aria-label="Bank account number"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.accountNumber.length}/10 digits
          </p>
        </div>

        {/* BVN */}
        <div>
          <Label htmlFor="bvn" className="text-sm font-semibold mb-2 block">
            Bank Verification Number (BVN) (**)
          </Label>
          <Input
            id="bvn"
            type="text"
            placeholder="11 digit BVN"
            value={formData.bvn}
            onChange={(e) => handleChange('bvn', e.target.value.replace(/\D/g, '').slice(0, 11))}
            required
            maxLength={11}
            aria-label="Bank Verification Number"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.bvn.length}/11 digits
          </p>
        </div>
      </div>

      {/* Info box */}
      <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-semibold">📋 Note:</span> These details will be used for all future e-dividend payments. Ensure accuracy to avoid payment delays.
        </p>
      </div>
    </div>
  );
}
