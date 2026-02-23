'use client';

import React from 'react';
import { Lock } from 'lucide-react';

interface IxTracData {
  regAcctNumber: string;
  shareholderName: string;
  unitsHeld: number;
  rightsDue: number;
  pricePerShare: number;
  amountPayable: number;
}

interface IxTracPanelProps {
  data?: IxTracData;
  isVisible?: boolean;
}

export function IxTracPanel({ data, isVisible = true }: IxTracPanelProps) {
  if (!isVisible || !data) {
    return null;
  }

  return (
    <div className="w-full bg-card border-2 border-primary rounded-lg overflow-hidden">
      <div className="bg-primary/10 border-b border-primary px-6 py-4">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-primary" />
          <h2 className="text-lg font-bold text-primary">
            From iX-Trac (Auto-Populated - Read Only)
          </h2>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Shareholder info */}
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Reg/Account Number
              </label>
              <div className="text-lg font-semibold text-foreground bg-muted/50 p-3 rounded border border-border">
                {data.regAcctNumber}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Name of Shareholder
              </label>
              <div className="text-lg font-semibold text-foreground bg-muted/50 p-3 rounded border border-border">
                {data.shareholderName}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Units Held
              </label>
              <div className="text-lg font-semibold text-foreground bg-muted/50 p-3 rounded border border-border">
                {data.unitsHeld.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Right column - Allotment details */}
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Rights Due
              </label>
              <div className="text-lg font-semibold text-foreground bg-muted/50 p-3 rounded border border-border">
                {data.rightsDue.toLocaleString()} shares
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Price Per Share
              </label>
              <div className="text-lg font-semibold text-foreground bg-muted/50 p-3 rounded border border-border">
                ₦{data.pricePerShare.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="border-t-2 border-primary pt-4">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider block mb-2">
                Amount Payable (For Full Acceptance)
              </label>
              <div className="text-2xl font-bold text-primary bg-primary/10 p-4 rounded border-2 border-primary">
                ₦{data.amountPayable.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Details of Provisional Allotment Summary */}
        <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
            Details of Provisional Allotment
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">Units Held</p>
              <p className="text-lg font-bold text-foreground">
                {data.unitsHeld.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">Rights Due</p>
              <p className="text-lg font-bold text-foreground">
                {data.rightsDue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">Price/Share</p>
              <p className="text-lg font-bold text-foreground">
                ₦{data.pricePerShare.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-1">Amount Payable</p>
              <p className="text-lg font-bold text-primary">
                ₦{data.amountPayable.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
