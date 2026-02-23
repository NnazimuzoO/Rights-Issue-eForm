# Quick Start Guide

## Running Locally

### Prerequisites
- Node.js 18+ and npm/pnpm
- A modern web browser

### Installation

1. **Clone/Setup the project**
```bash
cd /vercel/share/v0-project
```

2. **Install dependencies**
```bash
pnpm install
# or: npm install
```

3. **Run development server**
```bash
pnpm dev
# or: npm run dev
```

4. **Open in browser**
Navigate to: `http://localhost:3000`

## Testing the Application

### Home Page (`/`)
- Introduction page with two access points
- Feature overview
- Links to shareholder and registrar forms

### Shareholder Form (`/form/shareholder`)

**Test Flow:**
1. Click "Search Account" button
2. Enter any text (e.g., "John Okafor")
3. Click "Search" - mock data will auto-populate
4. Navigate through steps using "Next" button
5. Fill in form fields (marked with `**` are required)
6. Click "Preview" to see A4-formatted print preview
7. Click "Submit" on final step
8. See success confirmation with reference number

**Test Data:**
- Name: John Adeyemi Okafor
- Email: john@example.com
- Phone: +234 801 234 5678
- Bank: Access Bank
- Account: 0123456789
- BVN: 12345678901

**Form Options to Test:**
- Option A: Full Acceptance (select radio button)
- Option A: Additional Shares (enter 500, confirm checkbox)
- Option B: Partial/Renunciation (enter shares to accept/renounce)

### Registrar Form (`/form/registrar`)

**Test Flow:**
1. Review automatically loaded shareholder data
2. Click "Next" to processing section
3. Fill in registrar verification fields
4. Upload receiving agent stamp (any file)
5. Check "Stamp Applied" checkbox
6. Preview and submit to Issuing House

**Key Features to Test:**
- Auto-calculated totals
- Refund amount calculation
- Read-only shareholder data
- Form validation

## Features to Explore

### 1. Responsive Design
- View on desktop (full 2-column layout)
- Resize to tablet (adapted layout)
- View on mobile (single column)
- Test touch interactions

### 2. Form Validation
- Try submitting with empty required fields
- Enter invalid phone number (e.g., "abc")
- Enter incomplete BVN (less than 11 digits)
- Observe inline error messages

### 3. Calculations
- Enter additional shares and observe amount calculation
- Enter shares in partial acceptance and verify totals
- Change amounts in registrar section and observe refund calculation

### 4. Multi-Step Form
- Use "Previous" button to navigate
- Click step numbers in stepper to jump to steps
- Observe completed steps get marked with checkmarks
- Notice "Next" button disabled until form is valid

### 5. Print Preview
- Click "Preview" button on preview step
- View A4-formatted layout
- Click "Print" in modal (or print from browser: Ctrl+P)
- Verify all data appears correctly

### 6. Draft Saving
- Fill in partial form
- Click "Save Draft"
- See browser alert confirmation
- Data is saved to sessionStorage (survives page refresh within session)

### 7. File Uploads
- Click file upload areas
- Select any local file
- Observe filename appears
- Try removing and selecting different files

## Browser DevTools

### Debugging
1. Open DevTools (F12)
2. Check Console for any errors
3. Check Network tab for API calls (mock only)
4. Check Application > Session Storage to see saved drafts

### Responsive Testing
- Use DevTools device emulation (Ctrl+Shift+M)
- Test breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)

## Keyboard Shortcuts

- `Tab`: Navigate between fields
- `Enter`: Submit forms/search
- `Escape`: Close modal (if open)
- `Shift+Tab`: Navigate backwards

## Testing Checklist

- [ ] Home page loads with both access buttons
- [ ] Shareholder form search works
- [ ] Mock data appears after search
- [ ] All form sections are visible
- [ ] Calculations work correctly
- [ ] Form validation shows errors for empty fields
- [ ] Print preview opens and displays correctly
- [ ] Submit buttons are disabled until form is valid
- [ ] Registrar form shows auto-populated data
- [ ] Status badges display correct status
- [ ] Mobile layout is responsive and functional
- [ ] File uploads accept files
- [ ] Draft saving works

## Common Issues & Troubleshooting

### Page doesn't load
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server (kill and `pnpm dev` again)
- Check console for errors

### Styles not applying
- Ensure Tailwind CSS is built: `pnpm build`
- Check that globals.css is imported in layout.tsx

### Form calculations not working
- Check browser console for JavaScript errors
- Verify state is updating by adding console.log statements
- Check AcceptanceSection component calculations

### Files not uploading
- File upload is mock only - just shows filename
- In real implementation, would upload to server

### Print preview blank
- Ensure form has data before clicking Preview
- Check browser print settings
- Try Firefox if Chrome doesn't work

## Customization

### Change Mock Data
Edit `/app/form/shareholder/page.tsx` and `/app/form/registrar/page.tsx`:
```typescript
const mockIxTracData = {
  regAcctNumber: 'Your-Data',
  shareholderName: 'Your-Data',
  // ... etc
};
```

### Modify Colors
Edit `/app/globals.css` in `:root` and `.dark` sections

### Add New Form Fields
1. Add field to component's interface
2. Add input/textarea in JSX
3. Add onChange handler
4. Update parent callback

### Change Company Name
Search and replace "NSL Capital Partners" and "SUNU Assurances" throughout codebase

## Building for Production

```bash
# Build for static export (IIS)
pnpm build

# Output is in .next directory
# Copy to wwwroot/frontend on IIS

# Or build for deployment to Vercel
pnpm build
# Then deploy via git
```

## Performance Tips

- Form is optimized for ~50 form fields
- For larger forms, consider pagination
- Print preview uses modal to avoid rendering entire page at once
- All calculations are instant (no async operations)

## Accessibility Testing

- Navigate using only keyboard
- Use screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- Check color contrast using DevTools
- Verify all form inputs have labels
- Test with zoom to 200%

## Getting Help

1. Check the RIGHTS_FORM_GUIDE.md for detailed documentation
2. Check the IIS_DEPLOYMENT_GUIDE.md for deployment info
3. Review component JSDoc comments
4. Check browser console for error messages

---

**Happy Testing!** 🚀
