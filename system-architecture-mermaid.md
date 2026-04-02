# ScamGuard — Human-Based System Architecture

> This document presents the system architecture from the **human perspective** — showing how real people interact with the web application, what they see, what they do, and how the system responds at every step.

---

## 1. Human Actors & Their Roles

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#4361ee', 'primaryTextColor': '#fff', 'lineColor': '#6c757d', 'background': '#ffffff'}}}%%
graph TB
    subgraph ACTORS["👥 HUMAN ACTORS IN THE SYSTEM"]
        direction TB
        subgraph JS["🧑‍💼 Job Seeker"]
            JS_DESC["A student or job applicant who received\na job offer and wants to verify\nwhether it is legitimate or a scam"]
        end

        subgraph SR["🧑‍🏫 Scam Reporter"]
            SR_DESC["A person who encountered a fraudulent\njob posting and wants to report it\nto warn others and aid investigation"]
        end

        subgraph AD["🛡️ System Administrator"]
            AD_DESC["An authorized admin who monitors\nall scam scan records, reviews reports,\nand oversees the system"]
        end
    end

    JS -- "Uses the system to\nVERIFY a job posting" --> SYSTEM["🌐 ScamGuard\nWeb Application"]
    SR -- "Uses the system to\nREPORT a scam" --> SYSTEM
    AD -- "Uses the system to\nMONITOR & REVIEW" --> SYSTEM

    style ACTORS fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px,color:#1a1a2e
    style JS fill:#e8f0fe,stroke:#4361ee,stroke-width:2px,color:#1a1a2e
    style SR fill:#fff3e0,stroke:#ff9f43,stroke-width:2px,color:#1a1a2e
    style AD fill:#f3e8ff,stroke:#9b5de5,stroke-width:2px,color:#1a1a2e
    style JS_DESC fill:#e8f0fe,stroke:none,color:#1a1a2e
    style SR_DESC fill:#fff3e0,stroke:none,color:#1a1a2e
    style AD_DESC fill:#f3e8ff,stroke:none,color:#1a1a2e
    style SYSTEM fill:#2ec4b6,stroke:#1ea898,color:#fff
```

---

## 2. Complete Web Flow — Human Journey Through the Application

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#4361ee', 'primaryTextColor': '#fff', 'lineColor': '#4361ee', 'background': '#ffffff'}}}%%
flowchart TD
    START(("🧑 Human User\nOpens the Website")) --> HOME

    subgraph HOME_SECTION["🏠 HOME PAGE — index.html"]
        HOME["User lands on the Home Page\nSees introduction, features,\nand call-to-action buttons"]
    end

    HOME --> DECIDE{"🤔 What does the\nuser want to do?"}

    DECIDE -- "Check a Job Posting" --> SCAN_SECTION
    DECIDE -- "Report a Scam" --> REPORT_SECTION
    DECIDE -- "Admin Login" --> ADMIN_SECTION

    subgraph SCAN_SECTION["🔍 JOB SCAN FLOW — Job Seeker Journey"]
        direction TB
        SCAN_PAGE["User opens scan.html\nSees the Job Details Form"]
        SCAN_FILL["User fills in:\n• Job Title\n• Company Name\n• Contact Email\n• Salary Offered\n• Job Description\n• Payment Required?"]
        SCAN_SUBMIT["User clicks 'Analyze Job'\nForm data is sent to server"]
        SCAN_PROCESS["⚙️ Server receives data\n🧠 Risk Engine analyzes:\n  → Payment required?\n  → Free email domain?\n  → Suspicious keywords?\n  → Unrealistic salary?"]
        SCAN_RESULT["User is redirected to\nresult.html — sees the outcome"]

        SCAN_PAGE --> SCAN_FILL --> SCAN_SUBMIT --> SCAN_PROCESS --> SCAN_RESULT
    end

    subgraph RESULT_SECTION["📊 RESULT DISPLAY — What the User Sees"]
        direction TB
        RESULT_HIGH["🔴 HIGH RISK\nUser sees a RED warning\n'This job appears to be a SCAM'\nScore ≥ 40"]
        RESULT_MED["🟡 MEDIUM RISK\nUser sees a YELLOW caution\n'Proceed with caution'\nScore 20–39"]
        RESULT_LOW["🟢 LOW RISK\nUser sees a GREEN approval\n'This job appears legitimate'\nScore < 20"]
    end

    SCAN_RESULT --> RESULT_HIGH
    SCAN_RESULT --> RESULT_MED
    SCAN_RESULT --> RESULT_LOW

    RESULT_HIGH --> USER_ACTION_1{"👤 User decides\nnext action"}
    RESULT_MED --> USER_ACTION_1
    RESULT_LOW --> USER_ACTION_1

    USER_ACTION_1 -- "Scan Another Job" --> SCAN_PAGE
    USER_ACTION_1 -- "Report This Job" --> REPORT_PAGE

    subgraph REPORT_SECTION["📝 REPORT SCAM FLOW — Reporter Journey"]
        direction TB
        REPORT_PAGE["User opens report.html\nSees the Report Form"]
        REPORT_FILL["User fills in:\n• Reporter Name\n• Reporter Email\n• Scam Description"]
        REPORT_SUBMIT["User clicks 'Submit Report'\nReport is sent to server"]
        REPORT_CONFIRM["✅ User sees confirmation\n'Report submitted successfully'\nStatus: Pending Review"]

        REPORT_PAGE --> REPORT_FILL --> REPORT_SUBMIT --> REPORT_CONFIRM
    end

    subgraph ADMIN_SECTION["🛡️ ADMIN FLOW — Administrator Journey"]
        direction TB
        ADMIN_LOGIN["Admin opens admin-login.html\nSees login form"]
        ADMIN_CREDS["Admin enters:\n• Username\n• Password"]
        ADMIN_AUTH{"🔐 Server verifies\ncredentials"}
        ADMIN_FAIL["❌ Invalid credentials\nUser sees error message\nAsked to try again"]
        ADMIN_DASH["✅ Login successful\nRedirected to admin.html\nAdmin Dashboard"]
        ADMIN_VIEW["Admin can view:\n📋 All Job Scans — with risk levels\n📋 All Scam Reports — with status\n📊 Statistics & Counts"]

        ADMIN_LOGIN --> ADMIN_CREDS --> ADMIN_AUTH
        ADMIN_AUTH -- "Wrong credentials" --> ADMIN_FAIL --> ADMIN_LOGIN
        ADMIN_AUTH -- "Correct credentials" --> ADMIN_DASH --> ADMIN_VIEW
    end

    style START fill:#4361ee,stroke:#3250d3,color:#fff
    style HOME fill:#4361ee,stroke:#3250d3,color:#fff
    style DECIDE fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style HOME_SECTION fill:#e8f0fe,stroke:#4361ee,stroke-width:2px,color:#1a1a2e
    style SCAN_SECTION fill:#e6fcf5,stroke:#2ec4b6,stroke-width:2px,color:#1a1a2e
    style RESULT_SECTION fill:#fff8e1,stroke:#ff9f43,stroke-width:2px,color:#1a1a2e
    style REPORT_SECTION fill:#fce4ec,stroke:#e74c3c,stroke-width:2px,color:#1a1a2e
    style ADMIN_SECTION fill:#f3e8ff,stroke:#9b5de5,stroke-width:2px,color:#1a1a2e
    style SCAN_PAGE fill:#2ec4b6,stroke:#1ea898,color:#fff
    style SCAN_FILL fill:#38d9a9,stroke:#20c997,color:#1a1a2e
    style SCAN_SUBMIT fill:#2ec4b6,stroke:#1ea898,color:#fff
    style SCAN_PROCESS fill:#ff9f43,stroke:#ee5a24,color:#fff
    style SCAN_RESULT fill:#ff9f43,stroke:#ee5a24,color:#fff
    style RESULT_HIGH fill:#e74c3c,stroke:#c0392b,color:#fff
    style RESULT_MED fill:#f39c12,stroke:#d68910,color:#fff
    style RESULT_LOW fill:#2ecc71,stroke:#27ae60,color:#fff
    style USER_ACTION_1 fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style REPORT_PAGE fill:#e74c3c,stroke:#c0392b,color:#fff
    style REPORT_FILL fill:#ff6b6b,stroke:#ee5a52,color:#fff
    style REPORT_SUBMIT fill:#e74c3c,stroke:#c0392b,color:#fff
    style REPORT_CONFIRM fill:#2ecc71,stroke:#27ae60,color:#fff
    style ADMIN_LOGIN fill:#9b5de5,stroke:#7c3aed,color:#fff
    style ADMIN_CREDS fill:#c084fc,stroke:#a855f7,color:#1a1a2e
    style ADMIN_AUTH fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style ADMIN_FAIL fill:#e74c3c,stroke:#c0392b,color:#fff
    style ADMIN_DASH fill:#2ecc71,stroke:#27ae60,color:#fff
    style ADMIN_VIEW fill:#9b5de5,stroke:#7c3aed,color:#fff
```

---

## 3. Job Seeker's Experience — Step-by-Step Sequence

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'actorBkg': '#4361ee', 'actorTextColor': '#fff', 'actorLineColor': '#4361ee', 'signalColor': '#2d3436', 'signalTextColor': '#2d3436', 'noteBkgColor': '#e8f0fe', 'noteTextColor': '#2d3436', 'activationBkgColor': '#e6fcf5', 'activationBorderColor': '#2ec4b6', 'background': '#ffffff'}}}%%
sequenceDiagram
    actor JobSeeker as 🧑‍💼 Job Seeker
    participant Browser as 🌐 Web Browser
    participant HomePage as 🏠 Home Page
    participant ScanPage as 🔍 Scan Page
    participant Server as ⚙️ Backend Server
    participant RiskEngine as 🧠 Risk Engine
    participant Database as 💾 Database
    participant ResultPage as 📊 Result Page

    Note over JobSeeker: A student receives a suspicious job offer via email

    JobSeeker->>Browser: Opens ScamGuard website
    Browser->>HomePage: Loads index.html
    HomePage-->>JobSeeker: Sees welcome page with "Scan a Job" button

    JobSeeker->>HomePage: Clicks "Start Scanning"
    HomePage->>ScanPage: Navigates to scan.html

    Note over JobSeeker,ScanPage: Job Seeker fills in the job posting details

    JobSeeker->>ScanPage: Enters Job Title
    JobSeeker->>ScanPage: Enters Company Name
    JobSeeker->>ScanPage: Enters Contact Email
    JobSeeker->>ScanPage: Enters Salary Offered
    JobSeeker->>ScanPage: Enters Job Description
    JobSeeker->>ScanPage: Selects "Payment Required? Yes/No"
    JobSeeker->>ScanPage: Clicks "Analyze This Job"

    ScanPage->>ScanPage: Stores form data in sessionStorage
    ScanPage->>Server: POST /api/scan (sends JSON data)

    Server->>RiskEngine: Passes job data for analysis
    Note over RiskEngine: Checks payment, email domain,<br/>keywords, salary level
    RiskEngine-->>Server: Returns risk level & score

    Server->>Database: Saves scan record to job_scans[]
    Database-->>Server: Write confirmed
    Server-->>ScanPage: Returns risk result

    ScanPage->>ScanPage: Stores result in sessionStorage
    ScanPage->>ResultPage: Redirects to result.html

    ResultPage-->>JobSeeker: Displays risk level with visual indicators

    Note over JobSeeker: Job Seeker now knows if the job is safe or a scam!

    alt HIGH RISK — Score ≥ 40
        ResultPage-->>JobSeeker: 🔴 Shows RED warning — "Likely a Scam!"
    else MEDIUM RISK — Score 20-39
        ResultPage-->>JobSeeker: 🟡 Shows YELLOW caution — "Be Careful"
    else LOW RISK — Score < 20
        ResultPage-->>JobSeeker: 🟢 Shows GREEN — "Appears Legitimate"
    end
```

---

## 4. Scam Reporter's Experience — Step-by-Step Sequence

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'actorBkg': '#e74c3c', 'actorTextColor': '#fff', 'actorLineColor': '#e74c3c', 'signalColor': '#2d3436', 'signalTextColor': '#2d3436', 'noteBkgColor': '#fce4ec', 'noteTextColor': '#2d3436', 'activationBkgColor': '#fff3e0', 'activationBorderColor': '#ff9f43', 'background': '#ffffff'}}}%%
sequenceDiagram
    actor Reporter as 🧑‍🏫 Scam Reporter
    participant Browser as 🌐 Web Browser
    participant HomePage as 🏠 Home Page
    participant ReportPage as 📝 Report Page
    participant Server as ⚙️ Backend Server
    participant Database as 💾 Database

    Note over Reporter: A person was targeted by a fake job offer<br/>and wants to warn others

    Reporter->>Browser: Opens ScamGuard website
    Browser->>HomePage: Loads index.html
    HomePage-->>Reporter: Sees "Report a Scam" option

    Reporter->>HomePage: Clicks "Report a Scam"
    HomePage->>ReportPage: Navigates to report.html

    Note over Reporter,ReportPage: Reporter fills in scam details

    Reporter->>ReportPage: Enters their Name
    Reporter->>ReportPage: Enters their Email
    Reporter->>ReportPage: Describes the scam they encountered
    Reporter->>ReportPage: Clicks "Submit Report"

    ReportPage->>Server: POST /api/report (sends JSON data)
    Server->>Database: Saves report to scam_reports[] with status "pending"
    Database-->>Server: Write confirmed
    Server-->>ReportPage: Returns success confirmation

    ReportPage-->>Reporter: ✅ "Report submitted successfully!"

    Note over Reporter: The report is now saved and<br/>will be reviewed by an admin
```

---

## 5. Admin's Experience — Step-by-Step Sequence

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'actorBkg': '#9b5de5', 'actorTextColor': '#fff', 'actorLineColor': '#9b5de5', 'signalColor': '#2d3436', 'signalTextColor': '#2d3436', 'noteBkgColor': '#f3e8ff', 'noteTextColor': '#2d3436', 'activationBkgColor': '#f3e8ff', 'activationBorderColor': '#9b5de5', 'background': '#ffffff'}}}%%
sequenceDiagram
    actor Admin as 🛡️ Administrator
    participant LoginPage as 🔐 Login Page
    participant Server as ⚙️ Backend Server
    participant Database as 💾 Database
    participant Dashboard as 📋 Admin Dashboard

    Note over Admin: Admin wants to review scam activity

    Admin->>LoginPage: Opens admin-login.html
    LoginPage-->>Admin: Shows login form

    Admin->>LoginPage: Enters Username
    Admin->>LoginPage: Enters Password
    Admin->>LoginPage: Clicks "Login"

    LoginPage->>Server: POST /api/admin/login

    alt Invalid Credentials
        Server-->>LoginPage: ❌ "Invalid username or password"
        LoginPage-->>Admin: Shows error, asks to retry
    else Valid Credentials
        Server-->>LoginPage: ✅ "Login successful"
        LoginPage->>LoginPage: Saves session to sessionStorage
        LoginPage->>Dashboard: Redirects to admin.html
    end

    Note over Admin,Dashboard: Admin is now on the Dashboard

    Dashboard->>Server: GET /api/scans
    Server->>Database: Reads all job_scans[]
    Database-->>Server: Returns scan records
    Server-->>Dashboard: JSON array of all scans

    Dashboard->>Server: GET /api/reports
    Server->>Database: Reads all scam_reports[]
    Database-->>Server: Returns report records
    Server-->>Dashboard: JSON array of all reports

    Dashboard-->>Admin: Displays tables showing:<br/>• All job scans with risk levels<br/>• All scam reports with status<br/>• Summary statistics

    Note over Admin: Admin can monitor scam trends<br/>and review reported scams
```

---

## 6. How the System Works — Human-Centered Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#4361ee', 'primaryTextColor': '#fff', 'lineColor': '#6c757d', 'background': '#ffffff'}}}%%
graph TB
    subgraph HUMANS["👥 HUMAN USERS"]
        direction LR
        U1["🧑‍💼 Job Seeker\n(Student / Applicant)"]
        U2["🧑‍🏫 Scam Reporter\n(Scam Victim)"]
        U3["🛡️ Administrator\n(System Manager)"]
    end

    subgraph BROWSER["🌐 WEB BROWSER — What Humans See"]
        direction LR
        P1["🏠 Home Page\nWelcome & Navigation"]
        P2["🔍 Scan Page\nJob Details Form"]
        P3["📊 Result Page\nRisk Level Display"]
        P4["📝 Report Page\nScam Report Form"]
        P5["🔐 Login Page\nAdmin Authentication"]
        P6["📋 Dashboard\nAdmin Control Panel"]
    end

    subgraph SERVER["⚙️ BACKEND SERVER — Hidden from Humans"]
        direction LR
        S1["🟢 Express.js\nHandles Requests"]
        S2["🧠 Risk Engine\nAnalyzes Job Data"]
        S3["🔒 Auth System\nVerifies Admin Login"]
    end

    subgraph DATABASE["💾 DATABASE — Stores Everything"]
        direction LR
        D1["📋 Job Scans\nAll analyzed jobs"]
        D2["📋 Scam Reports\nAll reported scams"]
        D3["👤 Admin Users\nLogin credentials"]
    end

    U1 -- "Opens browser,\nfills forms,\nreads results" --> P1 & P2 & P3
    U2 -- "Opens browser,\nsubmits report" --> P1 & P4
    U3 -- "Logs in,\nreviews data" --> P5 & P6

    P2 -- "Sends job data\nfor analysis" --> S1
    P4 -- "Sends scam report" --> S1
    P5 -- "Sends login\ncredentials" --> S3

    S1 --> S2
    S1 --> S3

    S1 -- "Saves & retrieves\nrecords" --> D1 & D2
    S3 -- "Verifies admin\ncredentials" --> D3

    S1 -- "Returns risk result" --> P3
    S1 -- "Returns confirmation" --> P4
    S3 -- "Returns auth status" --> P5
    S1 -- "Returns all records" --> P6

    style HUMANS fill:#f8f9fa,stroke:#dee2e6,stroke-width:3px,color:#1a1a2e
    style BROWSER fill:#e8f0fe,stroke:#4361ee,stroke-width:2px,color:#1a1a2e
    style SERVER fill:#e6fcf5,stroke:#2ec4b6,stroke-width:2px,color:#1a1a2e
    style DATABASE fill:#f3e8ff,stroke:#9b5de5,stroke-width:2px,color:#1a1a2e
    style U1 fill:#4361ee,stroke:#3250d3,color:#fff
    style U2 fill:#e74c3c,stroke:#c0392b,color:#fff
    style U3 fill:#9b5de5,stroke:#7c3aed,color:#fff
    style P1 fill:#4361ee,stroke:#3250d3,color:#fff
    style P2 fill:#3a86ff,stroke:#2e6ed9,color:#fff
    style P3 fill:#ff9f43,stroke:#ee5a24,color:#fff
    style P4 fill:#e74c3c,stroke:#c0392b,color:#fff
    style P5 fill:#6c757d,stroke:#545b62,color:#fff
    style P6 fill:#2ecc71,stroke:#27ae60,color:#fff
    style S1 fill:#2ec4b6,stroke:#1ea898,color:#fff
    style S2 fill:#38d9a9,stroke:#20c997,color:#1a1a2e
    style S3 fill:#38d9a9,stroke:#20c997,color:#1a1a2e
    style D1 fill:#9b5de5,stroke:#7c3aed,color:#fff
    style D2 fill:#c084fc,stroke:#a855f7,color:#1a1a2e
    style D3 fill:#c084fc,stroke:#a855f7,color:#1a1a2e
```

---

## 7. Risk Analysis — How the System Protects Humans

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#4361ee', 'primaryTextColor': '#1a1a2e', 'lineColor': '#6c757d', 'background': '#ffffff'}}}%%
graph TD
    HUMAN["🧑‍💼 Job Seeker submits\na suspicious job posting"] --> INPUT["📥 Job Posting Data\nTitle, Company, Email,\nSalary, Description"]

    INPUT --> CHECK1{"💰 Does the job\nrequire PAYMENT\nfrom applicant?"}
    CHECK1 -- "Yes → +50 points\n🚩 Major red flag!" --> SCORE["📊 Risk Score\nAccumulator"]
    CHECK1 -- "No → +0 points" --> CHECK2

    CHECK2{"📧 Is the contact\nemail from a FREE\nprovider?\ngmail, yahoo, etc."} 
    CHECK2 -- "Yes → +20 points\n⚠️ Unprofessional" --> SCORE
    CHECK2 -- "No → +0 points" --> CHECK3

    CHECK3{"🔑 Does the description\ncontain SUSPICIOUS\nkeywords?\neasy money, guaranteed\nincome, no experience..."}
    CHECK3 -- "Found → +5 pts each\n⚠️ Common scam phrases" --> SCORE
    CHECK3 -- "None found" --> CHECK4

    CHECK4{"💵 Is the salary\nUNREALISTICALLY HIGH\nfor an entry-level job?\n> $100K for entry-level"}
    CHECK4 -- "Yes → +15 points\n⚠️ Too good to be true" --> SCORE
    CHECK4 -- "No → +0 points" --> SCORE

    SCORE --> FINAL{"📊 What is the\nfinal risk score?"}

    FINAL -- "Score ≥ 40" --> HIGH["🔴 HIGH RISK\n'This job is likely a SCAM'\nThe human is WARNED\nnot to proceed"]
    FINAL -- "Score 20–39" --> MED["🟡 MEDIUM RISK\n'This job is suspicious'\nThe human should\nproceed with CAUTION"]
    FINAL -- "Score < 20" --> LOW["🟢 LOW RISK\n'This job appears safe'\nThe human can proceed\nwith reasonable confidence"]

    HIGH --> PROTECT["🛡️ Human is protected\nfrom potential fraud"]
    MED --> PROTECT
    LOW --> PROTECT

    style HUMAN fill:#4361ee,stroke:#3250d3,color:#fff
    style INPUT fill:#4361ee,stroke:#3250d3,color:#fff
    style CHECK1 fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style CHECK2 fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style CHECK3 fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style CHECK4 fill:#ffeaa7,stroke:#fdcb6e,color:#2d3436
    style SCORE fill:#ff9f43,stroke:#ee5a24,color:#fff
    style FINAL fill:#ff9f43,stroke:#ee5a24,color:#fff
    style HIGH fill:#e74c3c,stroke:#c0392b,color:#fff
    style MED fill:#f39c12,stroke:#d68910,color:#fff
    style LOW fill:#2ecc71,stroke:#27ae60,color:#fff
    style PROTECT fill:#4361ee,stroke:#3250d3,color:#fff
```

---

## 8. Data Flow — What Gets Stored About Human Activity

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#9b5de5', 'primaryTextColor': '#fff', 'lineColor': '#6c757d', 'background': '#ffffff'}}}%%
erDiagram
    JOB_SEEKER ||--o{ JOB_SCANS : "submits job for scanning"
    SCAM_REPORTER ||--o{ SCAM_REPORTS : "reports a scam"
    ADMIN_USERS ||--o{ JOB_SCANS : "reviews scan records"
    ADMIN_USERS ||--o{ SCAM_REPORTS : "reviews reported scams"

    JOB_SCANS {
        int id PK "Auto-increment"
        varchar job_title "Job title entered by user"
        varchar company_name "Company name entered by user"
        varchar contact_email "Email entered by user"
        varchar salary_offered "Salary entered by user"
        text job_description "Description entered by user"
        varchar payment_required "yes or no — selected by user"
        varchar risk_level "low / medium / high — calculated by system"
        int risk_score "0-100 — calculated by system"
        datetime created_at "When the human submitted the scan"
    }

    SCAM_REPORTS {
        int id PK "Auto-increment"
        varchar reporter_name "Name of the human who reported"
        varchar reporter_email "Email of the human who reported"
        text scam_description "Human's description of the scam"
        varchar status "pending / reviewed / resolved"
        datetime created_at "When the human submitted the report"
    }

    ADMIN_USERS {
        int id PK "Auto-increment"
        varchar username "Admin login username"
        varchar password_hash "Secured password"
        datetime created_at "When admin account was created"
    }
```

---

## 9. Page Navigation — Human's Path Through the Website

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#4361ee', 'primaryTextColor': '#fff', 'lineColor': '#4361ee', 'background': '#ffffff'}}}%%
graph TD
    USER(("🧑 Human User\nOpens Website")) --> HOME

    HOME["🏠 HOME PAGE\nindex.html\n\nUser sees welcome message,\nfeatures, and navigation options"]

    HOME -- "👤 User clicks\n'Start Scanning'" --> SCAN
    HOME -- "👤 User clicks\n'Report Scam'" --> REPORT
    HOME -- "👤 User clicks\n'Admin Login'" --> LOGIN

    SCAN["🔍 SCAN PAGE\nscan.html\n\nUser fills in job details\nand submits for analysis"]

    SCAN -- "👤 User submits form\n→ sees results" --> RESULT

    RESULT["📊 RESULT PAGE\nresult.html\n\nUser sees risk level:\n🔴 High / 🟡 Medium / 🟢 Low"]

    RESULT -- "👤 User clicks\n'Scan Another'" --> SCAN
    RESULT -- "👤 User clicks\n'Report This Job'" --> REPORT

    REPORT["📝 REPORT PAGE\nreport.html\n\nUser fills scam details\nand submits report"]

    LOGIN["🔐 ADMIN LOGIN\nadmin-login.html\n\nAdmin enters credentials"]

    LOGIN -- "✅ Login Success" --> DASHBOARD
    LOGIN -- "❌ Login Failed\n→ Try Again" --> LOGIN

    DASHBOARD["📋 ADMIN DASHBOARD\nadmin.html\n\nAdmin views all scans\nand all reports"]

    style USER fill:#4361ee,stroke:#3250d3,color:#fff
    style HOME fill:#4361ee,stroke:#3250d3,color:#fff
    style SCAN fill:#3a86ff,stroke:#2e6ed9,color:#fff
    style RESULT fill:#ff9f43,stroke:#ee5a24,color:#fff
    style REPORT fill:#e74c3c,stroke:#c0392b,color:#fff
    style LOGIN fill:#6c757d,stroke:#545b62,color:#fff
    style DASHBOARD fill:#2ecc71,stroke:#27ae60,color:#fff
```

---

## 10. Technology Stack — What Powers the Human Experience

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#4361ee', 'primaryTextColor': '#1a1a2e', 'lineColor': '#6c757d', 'background': '#ffffff'}}}%%
graph TB
    subgraph HUMAN_LAYER["👤 HUMAN INTERACTION LAYER — What Users See & Touch"]
        HTML5["HTML5\nPage structure & forms\nthat humans interact with"]
        CSS3["CSS3\nVisual design, colors,\nanimations that humans see"]
        JS["JavaScript\nButton clicks, form validation,\npage navigation for humans"]
    end

    subgraph PROCESSING_LAYER["⚙️ PROCESSING LAYER — Works Behind the Scenes"]
        NODE["Node.js v14+\nRuns the server"]
        EXPRESS["Express.js v4.18.2\nHandles requests from browsers"]
        CORS_LIB["CORS v2.8.5\nAllows mobile access"]
    end

    subgraph STORAGE_LAYER["💾 STORAGE LAYER — Remembers Human Activity"]
        LOWDB["LowDB v1.0.0\nJSON file database"]
        JSON["scamguard.json\nStores all scans & reports"]
    end

    subgraph ACCESS_LAYER["🌍 ACCESS LAYER — How Humans Reach the App"]
        LOCAL["💻 localhost:3000\nDeveloper access"]
        LAN["📱 LAN / WiFi\nMobile access on same network"]
        NGROK["🌐 Ngrok Tunnel\nPublic access from anywhere"]
        RENDER["☁️ Render / Railway\nCloud deployment"]
    end

    HTML5 & CSS3 & JS --> EXPRESS
    NODE --> EXPRESS
    EXPRESS --> CORS_LIB
    EXPRESS --> LOWDB
    LOWDB --> JSON
    EXPRESS --> LOCAL & LAN & NGROK & RENDER

    style HUMAN_LAYER fill:#e8f0fe,stroke:#4361ee,stroke-width:2px,color:#1a1a2e
    style PROCESSING_LAYER fill:#e6fcf5,stroke:#2ec4b6,stroke-width:2px,color:#1a1a2e
    style STORAGE_LAYER fill:#f3e8ff,stroke:#9b5de5,stroke-width:2px,color:#1a1a2e
    style ACCESS_LAYER fill:#fff3e0,stroke:#ff9f43,stroke-width:2px,color:#1a1a2e
    style HTML5 fill:#e74c3c,stroke:#c0392b,color:#fff
    style CSS3 fill:#3498db,stroke:#2980b9,color:#fff
    style JS fill:#f1c40f,stroke:#d4ac0f,color:#2d3436
    style NODE fill:#68a063,stroke:#4e8a4e,color:#fff
    style EXPRESS fill:#2ec4b6,stroke:#1ea898,color:#fff
    style CORS_LIB fill:#38d9a9,stroke:#20c997,color:#1a1a2e
    style LOWDB fill:#9b5de5,stroke:#7c3aed,color:#fff
    style JSON fill:#c084fc,stroke:#a855f7,color:#1a1a2e
    style LOCAL fill:#ff9f43,stroke:#ee5a24,color:#fff
    style LAN fill:#ff9f43,stroke:#ee5a24,color:#fff
    style NGROK fill:#ff9f43,stroke:#ee5a24,color:#fff
    style RENDER fill:#ff9f43,stroke:#ee5a24,color:#fff
```
