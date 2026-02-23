'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { FormHeader } from '@/components/rights-form/FormHeader';
import { FormStepper } from '@/components/rights-form/FormStepper';
import { SearchPanel } from '@/components/rights-form/SearchPanel';
import { IxTracPanel } from '@/components/rights-form/IxTracPanel';
import { AcceptanceSection, type AcceptanceData } from '@/components/rights-form/AcceptanceSection';
import { PersonalInfoSection, type PersonalInfoData } from '@/components/rights-form/PersonalInfoSection';
import { BankDetailsSection, type BankDetailsData } from '@/components/rights-form/BankDetailsSection';
import { SignaturesSection, type SignaturesData } from '@/components/rights-form/SignaturesSection';
import { ActionButtons } from '@/components/rights-form/ActionButtons';
import { PrintPreviewModal } from '@/components/rights-form/PrintPreviewModal';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Mock iX-Trac data
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
    id: 'search',
    label: 'Search Account',
    description: 'Find your account',
  },
  {
    id: 'confirm',
    label: 'Confirm Details',
    description: 'Review iX-Trac data',
  },
  {
    id: 'fill',
    label: 'Fill Form',
    description: 'Complete your info',
  },
  {
    id: 'preview',
    label: 'Preview',
    description: 'Review & print',
  },
  {
    id: 'submit',
    label: 'Submit',
    description: 'Final submission',
  },
];

export default function ShareholderFormPage() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Search state
  const [searchResult, setSearchResult] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  // Form data state
  const [formStatus, setFormStatus] = useState<'draft' | 'submitted'>('draft');
  const [acceptanceData, setAcceptanceData] = useState<AcceptanceData | null>(null);
  const [personalData, setPersonalData] = useState<PersonalInfoData | null>(null);
  const [bankData, setBankData] = useState<BankDetailsData | null>(null);
  const [signatureData, setSignatureData] = useState<SignaturesData | null>(null);

  // UI state
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const isFormValid = useMemo(() => {
    if (currentStep === 0) {
      return searchResult;
    }
    if (currentStep === 1) {
      return searchResult;
    }
    if (currentStep === 2) {
      return (
        personalData?.shareholderName &&
        personalData?.nextOfKin &&
        personalData?.daytimePhone &&
        personalData?.mobilePhone &&
        bankData?.bankName &&
        bankData?.accountNumber &&
        bankData?.bvn
      );
    }
    if (currentStep === 3) {
      return true;
    }
    if (currentStep === 4) {
      return signatureData?.signature !== null;
    }
    return false;
  }, [currentStep, searchResult, personalData, bankData, signatureData]);

  // Handle search
  const handleSearch = useCallback((type: string, value: string) => {
    setIsSearching(true);
    setSearchError('');

    // Simulate API call
    setTimeout(() => {
      if (value.length > 0) {
        setSearchResult(true);
        setIsSearching(false);
        // Auto-advance to next step
        handleStepClick(1);
      } else {
        setSearchError('Please enter a search value');
        setIsSearching(false);
      }
    }, 1000);
  }, []);

  const handleClear = useCallback(() => {
    setSearchResult(false);
    setSearchError('');
  }, []);

  // Step navigation
  const handleStepClick = useCallback((step: number) => {
    setCurrentStep(step);
    // Mark all previous steps as completed
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
    // Save to session storage
    const draft = {
      acceptanceData,
      personalData,
      bankData,
      signatureData,
      currentStep,
      timestamp: new Date().toISOString(),
    };
    sessionStorage.setItem('rightsFormDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  }, [acceptanceData, personalData, bankData, signatureData, currentStep]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setFormStatus('submitted');
      setIsSubmitting(false);
      alert('Application submitted successfully! Your reference number is: APP-2024-001234');
    }, 1500);
  }, []);

  // Determine which data to show based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 0: // Search
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <SearchPanel
              onSearch={handleSearch}
              onClear={handleClear}
              isLoading={isSearching}
              hasResult={searchResult}
              error={searchError}
            />
          </div>
        );

      case 1: // Confirm Details
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <IxTracPanel data={mockIxTracData} isVisible={searchResult} />
          </div>
        );

      case 2: // Fill Form
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <PersonalInfoSection onChange={setPersonalData} />
            <AcceptanceSection
              pricePerShare={mockIxTracData.pricePerShare}
              rightsDue={mockIxTracData.rightsDue}
              amountPayable={mockIxTracData.amountPayable}
              onChange={setAcceptanceData}
            />
            <BankDetailsSection onChange={setBankData} />
            <SignaturesSection onChange={setSignatureData} />
          </div>
        );

      case 3: // Preview
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="bg-card border-2 border-primary rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-primary">Form Complete</h2>
                  <p className="text-muted-foreground mt-2">
                    Review your information and click Preview to see the A4-formatted form before submission.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <h3 className="text-lg font-bold text-primary mb-4">Form Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold">{personalData?.shareholderName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Acceptance Type:</span>
                  <span className="font-semibold">
                    {acceptanceData?.acceptanceType === 'full'
                      ? 'Full Acceptance'
                      : acceptanceData?.acceptanceType === 'additional'
                      ? 'Additional Shares'
                      : 'Partial/Renunciation'}
                  </span>
                </div>
                {acceptanceData?.additionalSharesApplied && (
                  <div className="flex justify-between pb-2 border-b border-border">
                    <span className="text-muted-foreground">Additional Shares:</span>
                    <span className="font-semibold">
                      {acceptanceData.additionalSharesApplied.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-border">
                  <span className="text-muted-foreground">Bank:</span>
                  <span className="font-semibold">{bankData?.bankName}</span>
                </div>
                <div className="flex justify-between pt-2 text-primary font-bold">
                  <span>Total Amount Due:</span>
                  <span>
                    ₦
                    {(
                      (acceptanceData?.additionalAmountPayable || 0) +
                      mockIxTracData.amountPayable
                    ).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Submit
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {formStatus === 'submitted' ? (
              <div className="bg-green-100/50 dark:bg-green-900/30 border-2 border-green-600 rounded-lg p-8 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Application Submitted!
                </h2>
                <p className="text-green-700 dark:text-green-400 mb-4">
                  Your application has been successfully submitted to the Registrar.
                </p>
                <p className="text-lg font-semibold text-green-600">
                  Reference Number: APP-2024-001234
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Check your email for confirmation and further instructions.
                </p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Ready to Submit?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Click the Submit Application button to send your form to the Registrar for processing. You will receive a reference number for tracking.
                </p>
                <div className="p-4 bg-yellow-100/50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    ⚠️ Once submitted, you cannot make changes. Please review your information carefully.
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
      <FormHeader mode="shareholder" status={formStatus === 'submitted' ? 'submitted' : 'draft'} />

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
          mode="shareholder"
          step={currentStep}
          totalSteps={formSteps.length}
          isValid={isFormValid}
          isLoading={isSubmitting || isSearching}
          onSaveDraft={handleSaveDraft}
          onPreview={() => setShowPreview(true)}
          onSubmit={formStatus === 'submitted' ? undefined : handleSubmit}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoBack={currentStep > 0}
          canGoForward={currentStep < formSteps.length - 1 && isFormValid}
          showSubmitButton={currentStep === formSteps.length - 1 && formStatus !== 'submitted'}
        />
      </div>

      {/* Print Preview Modal */}
      <PrintPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formData={{
          shareholderName: personalData?.shareholderName || '',
          nextOfKin: personalData?.nextOfKin || '',
          daytimePhone: personalData?.daytimePhone || '',
          mobilePhone: personalData?.mobilePhone || '',
          email: personalData?.email || '',
          bankName: bankData?.bankName || '',
          branch: bankData?.branch || '',
          accountNumber: bankData?.accountNumber || '',
          bvn: bankData?.bvn || '',
          acceptanceType: acceptanceData?.acceptanceType,
          additionalShares: acceptanceData?.additionalSharesApplied,
        }}
        ixTracData={mockIxTracData}
        mode="shareholder"
      />
    </div>
  );
}
