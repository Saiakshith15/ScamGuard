# Quick Start Guide

## How to Run the Application

### Step 1: Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
Server running at http://localhost:3000
```

### Step 3: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

## Pages Available

- **Home**: `http://localhost:3000` or `http://localhost:3000/index.html`
- **Scan Job**: `http://localhost:3000/scan.html`
- **Report Scam**: `http://localhost:3000/report.html`
- **Admin Dashboard**: `http://localhost:3000/admin.html` (View database)

## 🌐 Access from Mobile Phone (Any Network)

### Quick Method: Use ngrok (Public URL)

**For access WITHOUT same WiFi:**

1. **Download ngrok:**
   - Go to: https://ngrok.com/download
   - Extract `ngrok.exe` to your project folder

2. **Sign up (free):**
   - Go to: https://dashboard.ngrok.com/signup
   - Copy your authtoken

3. **Configure:**
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```

4. **Start everything:**
   - Double-click `start-ngrok.bat`
   - Or manually:
     - Terminal 1: `npm start`
     - Terminal 2: `ngrok http 3000`

5. **Copy the URL** ngrok shows (e.g., `https://abc123.ngrok-free.app`)

6. **Open on your phone** - Works from anywhere!

See `PUBLIC-URL.md` for detailed instructions.

---

## Running Without Server (Frontend Only)

If you just want to test the frontend without the database:
1. Open `index.html` directly in your browser
2. Data will be stored in browser's localStorage (temporary)

## Troubleshooting

### Port Already in Use
If port 3000 is busy, change it in `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001 or any available port
```

### Dependencies Not Installing
Make sure you have Node.js installed:
- Download from: https://nodejs.org/
- Verify: `node --version` and `npm --version`

### Database Not Created
The database file (`database/scamguard.json`) is created automatically when you first start the server.
