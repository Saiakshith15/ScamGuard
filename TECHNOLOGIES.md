# Technologies Used - Job Scam Detection & Reporting System

## 1. Software Requirements

### Web Browser
- **Chrome, Edge, or Firefox** (any modern browser)
- Required for running the web application
- Supports modern JavaScript features and Fetch API

### Code Editor
- **VS Code** (Visual Studio Code) or similar editor
- Used for development and code editing
- Supports HTML, CSS, JavaScript, and Node.js

### Node.js Runtime
- **Node.js** (v14 or higher recommended)
- Required to run the backend server
- Download from: https://nodejs.org/

### npm (Node Package Manager)
- Comes with Node.js installation
- Used to install project dependencies

---

## 2. Technologies / Frameworks Used

### Frontend Technologies

#### HTML (HyperText Markup Language)
- **Purpose:** Structure and content of web pages
- **Files:** `index.html`, `scan.html`, `result.html`, `report.html`, `admin.html`, `admin-login.html`
- **Usage:** 
  - Semantic HTML5 elements
  - Form elements for user input
  - Navigation structure
  - Page layout and content organization

#### CSS (Cascading Style Sheets)
- **Purpose:** Styling and visual design
- **File:** `styles.css`
- **Features Used:**
  - CSS Variables (custom properties) for theming
  - Flexbox and Grid for layout
  - Responsive design with media queries
  - Custom animations and transitions
  - Mobile-first responsive approach

#### JavaScript (Vanilla JavaScript)
- **Purpose:** Client-side interactivity and logic
- **Files:** 
  - `cursor.js` - Custom animated cursor
  - `scan.js` - Job scan form handling
  - `result.js` - Display scan results
  - `report.js` - Scam report submission
  - `admin.js` - Admin dashboard functionality
  - `admin-login.js` - Admin authentication
- **Features Used:**
  - DOM manipulation
  - Event handling
  - Fetch API for API calls
  - SessionStorage and LocalStorage
  - Async/await for asynchronous operations

### Backend Technologies

#### Node.js
- **Purpose:** JavaScript runtime for server-side execution
- **Version:** Compatible with Node.js v14+
- **Usage:** Runs the Express.js server

#### Express.js
- **Purpose:** Web application framework for Node.js
- **Version:** ^4.18.2
- **Features Used:**
  - RESTful API endpoints
  - Middleware (CORS, JSON parsing, static file serving)
  - Route handling
  - Error handling

#### LowDB
- **Purpose:** Lightweight JSON database
- **Version:** ^1.0.0
- **Usage:** 
  - Stores job scans data
  - Stores scam reports
  - Stores admin user data
  - File-based storage (no separate database server needed)

#### CORS (Cross-Origin Resource Sharing)
- **Purpose:** Enable cross-origin requests
- **Version:** ^2.8.5
- **Usage:** Allows frontend to communicate with backend API

### API Handling

#### Fetch API
- **Purpose:** Make HTTP requests to backend API
- **Usage:**
  - POST requests for submitting scans and reports
  - GET requests for retrieving data
  - Handles JSON data exchange
  - Error handling for failed requests

#### RESTful API
- **Endpoints:**
  - `POST /api/scan` - Submit job scan
  - `POST /api/report` - Submit scam report
  - `GET /api/scans` - Get all scans (admin)
  - `GET /api/reports` - Get all reports (admin)
  - `POST /api/admin/login` - Admin authentication

### Database

#### LowDB (JSON File Database)
- **Purpose:** Store application data
- **File:** `database/scamguard.json`
- **Structure:**
  ```json
  {
    "job_scans": [],
    "scam_reports": [],
    "admin_users": []
  }
  ```
- **Advantages:**
  - No separate database server required
  - Easy to backup (just copy JSON file)
  - Works on Windows without native compilation
  - Perfect for small to medium applications

### Authentication

#### Session-Based Authentication
- **Method:** Browser sessionStorage
- **Purpose:** Admin login state management
- **Implementation:**
  - Login credentials stored in server
  - Session token stored in browser
  - Automatic logout on browser close

---

## 3. Why These Technologies Were Chosen

### HTML, CSS, JavaScript
- **Reason:** To build an interactive, responsive web-based job scam detection system
- **Benefits:**
  - No compilation needed
  - Works in all modern browsers
  - Fast development cycle
  - Easy to maintain and update

### Fetch API
- **Reason:** To retrieve and submit data dynamically without page reloads
- **Benefits:**
  - Modern, promise-based API
  - Built into browsers (no library needed)
  - Supports async/await syntax
  - Better error handling

### LowDB (JSON Database)
- **Reason:** To store user data and scan results without needing a separate database server
- **Benefits:**
  - No database installation required
  - Works on Windows without Visual Studio Build Tools
  - Simple file-based storage
  - Easy to backup and migrate
  - Perfect for small projects and demos

### Express.js
- **Reason:** To create RESTful API endpoints for the frontend
- **Benefits:**
  - Lightweight and fast
  - Large ecosystem and community
  - Easy routing and middleware
  - Perfect for Node.js applications

### Node.js
- **Reason:** To run JavaScript on the server side
- **Benefits:**
  - Same language for frontend and backend
  - Fast and efficient
  - Large package ecosystem (npm)
  - Cross-platform compatibility

---

## 4. Project Structure

```
dbms/
├── Frontend Files
│   ├── index.html          (Home page)
│   ├── scan.html           (Scan job page)
│   ├── result.html         (Results page)
│   ├── report.html         (Report scam page)
│   ├── admin.html          (Admin dashboard)
│   ├── admin-login.html    (Admin login)
│   ├── styles.css          (All styling)
│   └── *.js                (Client-side scripts)
│
├── Backend Files
│   ├── server.js           (Express server)
│   └── database/
│       ├── init.js          (Database initialization)
│       └── scamguard.json   (Database file)
│
├── Configuration
│   ├── package.json        (Dependencies)
│   └── .gitignore          (Git ignore rules)
│
└── Documentation
    ├── README.md
    ├── QUICKSTART.md
    ├── DEPLOY.md
    └── TECHNOLOGIES.md
```

---

## 5. Key Features Implemented

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Custom animated cursor
- ✅ Form validation
- ✅ Dynamic content loading
- ✅ Tab-based navigation
- ✅ Tooltips for form fields
- ✅ Risk level badges with colors
- ✅ Success/error messages

### Backend Features
- ✅ RESTful API endpoints
- ✅ JSON database storage
- ✅ Risk calculation algorithm
- ✅ Admin authentication
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling
- ✅ Automatic database initialization

### Security Features
- ✅ Admin login protection
- ✅ Session-based authentication
- ✅ Input validation
- ✅ CORS configuration
- ✅ SQL injection prevention (using parameterized queries equivalent)

---

## 6. Dependencies

### Production Dependencies
```json
{
  "lowdb": "^1.0.0",        // JSON database
  "cors": "^2.8.5",         // Cross-origin resource sharing
  "express": "^4.18.2"      // Web framework
}
```

### Development Dependencies
- None (pure JavaScript project)

---

## 7. Browser Compatibility

- ✅ Chrome/Edge (Chromium) - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support
- ✅ Mobile browsers - Responsive design supported

---

## 8. System Requirements

### Server Requirements
- Node.js v14 or higher
- npm (comes with Node.js)
- Windows/Linux/Mac OS

### Client Requirements
- Modern web browser
- JavaScript enabled
- Internet connection (for ngrok/public access)

---

## Summary

This project uses a **modern JavaScript stack** with:
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js + Express.js
- **Database:** LowDB (JSON file-based)
- **API:** RESTful API with Fetch API
- **Authentication:** Session-based admin login

**No Tomcat, Java, or traditional database servers required!**
