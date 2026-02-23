'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Printer, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  shareholderName: string;
  nextOfKin: string;
  daytimePhone: string;
  mobilePhone: string;
  email: string;
  bankName: string;
  branch: string;
  accountNumber: string;
  bvn: string;
  acceptanceType?: string;
  additionalShares?: number;
  sharesAccepted?: number;
  sharesRenounced?: number;
  [key: string]: any;
}

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  ixTracData?: {
    regAcctNumber: string;
    shareholderName: string;
    unitsHeld: number;
    rightsDue: number;
    pricePerShare: number;
    amountPayable: number;
  };
  mode?: 'shareholder' | 'registrar' | 'broker';
  registrarData?: any;
  source?: 'shareholder' | 'broker' | 'registrar';
  brokerName?: string;
}

export function PrintPreviewModal({
  isOpen,
  onClose,
  formData,
  ixTracData,
  mode = 'shareholder',
  registrarData,
  source = 'shareholder',
  brokerName,
}: PrintPreviewModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && printRef.current) {
      printWindow.document.write(printRef.current.innerHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, you'd use a library like jsPDF or html2pdf
    console.log('Download PDF functionality');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-2xl font-bold text-primary">
            Preview / Print Form
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close preview"
          >
            <X size={24} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-b border-border bg-muted/50">
          <Button
            onClick={handlePrint}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Printer size={18} className="mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-auto p-8 print:p-4">
          <div
            ref={printRef}
            className="bg-white text-black p-8 md:p-12 space-y-8 max-w-4xl mx-auto"
          >
            {/* Form Header */}
            <div className="text-center border-b-2 border-black pb-6">
              {source === 'broker' && brokerName && (
                <p className="text-xs font-semibold mb-2 p-2 border border-black inline-block">
                  PROCESSED VIA STOCKBROKER: {brokerName}
                </p>
              )}
              <h1 className="text-2xl font-bold mb-2">
                ACCEPTANCE / RENUNCIATION FORM
              </h1>
              <p className="font-semibold">NSL Capital Partners Limited</p>
              <p className="text-sm">SUNU Assurances Nigeria Plc</p>
              <p className="text-sm mt-2">
                Offer Period: January 15 - March 31, 2024
              </p>
            </div>

            {/* iX-Trac Section */}
            {ixTracData && (
              <div className="border-2 border-black p-4">
                <h2 className="font-bold mb-4 underline">
                  DETAILS OF PROVISIONAL ALLOTMENT
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Reg/Account Number:</p>
                    <p>{ixTracData.regAcctNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Name of Shareholder:</p>
                    <p>{ixTracData.shareholderName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Units Held:</p>
                    <p>{ixTracData.unitsHeld.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Rights Due:</p>
                    <p>{ixTracData.rightsDue.toLocaleString()} shares</p>
                  </div>
                  <div>
                    <p className="font-semibold">Price per Share:</p>
                    <p>
                      ₦
                      {ixTracData.pricePerShare.toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Amount Payable:</p>
                    <p className="font-bold">
                      ₦
                      {ixTracData.amountPayable.toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Acceptance Section */}
            <div className="border-2 border-black p-4">
              <h2 className="font-bold mb-4 underline">
                A. FULL ACCEPTANCE / ADDITIONAL ORDINARY SHARES
              </h2>
              <p className="text-sm mb-4">
                {formData.acceptanceType === 'additional'
                  ? `I/We apply for ${formData.additionalShares} additional ordinary shares.`
                  : 'I/We accept in full the provisional allotment shown above.'}
              </p>
            </div>

            {/* Personal Information */}
            <div className="border-2 border-black p-4">
              <h2 className="font-bold mb-4 underline">
                PERSONAL / CORPORATE CONTACT INFORMATION
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <p className="font-semibold">Name(s):</p>
                  <p>{formData.shareholderName}</p>
                </div>
                <div>
                  <p className="font-semibold">Daytime Phone:</p>
                  <p>{formData.daytimePhone}</p>
                </div>
                <div>
                  <p className="font-semibold">Mobile Phone:</p>
                  <p>{formData.mobilePhone}</p>
                </div>
                <div>
                  <p className="font-semibold">Next of Kin:</p>
                  <p>{formData.nextOfKin}</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{formData.email}</p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="border-2 border-black p-4">
              <h2 className="font-bold mb-4 underline">
                BANK DETAILS (FOR E-DIVIDEND)
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Bank Name:</p>
                  <p>{formData.bankName}</p>
                </div>
                <div>
                  <p className="font-semibold">Branch:</p>
                  <p>{formData.branch}</p>
                </div>
                <div>
                  <p className="font-semibold">Account Number:</p>
                  <p>{formData.accountNumber}</p>
                </div>
                <div>
                  <p className="font-semibold">BVN:</p>
                  <p>{formData.bvn}</p>
                </div>
              </div>
            </div>

            {/* Registrar Section (if applicable) */}
            {mode === 'registrar' && registrarData && (
              <div className="border-2 border-red-600 p-4">
                <h2 className="font-bold mb-4 underline text-red-600">
                  FOR REGISTRAR USE ONLY
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Total Shares Allotted:</p>
                    <p>{registrarData.totalSharesAllotted?.toLocaleString() || '-'}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Total Amount Payable:</p>
                    <p>
                      ₦
                      {registrarData.totalAmountPayable?.toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                      }) || '-'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-xs border-t-2 border-black pt-4 mt-8">
              <p>
                Generated on{' '}
                {new Date().toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs mt-2">
                This is an electronic document. Print for your records.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 p-4 border-t border-border justify-end bg-muted/50">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Printer size={18} className="mr-2" />
            Print Now
          </Button>
        </div>
      </div>
    </div>
  );
}
