# Client Feedback Feature Walkthrough

## Complete User Journey: Premier Securities Broker

This walkthrough demonstrates all implemented features through a realistic scenario.

---

## Part 1: Broker Login

### User: Sarah from Premier Securities Limited

**Step 1: User accesses `/form/stockbroker`**

```
┌─────────────────────────────────────────────┐
│         STOCKBROKER ACCESS                  │
│                                             │
│  Select your stockbroking firm to register │
│  subscriber applications                   │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ Premier Securities Limited            │ │
│  │ info@premiersec.com                   │ │
│  │ +234 (0)1 234 5678                    │ │
│  │                            [SELECTED] │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ Zenith Capital Markets                │ │
│  │ contact@zenithcap.com                 │ │
│  │ +234 (0)1 456 7890                    │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ ARM Securities Limited                │ │
│  │ brokers@armsec.com                    │ │
│  │ +234 (0)1 789 0123                    │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  [Don't see your firm? Enter manually]     │
└─────────────────────────────────────────────┘
```

**Action:** Sarah clicks "Premier Securities Limited"

**System:** Saves broker ID: `broker-1`

---

## Part 2: Company Details Verification

### Screen: Broker Company Details Form

```
┌──────────────────────────────────────────────┐
│  STOCKBROKER COMPANY DETAILS                 │
│                                              │
│  Enter your stockbroking company             │
│  information to proceed...                   │
│                                              │
│  ℹ️ Company Information                      │
│  These details will be linked to all         │
│  subscriber applications you register...     │
│                                              │
│  Stockbroker Company Name **                 │
│  [Premier Securities Limited        ▼]      │
│                                              │
│  Company Phone Number **                     │
│  [+234 (0)1 234 5678               ▼]      │
│                                              │
│  Company Email Address **                    │
│  [info@premiersec.com              ▼]      │
│                                              │
│                        [Continue to Search] │
└──────────────────────────────────────────────┘
```

**Notes:**
- Form pre-filled from broker login data
- All fields pre-populated and editable
- Validation enforces required fields
- Phone format validation (Nigerian numbers)

**Action:** Sarah reviews and clicks "Continue to Search"

**System:** Saves company details state

---

## Part 3: Broker Dashboard

### Screen: Dynamic Dashboard (Premier Securities Data)

```
┌────────────────────────────────────────────────┐
│                                                │
│  Premier Securities Limited                   │
│  info@premiersec.com • +234 (0)1 234 5678     │
│                         [Logout] [New Subs.]  │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Subscribers Registered: 3                │ │
│  │ (Active subscriptions)                   │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Total Units Subscribed: 1,800            │ │
│  │ (Across all subscribers)                 │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Amount Processed: ₦4,500                 │ │
│  │ (Total payments)                         │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Pending Applications: 1                  │ │
│  │ (Awaiting registrar review)              │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  RECENT APPLICATIONS                           │
│  ┌──────────────────────────────────────────┐ │
│  │ Shareholder Name      │ Status│ Units    │ │
│  │ Sarah Johnson         │Subm.│ 500     │ │
│  │ Michael Chen          │Draft│ 300     │ │
│  │ Amina Ahmed           │Appr.│ 1,000   │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
```

**Key Features:**
- Metrics are DYNAMIC - change by broker
- Header shows company details (email, phone)
- Logout button to switch brokers
- New Subscription button to start workflow
- Recent applications show only Premier's 3 apps

**If Sarah had logged in as Zenith Capital:**
```
Subscribers Registered: 2
Total Units Subscribed: 1,350
Amount Processed: ₦3,375
Recent Apps: David Okonkwo, Emma Watson
```

**Action:** Sarah clicks "New Subscription"

---

## Part 4: New Subscription Workflow

### Screen: Step 1 - Company Details (Read-Only Display)

```
STEP INDICATOR:
[Dashboard] [Company Details] [Search] [Confirm] [Fill] [Stamp] [Preview] [Submit]
                    ▼

┌──────────────────────────────────────────────┐
│  STOCKBROKER COMPANY DETAILS                 │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │                                        │ │
│  │ Company Name      │ Company Phone      │ │
│  │ Premier           │ +234 (0)1 234     │ │
│  │ Securities        │ 5678              │ │
│  │ Limited           │                    │ │
│  │                   │                    │ │
│  │ Company Email                         │ │
│  │ info@premiersec.com                  │ │
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  [< Back]  [Continue to Search >]           │
└──────────────────────────────────────────────┘
```

**Purpose:** Read-only display confirms broker context

**Action:** Sarah clicks "Continue to Search"

---

### Screen: Step 2 - Search Account

```
STEP INDICATOR:
[...] [Company Details] [Search] ▼ [Confirm] [Fill] [Stamp] [Preview] [Submit]

Find My Account in iX-Trac

Search Type: [Shareholder Name ▼]
Search Value: [John Adeyemi Okafor]

[Search] [Clear]
```

**Action:** Sarah searches for shareholder

---

### Screen: Step 3 - Confirm Details

```
STEP INDICATOR:
[...] [Search] [Confirm Details] ▼ [Fill] [Stamp] [Preview] [Submit]

FROM iX-TRAC (Read-Only)
┌──────────────────────────────────────────────┐
│ Reg/Account Number  : IX-2024-001234         │
│ Name of Shareholder : John Adeyemi Okafor    │
│ Units Held          : 5,000                  │
│ Rights Due          : 1,000 units            │
│ Amount Payable      : ₦2,500                 │
│ Price Per Share     : ₦2.50                  │
└──────────────────────────────────────────────┘

[< Back]  [Continue >]
```

**Action:** Sarah reviews and continues

---

### Screen: Step 4 - Fill Form (Sections)

```
STEP INDICATOR:
[...] [Confirm] [Fill Form] ▼ [Stamp] [Preview] [Submit]

A. ACCEPTANCE / PARTIAL RENUNCIATION

(✓) Full Acceptance
( ) Renunciation/Partial

B. ADDITIONAL SHARES
Number of additional shares: [500]
Price per share: ₦2.50
Additional payable: ₦1,250 [auto-calculated]

PERSONAL INFORMATION
Name in block letters: [JOHN ADEYEMI OKAFOR]
Next of Kin: [MARY OKAFOR]
Daytime Phone: [+234 1 234 5678]
Mobile Phone: [+234 801 234 5678]
Email: [john@example.com]

[< Back]  [Continue >]
```

**Features:**
- Forms auto-calculate amounts
- Mutual exclusivity (Full vs Partial)
- Validation on all required fields
- Broker context maintained throughout

**Action:** Sarah fills form and continues

---

### Screen: Step 5 - Bank Details & Signatures

```
STEP INDICATOR:
[...] [Fill] [Stamp] ▼ [Preview] [Submit]

BANK DETAILS
Bank Name: [Access Bank]
Branch: [Victoria Island]
Account Number: [0123456789]
BVN: [12345678901]

SIGNATURES
Signature: [Signature Box]
Name of Authorised Signatory: [Company Name]
```

**Action:** Sarah continues to stamp step

---

### Screen: Step 6 - Receiving Agent Stamp

```
STEP INDICATOR:
[...] [Stamp] ▼ [Preview] [Submit]

RECEIVING AGENT STAMP

(✓) Physically Applied - Stamp already applied to document
    [Received Agent Stamp Applied]

( ) Upload Stamp Image
    [Choose File] [Upload]

Details:
Date Stamped: [2024-01-20]

[< Back]  [Preview & Print >]
```

**NOTE:** This section ONLY appears for broker submissions (moved from registrar)

**Action:** Sarah marks stamp as physically applied

---

## Part 5: Print Preview & Submission

### Screen: Step 7 - Preview Modal

```
PRINT PREVIEW (A4 Format)

┌───────────────────────────────────────────┐
│  PROCESSED VIA STOCKBROKER:               │
│  PREMIER SECURITIES LIMITED               │
└───────────────────────────────────────────┘

ACCEPTANCE / RENUNCIATION FORM
NSL Capital Partners Limited
SUNU Assurances Nigeria Plc

SHAREHOLDER DETAILS
Reg/Account Number: IX-2024-001234
Name: JOHN ADEYEMI OKAFOR
Units Held: 5,000
Rights Due: 1,000

ACCEPTANCE DETAILS
Full Acceptance: ✓
Additional Shares Requested: 500 @ ₦2.50 = ₦1,250

BANK DETAILS
Bank: Access Bank
Account: 0123456789
BVN: 12345678901

SIGNATURES
[Signature Area]

═══════════════════════════════════════════

[Download PDF] [Print Now] [Close]
```

**Key Feature:** "PROCESSED VIA STOCKBROKER: PREMIER SECURITIES LIMITED" badge clearly identifies broker

**Action:** Sarah prints or reviews then closes

---

### Screen: Step 8 - Submission Confirmation

```
STEP INDICATOR:
[...] [Preview] [Submit] ✓ COMPLETE

Ready to Submit

✓ Application is complete and ready for submission
  to the registrar.

[< Back]  [Save Draft]  [Preview/Print]  [Submit to Registrar]
```

**Action:** Sarah clicks "Submit to Registrar"

**System Output:**
```
Alert: "Application submitted to registrar by Premier Securities Limited! 
Status: SubmittedByBroker"
```

**Backend (Future):** 
- Save subscription with `brokerId: 'broker-1'`
- Save company details: name, phone, email
- Create audit log with broker identification
- Notify registrar about broker submission

**After Submission:** Returns to dashboard

---

## Part 6: Registrar View

### Scenario: Registrar reviewing Premier Securities submission

**Screen: Registrar Application Review**

```
SUBMISSION FILTER:
[Direct Shareholder] [Stockbroker]
                        ▼ SELECTED

APPLICATION RECEIVED

Reference: BRK-APP-001
Submitted: Jan 20, 2024

┌───────────────────────────────────────┐
│ SUBMITTED BY BROKER                   │
│ Premier Securities Limited            │
│ +234 (0)1 234 5678                    │
│ info@premiersec.com                   │
└───────────────────────────────────────┘

SHAREHOLDER DETAILS (from broker submission)
- Name: JOHN ADEYEMI OKAFOR
- Bank: Access Bank
- Account: 0123456789
- BVN: 12345678901

FOR REGISTRAR USE ONLY
┌───────────────────────────────────────┐
│ Shares Provisionally Allotted: 1,000 │
│ Shares Accepted: 500                  │
│ Additional Shares Applied: 500        │
│ Total Allotted: 1,000                 │
│ Total Amount: ₦4,750                  │
│ Amount Paid: ₦4,750                   │
│ Refund: ₦0                            │
│                                       │
│ [✓] Approve  [✗] Reject               │
│                                       │
│ Approval Reason:                      │
│ [Comments...]                         │
└───────────────────────────────────────┘

[< Back]  [Save Draft]  [Preview]  [Submit to Issuing House]
```

**Key Features:**
- Broker badge clearly shows "Premier Securities Limited"
- All shareholder data pre-populated from broker submission
- Registrar can verify receiving agent stamp
- Approval workflow available

---

## Part 7: Broker Dashboard Update

### After Submission

**Dashboard now shows:**
- Pending Applications: 1 (just submitted)
- Recent applications table updated with "Submitted" status
- Metrics reflect new submission

**If Sarah clicks on the submitted application:**
- Can see approval status once registrar processes it
- Can track where application is in workflow
- Can download submission receipt

---

## Data Flow Summary

```
BROKER LOGIN
┌─────────────────────────┐
│ Select Broker from List │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Company Details Form    │
│ (Pre-filled, Editable)  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Broker Dashboard        │
│ (Dynamic Metrics)       │ ← Metrics filtered by broker
└────────────┬────────────┘
             │
        ┌────┴─────────────────┐
        │                      │
        ▼                      ▼
    New Subscription       View Applications
    (8-Step Form)
    Step 1: Company Details (read-only)
    Step 2-8: Form completion
        │
        ▼
    SUBMIT
    ↓ (includes brokerId + company details)
    │
    ▼
REGISTRAR WORKFLOW
├─ Can see "Submitted by Premier Securities"
├─ Can verify company details
├─ Proceed with approval/rejection
└─ Send to Issuing House
```

---

## Key Differences Between Broker Types

### Premier Securities (broker-1)
- 3 applications in recent list
- 1,800 total units subscribed
- ₦4,500 amount processed
- 1 pending application

### Zenith Capital Markets (broker-2)
- 2 applications in recent list
- 1,350 total units subscribed
- ₦3,375 amount processed
- 1 pending application

### ARM Securities (broker-3)
- 3 applications in recent list
- 2,450 total units subscribed
- ₦6,125 amount processed
- 2 pending applications

### Custom Broker (Manual Entry)
- 0 applications (new)
- 0 units subscribed
- ₦0 amount processed
- 0 pending applications

---

## Validation Examples

### Rejected: Invalid Phone
```
Company Phone Number **
[0803456]
Error: Invalid phone number format
(Expected: +234 or 0 prefix, 10 digits minimum)
```

### Rejected: Invalid Email
```
Company Email Address **
[info@premiersec]
Error: Invalid email address
(Expected: valid@domain.com format)
```

### Accepted: Valid Phone
```
Company Phone Number **
[+234 (0)1 234 5678] ✓
```

---

## Summary of New Features in Action

| Feature | Demonstrated | Benefit |
|---|---|---|
| Broker Login | Part 1 | Clear authentication |
| Company Details | Part 2 | Company info linked to submissions |
| Dynamic Dashboard | Part 3 | Each broker sees their data only |
| Company Header | Part 3 | Clear context in dashboard |
| Logout Button | Part 3 | Switch between brokers |
| Company Details Step | Part 4 | Broker context in form |
| Broker Badge in Print | Part 5 | Clear identification |
| Registrar Submission View | Part 6 | Easy identification of broker |
| Multi-Broker Isolation | Throughout | Data security |
| Submission Tracking | Part 7 | Broker can track their apps |

---

## Testing Verification Points

After completing this walkthrough, verify:

✅ Broker selection works
✅ Dashboard shows correct metrics for Premier Securities
✅ Switching broker updates all metrics
✅ Company details form displays and validates
✅ Form workflow completes successfully
✅ Print preview shows broker badge
✅ Submission succeeds
✅ Registrar can see broker identification
✅ Can logout and login as different broker
✅ Dashboard updates reflect different broker data

---

## End-to-End Timeline

- **Part 1 (Login):** 10 seconds
- **Part 2 (Company Details):** 15 seconds
- **Part 3 (Dashboard):** 20 seconds
- **Part 4 (Form Steps 1-6):** 3-5 minutes
- **Part 5 (Preview/Submit):** 1-2 minutes
- **Part 6 (Registrar View):** 1-2 minutes
- **Part 7 (Dashboard Update):** 10 seconds

**Total Time:** 5-10 minutes for complete workflow

