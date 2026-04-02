# 🌐 Public URL Guide - Access from Anywhere (No Same WiFi Needed)

## Quick Setup - Get Public URL in 2 Minutes

### Step 1: Download ngrok
1. Go to: **https://ngrok.com/download**
2. Click **"Download for Windows"**
3. Extract `ngrok.exe` to your project folder (same folder as `server.js`)

### Step 2: Sign Up (Free)
1. Go to: **https://dashboard.ngrok.com/signup**
2. Sign up with email or GitHub (free account)
3. Copy your **authtoken** from the dashboard

### Step 3: Configure ngrok
Open PowerShell/Command Prompt in your project folder and run:
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```
(Replace `YOUR_AUTHTOKEN_HERE` with your actual token)

### Step 4: Start Everything
**Option A: Use the script**
Double-click `start-ngrok.bat`

**Option B: Manual**
1. Terminal 1: `npm start`
2. Terminal 2: `ngrok http 3000`

### Step 5: Get Your Public URL
ngrok will show something like:
```
Forwarding  https://abc123-xyz.ngrok-free.app -> http://localhost:3000
```

**Copy this URL**: `https://abc123-xyz.ngrok-free.app`

### Step 6: Use on Your Phone
- Open this URL on your phone browser
- Works on **any WiFi** or **mobile data**
- Works from **anywhere in the world**!

---

## ⚠️ Important Notes

1. **Keep both running:**
   - Keep `npm start` running
   - Keep `ngrok http 3000` running
   - If you close either, the URL stops working

2. **Free ngrok limitations:**
   - URL changes each time you restart ngrok
   - Some connection limits (but fine for testing)

3. **For permanent URL:**
   - Upgrade ngrok account (paid)
   - Or deploy to Render/Railway (see DEPLOY.md)

---

## 🚀 Quick Start Script

I've created `start-ngrok.bat` - just double-click it!

It will:
1. Check if ngrok is installed
2. Start your server
3. Start ngrok tunnel
4. Show you the public URL

---

## 📱 Testing

1. Start server + ngrok
2. Copy the ngrok URL
3. Open on your phone (any network!)
4. ✅ Should work!

---

## 🔧 Troubleshooting

**"ngrok not found"**
- Make sure `ngrok.exe` is in your project folder
- Or add ngrok to your PATH

**"authtoken required"**
- Sign up at https://dashboard.ngrok.com
- Run: `ngrok config add-authtoken YOUR_TOKEN`

**URL not working**
- Make sure server is running (`npm start`)
- Make sure ngrok is running
- Check both terminals are open

---

## 🎯 Summary

**For access WITHOUT same WiFi:**
- ✅ Use **ngrok** (creates public URL)
- ✅ Works from anywhere
- ✅ Free and easy
- ✅ Takes 2 minutes to set up

**Steps:**
1. Download ngrok
2. Sign up and get authtoken
3. Run: `ngrok config add-authtoken YOUR_TOKEN`
4. Run: `npm start` (Terminal 1)
5. Run: `ngrok http 3000` (Terminal 2)
6. Copy the URL and use on your phone!
