/**
 * Job Scam Detection & Reporting System - Backend API
 * Express server with LowDB (JSON file database)
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for deployment behind reverse proxy (Render, Railway, etc.)
app.set('trust proxy', 1);

// Database setup
const dbPath = path.join(__dirname, 'database', 'scamguard.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Initialize database with default values
db.defaults({
    job_scans: [],
    scam_reports: [],
    admin_users: []
}).write();

// Middleware
app.use(cors({
    origin: true, // Allow all origins for mobile access
    credentials: true
}));
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// Calculate risk level (same logic as frontend)
function calculateRiskLevel(data) {
    let riskScore = 0;

    if (data.paymentRequired === 'yes') riskScore += 50;

    const emailDomain = data.contactEmail.split('@')[1]?.toLowerCase();
    const suspiciousDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    if (suspiciousDomains.includes(emailDomain)) riskScore += 20;

    const suspiciousKeywords = [
        'work from home', 'make money fast', 'no experience needed',
        'guaranteed income', 'easy money', 'upfront payment',
        'registration fee', 'processing fee'
    ];
    const descriptionLower = (data.jobDescription || '').toLowerCase();
    suspiciousKeywords.forEach(keyword => {
        if (descriptionLower.includes(keyword)) riskScore += 5;
    });

    const salaryMatch = (data.salaryOffered || '').match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (salaryMatch) {
        const salaryNum = parseFloat(salaryMatch[1].replace(/,/g, ''));
        if (salaryNum > 100000 && descriptionLower.includes('entry')) riskScore += 15;
    }

    if (riskScore >= 40) return { level: 'high', score: riskScore };
    if (riskScore >= 20) return { level: 'medium', score: riskScore };
    return { level: 'low', score: riskScore };
}

// API Routes

// Submit job scan
app.post('/api/scan', (req, res) => {
    try {
        const { jobTitle, companyName, contactEmail, salaryOffered, jobDescription, paymentRequired } = req.body;

        if (!jobTitle || !companyName || !contactEmail || !jobDescription || !paymentRequired) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const risk = calculateRiskLevel(req.body);

        const newScan = {
            id: db.get('job_scans').size().value() > 0 
                ? Math.max(...db.get('job_scans').map('id').value()) + 1 
                : 1,
            job_title: jobTitle,
            company_name: companyName,
            contact_email: contactEmail,
            salary_offered: salaryOffered || '',
            job_description: jobDescription,
            payment_required: paymentRequired,
            risk_level: risk.level,
            risk_score: risk.score,
            created_at: new Date().toISOString()
        };

        db.get('job_scans').push(newScan).write();

        res.json({
            success: true,
            scanId: newScan.id,
            riskLevel: risk.level,
            riskScore: risk.score
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save scan' });
    }
});

// Submit scam report
app.post('/api/report', (req, res) => {
    try {
        const { reporterName, reporterEmail, scamDescription } = req.body;

        if (!reporterName || !reporterEmail || !scamDescription) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newReport = {
            id: db.get('scam_reports').size().value() > 0 
                ? Math.max(...db.get('scam_reports').map('id').value()) + 1 
                : 1,
            reporter_name: reporterName,
            reporter_email: reporterEmail,
            scam_description: scamDescription,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        db.get('scam_reports').push(newReport).write();

        res.json({
            success: true,
            reportId: newReport.id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save report' });
    }
});


// Simple authentication middleware (for demo - use proper auth in production)
const requireAuth = (req, res, next) => {
    // In production, use proper session management or JWT tokens
    // For now, we'll use a simple check - in real app, verify session/token
    next();
};

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Default admin credentials (change these in production!)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.json({ 
            success: true, 
            message: 'Login successful',
            username: username
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid username or password' 
        });
    }
});

// Protected routes - require authentication
app.get('/api/scans', requireAuth, (req, res) => {
    try {
        const scans = db.get('job_scans')
            .sortBy('created_at')
            .reverse()
            .value();
        res.json(scans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch scans' });
    }
});

app.get('/api/reports', requireAuth, (req, res) => {
    try {
        const reports = db.get('scam_reports')
            .sortBy('created_at')
            .reverse()
            .value();
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

// Start server
const server = app.listen(PORT, () => {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    let localIP = 'localhost';
    
    // Find local IP address for mobile access
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const iface of interfaces) {
            if (iface.family === 'IPv4' && !iface.internal) {
                if (iface.address.startsWith('192.168.') || 
                    iface.address.startsWith('10.') || 
                    iface.address.startsWith('172.')) {
                    localIP = iface.address;
                    break;
                }
            }
        }
        if (localIP !== 'localhost') break;
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Server is running!');
    console.log('='.repeat(50));
    console.log(`\n💻 Local access:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`\n📱 Mobile access (same WiFi):`);
    console.log(`   http://${localIP}:${PORT}`);
    console.log(`\n🔐 Admin Dashboard:`);
    console.log(`   http://${localIP}:${PORT}/admin-login.html`);
    console.log(`\n⚠️  For public access (any network):`);
    console.log(`   Run: ngrok http ${PORT}`);
    console.log('='.repeat(50) + '\n');
});

// Handle port already in use error
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use!`);
        console.log('\nSolutions:');
        console.log('1. Stop the existing server (Ctrl+C in the terminal running it)');
        console.log('2. Or run: Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process');
        console.log(`3. Or change PORT in server.js to a different number (e.g., 3001)\n`);
        process.exit(1);
    } else {
        throw err;
    }
});
