'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

export interface RegistrarData {
  sharesProvisionallyAllotted: number;
  sharesAccepted: number;
  additionalSharesApplied: number;
  sharesRenounced: number;
  totalSharesAllotted: number;
  totalAmountPayable: number;
  totalAmountPaid: number;
  amountToBeRefunded: number;
  bankDraftNumber: string;
  receivingAgentStamp: File | null;
  stampApplied: boolean;
}

interface RegistrarSectionProps {
  onChange?: (data: RegistrarData) => void;
  initialData?: RegistrarData;
  isBankDraftMethod?: boolean;
}

export function RegistrarSection({
  onChange,
  initialData,
  isBankDraftMethod = false,
}: RegistrarSectionProps) {
  const [formData, setFormData] = useState<RegistrarData>(
    initialData || {
      sharesProvisionallyAllotted: 0,
      sharesAccepted: 0,
      additionalSharesApplied: 0,
      sharesRenounced: 0,
      totalSharesAllotted: 0,
      totalAmountPayable: 0,
      totalAmountPaid: 0,
      amountToBeRefunded: 0,
      bankDraftNumber: '',
      receivingAgentStamp: null,
      stampApplied: false,
    }
  );

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleNumberChange = (field: keyof RegistrarData, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleTextChange = (field: keyof RegistrarData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      receivingAgentStamp: file,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      stampApplied: checked,
    }));
  };

  // Auto-calculate totals
  const calculateTotalAllotted = () => {
    return (
      formData.sharesAccepted +
      formData.additionalSharesApplied
    );
  };

  const calculateAmountRefunded = () => {
    return formData.totalAmountPayable - formData.totalAmountPaid;
  };

  return (
    <div className="bg-card border-2 border-destructive rounded-lg p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block px-3 py-1 bg-destructive/20 text-destructive rounded-full text-xs font-bold mb-2">
          REGISTRAR ONLY
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          For Registrar Use Only
        </h2>
        <p className="text-muted-foreground">
          Complete this section after shareholder submission
        </p>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 px-4 font-bold text-primary">Description</th>
              <th className="text-right py-3 px-4 font-bold text-primary">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4 font-medium">Shares Provisionally Allotted</td>
              <td className="text-right py-3 px-4">
                <Input
                  type="number"
                  min="0"
                  value={formData.sharesProvisionallyAllotted || ''}
                  onChange={(e) =>
                    handleNumberChange('sharesProvisionallyAllotted', e.target.value)
                  }
                  className="w-24 ml-auto"
                  aria-label="Shares provisionally allotted"
                />
              </td>
            </tr>
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4 font-medium">Shares Accepted</td>
              <td className="text-right py-3 px-4">
                <Input
                  type="number"
                  min="0"
                  value={formData.sharesAccepted || ''}
                  onChange={(e) =>
                    handleNumberChange('sharesAccepted', e.target.value)
                  }
                  className="w-24 ml-auto"
                  aria-label="Shares accepted"
                />
              </td>
            </tr>
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4 font-medium">Additional Shares Applied</td>
              <td className="text-right py-3 px-4">
                <Input
                  type="number"
                  min="0"
                  value={formData.additionalSharesApplied || ''}
                  onChange={(e) =>
                    handleNumberChange('additionalSharesApplied', e.target.value)
                  }
                  className="w-24 ml-auto"
                  aria-label="Additional shares applied"
                />
              </td>
            </tr>
            <tr className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4 font-medium">Shares Renounced</td>
              <td className="text-right py-3 px-4">
                <Input
                  type="number"
                  min="0"
                  value={formData.sharesRenounced || ''}
                  onChange={(e) =>
                    handleNumberChange('sharesRenounced', e.target.value)
                  }
                  className="w-24 ml-auto"
                  aria-label="Shares renounced"
                />
              </td>
            </tr>
            <tr className="border-b-2 border-primary bg-primary/5">
              <td className="py-3 px-4 font-bold text-primary">Total Shares Allotted</td>
              <td className="text-right py-3 px-4 font-bold text-primary">
                {calculateTotalAllotted().toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Amount Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-primary/5 border border-primary rounded-lg">
          <Label className="text-xs font-bold text-primary uppercase mb-2 block">
            Total Amount Payable
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formData.totalAmountPayable || ''}
            onChange={(e) =>
              handleNumberChange('totalAmountPayable', e.target.value)
            }
            className="text-2xl font-bold"
            aria-label="Total amount payable"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Amount due from shareholder
          </p>
        </div>

        <div className="p-4 bg-primary/5 border border-primary rounded-lg">
          <Label className="text-xs font-bold text-primary uppercase mb-2 block">
            Total Amount Paid
          </Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={formData.totalAmountPaid || ''}
            onChange={(e) =>
              handleNumberChange('totalAmountPaid', e.target.value)
            }
            className="text-2xl font-bold"
            aria-label="Total amount paid"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Amount received
          </p>
        </div>

        <div className="p-4 bg-destructive/5 border border-destructive rounded-lg">
          <Label className="text-xs font-bold text-destructive uppercase mb-2 block">
            Amount to be Refunded
          </Label>
          <div className="text-2xl font-bold text-destructive">
            ₦{calculateAmountRefunded().toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Auto-calculated from amounts above
          </p>
        </div>

        {isBankDraftMethod && (
          <div>
            <Label htmlFor="bank-draft-number" className="text-sm font-semibold mb-2 block">
              Bank Draft/Cheque Number
            </Label>
            <Input
              id="bank-draft-number"
              type="text"
              placeholder="Enter draft/cheque number"
              value={formData.bankDraftNumber}
              onChange={(e) =>
                handleTextChange('bankDraftNumber', e.target.value)
              }
              aria-label="Bank draft number"
            />
          </div>
        )}
      </div>

      {/* Receiving Agent Stamp */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">
          Receiving Agent Stamp & Verification
        </Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-muted/30">
          <input
            type="file"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
            id="stamp-upload"
            accept=".jpg,.jpeg,.png,.pdf"
            aria-label="Upload receiving agent stamp"
          />
          <label htmlFor="stamp-upload" className="cursor-pointer block">
            <Upload size={20} className="mx-auto mb-2 text-muted-foreground" />
            <p className="font-semibold text-foreground text-sm mb-0.5">
              {formData.receivingAgentStamp
                ? formData.receivingAgentStamp.name
                : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or PDF of receiving agent stamp (Max 2MB)
            </p>
          </label>
        </div>

        {/* Stamp Applied Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer p-3 bg-muted/50 rounded-lg border border-border">
          <input
            type="checkbox"
            checked={formData.stampApplied}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            className="w-4 h-4"
            aria-label="Receiving agent stamp applied"
          />
          <span className="font-medium text-foreground">
            Receiving Agent Stamp Applied ✓
          </span>
        </label>
      </div>

      {/* Info box */}
      <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
        <p className="text-sm text-destructive">
          <span className="font-semibold">⚠️ Important:</span> This section is for registrar use only. Ensure all calculations are accurate before final submission to the Issuing House.
        </p>
      </div>
    </div>
  );
}
