# 📱 Mobile Access Guide

## Problem: App Not Opening on Mobile Phone?

### ❌ Common Mistakes:
1. Using `localhost:3000` - This ONLY works on your computer!
2. Phone on different WiFi network
3. Windows Firewall blocking the connection

---

## ✅ Solution 1: Same WiFi Network (Free)

### Step 1: Find Your Computer's IP Address

**Option A: Use the script**
```bash
.\get-mobile-url.bat
```

**Option B: Manual method**
1. Open PowerShell or Command Prompt
2. Run: `ipconfig`
3. Look for "IPv4 Address" under your WiFi adapter
4. Example: `192.168.1.5`

### Step 2: Start Your Server
```bash
npm start
```

The server will automatically show your mobile URL:
```
📱 Mobile access (same WiFi):
   http://192.168.1.5:3000
```

### Step 3: Allow Windows Firewall

**Method 1: Through Windows Settings**
1. Open **Windows Security** → **Firewall & network protection**
2. Click **Allow an app through firewall**
3. Find **Node.js** → Check both **Private** and **Public**
4. Click **OK**

**Method 2: Command Line (Faster)**
```powershell
netsh advfirewall firewall add rule name="Node.js Server" dir=in action=allow protocol=TCP localport=3000
```

### Step 4: Open on Your Phone
1. Make sure your phone is on the **SAME WiFi network**
2. Open browser on phone
3. Type: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.5:3000`
4. ✅ Should work!

---

## ✅ Solution 2: Public URL (Works from Anywhere)

### Use ngrok - Works on Any Network!

1. **Download ngrok:**
   - Go to: https://ngrok.com/download
   - Download for Windows
   - Extract `ngrok.exe` to your project folder

2. **Start your server:**
   ```bash
   npm start
   ```

3. **Run ngrok** (in a new terminal):
   ```bash
   ngrok http 3000
   ```

4. **Copy the URL** ngrok shows:
   ```
   Forwarding  https://abc123-xyz.ngrok-free.app -> http://localhost:3000
   ```

5. **Open on your phone:**
   - Use: `https://abc123-xyz.ngrok-free.app`
   - Works on **any network** (WiFi, mobile data, etc.)

---

## 🔧 Troubleshooting

### Still Not Working?

1. **Check server is running:**
   - You should see: `Server running at http://localhost:3000`

2. **Check IP address:**
   - Run: `ipconfig` and verify the IP

3. **Check firewall:**
   - Temporarily disable Windows Firewall to test
   - If it works, re-enable and add the rule above

4. **Check WiFi network:**
   - Phone and computer must be on the SAME WiFi
   - Some public WiFi blocks device-to-device connections

5. **Try ngrok instead:**
   - ngrok works from anywhere, no WiFi needed!

---

## 📋 Quick Checklist

- [ ] Server is running (`npm start`)
- [ ] Found correct IP address (`ipconfig`)
- [ ] Using IP address, NOT localhost
- [ ] Phone on same WiFi network
- [ ] Windows Firewall allows port 3000
- [ ] Opened `http://IP:3000` on phone browser

---

## 🚀 Recommended: Use ngrok

**Why ngrok is better:**
- ✅ Works from anywhere (not just same WiFi)
- ✅ Works on mobile data
- ✅ No firewall configuration needed
- ✅ Get a public URL instantly

**Quick start:**
1. Download ngrok
2. Run: `npm start` (Terminal 1)
3. Run: `ngrok http 3000` (Terminal 2)
4. Copy the ngrok URL to your phone

---

Need help? Check the server console - it shows your mobile URL automatically!
