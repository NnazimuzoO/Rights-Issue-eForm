# Deployment Guide: IIS/ASP.NET Web Forms Integration

## Overview

This Rights Issue e-Form is currently built as a Next.js/React application. This guide covers how to integrate it with ASP.NET Web Forms on IIS as originally specified.

## Current Architecture

The application is a **Next.js frontend** (React/TypeScript) that can be integrated with an **ASP.NET backend** in several ways:

## Integration Approaches

### Approach 1: Hybrid SPA with ASP.NET API Backend (Recommended)

**Setup:**
- Keep Next.js frontend deployed as static files under `wwwroot\frontend`
- Create ASP.NET Web Forms backend in `wwwroot\api`
- Communication via RESTful APIs

**Steps:**
1. Build Next.js: `npm run build`
2. Export static: Configure `next.config.mjs` for static export
3. Copy `.next\static` and `public` to `wwwroot\frontend`
4. Create ASP.NET API endpoints in `Handlers` folder
5. Update API calls in components to point to ASP.NET endpoints

**Components to Update:**
```typescript
// In lib/form-utils.ts or new API service

export const searchAccount = async (type: string, value: string) => {
  return fetch('/api/accounts/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, value })
  });
};

export const submitApplication = async (payload: FormSubmissionPayload) => {
  return fetch('/api/applications/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
};

export const getApplicationDetails = async (appId: string) => {
  return fetch(`/api/applications/${appId}`);
};
```

### Approach 2: ASP.NET Web Forms Frontend with React Components

**Setup:**
- Create ASP.NET Web Forms (.aspx) pages as containers
- Embed React components within ASP.NET pages
- Use ASP.NET controls for backend integration

**Example .aspx File:**
```asp
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ShareholderForm.aspx.cs" 
         Inherits="RightsIssueForm.ShareholderForm" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Rights Issue Form</title>
    <link href="~/Content/tailwind.css" rel="stylesheet" />
</head>
<body>
    <form runat="server">
        <!-- React app mounts here -->
        <div id="app-root"></div>
        
        <!-- Hidden field for server-side data -->
        <asp:HiddenField ID="hdnIxTracData" runat="server" />
    </form>
    
    <script src="~/Scripts/form-app.js"></script>
</body>
</html>
```

**CodeBehind (ShareholderForm.aspx.cs):**
```csharp
public partial class ShareholderForm : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // Load initial data from database
            string shareRefId = Request.QueryString["ref"];
            var ixTracData = GetIxTracData(shareRefId);
            
            // Pass to frontend as JSON
            hdnIxTracData.Value = JsonConvert.SerializeObject(ixTracData);
        }
    }
    
    private dynamic GetIxTracData(string refId)
    {
        // Query database or iX-Trac system
        using (var db = new RightsIssueContext())
        {
            return db.ShareholderAccounts
                .Where(x => x.ReferenceId == refId)
                .Select(x => new {
                    x.RegAcctNumber,
                    x.ShareholderName,
                    x.UnitsHeld,
                    x.RightsDue,
                    x.PricePerShare,
                    x.AmountPayable
                })
                .FirstOrDefault();
        }
    }
}
```

### Approach 3: Full ASP.NET Web Forms Implementation

**Setup:**
- Recreate form UI with ASP.NET controls
- Use server-side validation and processing
- Leverage existing ASP.NET infrastructure

**Components:**
```csharp
// Models
public class RightsApplication
{
    public string Id { get; set; }
    public string ShareholderName { get; set; }
    public string NextOfKin { get; set; }
    public string DaytimePhone { get; set; }
    public string MobilePhone { get; set; }
    public string Email { get; set; }
    public int AcceptanceType { get; set; } // 1=Full, 2=Additional, 3=Partial
    public int? AdditionalShares { get; set; }
    public decimal TotalAmountDue { get; set; }
    public string BankName { get; set; }
    public string AccountNumber { get; set; }
    public string BVN { get; set; }
    public DateTime SubmittedDate { get; set; }
    public int Status { get; set; } // 1=Draft, 2=Submitted, 3=InReview, 4=Completed
}

// Database context
public class RightsIssueContext : DbContext
{
    public DbSet<RightsApplication> Applications { get; set; }
    public DbSet<ShareholderAccount> ShareholderAccounts { get; set; }
    public DbSet<RegistrarReview> RegistrarReviews { get; set; }
}
```

## Project Structure for IIS Deployment

```
RightsIssueForms/
├── wwwroot/
│   ├── api/                    # ASP.NET API endpoints
│   │   ├── accounts.aspx
│   │   ├── applications.aspx
│   │   └── registrar.aspx
│   ├── frontend/               # Next.js static files
│   │   ├── _next/
│   │   └── static/
│   ├── Content/
│   │   └── tailwind.css
│   └── Scripts/
│       └── form-app.js         # Built React bundle
├── App_Code/                   # ASP.NET code-behind
│   ├── Models/
│   ├── Services/
│   └── Handlers/
├── App_Data/                   # Database files
├── Forms/
│   ├── ShareholderForm.aspx
│   ├── ShareholderForm.aspx.cs
│   ├── RegistrarForm.aspx
│   └── RegistrarForm.aspx.cs
├── web.config
└── packages.config
```

## API Endpoints to Implement in ASP.NET

### Account Search
```
POST /api/accounts/search
Body: { "type": "shareholder-name", "value": "John Okafor" }
Response: { "regAcctNumber": "IX-2024-001234", ... }
```

### Get iX-Trac Data
```
GET /api/accounts/{refId}
Response: { "shareholderName": "...", "unitsHeld": 5000, ... }
```

### Submit Shareholder Application
```
POST /api/applications/submit
Body: { "shareholder": {...}, "acceptance": {...}, ... }
Response: { "id": "APP-2024-001234", "status": "submitted" }
```

### Get Application (for Registrar)
```
GET /api/applications/{appId}
Response: { "id": "APP-2024-001234", "shareholder": {...}, ... }
```

### Submit Registrar Review
```
POST /api/applications/{appId}/registrar-submit
Body: { "totalSharesAllotted": 1500, "totalAmountPayable": 3750, ... }
Response: { "id": "APP-2024-001234-REG", "status": "completed" }
```

## Web.config Configuration

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="IxTracConnectionString" value="Server=IXSERVER;Database=iXTrac;User Id=sa;" />
    <add key="RightsFormConnectionString" value="Server=(local);Database=RightsIssueForms;Integrated Security=true;" />
  </appSettings>

  <connectionStrings>
    <add name="RightsFormDb" 
         connectionString="Server=(local);Database=RightsIssueForms;Integrated Security=true;" 
         providerName="System.Data.SqlClient" />
  </connectionStrings>

  <system.web>
    <httpRuntime targetFramework="4.7.2" maxRequestLength="10485760" />
    <compilation debug="true" targetFramework="4.7.2" />
    <authentication mode="Forms">
      <forms loginUrl="~/Login.aspx" timeout="2880" />
    </authentication>
  </system.web>

  <system.webServer>
    <rewrite>
      <rules>
        <!-- Route API calls to handlers -->
        <rule name="API Routing" stopProcessing="true">
          <match url="^api/(.*)" />
          <action type="Rewrite" url="api/{R:1}.aspx" />
        </rule>
        <!-- Fallback to static files -->
        <rule name="Static Files" stopProcessing="true">
          <match url="^frontend/(.*)$" />
          <action type="Rewrite" url="frontend/{R:1}" />
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <fileExtensions>
          <add fileExtension=".json" allowed="true" />
          <add fileExtension=".pdf" allowed="true" />
        </fileExtensions>
      </requestFiltering>
    </security>
  </system.webServer>
</configuration>
```

## Database Schema (SQL Server)

```sql
CREATE TABLE ShareholderAccounts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    RegAcctNumber NVARCHAR(50) NOT NULL UNIQUE,
    ShareholderName NVARCHAR(255) NOT NULL,
    UnitsHeld INT NOT NULL,
    RightsDue INT NOT NULL,
    PricePerShare DECIMAL(18,2) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE RightsApplications (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ShareholderAccountId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY (ShareholderAccounts.Id),
    ShareholderName NVARCHAR(255) NOT NULL,
    NextOfKin NVARCHAR(255) NOT NULL,
    DaytimePhone NVARCHAR(20) NOT NULL,
    MobilePhone NVARCHAR(20) NOT NULL,
    Email NVARCHAR(255),
    AcceptanceType INT NOT NULL,
    AdditionalShares INT,
    TotalAmountDue DECIMAL(18,2) NOT NULL,
    BankName NVARCHAR(255) NOT NULL,
    AccountNumber NVARCHAR(20) NOT NULL,
    BVN NVARCHAR(11) NOT NULL,
    PaymentMethod NVARCHAR(50),
    PaymentEvidencePath NVARCHAR(500),
    SignaturePath NVARCHAR(500),
    Status INT NOT NULL DEFAULT 1,
    SubmittedDate DATETIME,
    CreatedDate DATETIME DEFAULT GETDATE(),
    ModifiedDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE RegistrarReviews (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ApplicationId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY (RightsApplications.Id),
    TotalSharesAllotted INT NOT NULL,
    TotalAmountPayable DECIMAL(18,2) NOT NULL,
    TotalAmountPaid DECIMAL(18,2) NOT NULL,
    AmountToBeRefunded DECIMAL(18,2),
    ReceivingAgentStampPath NVARCHAR(500),
    StampApplied BIT DEFAULT 0,
    ReviewedBy NVARCHAR(255),
    ReviewedDate DATETIME,
    Status INT NOT NULL,
    SubmittedDate DATETIME,
    CreatedDate DATETIME DEFAULT GETDATE()
);
```

## Building and Deploying

### Step 1: Build Next.js
```bash
cd RightsIssueForms
npm install
npm run build
```

### Step 2: Export Static Files
Update `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
};
export default nextConfig;
```

Run export: `npm run build`

### Step 3: Copy to IIS
```bash
# Copy static files
xcopy out\* C:\inetpub\wwwroot\RightsIssueForms\frontend\ /E /Y

# Copy API endpoints
xcopy App_Code\* C:\inetpub\wwwroot\RightsIssueForms\App_Code\ /E /Y
```

### Step 4: Configure IIS

1. Create Application Pool: `.NET Framework 4.8 Integrated`
2. Create Website/Application pointing to `wwwroot`
3. Set application permissions (IUSR)
4. Enable URL Rewrite module
5. Configure SSL certificate

### Step 5: Database Setup
```sql
-- Create database
CREATE DATABASE RightsIssueForms;

-- Run schema scripts
sqlcmd -S (local) -d RightsIssueForms -i schema.sql
```

### Step 6: Test
Navigate to: `http://localhost/RightsIssueForms/`

## Security Considerations

1. **HTTPS Only**: Enable HSTS header
2. **Input Validation**: Server-side validation on all API endpoints
3. **SQL Injection Prevention**: Use parameterized queries
4. **CSRF Protection**: Add anti-CSRF tokens to forms
5. **File Upload Security**: Scan uploaded files, restrict file types
6. **Authentication**: Implement role-based access (Shareholder vs Registrar)
7. **Audit Logging**: Log all application submissions and registrar actions

## Performance Optimization

1. Enable response compression in IIS
2. Set cache headers for static assets
3. Implement database query optimization
4. Use connection pooling
5. Implement async/await for I/O operations

## Monitoring

- Application Insights for telemetry
- Event log monitoring
- Database performance monitoring
- IIS logs analysis

---

**Note**: This guide provides integration points. The actual implementation will require ASP.NET development expertise and database administration.
