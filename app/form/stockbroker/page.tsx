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
import { BrokerLogin, type BrokerInfo } from '@/components/rights-form/BrokerLogin';
import { BrokerCompanyDetails, type BrokerCompanyDetailsData } from '@/components/rights-form/BrokerCompanyDetails';
import { ActionButtons } from '@/components/rights-form/ActionButtons';
import { PrintPreviewModal } from '@/components/rights-form/PrintPreviewModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, LogOut } from 'lucide-react';

// Mock iX-Trac data
const mockIxTracData = {
  regAcctNumber: 'IX-2024-001234',
  shareholderName: 'John Adeyemi Okafor',
  unitsHeld: 5000,
  rightsDue: 1000,
  pricePerShare: 2.50,
  amountPayable: 2500,
};

// Available brokers for login
const availableBrokers: BrokerInfo[] = [
  {
    id: 'broker-1',
    name: 'Premier Securities Limited',
    email: 'info@premiersec.com',
    phone: '+234 (0)1 234 5678',
  },
  {
    id: 'broker-2',
    name: 'Zenith Capital Markets',
    email: 'contact@zenithcap.com',
    phone: '+234 (0)1 456 7890',
  },
  {
    id: 'broker-3',
    name: 'ARM Securities Limited',
    email: 'brokers@armsec.com',
    phone: '+234 (0)1 789 0123',
  },
];

// Mock broker-specific applications
const brokerApplicationsData: Record<string, Array<{
  id: string;
  shareholderName: string;
  status: string;
  unitsSubscribed: number;
  amountPayable: number;
  createdDate: string;
  brokerId: string;
}>> = {
  'broker-1': [
    {
      id: 'BRK-APP-001',
      shareholderName: 'Sarah Johnson',
      status: 'Submitted',
      unitsSubscribed: 500,
      amountPayable: 1250,
      createdDate: '2024-01-15',
      brokerId: 'broker-1',
    },
    {
      id: 'BRK-APP-002',
      shareholderName: 'Michael Chen',
      status: 'Draft',
      unitsSubscribed: 300,
      amountPayable: 750,
      createdDate: '2024-01-16',
      brokerId: 'broker-1',
    },
    {
      id: 'BRK-APP-003',
      shareholderName: 'Amina Ahmed',
      status: 'Approved',
      unitsSubscribed: 1000,
      amountPayable: 2500,
      createdDate: '2024-01-14',
      brokerId: 'broker-1',
    },
  ],
  'broker-2': [
    {
      id: 'BRK-APP-004',
      shareholderName: 'David Okonkwo',
      status: 'Submitted',
      unitsSubscribed: 750,
      amountPayable: 1875,
      createdDate: '2024-01-17',
      brokerId: 'broker-2',
    },
    {
      id: 'BRK-APP-005',
      shareholderName: 'Emma Watson',
      status: 'Approved',
      unitsSubscribed: 600,
      amountPayable: 1500,
      createdDate: '2024-01-12',
      brokerId: 'broker-2',
    },
  ],
  'broker-3': [
    {
      id: 'BRK-APP-006',
      shareholderName: 'James Adebayo',
      status: 'Draft',
      unitsSubscribed: 450,
      amountPayable: 1125,
      createdDate: '2024-01-18',
      brokerId: 'broker-3',
    },
    {
      id: 'BRK-APP-007',
      shareholderName: 'Victoria Chukwu',
      status: 'Submitted',
      unitsSubscribed: 800,
      amountPayable: 2000,
      createdDate: '2024-01-19',
      brokerId: 'broker-3',
    },
    {
      id: 'BRK-APP-008',
      shareholderName: 'Hassan Ibrahim',
      status: 'Approved',
      unitsSubscribed: 1200,
      amountPayable: 3000,
      createdDate: '2024-01-11',
      brokerId: 'broker-3',
    },
  ],
};

const formSteps = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'View metrics',
  },
  {
    id: 'company',
    label: 'Company Details',
    description: 'Broker company info',
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
  // Authentication state
  const [loggedInBroker, setLoggedInBroker] = useState<BrokerInfo | null>(null);
  const [brokerCompanyDetails, setBrokerCompanyDetails] = useState<BrokerCompanyDetailsData | null>(null);

  // Form flow state
  const [currentStep, setCurrentStep] = useState(0);
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [acceptanceData, setAcceptanceData] = useState<AcceptanceData | null>(null);
  const [personalData, setPersonalData] = useState<PersonalInfoData | null>(null);
  const [bankData, setBankData] = useState<BankDetailsData | null>(null);
  const [signatureData, setSignatureData] = useState<SignaturesData | null>(null);
  const [stampData, setStampData] = useState<ReceivingAgentStampData | null>(null);

  const handleBrokerLogin = useCallback((broker: BrokerInfo) => {
    setLoggedInBroker(broker);
  }, []);

  const handleCompanyDetailsSubmit = useCallback((details: BrokerCompanyDetailsData) => {
    setBrokerCompanyDetails(details);
    setShowDashboard(true);
    setCurrentStep(0);
  }, []);

  const handleNewSubscription = useCallback(() => {
    setShowDashboard(false);
    setCurrentStep(2); // Skip to search (after company details step 1)
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
    setCurrentStep(3); // Confirm step (was 2, now offset by company details)
  }, []);

  const handleProceedFromCompanyDetails = useCallback(() => {
    setCurrentStep(2); // Search step
  }, []);

  const handleProceedFromConfirm = useCallback(() => {
    setCurrentStep(4); // Fill step (offset by company details)
  }, []);

  const handleProceedFromForm = useCallback(() => {
    setCurrentStep(5); // Stamp step (offset by company details)
  }, []);

  const handleProceedFromStamp = useCallback(() => {
    setCurrentStep(6); // Preview step (offset by company details)
  }, []);

  const handleSaveDraft = useCallback(() => {
    console.log('[v0] Draft saved (UI only - stockbroker)');
    alert('Draft saved successfully as "Draft (Broker)"');
  }, []);

  const handlePreview = useCallback(() => {
    setShowPrintPreview(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const brokerName = loggedInBroker?.name || brokerCompanyDetails?.companyName || 'Unknown Broker';
    console.log('[v0] Submitting to registrar:', {
      broker: brokerName,
      brokerEmail: brokerCompanyDetails?.companyEmail,
      brokerPhone: brokerCompanyDetails?.companyPhone,
      acceptance: acceptanceData,
      personal: personalData,
      bank: bankData,
      signature: signatureData,
      stamp: stampData,
    });
    alert(`Application submitted to registrar by ${brokerName}! Status: "SubmittedByBroker"`);
    handleBackToDashboard();
  }, [
    loggedInBroker,
    brokerCompanyDetails,
    acceptanceData,
    personalData,
    bankData,
    signatureData,
    stampData,
  ]);

  // Get applications for logged-in broker
  const brokerApplications = useMemo(() => {
    if (!loggedInBroker) return [];
    return brokerApplicationsData[loggedInBroker.id] || [];
  }, [loggedInBroker]);

  // Calculate metrics based on broker
  const metrics = useMemo(
    () => ({
      subscriberCount: brokerApplications.length,
      totalUnitsSubscribed: brokerApplications.reduce((sum, app) => sum + app.unitsSubscribed, 0),
      totalAmountProcessed: brokerApplications.reduce((sum, app) => sum + app.amountPayable, 0),
      pendingApplications: brokerApplications.filter((app) => app.status === 'Submitted').length,
    }),
    [brokerApplications]
  );

  // Show broker login if not authenticated
  if (!loggedInBroker) {
    return (
      <BrokerLogin
        onSelectBroker={handleBrokerLogin}
        availableBrokers={availableBrokers}
      />
    );
  }

  // Show company details form if broker logged in but company details not captured
  if (!brokerCompanyDetails) {
    return (
      <div className="min-h-screen bg-background">
        <FormHeader mode="stockbroker" status="Draft (Broker)" />
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <BrokerCompanyDetails
            onSubmit={handleCompanyDetailsSubmit}
            defaultValues={{
              companyName: loggedInBroker.name,
              companyPhone: loggedInBroker.phone,
              companyEmail: loggedInBroker.email,
            }}
          />
        </main>
      </div>
    );
  }

  const brokerDisplayName = brokerCompanyDetails.companyName || loggedInBroker.name;

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
            {/* Dashboard View - Now Dynamic Based on Broker */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary">{brokerDisplayName}</h1>
                <p className="text-muted-foreground mt-1">
                  {brokerCompanyDetails.companyEmail} • {brokerCompanyDetails.companyPhone}
                </p>
              </div>
              <button
                onClick={() => {
                  setLoggedInBroker(null);
                  setBrokerCompanyDetails(null);
                  setShowDashboard(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
            <BrokerDashboard
              metrics={metrics}
              brokerName={brokerDisplayName}
              onCreateNew={handleNewSubscription}
              applications={brokerApplications}
            />
          </>
        ) : (
          <>
            {/* Form View */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Broker: {brokerDisplayName}
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
              {/* Step 1: Company Details (read-only display) */}
              {currentStep === 1 && (
                <>
                  <Card className="p-6 border-2 border-secondary bg-blue-50 dark:bg-blue-950/20">
                    <h3 className="text-lg font-bold text-primary mb-4">Stockbroker Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Company Name</p>
                        <p className="font-semibold text-foreground mt-1">{brokerDisplayName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-semibold text-foreground mt-1">{brokerCompanyDetails.companyPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="font-semibold text-foreground mt-1">{brokerCompanyDetails.companyEmail}</p>
                      </div>
                    </div>
                  </Card>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleProceedFromCompanyDetails}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 ml-auto"
                    >
                      Continue to Search
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Search Account */}
              {currentStep === 2 && (
                <SearchPanel
                  onSearch={handleSearch}
                  onFound={() => setCurrentStep(3)}
                />
              )}

              {/* Step 3: Confirm Details */}
              {currentStep === 3 && isAccountFound && (
                <>
                  <IxTracPanel data={mockIxTracData} />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep(2)}
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

              {/* Step 4: Fill Shareholder Form */}
              {currentStep === 4 && (
                <>
                  <AcceptanceSection onChange={setAcceptanceData} />
                  <PersonalInfoSection onChange={setPersonalData} />
                  <BankDetailsSection onChange={setBankData} />
                  <SignaturesSection onChange={setSignatureData} />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep(3)}
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

              {/* Step 5: Receiving Agent Stamp */}
              {currentStep === 5 && (
                <>
                  <ReceivingAgentStamp
                    onChange={setStampData}
                    title="Receiving Agent Stamp"
                    description="Upload receiving agent stamp or confirm it has been physically applied. This will be forwarded to the registrar for verification."
                  />
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setCurrentStep(4)}
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

              {/* Step 6: Preview */}
              {currentStep === 6 && (
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
                brokerName={brokerDisplayName}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
