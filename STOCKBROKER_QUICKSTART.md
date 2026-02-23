# Stockbroker Feature - Quick Start Guide

## Accessing the Stockbroker Portal

### 1. **From Home Page**
- Navigate to `http://localhost:3000/`
- Click the **"Stockbroker Access"** button (purple button in the hero section)
- Or navigate directly to `/form/stockbroker`

### 2. **Portal Overview**
You'll see the **Broker Dashboard** with:
- Welcome message with broker name (e.g., "Premier Securities Limited")
- 4 metric cards showing:
  - Subscribers Registered: **3**
  - Total Units Subscribed: **1,800**
  - Amount Processed: **₦4,500**
  - Pending Applications: **1**
- Table of recent applications with status badges

## Creating a New Subscription

### Step 1: Dashboard
Click **"New Subscription"** button to start registering a subscriber

### Step 2: Search Account
- **Select a search method:**
  - "Shareholder Name"
  - "iX-Trac Account Number"
  - "Bank Account Number"
  - "CHN"
- **Enter search value** (any value works in demo)
- Click **"Search"** button
- After search, click **"Continue"** to proceed

### Step 3: Confirm Details
Review auto-populated iX-Trac data:
- Reg/Account Number: **IX-2024-001234**
- Shareholder Name: **John Adeyemi Okafor**
- Units Held: **5,000**
- Rights Due: **1,000 shares**
- Price per Share: **₦2.50**
- Amount Payable: **₦2,500**

Click **"Continue to Shareholder Form"**

### Step 4: Fill Shareholder Form

#### A. Acceptance Section
Choose one of:
1. **Full Acceptance** - Accept provisional allotment as-is
2. **Additional Shares** - Accept and apply for more shares
   - Enter number of additional shares
   - System auto-calculates amount (shares × ₦2.50)
3. **Renunciation/Partial** - Accept fewer shares or renounce entirely

#### Payment Evidence (Required)
- **Payment Method:** Select from dropdown
  - Transfer
  - Cheque
  - Bank Draft
- **If Cheque selected:** Fill in bank, cheque number, branch (optional)
- **Upload Evidence:** Click to upload payment proof image/PDF

#### B. Personal Information (Required)
Fill in shareholder details:
- **Name** (e.g., "John Adeyemi Okafor")
- **Next of Kin** (e.g., "Mary Okafor")
- **Daytime Phone** (e.g., "+234 1 234 5678")
- **Mobile Phone** (e.g., "+234 801 234 5678")
- **Email** (optional)

#### C. Bank Details (For E-Dividend)
- **Bank Name** (required)
- **Branch** (optional)
- **Account Number** (required)
- **BVN** (required)

#### D. Signatures
- **Name(s) in block letters** (required)
- **Signature** (required - click field, will enable upload in future)
- **2nd Signature** (for joint accounts, optional)

Click **"Continue to Stamp"**

### Step 5: Add Receiving Agent Stamp

#### Option 1: Upload Stamp
- Click dashed area or drag-drop to upload stamp image/PDF
- File preview shows name and size
- Click "Remove" to delete uploaded file

#### Option 2: Mark as Physically Applied
- Check checkbox: "Stamp has been physically applied (no digital copy)"
- Status shows green confirmation

**At least ONE option must be selected before submitting**

Click **"Preview & Print"**

### Step 6: Preview & Print

#### Print Preview Modal Opens
Shows:
- **Broker Info Header**: "PROCESSED VIA STOCKBROKER: Premier Securities Limited"
- Complete form layout matching paper form
- All populated shareholder data
- Read-only format suitable for printing

#### Actions:
- **Preview/Print** - Opens browser print dialog (Ctrl+P or Cmd+P)
  - A4 format optimized
  - All form sections visible
  - Broker name displayed
- **Download** - Save as PDF (future enhancement)
- **Close** - Return to form

## Submitting to Registrar

### From Preview Screen
Click **"Submit to Registrar"** button to:
1. Validate all required fields
2. Submit application with status: **"SubmittedByBroker"**
3. Return to dashboard
4. Application appears in "Recent Applications" table with "Submitted" status

**Confirmation Alert:** "Application submitted to registrar! Status: 'SubmittedByBroker'"

## Viewing Submissions in Registrar Queue

### Access Registrar Portal
- Go to home page and click **"Registrar Access"** or navigate to `/form/registrar`

### Filter by Submission Source
Two buttons at top of page:
- **"Direct Shareholder"** - Shareholder-submitted applications (default)
- **"Stockbroker"** - Broker-submitted applications

Click **"Stockbroker"** to see broker submissions

### View Broker Submission
Application review shows:
- **Broker Badge**: "Submitted By Broker: Premier Securities Limited" (purple box)
- All shareholder data (read-only)
- Stamp information (uploaded or marked as applied)
- Registrar can verify and approve

## Draft Management

### Saving Drafts
- Click **"Save Draft"** button at any step
- Alert: "Draft saved successfully as 'Draft (Broker)'"
- Data stored in sessionStorage (UI only, for demo)
- Can return and continue later

### Returning to Dashboard
- From form page: Click **"Back to Dashboard"** link (top right)
- Resets form and returns to dashboard
- Draft can be resumed from recent applications table (future enhancement)

## Test Scenarios

### Scenario 1: Full Acceptance
1. Select "Shareholder Name" and search
2. Confirm details
3. Choose "Full Acceptance"
4. Select payment method "Transfer"
5. Upload payment evidence
6. Fill personal information
7. Fill bank details
8. Sign form
9. Upload/mark stamp
10. Preview and print
11. Submit to registrar

### Scenario 2: Additional Shares
1. Follow steps 1-5 as above
2. Choose "Additional Shares"
3. Enter 250 additional shares
4. System auto-calculates: 250 × ₦2.50 = ₦625
5. Fill rest of form
6. Submit

### Scenario 3: Renunciation/Partial
1. Follow steps 1-3 as above
2. Choose "Renunciation / Partial Acceptance"
3. Enter 500 shares to accept
4. Enter 500 shares to renounce
5. Fill rest of form
6. Submit

### Scenario 4: Draft Save & Resume
1. Fill form up to Step 4 (Stamp)
2. Click "Save Draft"
3. See "Draft saved successfully" message
4. Navigate to home page
5. Go back to Stockbroker portal
6. Click "New Subscription" → form fields reset (future: load draft)
7. In real implementation, draft would be loaded from database

### Scenario 5: Registrar Review
1. Submit broker application (Scenario 1)
2. Go to Registrar portal (`/form/registrar`)
3. Click "Stockbroker" filter button
4. See broker submission with purple badge: "Submitted By Broker: Premier Securities Limited"
5. Review shareholder data (read-only)
6. See stamp information in registrar verification section
7. Proceed to process application

## Mock Data Reference

### Broker Information
- **Broker Name**: Premier Securities Limited
- **Dashboard Metrics**: 
  - 3 subscribers
  - 1,800 total units
  - ₦4,500 total amount
  - 1 pending application

### Sample Shareholder (for search)
- **Name**: John Adeyemi Okafor
- **iX-Trac Account**: IX-2024-001234
- **Units Held**: 5,000
- **Rights Due**: 1,000 shares
- **Price per Share**: ₦2.50
- **Amount Payable**: ₦2,500

### Sample Broker Submission (Registrar view)
- **ID**: BRK-APP-002
- **Shareholder**: Sarah Johnson
- **Broker**: Premier Securities Limited
- **Status**: Pending Registrar Review
- **Shares**: 1,000 units
- **Amount**: ₦2,500

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Next Step | Tab → Tab → Enter |
| Previous Step | Shift+Tab |
| Save Draft | Ctrl+S (if implemented) |
| Print | Ctrl+P (from print preview) |

## Troubleshooting

### "Export Printer doesn't exist"
- ✓ FIXED: Icon import changed from `Print` to `Printer`

### Application not showing in Registrar queue
- Ensure you clicked "Submit to Registrar" button
- Check Registrar filter is set to "Stockbroker"
- Check status shows "Submitted"

### Stamp upload not persisting
- Stamps stored in React state (UI only)
- Not saved to sessionStorage in current version
- Will be persisted in backend integration

### Calculations not showing
- Amount auto-calculates on blur/change
- If not visible, try filling additional shares field
- Calculations: `additionalShares × ₦2.50`

### Print preview blank
- Ensure form is filled with shareholder data
- Broker name must be set (e.g., "Premier Securities Limited")
- Try clicking "Preview/Print" button again
- Check browser print dialog

## Next Steps (Backend Integration)

When building the ASP.NET backend:

1. **Create `Brokers` table**
   - BrokerId (PK)
   - BrokerName
   - BrokerEmail
   - CreatedDate

2. **Extend `Applications` table**
   - Add BrokerId (FK to Brokers)
   - Add SubmittedByBroker (bool)
   - Add BrokerSubmissionDate (DateTime)
   - Add StampFileName (string)
   - Add StampAppliedPhysically (bool)

3. **Create API endpoints**
   - POST /api/broker/login
   - POST /api/broker/applications
   - GET /api/broker/applications
   - GET /api/broker/metrics
   - POST /api/broker/submit-to-registrar

4. **Implement workflows**
   - Broker authentication
   - Application CRUD
   - Stamp upload/storage
   - Registrar filtering
   - Approval/rejection workflow
   - Audit logging

## Support

For questions or issues with the stockbroker addon:
- Check STOCKBROKER_ADDON.md for detailed documentation
- Review component code in `/components/rights-form/`
- Check page code in `/app/form/stockbroker/`
- Refer to existing shareholder/registrar implementations for patterns
