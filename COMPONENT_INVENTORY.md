# Component Inventory & API Reference

## Custom Components

### FormHeader
**Location**: `components/rights-form/FormHeader.tsx`  
**Purpose**: Display page header with company/status information  
**Props**:
```typescript
interface FormHeaderProps {
  mode: 'shareholder' | 'registrar';
  status?: 'draft' | 'submitted' | 'in-review' | 'completed';
}
```
**Features**:
- Dynamic status badge
- Company/issuing house display
- Offer period information
- Responsive layout

---

### FormStepper
**Location**: `components/rights-form/FormStepper.tsx`  
**Purpose**: Multi-step progress navigation  
**Props**:
```typescript
interface Step {
  id: string;
  label: string;
  description?: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  completedSteps?: number[];
}
```
**Features**:
- Mobile: Vertical layout with cards
- Desktop: Horizontal with connectors
- Click to jump between steps
- Checkmark on completed steps
- Step descriptions

---

### SearchPanel
**Location**: `components/rights-form/SearchPanel.tsx`  
**Purpose**: Account search interface  
**Props**:
```typescript
interface SearchPanelProps {
  onSearch: (type: string, value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  hasResult?: boolean;
  error?: string;
}
```
**Search Types**:
- Shareholder Name
- iX-Trac Account Number
- Bank Account Number
- CHN (Clearing House Number)

**Features**:
- Radio button selection
- Input field with validation
- Search/Clear buttons
- Error/success messaging
- Loading state

---

### IxTracPanel
**Location**: `components/rights-form/IxTracPanel.tsx`  
**Purpose**: Display read-only iX-Trac data  
**Props**:
```typescript
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
```
**Features**:
- 2-column layout (desktop)
- Lock icon for read-only indicator
- Summary box at bottom
- Highlighted amount payable
- Professional table display

---

### AcceptanceSection
**Location**: `components/rights-form/AcceptanceSection.tsx`  
**Purpose**: Acceptance/Renunciation form logic  
**Props**:
```typescript
interface AcceptanceSectionProps {
  pricePerShare: number;
  rightsDue: number;
  amountPayable: number;
  onChange?: (data: AcceptanceData) => void;
}

interface AcceptanceData {
  acceptanceType: 'full' | 'additional' | 'partial';
  additionalSharesApplied?: number;
  additionalAmountPayable?: number;
  paymentMethod?: 'transfer' | 'cheque' | 'draft';
  bankName?: string;
  chequeNumber?: string;
  paymentEvidence?: File | null;
  sharesAccepted?: number;
  sharesRenounced?: number;
}
```
**Options**:
- **Option A**: Full Acceptance or Additional Shares
- **Option B**: Partial Acceptance/Renunciation
- Mutual exclusivity toggle

**Features**:
- Radio button selection
- Real-time calculations
- Payment method selection
- File upload for evidence
- Conditional fields
- Scaling confirmation

---

### PersonalInfoSection
**Location**: `components/rights-form/PersonalInfoSection.tsx`  
**Purpose**: Shareholder personal information  
**Props**:
```typescript
interface PersonalInfoData {
  shareholderName: string;
  nextOfKin: string;
  daytimePhone: string;
  mobilePhone: string;
  email: string;
}

interface PersonalInfoSectionProps {
  onChange?: (data: PersonalInfoData) => void;
  initialData?: PersonalInfoData;
}
```
**Fields**: (all mandatory except email)
- Name in block letters
- Next of Kin
- Daytime Phone
- Mobile Phone
- Email

---

### BankDetailsSection
**Location**: `components/rights-form/BankDetailsSection.tsx`  
**Purpose**: E-dividend banking information  
**Props**:
```typescript
interface BankDetailsData {
  bankName: string;
  branch: string;
  accountNumber: string;
  bvn: string;
}

interface BankDetailsSectionProps {
  onChange?: (data: BankDetailsData) => void;
  initialData?: BankDetailsData;
}
```
**Fields**:
- Bank Name (mandatory)
- Branch (optional)
- Account Number (mandatory, 10 digits)
- BVN (mandatory, 11 digits)

**Features**:
- Input validation
- Digit limiting
- Informational note

---

### SignaturesSection
**Location**: `components/rights-form/SignaturesSection.tsx`  
**Purpose**: Document signature uploads  
**Props**:
```typescript
interface SignaturesData {
  signature: File | null;
  secondSignature?: File | null;
  authSignatoryName?: string;
  designation?: string;
  incorporationNumber?: string;
  corporateSeal?: File | null;
  isCorporate?: boolean;
}

interface SignaturesSectionProps {
  onChange?: (data: SignaturesData) => void;
  isCorporate?: boolean;
  initialData?: SignaturesData;
}
```
**Features**:
- Drag & drop file upload
- Primary + secondary signature
- Corporate fields (conditional)
- Info note about requirements

---

### RegistrarSection
**Location**: `components/rights-form/RegistrarSection.tsx`  
**Purpose**: Registrar verification section  
**Props**:
```typescript
interface RegistrarData {
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
```
**Features**:
- Summary table view
- Auto-calculated totals
- Stamp upload and verification
- Warning/info messaging

---

### ActionButtons
**Location**: `components/rights-form/ActionButtons.tsx`  
**Purpose**: Form navigation and action buttons  
**Props**:
```typescript
interface ActionButtonsProps {
  mode: 'shareholder' | 'registrar';
  step: number;
  totalSteps: number;
  isValid?: boolean;
  isLoading?: boolean;
  onSaveDraft?: () => void;
  onPreview?: () => void;
  onSubmit?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  showDraftButton?: boolean;
  showPreviewButton?: boolean;
  showSubmitButton?: boolean;
  submitLabel?: string;
}
```
**Actions**:
- Previous/Next navigation
- Save Draft
- Preview
- Submit
- Custom buttons (optional)

---

### PrintPreviewModal
**Location**: `components/rights-form/PrintPreviewModal.tsx`  
**Purpose**: A4 print-friendly form preview  
**Props**:
```typescript
interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  ixTracData?: IxTracData;
  mode?: 'shareholder' | 'registrar';
  registrarData?: any;
}
```
**Features**:
- Modal dialog
- Print button
- Download PDF (placeholder)
- A4 formatting
- Professional layout
- All data display

---

## shadcn/ui Components Used

### Button
**Usage**: Primary, secondary, outline, ghost, destructive variants
```tsx
<Button>Click me</Button>
<Button variant="outline">Secondary</Button>
<Button disabled>Disabled</Button>
```

### Input
**Usage**: Text, email, tel, number inputs
```tsx
<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="your@email.com" />
```

### Label
**Usage**: Form field labels
```tsx
<Label htmlFor="field">Field Label</Label>
```

### Card
**Usage**: Container for form sections
```tsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### AlertCircle (lucide-react)
**Usage**: Error and warning indicators
```tsx
<AlertCircle size={20} className="text-red-600" />
```

### CheckCircle (lucide-react)
**Usage**: Success indicators
```tsx
<CheckCircle size={20} className="text-green-600" />
```

### Other Icons (lucide-react)
- Search - Search button
- Upload - File upload
- ChevronLeft/ChevronRight - Navigation
- Check - Checkmarks
- Lock - Read-only indicator
- Clock - Status indicator
- Save - Draft saving
- Eye - Preview button
- Send - Submit button
- Download - PDF download
- Print - Print button

---

## Page Components

### Home Page
**Location**: `/app/page.tsx`  
**Route**: `/`  
**Purpose**: Landing page with feature overview

---

### Shareholder Form
**Location**: `/app/form/shareholder/page.tsx`  
**Route**: `/form/shareholder`  
**Components Used**:
- FormHeader
- FormStepper
- SearchPanel
- IxTracPanel
- PersonalInfoSection
- AcceptanceSection
- BankDetailsSection
- SignaturesSection
- ActionButtons
- PrintPreviewModal

**State Management**:
- Search result state
- Multi-step form state
- All section data states
- Preview modal state

---

### Registrar Form
**Location**: `/app/form/registrar/page.tsx`  
**Route**: `/form/registrar`  
**Components Used**:
- FormHeader
- FormStepper
- IxTracPanel
- PersonalInfoSection
- BankDetailsSection
- RegistrarSection
- ActionButtons
- PrintPreviewModal

**State Management**:
- Application status state
- Registrar data state
- Current step state

---

## Utility Functions

### Calculations (`lib/form-utils.ts`)

```typescript
calculateAmountPayable(shares: number, pricePerShare: number): number
calculateTotalDue(baseAmount, additionalShares, pricePerShare): number
calculateRefundAmount(totalPayable, totalPaid): number
calculateTotalAllotted(accepted, additional): number
```

### Validation (`lib/form-utils.ts`)

```typescript
validateEmail(email: string): boolean
validatePhone(phone: string): boolean
validateBVN(bvn: string): boolean
validateAccountNumber(accountNumber: string): boolean
validatePersonalInfo(data): FormValidationResult
validateBankDetails(data): FormValidationResult
validateAcceptanceData(data): FormValidationResult
validateSignatures(data): FormValidationResult
```

### Draft Management (`lib/form-utils.ts`)

```typescript
saveDraftToStorage(draft: FormDraft, key?: string): void
loadDraftFromStorage(key?: string): FormDraft | null
clearDraftFromStorage(key?: string): void
```

### Formatting (`lib/form-utils.ts`)

```typescript
formatCurrency(amount: number): string
formatPhoneNumber(phone: string): string
```

### Payload Building (`lib/form-utils.ts`)

```typescript
prepareSubmissionPayload(personal, acceptance, bank, signature): FormSubmissionPayload
prepareRegistrarSubmissionPayload(registrar, personal, bank): RegistrarSubmissionPayload
```

---

## Data Interfaces

### IxTracData
```typescript
interface IxTracData {
  regAcctNumber: string;
  shareholderName: string;
  unitsHeld: number;
  rightsDue: number;
  pricePerShare: number;
  amountPayable: number;
}
```

### AcceptanceData
```typescript
interface AcceptanceData {
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
```

### PersonalInfoData
```typescript
interface PersonalInfoData {
  shareholderName: string;
  nextOfKin: string;
  daytimePhone: string;
  mobilePhone: string;
  email: string;
}
```

### BankDetailsData
```typescript
interface BankDetailsData {
  bankName: string;
  branch: string;
  accountNumber: string;
  bvn: string;
}
```

### SignaturesData
```typescript
interface SignaturesData {
  signature: File | null;
  secondSignature?: File | null;
  authSignatoryName?: string;
  designation?: string;
  incorporationNumber?: string;
  corporateSeal?: File | null;
  isCorporate?: boolean;
}
```

### RegistrarData
```typescript
interface RegistrarData {
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
```

---

## Import Paths

### Custom Components
```typescript
import { FormHeader } from '@/components/rights-form/FormHeader';
import { FormStepper } from '@/components/rights-form/FormStepper';
import { SearchPanel } from '@/components/rights-form/SearchPanel';
import { IxTracPanel } from '@/components/rights-form/IxTracPanel';
import { AcceptanceSection } from '@/components/rights-form/AcceptanceSection';
import { PersonalInfoSection } from '@/components/rights-form/PersonalInfoSection';
import { BankDetailsSection } from '@/components/rights-form/BankDetailsSection';
import { SignaturesSection } from '@/components/rights-form/SignaturesSection';
import { RegistrarSection } from '@/components/rights-form/RegistrarSection';
import { ActionButtons } from '@/components/rights-form/ActionButtons';
import { PrintPreviewModal } from '@/components/rights-form/PrintPreviewModal';
```

### UI Components
```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
```

### Icons
```typescript
import { Search, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Lock, Clock, Upload, Save, Eye, Send, Download, Print, Info, X } from 'lucide-react';
```

### Utilities
```typescript
import { cn } from '@/lib/utils';
import * as formUtils from '@/lib/form-utils';
```

---

## Component Reusability Guide

### High Reusability
- FormStepper (can be used for any multi-step form)
- ActionButtons (generic navigation/action buttons)
- SearchPanel (searchable lookup pattern)

### Medium Reusability
- IxTracPanel (read-only data display)
- PersonalInfoSection (personal contact info)
- BankDetailsSection (bank account info)

### Specific Purpose
- AcceptanceSection (rights-issue specific)
- SignaturesSection (document signing specific)
- RegistrarSection (registrar-only verification)
- PrintPreviewModal (form preview specific)

---

## Component Dependencies

```
FormHeader
  ├── lucide-react

FormStepper
  ├── lucide-react
  └── utils.cn

SearchPanel
  ├── Button
  ├── Input
  ├── Label
  └── lucide-react

IxTracPanel
  └── lucide-react

AcceptanceSection
  ├── Button
  ├── Input
  ├── Label
  ├── lucide-react
  └── lib/form-utils

PersonalInfoSection
  ├── Input
  ├── Label
  └── lib/form-utils

BankDetailsSection
  ├── Input
  ├── Label
  └── lib/form-utils

SignaturesSection
  ├── Input
  ├── Label
  ├── lucide-react
  └── lib/form-utils

RegistrarSection
  ├── Input
  ├── Label
  ├── lucide-react
  └── lib/form-utils

ActionButtons
  ├── Button
  ├── lucide-react
  └── utils.cn

PrintPreviewModal
  ├── Button
  └── lucide-react

ShareholderFormPage
  ├── All custom components
  ├── ActionButtons
  └── lucide-react

RegistrarFormPage
  ├── Custom components
  ├── ActionButtons
  └── lucide-react
```

---

**Document Version**: 1.0  
**Last Updated**: February 2024  
**Total Components**: 20+  
**Total Utility Functions**: 15+
