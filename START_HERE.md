# Rights Issue Acceptance/Renunciation e-Form - START HERE

Welcome! This document will guide you through the complete application structure and help you understand how everything works.

## 🚀 Quick Start (60 seconds)

1. **Open the Preview** to see the live application
2. **Click "Shareholder Access"** on the home page to test the form flow
3. **Search for an account** using any mock search criteria (e.g., "John Adeyemi Okafor")
4. **Review, complete, and preview** the form
5. **See the Registrar mode** by navigating to `/form/registrar`

## 📁 Project Structure

```
/app
  ├── page.tsx                          # Home page with navigation
  ├── layout.tsx                        # Root layout (updated metadata)
  ├── globals.css                       # Design system (professional navy/cream theme)
  └── /form
      ├── /shareholder
      │   └── page.tsx                  # Shareholder form (5-step stepper)
      └── /registrar
          └── page.tsx                  # Registrar form (read-only + registrar section)

/components/rights-form
  ├── FormHeader.tsx                    # Header with status badge & company info
  ├── FormStepper.tsx                   # 5-step progress indicator
  ├── SearchPanel.tsx                   # Account search panel
  ├── IxTracPanel.tsx                   # Read-only auto-populated data
  ├── AcceptanceSection.tsx             # Full/Additional/Partial acceptance logic
  ├── PersonalInfoSection.tsx           # Personal contact information
  ├── BankDetailsSection.tsx            # Bank details for e-dividend
  ├── SignaturesSection.tsx             # Signature & corporate fields
  ├── RegistrarSection.tsx              # Registrar-only processing fields
  ├── ActionButtons.tsx                 # Save/Preview/Submit/Print buttons
  └── PrintPreviewModal.tsx             # A4-friendly print preview

/lib
  └── form-utils.ts                     # Calculations, validation, state helpers

/documentation
  ├── README.md                         # Main overview
  ├── RIGHTS_FORM_GUIDE.md              # Detailed user guide
  ├── TECHNICAL_SPECS.md                # Architecture & technical details
  ├── IIS_DEPLOYMENT_GUIDE.md           # Deployment to IIS/ASP.NET
  ├── QUICK_START.md                    # Quick start guide
  ├── PROJECT_SUMMARY.md                # High-level summary
  ├── DELIVERY_SUMMARY.md               # What was delivered
  ├── UI_REFERENCE.md                   # Visual reference & layouts
  ├── COMPONENT_INVENTORY.md            # Component registry with usage
  └── START_HERE.md                     # This file
```

## 🎯 Key Features

### ✅ Shareholder Mode (`/form/shareholder`)
- **Step 1 - Search**: Find account by name, account number, or CHN
- **Step 2 - Confirm**: Review auto-populated iX-Trac data
- **Step 3 - Fill Form**: 
  - Choose: Full Acceptance (A) or Renunciation/Partial (B) with toggle enforcement
  - Add additional shares with auto-calculated amounts
  - Payment method selection with file upload
  - Personal information (name, contact, email, phone)
  - Bank details for e-dividend
  - Signatures section
- **Step 4 - Preview**: A4-friendly print preview modal showing form layout
- **Step 5 - Submit**: Final submission with status change
- **Draft Saving**: All steps support draft persistence to sessionStorage

### ✅ Registrar Mode (`/form/registrar`)
- Shareholder data in read-only sections
- Additional "For Registrar Use Only" section with:
  - Verification fields (shares allotted, accepted, renounced, totals)
  - Amount calculations and refund tracking
  - Receiving Agent stamp upload
  - Final submission to Issuing House
- Same preview/print capabilities
- Status tracking throughout workflow

### ✅ Form Sections with Calculations
1. **iX-Trac Data** (read-only): Account number, shareholder name, units held, rights due, amount payable
2. **Acceptance/Renunciation**: 
   - Toggle between full acceptance (A) and partial/renunciation (B)
   - Additional shares applied: `Amount = Additional Shares × Price Per Share`
   - Total Due: `Base Amount + Additional Amount`
3. **Payment Evidence**: Method selector + file upload
4. **Personal Info**: Name, Next of Kin, phone numbers, email
5. **Bank Details**: Bank name, branch, account number, BVN
6. **Signatures**: Signature, optional 2nd signature, corporate fields
7. **Registrar Section**: Totals, refunds, agent stamp

### ✅ Responsive Design
- **Mobile-first**: Single column layout on mobile
- **Desktop**: 2-column layout mirroring paper form
- **Print-friendly**: CSS media queries for A4 printing
- **Professional**: Navy/teal color scheme with cream backgrounds

### ✅ User Experience
- **Progress stepper** showing 5-step workflow
- **Status badges**: Draft → Submitted → In Review → Completed
- **Inline validation**: Real-time field validation with error messages
- **Required field markers**: `**` mandatory, `*` optional
- **Calculated fields**: Auto-calculate amounts, totals, refunds
- **File uploads**: Payment evidence and agent stamp uploads
- **Draft persistence**: Save drafts to return later
- **Print preview**: Modal showing A4-formatted form before printing

## 🔄 State Management & Calculations

### Form Data Structure
```typescript
// Main form state tracks all sections
{
  searchType: 'name' | 'account' | 'chn';
  searchValue: string;
  ixTracData: {...};  // Auto-populated
  acceptanceData: {...};  // Full/Additional/Partial
  personalInfo: {...};  // Contact info
  bankDetails: {...};  // E-dividend details
  signatures: {...};  // Signatures
  registrarData: {...};  // Registrar-only (registrar mode)
  currentStep: 'search' | 'confirm' | 'fill' | 'preview' | 'submit';
  status: 'draft' | 'submitted' | 'in-review' | 'completed';
}
```

### Key Calculations
- **Additional Amount**: `parseInt(additionalShares) × pricePerShare`
- **Total Due**: `baseAmount + additionalAmount`
- **Partial Acceptance Amount**: `sharesAccepted × pricePerShare`
- **Refund Amount**: `totalDue - amountPaid`
- **Registrar Totals**: Sum of all allotted shares and amounts

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Main project overview & features |
| **RIGHTS_FORM_GUIDE.md** | Detailed guide for form sections |
| **TECHNICAL_SPECS.md** | Architecture, component specs, design system |
| **QUICK_START.md** | Quick setup & testing guide |
| **IIS_DEPLOYMENT_GUIDE.md** | Deploy to IIS & integrate with ASP.NET |
| **UI_REFERENCE.md** | Visual layouts & screenshots reference |
| **COMPONENT_INVENTORY.md** | Complete component registry |
| **PROJECT_SUMMARY.md** | High-level project overview |
| **DELIVERY_SUMMARY.md** | What was delivered & next steps |

## 🎨 Design System

### Colors (Professional Financial)
- **Primary**: Navy blue (`oklch(0.25 0.15 260)`) - Headers, links, primary actions
- **Secondary**: Teal (`oklch(0.4 0.12 255)`) - Accents, secondary actions
- **Muted**: Light gray (`oklch(0.88 0 0)`) - Disabled states, backgrounds
- **Destructive**: Red (`oklch(0.55 0.2 20)`) - Errors, warnings
- **Background**: Off-white (`oklch(0.98 0.002 270)`) - Main background
- **Card**: Pure white (`oklch(1 0 0)`) - Card backgrounds
- **Input**: Very light blue (`oklch(0.97 0.002 270)`) - Input fields

### Typography
- **Headings**: Bold navy blue with sizes: h1 (3xl/4xl), h2 (2xl/3xl), h3 (xl/2xl)
- **Body**: Medium-weight sans-serif, line-height 1.4-1.6 for readability
- **Labels**: Small, semibold, centered above form fields
- **Print**: Optimized for A4 with proper margins and page breaks

### Layout
- **Flexbox**: Primary layout method for components
- **Grid**: Used for multi-column layouts (form fields, registrar tables)
- **Spacing**: Consistent Tailwind spacing scale (gap-4, p-6, etc.)
- **Borders**: Subtle borders for section separation

## 🔧 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS v4 with design tokens
- **Icons**: Lucide React
- **State**: React hooks (useState, useCallback, useMemo)
- **Forms**: React Hook Form patterns (ready for backend integration)
- **Validation**: Client-side validation with error messaging

## 📋 File Upload Features

1. **Payment Evidence** (Shareholder):
   - Supported: PDF, PNG, JPG, DOC, DOCX
   - Max size: 5MB
   - Shows file name & upload status

2. **Receiving Agent Stamp** (Registrar):
   - Supported: PNG, JPG, PDF
   - Max size: 3MB
   - Preview in modal

## 🖨️ Print Preview

The print preview modal (`PrintPreviewModal.tsx`) includes:
- Full form layout rendered in A4 format
- All populated fields and calculations
- Form sections in proper order
- Browser print dialog integration
- Print-friendly styling (no borders, optimized colors)

## 🔐 Security Considerations (For Backend Integration)

When integrating with ASP.NET backend:
1. **Validate all inputs** server-side - never trust client validation
2. **Encrypt sensitive data** in transit (TLS/SSL)
3. **Hash passwords** with bcrypt if user auth added
4. **Implement CSRF protection** for form submissions
5. **Sanitize file uploads** - check file types and scan for malware
6. **Audit log** all changes - track who accessed what and when
7. **RLS/Row-Level Security** - ensure users only see their own data

## 🚀 Next Steps for Backend Integration

1. **Create ASP.NET API endpoints**:
   - `POST /api/search/account` - Search iX-Trac
   - `POST /api/forms/submit` - Submit shareholder form
   - `GET /api/forms/{id}` - Load registrar form
   - `POST /api/forms/{id}/submit-registrar` - Submit registrar form

2. **Replace mock data** in `app/form/shareholder/page.tsx` and `app/form/registrar/page.tsx`
   with API calls

3. **Add authentication** - Session-based or JWT token

4. **Implement database** - Store forms, track status, audit trail

5. **Add email notifications** - Send confirmations to shareholders

See **IIS_DEPLOYMENT_GUIDE.md** for detailed integration steps.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column, simplified layout
- **Tablet**: 768px - 1024px - Starting 2-column on larger sections
- **Desktop**: > 1024px - Full 2-column layout matching paper form

## ✨ Form Validation Features

- **Required fields**: Marked with `**` - shows error if empty
- **Optional fields**: Marked with `*` - validation only if filled
- **Email validation**: Client-side check for email format
- **Phone validation**: Accepts +234 and 0 prefixes
- **File validation**: Size limits and file type checks
- **Calculation validation**: Auto-updates on share/amount changes
- **Mutual exclusivity**: Can't select both acceptance A and B simultaneously

## 🎓 Testing the Application

### Test Scenarios

1. **Shareholder Full Acceptance**:
   - Search by name → Confirm → Select Full Acceptance → Add payment → Submit

2. **Shareholder Partial + Additional**:
   - Search by account number → Additional shares + payment → Submit

3. **Registrar Processing**:
   - Open submitted form → Verify calculations → Add stamp → Submit to Issuing House

4. **Draft Saving**:
   - Fill partially → Click "Save Draft" → Close → Return to form → Data persists

5. **Print Preview**:
   - Any step → Click "Preview/Print" → Modal opens → Browser print dialog

## 📞 Support & Questions

For detailed information on specific components, see:
- **COMPONENT_INVENTORY.md** - All components with props and usage
- **TECHNICAL_SPECS.md** - Architecture & data flow
- **RIGHTS_FORM_GUIDE.md** - Detailed section-by-section guide

---

**Ready to go live?** See **IIS_DEPLOYMENT_GUIDE.md** for production deployment instructions.

Good luck! 🎉
