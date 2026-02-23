# Technical Specifications - Rights Issue e-Form

## System Overview

**Project Type**: Single Page Application (SPA) - React/Next.js  
**Framework**: Next.js 16 (App Router)  
**Runtime**: Node.js 18+  
**Package Manager**: pnpm (or npm)  
**Styling**: Tailwind CSS + Custom CSS  
**UI Components**: shadcn/ui  
**Type Safety**: TypeScript  
**Browser Target**: Chrome 90+, Firefox 88+, Safari 14+, Mobile browsers  

## Technology Stack

### Frontend
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.x |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | Latest |
| Icons | lucide-react | Latest |
| Type System | TypeScript | 5.x |
| Form State | React Hooks (useState) | Native |

### Build & Dev
| Tool | Version | Purpose |
|------|---------|---------|
| pnpm | 8.x+ | Package management |
| Node.js | 18.x+ | Runtime |
| Turbopack | Latest | (Next.js default) |
| PostCSS | Latest | CSS processing |

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx              # Root layout with fonts/metadata
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles & design tokens
│   └── form/
│       ├── shareholder/
│       │   └── page.tsx        # Shareholder form (5-step)
│       └── registrar/
│           └── page.tsx        # Registrar form (4-step)
│
├── components/
│   ├── ui/                     # shadcn/ui components (Button, Input, etc.)
│   └── rights-form/
│       ├── FormHeader.tsx      # Header with company/status
│       ├── FormStepper.tsx     # Multi-step navigation
│       ├── SearchPanel.tsx     # Account search
│       ├── IxTracPanel.tsx     # Read-only iX-Trac display
│       ├── AcceptanceSection.tsx
│       ├── PersonalInfoSection.tsx
│       ├── BankDetailsSection.tsx
│       ├── SignaturesSection.tsx
│       ├── RegistrarSection.tsx
│       ├── ActionButtons.tsx
│       └── PrintPreviewModal.tsx
│
├── lib/
│   ├── utils.ts               # Tailwind cn() utility
│   └── form-utils.ts          # Calculations, validation, state management
│
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## Component Architecture

### Hierarchical Structure

```
RootLayout
├── Home Page (/app/page.tsx)
│
├── Shareholder Flow (/form/shareholder)
│   ├── FormHeader
│   ├── FormStepper
│   ├── [Step Content]
│   │   ├── SearchPanel
│   │   ├── IxTracPanel
│   │   ├── PersonalInfoSection
│   │   ├── AcceptanceSection
│   │   ├── BankDetailsSection
│   │   └── SignaturesSection
│   ├── ActionButtons
│   └── PrintPreviewModal
│
└── Registrar Flow (/form/registrar)
    ├── FormHeader
    ├── FormStepper
    ├── [Step Content]
    │   ├── IxTracPanel
    │   ├── PersonalInfoSection
    │   ├── BankDetailsSection
    │   ├── RegistrarSection
    │   └── ActionButtons
    └── PrintPreviewModal
```

## Data Flow Diagram

```
User Input
    ↓
Component (useState)
    ↓
Validation (form-utils.ts)
    ↓
Calculation (form-utils.ts)
    ↓
onChange Callback
    ↓
Parent State Update
    ↓
Re-render with Updated Values
    ↓
(optional) Save to SessionStorage
```

## Form State Management

### Data Model

```typescript
// Shareholder Application Data
interface ShareholderFormState {
  searchResult: boolean;
  acceptanceData: AcceptanceData;
  personalData: PersonalInfoData;
  bankData: BankDetailsData;
  signatureData: SignaturesData;
  currentStep: number;
  formStatus: 'draft' | 'submitted';
}

// Registrar Review State
interface RegistrarFormState {
  registrarData: RegistrarData;
  currentStep: number;
  appStatus: 'in-review' | 'completed';
}
```

### State Persistence

**Mechanism**: `sessionStorage` (browser)  
**Key**: `rightsFormDraft` (shareholder), `registrarDraft` (registrar)  
**Duration**: Session lifetime (clears on browser close)  
**Manual Save**: User clicks "Save Draft" button  

```typescript
// Save
sessionStorage.setItem('rightsFormDraft', JSON.stringify(draft));

// Load
const draft = JSON.parse(sessionStorage.getItem('rightsFormDraft'));
```

## Validation Rules

### Personal Information
| Field | Type | Rules |
|-------|------|-------|
| Name | String | Required, min 3 chars |
| Next of Kin | String | Required, min 3 chars |
| Daytime Phone | String | Required, valid Nigerian number |
| Mobile Phone | String | Required, valid Nigerian number |
| Email | String | Optional, valid email format |

### Bank Details
| Field | Type | Rules |
|-------|------|-------|
| Bank Name | String | Required, min 3 chars |
| Branch | String | Optional |
| Account Number | String | Required, exactly 10 digits |
| BVN | String | Required, exactly 11 digits |

### Acceptance Data
| Field | Type | Rules |
|-------|------|-------|
| Acceptance Type | Enum | Required (full/additional/partial) |
| Additional Shares | Number | If additional: min 1, max 999,999 |
| Shares Accepted | Number | If partial: 0 to rightsDue |
| Shares Renounced | Number | If partial: 0 to rightsDue |
| Payment Method | Enum | Required (transfer/cheque/draft) |
| Payment Evidence | File | Required, max 5MB |

## Calculations

### Amount Payable
```
Formula: Shares × Price Per Share
Example: 1000 shares × ₦2.50 = ₦2,500.00
Precision: 2 decimal places
```

### Total Due (With Additional)
```
Formula: Base Amount + (Additional Shares × Price Per Share)
Example: ₦2,500 + (500 × ₦2.50) = ₦3,750.00
```

### Total Allotted (Registrar)
```
Formula: Shares Accepted + Additional Shares Applied
Example: 1000 + 500 = 1500 shares
```

### Refund Amount
```
Formula: MAX(0, Total Payable - Total Paid)
Example: If payable=3750, paid=3750 → Refund=0
         If payable=3750, paid=4000 → Refund=250
```

## Performance Specifications

| Metric | Target | Notes |
|--------|--------|-------|
| First Paint | < 1s | Using Next.js optimization |
| Form Load | < 500ms | Minimal async operations |
| Calculation | < 10ms | Client-side math only |
| Memory Usage | < 50MB | Form + UI components |
| Bundle Size | < 300KB | With Tailwind optimized |

## Browser Support Matrix

| Browser | Min Version | Support Level |
|---------|-------------|---------------|
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Safari | 14+ | Full |
| Edge | 90+ | Full |
| Mobile Chrome | Latest | Full |
| Mobile Safari | Latest | Full |

## API Integration Points (Future)

### Endpoints to Implement
```
POST   /api/accounts/search
GET    /api/accounts/{refId}
POST   /api/applications/submit
GET    /api/applications/{appId}
POST   /api/applications/{appId}/registrar-submit
GET    /api/applications/{appId}/registrar-data
```

### Expected Response Format
```typescript
{
  success: boolean;
  data: any;
  error?: string;
  timestamp: string;
}
```

## Security Considerations

### Input Validation
- ✓ Client-side validation on all forms
- ✓ Format validation (phone, email, numbers)
- ✓ Length constraints (min/max)
- ⚠️ Server-side validation required for production

### File Uploads
- ✓ File type checking (UI only)
- ✓ Size limiting (2-5MB)
- ⚠️ Virus scanning required for production
- ⚠️ Secure storage required for production

### Data Protection
- ⚠️ No encryption (current implementation)
- ⚠️ No authentication (current implementation)
- ✓ SessionStorage (not persisted beyond session)
- ✓ HTTPS recommended for production

### CORS
- ⚠️ CORS handling required when connecting to API backend
- Recommend CORS headers on API responses

## Accessibility (WCAG 2.1)

| Criterion | Status |
|-----------|--------|
| Text Alternatives | ✓ Alt text on icons |
| Keyboard Navigation | ✓ Tab order, Enter to submit |
| Color Contrast | ✓ WCAG AA compliant |
| Form Labels | ✓ All inputs labeled |
| Error Messages | ✓ Clear, descriptive |
| Screen Readers | ✓ ARIA labels present |
| Focus Management | ✓ Visible focus indicators |

## Responsive Design Breakpoints

```typescript
const breakpoints = {
  xs: '0px',      // Mobile
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px' // Extra large
};
```

## Print Specifications

- **Format**: A4 (210mm × 297mm)
- **Margins**: 0.5cm all sides
- **Orientation**: Portrait
- **Quality**: Optimized for monochrome printing
- **Page Break**: Automatic at form sections

## Deployment Specifications

### Static Export (for IIS)
```bash
npm run build
# Outputs to: out/
# Copy to: wwwroot/frontend/
```

### Environment Variables (Future)
```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
API_SECRET_KEY=...
DATABASE_URL=...
```

### Build Output
- **Format**: Next.js static export + React hydration
- **Size**: ~300KB (gzipped)
- **Dependencies**: None (static files)

## Error Handling

### Validation Errors
- Displayed inline below form fields
- User-friendly error messages
- Prevents form submission

### Network Errors (Future)
- Retry mechanism with exponential backoff
- User notification of failure
- Save to localStorage for recovery

### File Upload Errors
- File size validation
- File type validation
- User feedback on failure

## Testing Strategies

### Unit Testing (Manual)
- Form validation functions
- Calculation functions
- State management

### Integration Testing (Manual)
- Multi-step form flow
- Data persistence
- Print preview

### E2E Testing (Manual)
- Complete shareholder journey
- Complete registrar journey
- Cross-browser compatibility

## Monitoring & Logging

### Current Implementation
- Browser console logs
- React DevTools
- Network DevTools

### Future Implementation
- Application Insights
- Error tracking (Sentry)
- Analytics
- Audit logging

## Compliance & Regulations

### Financial Compliance
- ✓ Form layout matches original paper form
- ✓ All required fields present
- ✓ Calculation accuracy
- ⚠️ Audit trail required
- ⚠️ Data retention policies

### Data Protection
- ⚠️ GDPR compliance (if EU data)
- ⚠️ CCPA compliance (if US data)
- ⚠️ Nigeria data protection compliance

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 2024 | Initial UI/UX demo |
| 1.1 | TBD | Backend integration |
| 2.0 | TBD | Authentication & Authorization |

## Known Limitations

1. **Mock Data Only**: No real database connectivity
2. **File Uploads**: Display filename only, no actual upload
3. **No Authentication**: Anyone can access both shareholder and registrar forms
4. **Session Storage Only**: Data lost on browser close
5. **No Audit Trail**: Submissions are not logged
6. **No Email Notifications**: No automated email confirmations
7. **Single Locale**: English only (Nigeria)

## Future Enhancements

1. Real backend API integration
2. Multi-language support
3. Digital signature support (e-Signature)
4. Two-factor authentication
5. Mobile app version (React Native)
6. Offline functionality (PWA)
7. Bulk registrar processing
8. Advanced reporting/analytics
9. Payment gateway integration
10. SMS notifications

---

**Document Version**: 1.0  
**Last Updated**: February 2024  
**Status**: Development Complete, Ready for Backend Integration
