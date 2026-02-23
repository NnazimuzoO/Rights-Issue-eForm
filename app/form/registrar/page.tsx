'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { FormHeader } from '@/components/rights-form/FormHeader';
import { FormStepper } from '@/components/rights-form/FormStepper';
import { IxTracPanel } from '@/components/rights-form/IxTracPanel';
import { PersonalInfoSection, type PersonalInfoData } from '@/components/rights-form/PersonalInfoSection';
import { BankDetailsSection, type BankDetailsData } from '@/components/rights-form/BankDetailsSection';
import { RegistrarSection, type RegistrarData } from '@/components/rights-form/RegistrarSection';
import { ActionButtons } from '@/components/rights-form/ActionButtons';
import { PrintPreviewModal } from '@/components/rights-form/PrintPreviewModal';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Mock submitted application data
const mockSharedholderSubmission = {
  id: 'APP-2024-001234',
  shareholderName: 'John Adeyemi Okafor',
  nextOfKin: 'Mary Okafor',
  daytimePhone: '+234 1 234 5678',
  mobilePhone: '+234 801 234 5678',
  email: 'john@example.com',
  bankName: 'Access Bank',
  branch: 'Victoria Island',
  accountNumber: '0123456789',
  bvn: '12345678901',
  acceptanceType: 'additional',
  additionalShares: 500,
  sharesAccepted: 1000,
  sharesRenounced: 0,
};

// Mock broker submission data
const mockBrokerSubmission = {
  id: 'BRK-APP-002',
  shareholderName: 'Sarah Johnson',
  brokerName: 'Premier Securities Limited',
  nextOfKin: 'Jane Johnson',
  daytimePhone: '+234 1 567 8901',
  mobilePhone: '+234 802 567 8901',
  email: 'sarah@example.com',
  bankName: 'First Bank',
  branch: 'Lekki',
  accountNumber: '2345678901',
  bvn: '98765432101',
  acceptanceType: 'full',
  additionalShares: 0,
  sharesAccepted: 1000,
  sharesRenounced: 0,
  submittedByBroker: true,
};

const mockIxTracData = {
  regAcctNumber: 'IX-2024-001234',
  shareholderName: 'John Adeyemi Okafor',
  unitsHeld: 5000,
  rightsDue: 1000,
  pricePerShare: 2.50,
  amountPayable: 2500,
};

const formSteps = [
  {
    id: 'review',
    label: 'Review Application',
    description: 'View shareholder data',
  },
  {
    id: 'process',
    label: 'Process',
    description: 'Registrar verification',
  },
  {
    id: 'preview',
    label: 'Preview',
    description: 'Review complete',
  },
  {
    id: 'submit',
    label: 'Submit',
    description: 'Final submission',
  },
];

export default function RegistrarFormPage() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Application status
  const [appStatus, setAppStatus] = useState<'in-review' | 'completed'>(
    'in-review'
  );

  // Submission source filter
  const [submissionSource, setSubmissionSource] = useState<'shareholder' | 'broker'>('shareholder');
  const currentSubmission = submissionSource === 'shareholder' ? mockSharedholderSubmission : mockBrokerSubmission;

  // Form data state (auto-populated from shareholder/broker)
  const [personalData] = useState<PersonalInfoData>(
    currentSubmission as any
  );
  const [bankData] = useState<BankDetailsData>({
    bankName: currentSubmission.bankName,
    branch: currentSubmission.branch,
    accountNumber: currentSubmission.accountNumber,
    bvn: currentSubmission.bvn,
  });
  const [registrarData, setRegistrarData] = useState<RegistrarData>({
    sharesProvisionallyAllotted: mockIxTracData.rightsDue,
    sharesAccepted: currentSubmission.sharesAccepted,
    additionalSharesApplied: currentSubmission.additionalShares || 0,
    sharesRenounced: currentSubmission.sharesRenounced || 0,
    totalSharesAllotted:
      currentSubmission.sharesAccepted +
      (currentSubmission.additionalShares || 0),
    totalAmountPayable:
      mockIxTracData.amountPayable +
      ((currentSubmission.additionalShares || 0) *
        mockIxTracData.pricePerShare),
    totalAmountPaid:
      mockIxTracData.amountPayable +
      ((currentSubmission.additionalShares || 0) *
        mockIxTracData.pricePerShare),
    amountToBeRefunded: 0,
    bankDraftNumber: '',
    receivingAgentStamp: null,
    stampApplied: false,
  });

  // UI state
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const isFormValid = useMemo(() => {
    if (currentStep === 0 || currentStep === 1) {
      return true; // Data is auto-populated
    }
    if (currentStep === 2) {
      return true; // Preview only
    }
    if (currentStep === 3) {
      return registrarData.stampApplied;
    }
    return false;
  }, [currentStep, registrarData.stampApplied]);

  // Step navigation
  const handleStepClick = useCallback((step: number) => {
    setCurrentStep(step);
    if (step > 0) {
      setCompletedSteps(
        Array.from({ length: step }, (_, i) => i)
      );
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < formSteps.length - 1 && isFormValid) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  }, [currentStep, isFormValid, completedSteps]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSaveDraft = useCallback(() => {
    const draft = {
      registrarData,
      currentStep,
      timestamp: new Date().toISOString(),
    };
    sessionStorage.setItem('registrarDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  }, [registrarData, currentStep]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setAppStatus('completed');
      setIsSubmitting(false);
      alert('Application submitted to Issuing House! Reference: APP-2024-001234-REG');
    }, 1500);
  }, []);

  // Render content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 0: // Review Application
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Application Info Card */}
            <Card className="border-2 border-secondary p-6">
              <div className="flex items-start gap-4">
                <Clock size={24} className="text-secondary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-primary">
                        Application Received
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Reference: {currentSubmission.id}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Submitted on: {new Date().toLocaleDateString('en-NG')}
                      </p>
                    </div>
                    {submissionSource === 'broker' && (currentSubmission as any).brokerName && (
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg px-3 py-2">
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Submitted By Broker</p>
                        <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{(currentSubmission as any).brokerName}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* iX-Trac Details (Read-only) */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                Shareholder & Provisional Allotment
              </h2>
              <IxTracPanel data={mockIxTracData} />
            </div>

            {/* Shareholder Info (Read-only) */}
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-primary mb-6">
                Shareholder Information (From Submission)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Name
                  </label>
                  <p className="text-lg font-semibold bg-muted/50 p-3 rounded border border-border">
                    {personalData.shareholderName}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Next of Kin
                  </label>
                  <p className="text-lg font-semibold bg-muted/50 p-3 rounded border border-border">
                    {personalData.nextOfKin}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Daytime Phone
                  </label>
                  <p className="text-lg font-semibold bg-muted/50 p-3 rounded border border-border">
                    {personalData.daytimePhone}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Mobile Phone
                  </label>
                  <p className="text-lg font-semibold bg-muted/50 p-3 rounded border border-border">
                    {personalData.mobilePhone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Process
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <RegistrarSection
              onChange={setRegistrarData}
              initialData={registrarData}
              isBankDraftMethod={true}
            />
          </div>
        );

      case 2: // Preview
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="bg-card border-2 border-primary rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-primary">
                    Processing Complete
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    All registrar verification has been completed. Review the form and click
                    Preview to see the final A4-formatted document.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <h3 className="text-lg font-bold text-primary mb-4">Processing Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Shares Allotted:</span>
                  <span className="font-semibold">
                    {registrarData.totalSharesAllotted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Total Amount Payable:</span>
                  <span className="font-semibold">
                    ₦
                    {registrarData.totalAmountPayable.toLocaleString('en-NG', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Total Amount Paid:</span>
                  <span className="font-semibold">
                    ₦
                    {registrarData.totalAmountPaid.toLocaleString('en-NG', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-primary font-bold">
                  <span>Amount to Refund:</span>
                  <span>
                    ₦
                    {(registrarData.totalAmountPayable - registrarData.totalAmountPaid).toLocaleString(
                      'en-NG',
                      { minimumFractionDigits: 2 }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Submit
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {appStatus === 'completed' ? (
              <div className="bg-green-100/50 dark:bg-green-900/30 border-2 border-green-600 rounded-lg p-8 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Submitted to Issuing House!
                </h2>
                <p className="text-green-700 dark:text-green-400 mb-4">
                  The application has been successfully submitted.
                </p>
                <p className="text-lg font-semibold text-green-600">
                  Registrar Reference: APP-2024-001234-REG
                </p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Submit to Issuing House
                </h2>
                <p className="text-muted-foreground mb-6">
                  Once you submit this application, it will be forwarded to the Issuing House
                  for final processing and share allotment.
                </p>
                <div className="space-y-4 p-4 bg-yellow-100/50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 font-semibold flex items-start gap-2">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>
                      Ensure all receiving agent stamps and verifications are complete
                      before final submission.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <FormHeader
        mode="registrar"
        status={appStatus === 'completed' ? 'completed' : 'in-review'}
      />

      {/* Submission Source Filter */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <span className="text-sm font-semibold text-foreground">View Application from:</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSubmissionSource('shareholder');
                setCurrentStep(0);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                submissionSource === 'shareholder'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Direct Shareholder
            </button>
            <button
              onClick={() => {
                setSubmissionSource('broker');
                setCurrentStep(0);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                submissionSource === 'broker'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Stockbroker
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <FormStepper
          steps={formSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Main content */}
      {renderContent()}

      {/* Action buttons */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ActionButtons
          mode="registrar"
          step={currentStep}
          totalSteps={formSteps.length}
          isValid={isFormValid}
          isLoading={isSubmitting}
          onSaveDraft={handleSaveDraft}
          onPreview={() => setShowPreview(true)}
          onSubmit={appStatus === 'completed' ? undefined : handleSubmit}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoBack={currentStep > 0}
          canGoForward={currentStep < formSteps.length - 1 && isFormValid}
          showSubmitButton={currentStep === formSteps.length - 1 && appStatus !== 'completed'}
          submitLabel="Submit to Issuing House"
        />
      </div>

      {/* Print Preview Modal */}
      <PrintPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formData={{
          shareholderName: personalData.shareholderName,
          nextOfKin: personalData.nextOfKin,
          daytimePhone: personalData.daytimePhone,
          mobilePhone: personalData.mobilePhone,
          email: personalData.email,
          bankName: bankData.bankName,
          branch: bankData.branch,
          accountNumber: bankData.accountNumber,
          bvn: bankData.bvn,
        }}
        ixTracData={mockIxTracData}
        mode="registrar"
        registrarData={registrarData}
      />
    </div>
  );
}
