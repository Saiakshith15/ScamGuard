# Job Scam Detection & Reporting System

A responsive web application to detect and report job scams, with a SQLite database backend.

## Database Schema

The system uses three main tables:

| Table | Purpose |
|-------|---------|
| `job_scans` | Stores job posting scan results (title, company, email, risk level, etc.) |
| `scam_reports` | Stores user-submitted scam reports |
| `admin_users` | Admin login credentials (placeholder for future auth) |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Initialize database (optional)

The database is created automatically when the server starts. To manually initialize:

```bash
npm run init-db
```

### 3. Start the server

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

- **Without server**: Open `index.html` directly in a browser. Scans and reports use `localStorage`/`sessionStorage`.
- **With server**: Run `npm start` and visit `http://localhost:3000`. Data is stored in the SQLite database.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scan` | Submit job scan, returns risk level |
| POST | `/api/report` | Submit scam report |
| GET | `/api/scans` | List all scans (admin) |
| GET | `/api/reports` | List all reports (admin) |
| POST | `/api/admin/login` | Admin login (placeholder) |

## Viewing the Database

There are **three ways** to view the database:

### 1. Admin Dashboard (Recommended)
1. Start the server: `npm start`
2. Open `http://localhost:3000/admin.html` in your browser
3. View all scans and reports in a user-friendly interface
4. Click "Refresh" to reload data

### 2. Direct JSON File
Open `database/scamguard.json` in any text editor to view the raw database data.

### 3. API Endpoints
Use these endpoints to fetch data programmatically:
- `GET http://localhost:3000/api/scans` - Get all job scans
- `GET http://localhost:3000/api/reports` - Get all scam reports

## Database Location

JSON database file: `database/scamguard.json`

The database uses LowDB, a lightweight JSON file database that doesn't require native compilation, making it perfect for Windows systems without Visual Studio Build Tools.
