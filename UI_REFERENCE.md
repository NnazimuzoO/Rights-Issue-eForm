# UI Reference Guide - Layout & Components

## Color Palette

### Primary Colors
```
Navy Blue (Primary): oklch(0.25 0.15 260)
  - Used for: Headers, action buttons, important text
  - Hex: ~#2D3E7F (approximate)
  
Teal (Secondary): oklch(0.4 0.12 255)  
  - Used for: Secondary buttons, hover states, accents
  - Hex: ~#4A6FA5 (approximate)
  
Light Navy (Accent): oklch(0.45 0.15 260)
  - Used for: Active states, highlights, borders
  - Hex: ~#546B9E (approximate)
```

### Neutral Colors
```
Background: oklch(0.98 0.002 270)
  - Used for: Page background, card backgrounds
  - Hex: ~#FAF9F9 (approximate)

Cream/Light: oklch(0.88 0 0)
  - Used for: Muted sections, disabled states
  - Hex: ~#E8E8E8 (approximate)

Dark Gray: oklch(0.45 0 0)
  - Used for: Muted text, secondary information
  - Hex: ~#7A7A7A (approximate)

Black: oklch(0.15 0 0)
  - Used for: Primary text, headings
  - Hex: ~#262626 (approximate)
```

### Alert Colors
```
Error/Destructive: oklch(0.55 0.2 20)
  - Used for: Errors, warnings, refund amounts
  - Hex: ~#D24545 (approximate)

Success/Green: oklch(0.6 0.15 110)
  - Used for: Success messages, confirmations
  - Hex: ~#45A049 (approximate)

Warning/Yellow: oklch(0.8 0.15 90)
  - Used for: Warnings, in-progress status
  - Hex: ~#F4C430 (approximate)

Info/Blue: oklch(0.7 0.15 230)
  - Used for: Information messages, submitted status
  - Hex: ~#4A90E2 (approximate)
```

## Typography

### Font Stack
```
Display: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial
Monospace: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Courier New, monospace
```

### Type Hierarchy
```
H1 (Page Title)
  - Size: 48px desktop, 32px mobile
  - Weight: 700 (Bold)
  - Color: Primary (Navy)
  - Line Height: 1.2

H2 (Section Title)
  - Size: 32px desktop, 24px mobile
  - Weight: 600 (Semibold)
  - Color: Primary (Navy)
  - Line Height: 1.3

H3 (Subsection)
  - Size: 24px desktop, 20px mobile
  - Weight: 600 (Semibold)
  - Color: Primary (Navy)
  - Line Height: 1.4

Body Text
  - Size: 16px
  - Weight: 400 (Regular)
  - Color: Foreground (Black)
  - Line Height: 1.5

Small Text / Label
  - Size: 14px
  - Weight: 500 (Medium)
  - Color: Muted (Gray)
  - Line Height: 1.4
```

## Component Styles

### Buttons

#### Primary Button
```
Background: Navy (#2D3E7F)
Text: White (#FFFFFF)
Padding: 12px 20px
Border Radius: 8px
Font Weight: 600
Hover: Darker Navy
Active: Even Darker
Disabled: Muted Gray
```

#### Secondary Button  
```
Background: Transparent
Border: 2px Solid Teal (#4A6FA5)
Text: Navy (#2D3E7F)
Padding: 12px 20px
Border Radius: 8px
Font Weight: 600
Hover: Teal Background
Active: Darker Teal
```

#### Ghost Button
```
Background: Transparent
Text: Navy (#2D3E7F)
Padding: 12px 20px
Border: None
Font Weight: 600
Hover: Light Blue Background
Active: Teal Background
```

#### Destructive Button
```
Background: Red (#D24545)
Text: White (#FFFFFF)
Padding: 12px 20px
Border Radius: 8px
Font Weight: 600
Hover: Darker Red
Active: Even Darker Red
```

### Form Inputs

#### Standard Input
```
Background: White (#FFFFFF)
Border: 1px Solid #E0E0E0
Border Radius: 6px
Padding: 12px 16px
Font Size: 16px
Text Color: Black (#262626)
Placeholder Color: #9A9A9A

Focus:
  - Border Color: Navy (#2D3E7F)
  - Outline: 2px Solid Navy (offset 2px)
  - Box Shadow: 0 0 0 3px rgba(45, 62, 127, 0.1)

Error:
  - Border Color: Red (#D24545)
  - Outline: 2px Solid Red
```

#### Select Dropdown
```
[Same as Input, with chevron icon on right]
Icon Color: Navy (#2D3E7F)
Icon Size: 20px
```

#### Textarea
```
[Same as Input]
Resize: Vertical only
Min Height: 120px
```

#### Checkbox
```
Size: 20px × 20px
Border: 2px Solid Navy (#2D3E7F)
Border Radius: 4px
Checked Background: Navy (#2D3E7F)
Checked Icon: White checkmark
Focus: Outline Navy (2px, offset 2px)
```

#### Radio Button
```
Size: 20px × 20px (circle)
Border: 2px Solid Navy (#2D3E7F)
Selected: Navy background with white circle
Focus: Outline Navy (2px, offset 2px)
```

### Labels

```
Font Size: 14px
Font Weight: 600
Color: Black (#262626)
Margin Bottom: 8px
Required Indicator: "**" (double asterisk)
Optional Indicator: "*" (single asterisk, gray)
```

### Cards & Sections

#### Standard Card
```
Background: White (#FFFFFF)
Border: 1px Solid #E8E8E8
Border Radius: 8px
Padding: 24px (desktop), 16px (mobile)
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Primary Card (Highlighted)
```
Background: White (#FFFFFF)
Border: 2px Solid Navy (#2D3E7F)
Border Radius: 8px
Padding: 24px (desktop), 16px (mobile)
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Muted Section
```
Background: Light Gray (#F5F5F5)
Border: 1px Solid #E8E8E8
Border Radius: 8px
Padding: 16px
```

#### Accent Section (Left Border)
```
Background: Primary/5 opacity
Border Left: 4px Solid Navy (#2D3E7F)
Border Radius: 0 8px 8px 0
Padding: 16px
Padding Left: 20px
```

### Status Badges

#### Draft Status
```
Background: #E8E8E8
Text: #7A7A7A
Padding: 8px 12px
Border Radius: 6px
Font Size: 12px
Font Weight: 600
```

#### Submitted Status
```
Background: #E3F2FD
Text: #1976D2
[Same padding/radius/font as above]
```

#### In Review Status
```
Background: #FFF3E0
Text: #F57C00
[Same padding/radius/font as above]
```

#### Completed Status
```
Background: #E8F5E9
Text: #388E3C
[Same padding/radius/font as above]
```

### Alert Messages

#### Error Alert
```
Background: #FFEBEE
Border: 1px Solid #EF5350
Border Radius: 8px
Padding: 12px 16px
Icon: AlertCircle (Red)
Icon Color: #D32F2F
Text Color: #C62828
Font Size: 14px
```

#### Success Alert
```
Background: #E8F5E9
Border: 1px Solid #81C784
Border Radius: 8px
Padding: 12px 16px
Icon: CheckCircle (Green)
Icon Color: #388E3C
Text Color: #2E7D32
Font Size: 14px
```

#### Warning Alert
```
Background: #FFF3E0
Border: 1px Solid #FFB74D
Border Radius: 8px
Padding: 12px 16px
Icon: AlertCircle (Orange)
Icon Color: #F57F17
Text Color: #E65100
Font Size: 14px
```

#### Info Alert
```
Background: #E3F2FD
Border: 1px Solid #64B5F6
Border Radius: 8px
Padding: 12px 16px
Icon: Info (Blue)
Icon Color: #1976D2
Text Color: #0D47A1
Font Size: 14px
```

## Layout Grids

### Desktop (>1024px)
```
Main Grid: 2-column
  - Column 1 (Left): Read-only data / Display
  - Column 2 (Right): Form inputs / Entry
  - Gap: 32px
  - Max Width: 1200px
  - Padding: 48px horizontal
```

### Tablet (768px - 1024px)
```
Main Grid: 2-column (adapted)
  - Column Width: Flexible
  - Gap: 24px
  - Padding: 32px horizontal
```

### Mobile (<768px)
```
Main Grid: Single column
  - Full width
  - Gap: 24px between sections
  - Padding: 16px horizontal
```

## Spacing System

```
xs:  4px
sm:  8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Common Patterns
```
Form Field Spacing: 16px (md) between fields
Section Spacing: 32px (xl) between sections
Card Padding: 24px (lg)
Button Padding: 12px vertical, 20px horizontal
```

## Border Radius System

```
sm: 4px
md: 6px
lg: 8px
xl: 12px
full: 9999px (for pills)
```

## Shadows

```
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## Icons

### Icon Sizes
```
sm: 16px
md: 20px
lg: 24px
xl: 32px
2xl: 48px
```

### Icon Usage
```
Buttons: 18px (before/after text)
Form Labels: 16px (next to text)
Headers: 24px-32px
Status: 20px
Alerts: 20px
Navigation: 20px
```

### Icon Colors
```
Primary: Navy (#2D3E7F)
Secondary: Teal (#4A6FA5)
Muted: Gray (#9A9A9A)
Error: Red (#D24545)
Success: Green (#45A049)
Warning: Orange (#F4C430)
Info: Blue (#4A90E2)
```

## Responsive Behavior

### Typography Scaling
```
H1: 48px → 32px
H2: 32px → 24px
H3: 24px → 20px
Body: 16px → 16px (no change)
Small: 14px → 14px (no change)
```

### Padding/Margin Scaling
```
Desktop: 32-48px padding/margin
Tablet: 24-32px padding/margin
Mobile: 16-24px padding/margin
```

### Grid Changes
```
Desktop: 2-column grids
Tablet: 2-column (tighter spacing)
Mobile: 1-column stack
```

## Print Styles

### Print Layout
```
Page Size: A4 (210mm × 297mm)
Orientation: Portrait
Margins: 0.5cm all sides
Background: Removed
Shadows: Removed
Colors: Maintained for readability
```

### Print Typography
```
Headings: Navy color (prints well)
Body: Black color
Links: Underlined in print
Page Breaks: Automatic at sections
```

## Animations & Transitions

### Button Hover
```
Transition: 150ms ease-in-out
Properties: background-color, border-color, box-shadow
```

### Form Focus
```
Transition: 200ms ease-out
Properties: border-color, outline, box-shadow
```

### Stepper Progress
```
Transition: 300ms ease-in-out
Properties: background-color, transform (scale)
```

### Modal Fade-In
```
Transition: 200ms ease-out
Properties: opacity, transform (scale)
```

## Dark Mode Support

### Dark Mode Colors
```
Background: #0F1419 (very dark navy)
Card: #1A2331 (dark navy)
Primary: #7BA8E8 (light blue)
Text: #F0F0F0 (light gray)
Border: #2A3A4A (dark gray-blue)
```

### Implementation
```
CSS Variable Fallback: oklch(0.15 0 0) light mode
Dark Mode: oklch(0.15 0 0) with inverted background
Toggle: Via html[data-theme="dark"] or .dark class
```

---

**Design System Version**: 1.0  
**Last Updated**: February 2024  
**Tool**: Figma integration ready
