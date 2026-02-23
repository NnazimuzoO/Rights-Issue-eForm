'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AcceptanceSectionProps {
  pricePerShare: number;
  rightsDue: number;
  amountPayable: number;
  onChange?: (data: AcceptanceData) => void;
}

export interface AcceptanceData {
  acceptanceType: 'full' | 'additional' | 'partial';
  additionalSharesApplied?: number;
  additionalAmountPayable?: number;
  additionalConfirmation?: boolean;
  paymentMethod?: 'transfer' | 'cheque' | 'draft';
  bankName?: string;
  chequeNumber?: string;
  chequeBranch?: string;
  paymentEvidence?: File | null;
  sharesAccepted?: number;
  amountPayableAccepted?: number;
  sharesRenounced?: number;
}

export function AcceptanceSection({
  pricePerShare,
  rightsDue,
  amountPayable,
  onChange,
}: AcceptanceSectionProps) {
  const [acceptanceType, setAcceptanceType] = useState<'full' | 'additional' | 'partial'>(
    'full'
  );
  const [additionalShares, setAdditionalShares] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cheque' | 'draft'>(
    'transfer'
  );
  const [chequeBank, setChequeBank] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [chequeBranch, setChequeBranch] = useState('');
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [additionalConfirmation, setAdditionalConfirmation] = useState(false);

  // For partial acceptance
  const [sharesAccepted, setSharesAccepted] = useState('');
  const [sharesRenounced, setSharesRenounced] = useState('');

  const additionalAmount = additionalShares
    ? parseInt(additionalShares) * pricePerShare
    : 0;
  const totalAmountDue = amountPayable + additionalAmount;

  const acceptedAmount = sharesAccepted
    ? parseInt(sharesAccepted) * pricePerShare
    : 0;

  // Notify parent of changes
  useEffect(() => {
    const data: AcceptanceData = {
      acceptanceType,
      additionalSharesApplied: additionalShares ? parseInt(additionalShares) : undefined,
      additionalAmountPayable: additionalAmount,
      additionalConfirmation,
      paymentMethod,
      bankName: chequeBank,
      chequeNumber,
      chequeBranch,
      paymentEvidence: paymentFile,
      sharesAccepted: sharesAccepted ? parseInt(sharesAccepted) : undefined,
      amountPayableAccepted: acceptedAmount,
      sharesRenounced: sharesRenounced ? parseInt(sharesRenounced) : undefined,
    };
    onChange?.(data);
  }, [
    acceptanceType,
    additionalShares,
    additionalConfirmation,
    paymentMethod,
    chequeBank,
    chequeNumber,
    chequeBranch,
    paymentFile,
    sharesAccepted,
    sharesRenounced,
    onChange,
    pricePerShare,
    amountPayable,
  ]);

  return (
    <div className="space-y-8">
      {/* Toggle between Full Acceptance and Renunciation */}
      <div>
        <Label className="text-base font-bold text-primary mb-4 block">
          Select Your Option (Required **)
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setAcceptanceType('full');
              setSharesAccepted('');
              setSharesRenounced('');
              setAdditionalShares('');
            }}
            className={cn(
              'p-4 rounded-lg border-2 font-medium text-left transition-all',
              acceptanceType === 'full' || acceptanceType === 'additional'
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            )}
          >
            <div className="text-primary font-bold mb-1">Option A: Full Acceptance</div>
            <div className="text-sm text-muted-foreground">
              Accept in full or apply for additional shares
            </div>
          </button>

          <button
            onClick={() => {
              setAcceptanceType('partial');
              setAdditionalShares('');
            }}
            className={cn(
              'p-4 rounded-lg border-2 font-medium text-left transition-all',
              acceptanceType === 'partial'
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            )}
          >
            <div className="text-primary font-bold mb-1">Option B: Renunciation/Partial</div>
            <div className="text-sm text-muted-foreground">
              Accept partial or renounce all shares
            </div>
          </button>
        </div>
      </div>

      {/* OPTION A: Full Acceptance */}
      {(acceptanceType === 'full' || acceptanceType === 'additional') && (
        <div className="border-l-4 border-primary p-6 bg-primary/5 rounded-r-lg space-y-6">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">
              Option A: Full Acceptance / Additional Shares
            </h3>

            {/* Option i: Full acceptance */}
            <div className="mb-6 p-4 bg-background border border-border rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={acceptanceType === 'full'}
                  onChange={() => {
                    setAcceptanceType('full');
                    setAdditionalShares('');
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold text-foreground">
                    We accept in full the provisional allotment shown on the front of this form
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Amount due: ₦{amountPayable.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </label>
            </div>

            {/* Option ii: Additional shares */}
            <div className="p-4 bg-background border border-border rounded-lg space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={acceptanceType === 'additional'}
                  onChange={() => setAcceptanceType('additional')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold text-foreground mb-4">
                    We also apply for additional ordinary shares
                  </div>

                  {/* Additional shares input */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="additional-shares" className="text-sm font-semibold mb-2 block">
                        Number of additional shares applied for (**)
                      </Label>
                      <Input
                        id="additional-shares"
                        type="number"
                        min="0"
                        placeholder="Enter number of shares"
                        value={additionalShares}
                        onChange={(e) => setAdditionalShares(e.target.value)}
                        disabled={acceptanceType !== 'additional'}
                        aria-label="Number of additional shares"
                      />
                      {additionalShares && (
                        <p className="text-sm text-primary font-semibold mt-2">
                          Additional amount payable: ₦{additionalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })} at ₦{pricePerShare.toLocaleString('en-NG', { minimumFractionDigits: 2 })} per share
                        </p>
                      )}
                    </div>

                    {/* Confirmation checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={additionalConfirmation}
                        onChange={(e) => setAdditionalConfirmation(e.target.checked)}
                        disabled={acceptanceType !== 'additional'}
                        className="mt-1"
                      />
                      <span className="text-sm text-foreground">
                        We agree to accept the same or smaller number if scaled down.
                      </span>
                    </label>

                    {/* Total due box */}
                    {additionalShares && (
                      <div className="p-3 bg-primary/10 border border-primary rounded">
                        <p className="text-xs text-muted-foreground font-semibold mb-1">TOTAL AMOUNT DUE</p>
                        <p className="text-xl font-bold text-primary">
                          ₦{totalAmountDue.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* OPTION B: Renunciation/Partial Acceptance */}
      {acceptanceType === 'partial' && (
        <div className="border-l-4 border-primary p-6 bg-primary/5 rounded-r-lg space-y-6">
          <h3 className="text-lg font-bold text-primary mb-4">
            Option B: Renunciation or Partial Acceptance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Shares Accepted */}
            <div>
              <Label htmlFor="shares-accepted" className="text-sm font-semibold mb-2 block">
                Number of ordinary shares accepted (**)
              </Label>
              <Input
                id="shares-accepted"
                type="number"
                min="0"
                max={rightsDue}
                placeholder="0"
                value={sharesAccepted}
                onChange={(e) => setSharesAccepted(e.target.value)}
                aria-label="Number of shares accepted"
              />
              {sharesAccepted && (
                <p className="text-xs text-primary font-semibold mt-2">
                  Amount: ₦{acceptedAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>

            {/* Price per share (read-only) */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">
                Price per share
              </Label>
              <div className="bg-muted/50 p-3 rounded border border-border text-foreground font-medium">
                ₦{pricePerShare.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Shares Renounced */}
            <div>
              <Label htmlFor="shares-renounced" className="text-sm font-semibold mb-2 block">
                Number of ordinary shares renounced (**)
              </Label>
              <Input
                id="shares-renounced"
                type="number"
                min="0"
                max={rightsDue}
                placeholder="0"
                value={sharesRenounced}
                onChange={(e) => setSharesRenounced(e.target.value)}
                aria-label="Number of shares renounced"
              />
              {sharesRenounced && (
                <p className="text-xs text-muted-foreground mt-2">
                  Shares: {parseInt(sharesRenounced).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Validation message */}
          {sharesAccepted && sharesRenounced && (
            <div className="p-3 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded flex gap-2">
              <AlertCircle size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Total: {(parseInt(sharesAccepted) + parseInt(sharesRenounced)).toLocaleString()} = {rightsDue.toLocaleString()} shares
              </p>
            </div>
          )}
        </div>
      )}

      {/* Payment Evidence Section (shared for both options) */}
      <div className="border-l-4 border-secondary p-6 bg-secondary/5 rounded-r-lg space-y-6">
        <h3 className="text-lg font-bold text-primary mb-4">Payment Evidence (**)  </h3>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            Payment Method (**)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              ['transfer', 'cheque', 'draft'] as const
            ).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={cn(
                  'p-3 rounded-lg border-2 font-medium text-sm transition-all',
                  paymentMethod === method
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-border bg-background hover:border-secondary/50'
                )}
              >
                {method === 'transfer'
                  ? 'Bank Transfer'
                  : method === 'cheque'
                  ? 'Cheque'
                  : 'Bank Draft'}
              </button>
            ))}
          </div>
        </div>

        {/* Cheque details (conditional) */}
        {(paymentMethod === 'cheque' || paymentMethod === 'draft') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background border border-border rounded-lg">
            <div>
              <Label htmlFor="cheque-bank" className="text-sm font-semibold mb-2 block">
                Bank Name (*)
              </Label>
              <Input
                id="cheque-bank"
                type="text"
                placeholder="Enter bank name"
                value={chequeBank}
                onChange={(e) => setChequeBank(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cheque-number" className="text-sm font-semibold mb-2 block">
                Cheque/Draft Number
              </Label>
              <Input
                id="cheque-number"
                type="text"
                placeholder="Enter cheque number"
                value={chequeNumber}
                onChange={(e) => setChequeNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cheque-branch" className="text-sm font-semibold mb-2 block">
                Branch (*)
              </Label>
              <Input
                id="cheque-branch"
                type="text"
                placeholder="Enter branch"
                value={chequeBranch}
                onChange={(e) => setChequeBranch(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* File upload */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">
            Upload Evidence of Payment (**)
          </Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
              className="hidden"
              id="payment-upload"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              aria-label="Upload payment evidence"
            />
            <label htmlFor="payment-upload" className="cursor-pointer block">
              <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-foreground mb-1">
                {paymentFile ? paymentFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG, DOC (Max 5MB)
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
