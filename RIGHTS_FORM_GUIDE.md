# Rights Issue Acceptance/Renunciation e-Form

## Overview

This is a professional, responsive web application for managing rights issue applications with two distinct user modes:
- **Shareholder Mode**: Public interface for submitting acceptance/renunciation applications
- **Registrar Mode**: Internal interface for processing and verification

The application is built with Next.js, React, TypeScript, and Tailwind CSS with a professional design suitable for financial/legal document processing.

## Features

### Shareholder Mode (`/form/shareholder`)

1. **Account Search**
   - Search by Shareholder Name, iX-Trac Account Number, Bank Account Number, or CHN
   - One search method required
   - Mock data auto-populated on success

2. **Details Confirmation**
   - Read-only display of iX-Trac data
   - Auto-populated shareholder and provisional allotment information
   - Display of applicable pricing and amounts

3. **Application Form**
   - **Option A: Full Acceptance / Additional Shares**
     - Accept in full the provisional allotment
     - Or apply for additional shares with automatic amount calculations
     - Scaling confirmation checkbox
   
   - **Option B: Renunciation / Partial Acceptance**
     - Accept partial number of shares
     - Renounce remaining shares
     - Grid-based entry with auto-calculations
   
   - **Mutual Exclusivity Toggle**: Radio buttons ensure only one acceptance type is selected

4. **Personal Information**
   - Shareholder name (mandatory)
   - Next of Kin (mandatory)
   - Daytime phone (mandatory)
   - Mobile phone (mandatory)
   - Email (optional)

5. **Bank Details (E-Dividend)**
   - Bank name (mandatory)
   - Branch (optional)
   - Account number (mandatory, 10 digits)
   - BVN (mandatory, 11 digits)

6. **Signatures**
   - Primary signature upload (mandatory)
   - Secondary signature for joint accounts (optional)
   - Corporate fields for authorized signatories (when applicable)

7. **Payment Evidence**
   - Payment method selection: Transfer, Cheque, or Bank Draft
   - Conditional cheque details (bank, number, branch)
   - File upload for payment proof (mandatory)

8. **Preview & Print**
   - A4-formatted print preview modal
   - Printer-friendly layout matching original paper form
   - Download/print functionality

9. **Submission**
   - Final form submission with validation
   - Reference number generation
   - Status badge updates

### Registrar Mode (`/form/registrar`)

1. **Review Application**
   - Display submitted shareholder details (read-only)
   - View iX-Trac data
   - Access all shareholder-provided information

2. **Processing Section**
   - Input/verify total shares allotted
   - Input/verify shares accepted, additional applied, renounced
   - Amount verification fields
   - Auto-calculated refund amounts
   - Receiving agent stamp upload
   - Stamp verification checkbox

3. **Submit to Issuing House**
   - Final verification confirmation
   - Submission with audit trail
   - Reference number generation for registrar

## Architecture

### Component Structure

```
components/rights-form/
├── FormHeader.tsx              # Header with company/status info
├── FormStepper.tsx             # Multi-step progress indicator
├── SearchPanel.tsx             # Account search interface
├── IxTracPanel.tsx             # Read-only iX-Trac data display
├── AcceptanceSection.tsx       # Option A/B acceptance logic
├── PersonalInfoSection.tsx     # Contact information
├── BankDetailsSection.tsx      # E-dividend bank details
├── SignaturesSection.tsx       # Signature uploads
├── RegistrarSection.tsx        # Registrar-only fields
├── ActionButtons.tsx           # Form navigation/actions
└── PrintPreviewModal.tsx       # Print-friendly preview
```

### Pages

- `/app/page.tsx` - Home page with entry points
- `/app/form/shareholder/page.tsx` - Shareholder application form
- `/app/form/registrar/page.tsx` - Registrar processing interface

### Utilities

- `lib/form-utils.ts` - Calculations, validation, and state management

### Design System

**Color Palette (Professional Financial Grade)**
- Primary: Navy blue (`oklch(0.25 0.15 260)`)
- Secondary: Teal (`oklch(0.4 0.12 255)`)
- Accent: Lighter navy (`oklch(0.45 0.15 260)`)
- Background: Cream (`oklch(0.98 0.002 270)`)
- Neutral grays for borders and muted text

**Typography**
- Headings: Bold sans-serif (600-700 weight)
- Body: Regular sans-serif
- Form labels: Small caps, semibold

**Responsive Layout**
- Mobile-first single column
- Desktop: 2-column grids matching paper form layout
- Print media queries for A4 formatting

## State Management

### Session Storage
- Draft auto-saving to `sessionStorage`
- Load/restore functionality for incomplete forms
- Keys: `rightsFormDraft` (shareholder), `registrarDraft` (registrar)

### Component-Level State
- React `useState` for form data
- Callback props for parent-child data flow
- Real-time calculations on every input change

### Data Flow
```
Form Input
    ↓
Component State (useState)
    ↓
Validation
    ↓
Calculate Amounts/Totals
    ↓
Parent Callback (onChange)
    ↓
Form-Level State Update
```

## Calculations

### Amount Payable
```
Amount = Number of Shares × Price Per Share
```

### Total Due (with Additional Shares)
```
Total = Base Amount + (Additional Shares × Price Per Share)
```

### Refund Amount
```
Refund = Total Payable - Total Paid (if positive, no refund)
```

### Total Allotted (Registrar)
```
Total Allotted = Shares Accepted + Additional Shares Applied
```

## Validation

### Field-Level Validation
- **Phone Numbers**: Nigerian format validation (`+234` or `0` prefix)
- **Email**: Standard regex validation
- **BVN**: Exactly 11 digits
- **Account Number**: Exactly 10 digits
- **Required Fields**: Marked with `**`, optional with `*`

### Form-Level Validation
- All mandatory fields must be populated
- Payment evidence is required
- Signatures must be uploaded
- Acceptance type must be selected (mutual exclusivity)

### Error Display
- Inline validation messages below fields
- Color-coded error sections
- User-friendly error descriptions

## Mock Data

### iX-Trac Data (Shareholder Mode)
```javascript
{
  regAcctNumber: 'IX-2024-001234',
  shareholderName: 'John Adeyemi Okafor',
  unitsHeld: 5000,
  rightsDue: 1000,
  pricePerShare: 2.50,
  amountPayable: 2500,
}
```

### Shareholder Submission (Registrar Mode)
```javascript
{
  id: 'APP-2024-001234',
  shareholderName: 'John Adeyemi Okafor',
  acceptanceType: 'additional',
  additionalShares: 500,
  sharesAccepted: 1000,
  // ... other fields
}
```

## Print Preview

The print preview modal renders an A4-formatted version of the form with:
- Clean layout matching original paper form
- All populated data
- Professional headers and borders
- Registrar section (if applicable)
- Print optimization for monochrome printing

## Accessibility

- Semantic HTML elements (`<main>`, `<label>`, etc.)
- ARIA labels for interactive elements
- Screen reader friendly labels and descriptions
- Keyboard navigation support
- Color contrast compliance
- Form validation error messaging

## File Upload Handling

**Accepted Formats**
- Images: JPG, PNG
- Documents: PDF, DOC, DOCX
- Maximum size: 2-5MB

**Upload Fields**
- Signature/Secondary Signature
- Payment evidence (mandatory)
- Incorporation seal (corporate only)
- Receiving agent stamp (registrar mode)

## Status Badges

| Status | Color | Description |
|--------|-------|-------------|
| Draft | Gray | Form in progress |
| Submitted by Shareholder | Blue | Awaiting registrar review |
| In Registrar Review | Yellow | Being processed |
| Submitted to Issuing House | Green | Completed |

## Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (adapted 2-column)
- **Desktop**: > 1024px (full 2-column layout)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancement Opportunities

1. **Backend Integration**
   - Connect to actual iX-Trac API
   - Persist data to database
   - Real email notifications

2. **Authentication**
   - Multi-factor authentication
   - Role-based access control
   - Audit logging

3. **Advanced Features**
   - Digital signatures (e-signature integration)
   - Real-time validation from backend
   - Bulk registrar processing
   - Advanced reporting/analytics

4. **Localization**
   - Multi-language support
   - Currency localization
   - Regional compliance options

## Component API Reference

### FormHeader
```tsx
<FormHeader
  mode="shareholder" | "registrar"
  status="draft" | "submitted" | "in-review" | "completed"
/>
```

### FormStepper
```tsx
<FormStepper
  steps={Step[]}
  currentStep={number}
  onStepClick={(step: number) => void}
  completedSteps={number[]}
/>
```

### AcceptanceSection
```tsx
<AcceptanceSection
  pricePerShare={number}
  rightsDue={number}
  amountPayable={number}
  onChange={(data: AcceptanceData) => void}
/>
```

### PrintPreviewModal
```tsx
<PrintPreviewModal
  isOpen={boolean}
  onClose={() => void}
  formData={Record<string, any>}
  ixTracData={IxTracData}
  mode="shareholder" | "registrar"
  registrarData={RegistrarData}
/>
```

## Deployment Considerations

1. **Environment Variables**
   - API endpoints for backend integration
   - Email service configuration
   - File storage bucket credentials

2. **Security**
   - HTTPS only deployment
   - CORS configuration
   - CSP headers
   - SQL injection prevention (when backend integrated)

3. **Performance**
   - Lazy load print preview modal
   - Debounce calculations on large forms
   - Optimize file uploads
   - CDN for static assets

4. **Compliance**
   - Data privacy (GDPR/CCPA)
   - Financial audit trails
   - Document retention policies

## Support

For questions or issues, contact the development team at: rights@nslcapital.com

---

**Last Updated**: February 2024
**Version**: 1.0 (Demo/UI Only)
