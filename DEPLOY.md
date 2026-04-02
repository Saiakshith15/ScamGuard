# Deployment Guide

## 📱 Mobile Access Guide

### Problem: App not opening on mobile phone?

**Common Issues:**
1. ❌ Using `localhost:3000` - This only works on your computer!
2. ❌ Phone on different WiFi network
3. ❌ Windows Firewall blocking port 3000

### Solution 1: Same WiFi Network (Free)

1. **Find your computer's IP address:**
   - Run: `.\get-mobile-url.bat` (or `.\get-mobile-url.ps1`)
   - Or manually: `ipconfig` → Look for "IPv4 Address"

2. **Use the IP address on your phone:**
   ```
   http://YOUR_IP:3000
   ```
   Example: `http://192.168.1.5:3000`

3. **Allow Windows Firewall:**
   - Windows Security → Firewall → Allow an app
   - Find "Node.js" → Check both Private & Public
   - Or run: `netsh advfirewall firewall add rule name="Node.js" dir=in action=allow protocol=TCP localport=3000`

4. **Make sure:**
   - ✅ Server is running (`npm start`)
   - ✅ Phone is on the SAME WiFi network
   - ✅ Using IP address, NOT localhost

### Solution 2: Public URL (Works from Anywhere)

**Use ngrok** - Creates a public URL that works from anywhere:

1. Download ngrok: https://ngrok.com/download
2. Start server: `npm start`
3. Run ngrok: `ngrok http 3000`
4. Copy the URL (e.g., `https://abc123.ngrok-free.app`)
5. Open that URL on your phone (works on any network!)

---

# Deployment Guide

## Quick Public URL (ngrok) - Easiest Method

### Step 1: Install ngrok
1. Go to https://ngrok.com/download
2. Download ngrok for Windows
3. Extract the `.exe` file to a folder (e.g., `C:\ngrok\`)

### Step 2: Start Your Server
```bash
npm start
```

### Step 3: Run ngrok
Open a **new terminal** and run:
```bash
ngrok http 3000
```

### Step 4: Get Your Public URL
ngrok will display something like:
```
Forwarding  https://abc123-xyz.ngrok-free.app -> http://localhost:3000
```

**Share this URL**: `https://abc123-xyz.ngrok-free.app`

⚠️ **Note**: The URL works only while both `npm start` and `ngrok` are running.

---

## Deploy to Render (Free Hosting)

### Step 1: Create Account
1. Go to https://render.com
2. Sign up with GitHub (recommended) or email

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository (or use "Public Git repository")
3. Paste your repository URL

### Step 3: Configure
- **Name**: `scamguard` (or any name)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### Step 4: Deploy
Click "Create Web Service"

You'll get a URL like: `https://scamguard.onrender.com`

---

## Deploy to Railway (Free Hosting)

### Step 1: Create Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway auto-detects Node.js and deploys

You'll get a URL like: `https://scamguard.up.railway.app`

---

## Deploy to Google Cloud Run

### Step 1: Install Google Cloud SDK
Download from: https://cloud.google.com/sdk/docs/install

### Step 2: Login
```bash
gcloud auth login
```

### Step 3: Set Project
```bash
gcloud config set project YOUR_PROJECT_ID
```

### Step 4: Deploy
```bash
gcloud run deploy scamguard --source . --region us-central1 --allow-unauthenticated
```

You'll get a URL like: `https://scamguard-xxxxx-uc.a.run.app`

---

## Environment Variables (if needed)

If you need to change the port or add config:
- Create `.env` file:
  ```
  PORT=3000
  NODE_ENV=production
  ```

---

## Which Method to Choose?

| Method | Speed | Cost | Best For |
|--------|-------|------|----------|
| **ngrok** | ⚡ Instant | Free | Testing, demos |
| **Render** | 🚀 5 min | Free | Permanent hosting |
| **Railway** | 🚀 5 min | Free | Permanent hosting |
| **Google Cloud** | 🐢 10 min | Pay-per-use | Production apps |

**Recommendation**: Use **ngrok** for quick testing, then deploy to **Render** for permanent hosting.
