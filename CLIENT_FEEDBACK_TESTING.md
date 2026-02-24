# Client Feedback Testing Guide

## Quick Start Testing

### Test 1: Broker Login with Dynamic Dashboard
**Expected Outcome:** Different broker metrics display based on selected firm

1. Navigate to `/form/stockbroker`
2. Click "Premier Securities Limited"
3. Review company details (pre-filled):
   - Company Name: Premier Securities Limited
   - Phone: +234 (0)1 234 5678
   - Email: info@premiersec.com
4. Click "Continue to Search"
5. **Verify Dashboard Shows:**
   - Broker: "Premier Securities Limited" (in header)
   - Subscribers Registered: **3**
   - Total Units Subscribed: **1,800**
   - Amount Processed: **₦4,500**
   - Pending Applications: **1**
   - Recent Applications: 3 entries (Sarah Johnson, Michael Chen, Amina Ahmed)

### Test 2: Switch Broker & Verify Dashboard Updates
**Expected Outcome:** Dashboard metrics change when switching brokers

1. From dashboard, click "Logout" (top-right)
2. You return to broker login screen
3. Click "Zenith Capital Markets"
4. Click "Continue to Search"
5. **Verify Dashboard Shows (Zenith data):**
   - Broker: "Zenith Capital Markets"
   - Subscribers Registered: **2**
   - Total Units Subscribed: **1,350**
   - Amount Processed: **₦3,375**
   - Pending Applications: **1**
   - Recent Applications: 2 entries (David Okonkwo, Emma Watson)

### Test 3: Manual Broker Entry
**Expected Outcome:** Can enter custom broker details

1. Navigate to `/form/stockbroker`
2. Click "Don't see your firm? Enter manually"
3. Enter:
   - Company Name: "My Test Brokers"
   - Email: test@mybrokers.com
   - Phone: 0803 456 7890
4. Click "Enter Dashboard"
5. **Verify:**
   - Dashboard header shows "My Test Brokers"
   - Email and phone displayed in header
   - No applications shown (custom broker has 0 applications)

### Test 4: Company Details Display in Form
**Expected Outcome:** Company details step shows read-only confirmation

1. From dashboard, click "New Subscription"
2. System shows Step 1: Company Details
3. **Verify Displays:**
   - Company Name: (broker company name)
   - Phone Number: (broker phone)
   - Email Address: (broker email)
4. Click "Continue to Search"
5. Proceeds to search step

### Test 5: Broker Badge on Application
**Expected Outcome:** Print preview shows broker identification

1. From New Subscription form, proceed through steps:
   - Step 1: Company Details (continue)
   - Step 2: Search Account (search for any shareholder)
   - Step 3: Confirm Details (continue)
   - Step 4: Fill Form (fill with sample data)
   - Step 5: Add Stamp (continue)
   - Step 6: Preview
2. Click "Preview/Print"
3. **Verify Print Preview Shows:**
   - In header: "PROCESSED VIA STOCKBROKER: [Broker Name]" (boxed)
   - All form data displayed
   - Shareholder details populated
4. Close modal

### Test 6: Multi-Broker Data Isolation
**Expected Outcome:** Each broker sees only their applications

**Part A: Premier Securities**
1. Logout and login as Premier Securities
2. View Recent Applications - should show 3 apps by Premier
3. Note specific shareholder names

**Part B: ARM Securities**
1. Logout
2. Login as ARM Securities Limited
3. Click "Continue to Search"
4. View Recent Applications - should show 3 different apps (James Adebayo, Victoria Chukwu, Hassan Ibrahim)
5. **Verify:** Completely different from Premier's apps

### Test 7: Company Details Validation
**Expected Outcome:** Form validates required fields

1. Navigate to `/form/stockbroker` → Select any broker → "Continue to Search" (it should show company details read-only)
2. Or: Select "Don't see your firm" and try to proceed without filling fields
3. **Verify Validation Messages:**
   - Leave Company Name empty → "Stockbroker company name is required"
   - Enter invalid phone → "Invalid phone number format"
   - Enter invalid email → "Invalid email address"
4. Fix errors and verify submission succeeds

### Test 8: Responsive Design
**Expected Outcome:** All screens work on mobile and desktop

**Mobile (360px width):**
1. Open `/form/stockbroker` on mobile device or DevTools
2. Verify broker login buttons stack vertically
3. Verify dashboard metrics display in single column
4. Verify applications table scrolls horizontally

**Desktop (1440px width):**
1. Open `/form/stockbroker` on desktop
2. Verify broker login buttons display side-by-side (or 2-column)
3. Verify dashboard metrics display in 4-column grid
4. Verify applications table fits without scrolling

### Test 9: Form Completion with Broker Context
**Expected Outcome:** Complete subscription form with broker linkage

1. Start new subscription workflow
2. Fill out all steps
3. At "Preview" step, verify broker name displayed
4. Click "Submit to Registrar"
5. **Verify Alert Shows:** "Application submitted to registrar by [Broker Name]! Status: SubmittedByBroker"
6. Returns to dashboard

### Test 10: Registrar View (Broker Submission)
**Expected Outcome:** Registrar can see broker submission identifier

1. Navigate to `/form/registrar`
2. Click "Stockbroker" filter button
3. **Verify Displays:**
   - Application info card shows broker badge: "SUBMITTED BY BROKER: [Broker Name]"
   - Can review all shareholder-filled data
   - "For Registrar Use Only" section available for approval

---

## Metrics Verification Table

| Broker | Expected Data |
|---|---|
| **Premier Securities Limited** | Subscribers: 3, Units: 1,800, Amount: ₦4,500, Pending: 1 |
| **Zenith Capital Markets** | Subscribers: 2, Units: 1,350, Amount: ₦3,375, Pending: 1 |
| **ARM Securities Limited** | Subscribers: 3, Units: 2,450, Amount: ₦6,125, Pending: 2 |

---

## Test Data Reference

### Premier Securities Applications:
- BRK-APP-001: Sarah Johnson, 500 units, ₦1,250, Submitted
- BRK-APP-002: Michael Chen, 300 units, ₦750, Draft
- BRK-APP-003: Amina Ahmed, 1,000 units, ₦2,500, Approved

### Zenith Capital Markets Applications:
- BRK-APP-004: David Okonkwo, 750 units, ₦1,875, Submitted
- BRK-APP-005: Emma Watson, 600 units, ₦1,500, Approved

### ARM Securities Limited Applications:
- BRK-APP-006: James Adebayo, 450 units, ₦1,125, Draft
- BRK-APP-007: Victoria Chukwu, 800 units, ₦2,000, Submitted
- BRK-APP-008: Hassan Ibrahim, 1,200 units, ₦3,000, Approved

---

## Edge Cases to Test

1. **No Applications:** Enter custom broker with 0 applications → "Recent Applications" section should be hidden or show "No applications yet"
2. **Multiple Logins:** Can logout and login as different brokers multiple times
3. **Form State Reset:** Starting new subscription after previous one doesn't carry over data
4. **Page Refresh:** Session data persists (broker login continues) - or shows login screen again (expected for UI-only demo)
5. **Browser Back:** Can navigate back through steps without issues

---

## Performance Considerations

- Dashboard should load instantly (mock data)
- Print preview modal should open within 1 second
- No lag when switching between brokers
- Metrics calculations should be real-time

---

## Accessibility Testing

- [ ] Form labels associated with inputs
- [ ] Error messages clearly visible
- [ ] Buttons have descriptive text (not just icons)
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation works (Tab through fields)
- [ ] Screen reader can read all content

---

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Chrome Android

---

## Issues to Watch For

| Issue | Resolution |
|---|---|
| Metrics showing old broker data | Check browser console for logged-in broker ID mismatch |
| Company details not showing | Ensure step 1 renders when currentStep === 1 |
| Broker name not in print preview | Verify brokerName prop passed to PrintPreviewModal |
| Form steps misaligned | Check step number offset (should be 0-7, but company details at step 1) |
| Session lost on refresh | Expected for UI-only demo (use localStorage for persistence if needed) |

---

## Success Criteria Checklist

✅ **Dashboard:** Shows dynamic metrics for logged-in broker
✅ **Company Details:** Captures and displays broker information
✅ **Subscription Linking:** Each submission tagged with broker
✅ **Multi-Broker:** Can switch brokers and see different data
✅ **Print Preview:** Shows "Processed via Stockbroker" badge
✅ **Registrar View:** Can identify broker submissions
✅ **Responsive:** Works on mobile and desktop
✅ **Validation:** Requires valid company details
✅ **Professional UI:** Matches existing design system

---

## Post-Testing Cleanup

1. Clear browser cache/session data
2. Test with fresh user session
3. Verify no console errors in DevTools
4. Check performance metrics (Lighthouse)

