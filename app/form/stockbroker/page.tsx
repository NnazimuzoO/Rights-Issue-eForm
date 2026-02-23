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
import { BrokerDashboard } from '@/components/rights-form/BrokerDashboard';
import { ReceivingAgentStamp, type ReceivingAgentStampData } from '@/components/rights-form/ReceivingAgentStamp';
import { ActionButtons } from '@/components/rights-form/ActionButtons';
import { PrintPreviewModal } from '@/components/rights-form/PrintPreviewModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Tabs } from 'lucide-react';

// Mock iX-Trac data
const mockIxTracData = {
  regAcctNumber: 'IX-2024-001234',
  shareholderName: 'John Adeyemi Okafor',
  unitsHeld: 5000,
  rightsDue: 1000,
  pricePerShare: 2.50,
  amountPayable: 2500,
};

// Mock broker applications for dashboard
const mockApplications = [
  {
    id: 'BRK-APP-001',
    shareholderName: 'Sarah Johnson',
    status: 'Submitted',
    unitsSubscribed: 500,
    amountPayable: 1250,
    createdDate: '2024-01-15',
  },
  {
    id: 'BRK-APP-002',
    shareholderName: 'Michael Chen',
    status: 'Draft',
    unitsSubscribed: 300,
    amountPayable: 750,
    createdDate: '2024-01-16',
  },
  {
    id: 'BRK-APP-003',
    shareholderName: 'Amina Ahmed',
    status: 'Approved',
    unitsSubscribed: 1000,
    amountPayable: 2500,
    createdDate: '2024-01-14',
  },
];

const formSteps = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'View metrics',
  },
  {
    id: 'search',
    label: 'Search Account',
    description: 'Find subscriber',
  },
  {
    id: 'confirm',
    label: 'Confirm Details',
    description: 'Review iX-Trac data',
  },
  {
    id: 'fill',
    label: 'Fill Form',
    description: 'Complete subscriber info',
  },
  {
    id: 'stamp',
    label: 'Add Stamp',
    description: 'Upload/mark stamp',
  },
  {
    id: 'preview',
    label: 'Preview',
    description: 'Review & print',
  },
  {
    id: 'submit',
    label: 'Submit',
    description: 'Send to registrar',
  },
];

export default function StockbrokerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Form state
  const [brokerName] = useState('Premier Securities Limited');
  const [acceptanceData, setAcceptanceData] = useState<AcceptanceData | null>(null);
  const [personalData, setPersonalData] = useState<PersonalInfoData | null>(null);
  const [bankData, setBankData] = useState<BankDetailsData | null>(null);
  const [signatureData, setSignatureData] = useState<SignaturesData | null>(null);
  const [stampData, setStampData] = useState<ReceivingAgentStampData | null>(null);

  const handleNewSubscription = useCallback(() => {
    setShowDashboard(false);
    setCurrentStep(1);
    setIsAccountFound(false);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setShowDashboard(true);
    setCurrentStep(0);
    setIsAccountFound(false);
  }, []);

  const handleSearch = useCallback((searchType: string, searchValue: string) => {
    console.log(`[v0] Searching by ${searchType}: ${searchValue}`);
    setIsAccountFound(true);
    setCurrentStep(2);
  }, []);

  const handleProceedFromConfirm = useCallback(() => {
    setCurrentStep(3);
  }, []);

  const handleProceedFromForm = useCallback(() => {
    setCurrentStep(4);
  }, []);

  const handleProceedFromStamp = useCallback(() => {
    setCurrentStep(5);
  }, []);

  const handleSaveDraft = useCallback(() => {
    console.log('[v0] Draft saved (UI only - stockbroker)');
    alert('Draft saved successfully as "Draft (Broker)"');
  }, []);

  const handlePreview = useCallback(() => {
    setShowPrintPreview(true);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('[v0] Submitting to registrar:', {
      broker: brokerName,
      acceptance: acceptanceData,
      personal: personalData,
      bank: bankData,
      signature: signatureData,
      stamp: stampData,
    });
    alert(`Application submitted to registrar! Status: "SubmittedByBroker"`);
    handleBackToDashboard();
  }, [
    brokerName,
    acceptanceData,
    personalData,
    bankData,
    signatureData,
    stampData,
  ]);

  // Calculate metrics
  const metrics = useMemo(
    () => ({
      subscriberCount: mockApplications.length,
      totalUnitsSubscribed: mockApplications.reduce((sum, app) => sum + app.unitsSubscribed, 0),
      totalAmountProcessed: mockApplications.reduce((sum, app) => sum + app.amountPayable, 0),
      pendingApplications: mockApplications.filter((app) => app.status === 'Submitted').length,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <FormHeader
        mode="stockbroker"
        status={showDashboard ? 'Draft (Broker)' : 'Draft (Broker)'}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {showDashboard ? (
          <>
            {/* Dashboard View */}
            <BrokerDashboard
              metrics={metrics}
              brokerName={brokerName}
              onCreateNew={handleNewSubscription}
              applications={mockApplications}
            />
          </>
        ) : (
          <>
            {/* Form View */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Broker: {brokerName}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    New Subscription Form
                  </Badge>
                </div>
                <button
                  onClick={handleBackToDashboard}
                  className="text-primary hover:text-primary/80 text-sm font-medium underline"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>

            {/* Stepper */}
            <FormStepper
              steps={formSteps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />

            {/* Step Content */}
            <div className="mt-8 space-y-6">
              {/* Step 1: Search Account */}
              {currentStep === 1 && (
                <SearchPanel
                  onSearch={handleSearch}
                  onFound={() => setCurrentStep(2)}
                />
              )}

              {/* Step 2: Confirm Details */}
              {currentStep === 2 && isAccountFound && (
                <>
                  <IxTracPanel data={mockIxTracData} />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-2 text-foreground border border-border rounded-lg hover:bg-muted"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleProceedFromConfirm}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Fill Shareholder Form */}
              {currentStep === 3 && (
                <>
                  <AcceptanceSection onChange={setAcceptanceData} />
                  <PersonalInfoSection onChange={setPersonalData} />
                  <BankDetailsSection onChange={setBankData} />
                  <SignaturesSection onChange={setSignatureData} />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2 text-foreground border border-border rounded-lg hover:bg-muted"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleProceedFromForm}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      Continue to Stamp
                    </button>
                  </div>
                </>
              )}

              {/* Step 4: Receiving Agent Stamp */}
              {currentStep === 4 && (
                <>
                  <ReceivingAgentStamp
                    onChange={setStampData}
                    title="Receiving Agent Stamp"
                    description="Upload receiving agent stamp or confirm it has been physically applied. This will be forwarded to the registrar for verification."
                  />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2 text-foreground border border-border rounded-lg hover:bg-muted"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleProceedFromStamp}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      Preview & Print
                    </button>
                  </div>
                </>
              )}

              {/* Step 5: Preview */}
              {currentStep === 5 && (
                <>
                  <Card className="p-6 border border-border bg-blue-50 border-blue-200 flex items-start gap-4">
                    <CheckCircle size={24} className="text-blue-700 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Ready to Submit</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        Click "Preview/Print" to see the final form, then "Submit to Registrar" to send it
                        for approval. The registrar will review and process this submission.
                      </p>
                    </div>
                  </Card>
                  <ActionButtons
                    mode="stockbroker"
                    currentStep={currentStep}
                    totalSteps={formSteps.length}
                    onSaveDraft={handleSaveDraft}
                    onPreviewPrint={handlePreview}
                    onSubmit={handleSubmit}
                    onNext={() => setCurrentStep(currentStep + 1)}
                    onPrevious={() => setCurrentStep(currentStep - 1)}
                  />
                </>
              )}
            </div>

            {/* Print Preview Modal */}
            {showPrintPreview && (
              <PrintPreviewModal
                isOpen={showPrintPreview}
                onClose={() => setShowPrintPreview(false)}
                formData={{
                  shareholderName: mockIxTracData.shareholderName,
                  regAcctNumber: mockIxTracData.regAcctNumber,
                  acceptance: acceptanceData,
                  personal: personalData,
                  bank: bankData,
                  signature: signatureData,
                }}
                source="broker"
                brokerName={brokerName}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
