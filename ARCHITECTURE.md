# Rights Issue e-Form - Architecture Overview

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      WEB APPLICATION                          │
│              (Next.js 15 with React 19.2)                    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┬─────────────────┬──────────────────┐    │
│  │                │                 │                  │    │
│  ▼                ▼                 ▼                  ▼    │
│ HOME PAGE     SHAREHOLDER FORM   STOCKBROKER FORM   REGISTRAR FORM
│ /             /form/shareholder   /form/stockbroker  /form/registrar
│               │                   │                  │
│               │ (User:            │ (User: Broker)   │ (User: Registrar)
│               │  Shareholder)     │                  │
│               │                   │                  │
└───────────────┼───────────────────┼──────────────────┼────────────────┘
                │                   │                  │
                ▼                   ▼                  ▼
           FORM COMPONENTS (Shared UI Library)
           
┌──────────────────────────────────────────────────────────────┐
│                  SHARED COMPONENTS                            │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ FormHeader   │  │ FormStepper  │  │ SearchPanel  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ IxTracPanel  │  │ Acceptance   │  │ PersonalInfo │       │
│  └──────────────┘  │ Section      │  │ Section      │       │
│                    └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ BankDetails  │  │ Signatures   │  │ RegistrarSec │       │
│  │ Section      │  │ Section      │  │ (Registrar)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Broker       │  │ Receiving    │  │ Action       │       │
│  │ Dashboard    │  │ Agent Stamp  │  │ Buttons      │       │
│  │ (NEW)        │  │ (NEW)        │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │  PrintPreviewModal (A4 Format)                   │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                           ▲
                           │
                           │ Uses
                           │
              ┌────────────┴─────────────┐
              │                          │
              ▼                          ▼
         UTILITIES              DESIGN SYSTEM
         /lib/form-utils.ts     /app/globals.css
         - Calculations         - Colors
         - Validation           - Typography
         - Form Logic           - Spacing
                                - Responsive
```

---

## Data Flow Diagram

### Shareholder Workflow
```
┌─────────────┐
│  Home Page  │
│  (Public)   │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────┐
│  Shareholder Form Page           │
│  (/form/shareholder)             │
└──────┬───────────────────────────┘
       │
       ├─► Search Account (SearchPanel)
       │       │
       │       ▼
       │   iX-Trac Lookup
       │       │
       │       ▼
       │   Display Details (IxTracPanel) [Read-only]
       │
       ├─► Fill Form
       │   ├─ AcceptanceSection (Full/Additional/Renunciation)
       │   ├─ PersonalInfoSection (Contact details)
       │   ├─ BankDetailsSection (E-dividend)
       │   └─ SignaturesSection (Sign form)
       │
       ├─► Preview/Print
       │   └─ PrintPreviewModal (A4 format)
       │
       └─► Submit
               │
               ▼
           Status: SubmittedByShareholder
               │
               ▼
           ┌──────────────────────┐
           │  Registrar Queue     │
           │  (Awaiting Review)   │
           └──────────────────────┘
```

### Stockbroker Workflow (NEW)
```
┌─────────────┐
│  Home Page  │
│  (Public)   │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────┐
│  Stockbroker Portal              │
│  (/form/stockbroker)             │
└──────┬───────────────────────────┘
       │
       ├─► Dashboard (BrokerDashboard)
       │   ├─ Metrics Cards (Subscribers, Units, Amount, Pending)
       │   └─ Recent Applications Table
       │
       ├─► New Subscription
       │   │
       │   ├─► Search Subscriber (SearchPanel)
       │   │       │
       │   │       ▼
       │   │   iX-Trac Lookup
       │   │       │
       │   │       ▼
       │   │   Display Details (IxTracPanel) [Read-only]
       │   │
       │   ├─► Fill Subscriber Form (Same as Shareholder)
       │   │   ├─ AcceptanceSection
       │   │   ├─ PersonalInfoSection
       │   │   ├─ BankDetailsSection
       │   │   └─ SignaturesSection
       │   │
       │   ├─► Add Stamp (ReceivingAgentStamp) [NEW]
       │   │   ├─ Upload Image/PDF
       │   │   └─ OR Mark as Physically Applied
       │   │
       │   ├─► Preview/Print (PrintPreviewModal with Broker Name) [ENHANCED]
       │   │   └─ Shows "PROCESSED VIA STOCKBROKER: {Broker Name}"
       │   │
       │   └─► Submit
       │       │
       │       ▼
       │   Status: SubmittedByBroker [NEW]
       │       │
       │       ▼
       │   ┌──────────────────────┐
       │   │  Registrar Queue     │
       │   │  (With Broker Badge) │
       │   └──────────────────────┘
       │
       └─► Save Draft (SessionStorage)
           └─ Returns to Dashboard
```

### Registrar Workflow (ENHANCED)
```
┌─────────────┐
│  Home Page  │
│  (Public)   │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────┐
│  Registrar Portal                │
│  (/form/registrar)               │
└──────┬───────────────────────────┘
       │
       ├─► Choose Submission Source [NEW]
       │   ├─ "Direct Shareholder" (Existing)
       │   └─ "Stockbroker" (NEW)
       │
       ├─► View Application Queue
       │   ├─ Shareholder Applications
       │   └─ Broker Applications [NEW]
       │       └─ Shows "Submitted By Broker: {Name}" Badge
       │
       ├─► Review Application
       │   ├─ Shareholder Data (Read-only)
       │   ├─ Payment Info (Read-only)
       │   ├─ Stamp Info (Read-only) [From Broker]
       │   └─ Registrar Section
       │       ├─ Verify Calculations
       │       ├─ Confirm Share Allotment
       │       └─ Confirm Amount Payable
       │
       ├─► Approve/Reject (Future Enhancement)
       │   ├─ Approve → Status: ApprovedByRegistrar
       │   └─ Reject → Status: RejectedByRegistrar
       │
       ├─► Preview/Print (PrintPreviewModal)
       │   └─ Shows broker info if broker-submitted
       │
       └─► Submit to Issuing House
           │
           ▼
       Status: SubmittedToIssuingHouse
           │
           ▼
       ┌──────────────────────────┐
       │  Issuing House (Final)   │
       │  (Out of system)         │
       └──────────────────────────┘
```

---

## Component Hierarchy

```
App
├── Home Page (/)
│   ├── Hero Section
│   ├── Feature Cards (3)
│   └── Portal Access Buttons (3)
│       ├── Shareholder Access → /form/shareholder
│       ├── Stockbroker Access → /form/stockbroker [NEW]
│       └── Registrar Access → /form/registrar
│
├── Shareholder Portal (/form/shareholder)
│   ├── FormHeader
│   ├── FormStepper
│   ├── SearchPanel
│   ├── IxTracPanel
│   ├── AcceptanceSection
│   ├── PersonalInfoSection
│   ├── BankDetailsSection
│   ├── SignaturesSection
│   ├── ActionButtons
│   └── PrintPreviewModal
│
├── Stockbroker Portal (/form/stockbroker) [NEW]
│   ├── FormHeader (Broker mode)
│   ├── BrokerDashboard [NEW]
│   │   ├── Metrics Cards (4)
│   │   └── Applications Table
│   ├── FormStepper (7 steps)
│   ├── SearchPanel
│   ├── IxTracPanel
│   ├── AcceptanceSection
│   ├── PersonalInfoSection
│   ├── BankDetailsSection
│   ├── SignaturesSection
│   ├── ReceivingAgentStamp [NEW]
│   │   ├── File Upload
│   │   ├── File Preview
│   │   └── Checkbox Option
│   ├── ActionButtons (Broker mode)
│   └── PrintPreviewModal (Broker display)
│
└── Registrar Portal (/form/registrar) [ENHANCED]
    ├── FormHeader
    ├── Submission Filter [NEW]
    │   ├── Direct Shareholder
    │   └── Stockbroker [NEW]
    ├── FormStepper
    ├── IxTracPanel
    ├── PersonalInfoSection
    ├── BankDetailsSection
    ├── RegistrarSection
    ├── ActionButtons
    ├── PrintPreviewModal (Broker display) [ENHANCED]
    └── Broker Badge Display [NEW]
```

---

## State Management

### Shareholder Form State
```typescript
{
  currentStep: number              // 0-4 (5 steps)
  isAccountFound: boolean          // Search result
  acceptanceData: AcceptanceData   // Form section 1
  personalData: PersonalInfoData   // Form section 2
  bankData: BankDetailsData        // Form section 3
  signatureData: SignaturesData    // Form section 4
  showPrintPreview: boolean        // Modal state
}
```

### Stockbroker Form State (NEW)
```typescript
{
  currentStep: number              // 0-6 (7 steps)
  isAccountFound: boolean          // Search result
  showDashboard: boolean           // Dashboard vs form
  brokerName: string               // "Premier Securities Limited"
  acceptanceData: AcceptanceData   // Form section 1
  personalData: PersonalInfoData   // Form section 2
  bankData: BankDetailsData        // Form section 3
  signatureData: SignaturesData    // Form section 4
  stampData: ReceivingAgentStampData // NEW - Form section 5
  showPrintPreview: boolean        // Modal state
}
```

### Registrar Form State (ENHANCED)
```typescript
{
  currentStep: number              // 0-3 (4 steps)
  submissionSource: 'shareholder' | 'broker' [NEW]  // Filter
  currentSubmission: object        // Data from source [UPDATED]
  personalData: PersonalInfoData   // Read-only
  bankData: BankDetailsData        // Read-only
  registrarData: RegistrarData     // Editable
  appStatus: 'in-review' | 'completed'
  showPreview: boolean             // Modal state
}
```

---

## API Integration Points (Future Backend)

```
┌──────────────────────────────────────────────────────┐
│              BACKEND ENDPOINTS                        │
└──────────────────────────────────────────────────────┘

AUTHENTICATION
  POST /api/auth/broker-login              → Broker Session
  POST /api/auth/registrar-login           → Registrar Session
  POST /api/auth/logout                    → Clear Session

ACCOUNT SEARCH
  GET /api/ixtrac/search                   → iX-Trac Data
  └─ Params: type (name|account|bank|chn), value

APPLICATIONS
  POST /api/applications/create            → New Application
  GET /api/applications/{id}               → Get Details
  PUT /api/applications/{id}               → Update Draft
  POST /api/applications/{id}/submit       → Submit
  GET /api/applications                    → List (filterable)
  └─ Params: source (shareholder|broker), status

BROKER SPECIFIC
  GET /api/broker/metrics                  → Dashboard Metrics
  GET /api/broker/applications             → My Applications
  POST /api/broker/applications/{id}/stamp → Upload Stamp
  GET /api/broker/applications/{id}/stamp  → Get Stamp

REGISTRAR SPECIFIC
  GET /api/registrar/queue                 → Queue List
  └─ Params: source (shareholder|broker), status
  POST /api/registrar/applications/{id}/approve   → Approve
  POST /api/registrar/applications/{id}/reject    → Reject
  └─ Params: reason (for reject)

AUDIT LOGGING
  GET /api/audit/trail/{applicationId}     → Activity Log
```

---

## Database Schema (Proposed for Backend)

```sql
-- Main Tables
Brokers
├── BrokerId (PK)
├── BrokerName
├── BrokerEmail
├── CreatedDate
└── Status

Applications
├── ApplicationId (PK)
├── BrokerId (FK) [NULL for shareholder]
├── ShareholderName
├── Status
├── SubmittedByShareholder (bool)
├── SubmittedByBroker (bool)
├── StampFileName
├── StampAppliedPhysically (bool)
├── CreatedDate
├── ModifiedDate
└── SubmittedToIssuingDate

ApplicationDetails
├── ApplicationDetailId (PK)
├── ApplicationId (FK)
├── ShareholderData (JSON)
├── PersonalData (JSON)
├── BankData (JSON)
├── SignatureData (JSON)
├── RegistrarData (JSON)
└── StampData (JSON)

AuditLog
├── AuditLogId (PK)
├── ApplicationId (FK)
├── UserId
├── Action
├── Timestamp
└── Details
```

---

## File Organization

```
Rights Issue e-Form/
│
├── app/
│   ├── form/
│   │   ├── shareholder/
│   │   │   └── page.tsx              (350 lines)
│   │   ├── registrar/
│   │   │   └── page.tsx              (MODIFIED, 450 lines)
│   │   └── stockbroker/
│   │       └── page.tsx              (NEW, 359 lines)
│   ├── page.tsx                      (MODIFIED, 200 lines)
│   ├── layout.tsx                    (90 lines)
│   └── globals.css                   (160 lines)
│
├── components/
│   ├── rights-form/
│   │   ├── FormHeader.tsx            (MODIFIED, 70 lines)
│   │   ├── FormStepper.tsx           (138 lines)
│   │   ├── SearchPanel.tsx           (188 lines)
│   │   ├── IxTracPanel.tsx           (135 lines)
│   │   ├── AcceptanceSection.tsx     (422 lines)
│   │   ├── PersonalInfoSection.tsx   (145 lines)
│   │   ├── BankDetailsSection.tsx    (137 lines)
│   │   ├── SignaturesSection.tsx     (202 lines)
│   │   ├── RegistrarSection.tsx      (MODIFIED, 313 lines)
│   │   ├── BrokerDashboard.tsx       (NEW, 180 lines)
│   │   ├── ReceivingAgentStamp.tsx   (NEW, 167 lines)
│   │   ├── ActionButtons.tsx         (MODIFIED, 153 lines)
│   │   └── PrintPreviewModal.tsx     (MODIFIED, 286 lines)
│   └── ui/                           (shadcn/ui components)
│
├── lib/
│   ├── utils.ts                      (utility functions)
│   └── form-utils.ts                 (294 lines)
│
└── Documentation/
    ├── STOCKBROKER_README.md         (459 lines)
    ├── STOCKBROKER_ADDON.md          (358 lines)
    ├── STOCKBROKER_QUICKSTART.md     (309 lines)
    ├── STOCKBROKER_CHANGES_SUMMARY.md (443 lines)
    ├── IMPLEMENTATION_COMPLETE.md    (441 lines)
    └── ARCHITECTURE.md               (THIS FILE)
```

---

## Technology Stack

```
Frontend Framework
  • Next.js 15 (App Router)
  • React 19.2 with Hooks
  • TypeScript

UI Components
  • shadcn/ui (Button, Card, Badge, Input, etc.)
  • Tailwind CSS v4
  • Radix UI (underlying)

Icons
  • lucide-react (Printer, Upload, Users, etc.)

State Management
  • React Hooks (useState, useCallback, useMemo)
  • SessionStorage (Draft persistence)

Form Handling
  • React Hook Form patterns
  • Zod validation (in utilities)
  • Built-in HTML5 validation

Styling
  • Tailwind CSS utility classes
  • CSS Design Tokens (globals.css)
  • Responsive mobile-first
  • Print styles (A4 format)
```

---

## Performance Optimization

```
Code Splitting
  ✓ Separate pages loaded on demand
  ✓ Components lazy-loadable
  
Rendering
  ✓ Client-side rendering (no SSR needed)
  ✓ useMemo for calculations
  ✓ useCallback for event handlers
  
State Management
  ✓ Local component state (no Redux needed)
  ✓ SessionStorage for draft (lightweight)
  
Bundle Size
  ✓ shadcn/ui only imports used components
  ✓ Icons tree-shakeable
  ✓ No unused dependencies

Caching
  ✓ Mock data pre-loaded
  ✓ Calculations memoized
  ✓ Draft auto-saved locally
```

---

## Scalability Considerations

```
For Growth:
  ✓ Component-based architecture scales
  ✓ State management can migrate to Redux/Zustand
  ✓ API integration ready
  ✓ Database design prepared
  
For New Features:
  ✓ Easy to add new form sections
  ✓ Reusable components
  ✓ Clear patterns to follow
  
For Complexity:
  ✓ Registrar approval/rejection ready
  ✓ Broker analytics framework exists
  ✓ Bulk operations possible
  ✓ Audit logging structure ready
```

---

## Security Considerations (For Backend)

```
Authentication
  • Broker login/session management
  • Registrar role-based access
  • Shareholder unique link validation

Data Protection
  • Input validation on all forms
  • SQL parameterized queries
  • File upload validation (backend)
  
Audit Trail
  • Log all user actions
  • Track application status changes
  • Timestamp all operations

Access Control
  • Shareholder: Own data only
  • Broker: Client data only
  • Registrar: All data with filters
```

---

## Summary

The Rights Issue e-Form follows a modern web application architecture with:
- **Clear separation** of concerns (shareholder, broker, registrar)
- **Reusable components** across workflows
- **Responsive design** for all devices
- **State management** via React Hooks
- **Mock data** for demonstration
- **Ready for backend** integration

The Stockbroker addon seamlessly extends this architecture with a new third tier, maintaining consistency while adding new capabilities.

---

**Architecture Version:** 1.0
**Last Updated:** 2024
**Status:** ✅ Complete and Documented
