// Admin Dashboard - Database Viewer
const API_BASE = window.location.origin;

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'admin-login.html';
        return;
    }

    // Show logged in user
    const username = sessionStorage.getItem('adminUsername');
    if (username) {
        const header = document.querySelector('.page-title');
        if (header) {
            header.innerHTML = `Admin Dashboard <small style="font-size: 0.6em; color: var(--text-secondary);">(Logged in as ${username})</small>`;
        }
    }
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content
            tabContents.forEach(c => c.classList.remove('active'));
            document.getElementById(targetTab + 'Tab').classList.add('active');
            
            // Load data for active tab
            if (targetTab === 'scans') {
                loadScans();
            } else if (targetTab === 'reports') {
                loadReports();
            }
        });
    });

    // Load initial data
    loadScans();
});

async function loadScans() {
    const container = document.getElementById('scansContainer');
    container.innerHTML = '<p class="loading">Loading scans...</p>';

    try {
        const res = await fetch(`${API_BASE}/api/scans`);
        if (!res.ok) throw new Error('Failed to fetch');
        const scans = await res.json();
        
        displayScans(scans);
    } catch (err) {
        container.innerHTML = `
            <div class="error-message">
                <p>⚠️ Could not load scans from API.</p>
                <p><small>Make sure the server is running (npm start).</small></p>
                <p><small>You can also view the database file directly: <code>database/scamguard.json</code></small></p>
            </div>
        `;
    }
}

function displayScans(scans) {
    const container = document.getElementById('scansContainer');
    const countEl = document.getElementById('scansCount');
    
    countEl.textContent = scans.length;

    if (scans.length === 0) {
        container.innerHTML = '<p class="empty-message">No scans found in database.</p>';
        return;
    }

    container.innerHTML = scans.map(scan => `
        <div class="data-card">
            <div class="data-card-header">
                <span class="risk-badge ${scan.risk_level}">${scan.risk_level.toUpperCase()}</span>
                <span class="data-date">${formatDate(scan.created_at)}</span>
            </div>
            <div class="data-card-body">
                <p><strong>Job Title:</strong> ${escapeHtml(scan.job_title)}</p>
                <p><strong>Company:</strong> ${escapeHtml(scan.company_name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(scan.contact_email)}</p>
                <p><strong>Salary:</strong> ${escapeHtml(scan.salary_offered || 'Not specified')}</p>
                <p><strong>Payment Required:</strong> ${scan.payment_required === 'yes' ? '⚠️ Yes' : 'No'}</p>
                <p><strong>Risk Score:</strong> ${scan.risk_score}</p>
                <details class="data-details">
                    <summary>Job Description</summary>
                    <p class="data-description">${escapeHtml(scan.job_description)}</p>
                </details>
            </div>
        </div>
    `).join('');
}

async function loadReports() {
    const container = document.getElementById('reportsContainer');
    container.innerHTML = '<p class="loading">Loading reports...</p>';

    try {
        const res = await fetch(`${API_BASE}/api/reports`);
        if (!res.ok) throw new Error('Failed to fetch');
        const reports = await res.json();
        
        displayReports(reports);
    } catch (err) {
        container.innerHTML = `
            <div class="error-message">
                <p>⚠️ Could not load reports from API.</p>
                <p><small>Make sure the server is running (npm start).</small></p>
                <p><small>You can also view the database file directly: <code>database/scamguard.json</code></small></p>
            </div>
        `;
    }
}

function displayReports(reports) {
    const container = document.getElementById('reportsContainer');
    const countEl = document.getElementById('reportsCount');
    
    countEl.textContent = reports.length;

    if (reports.length === 0) {
        container.innerHTML = '<p class="empty-message">No reports found in database.</p>';
        return;
    }

    container.innerHTML = reports.map(report => `
        <div class="data-card">
            <div class="data-card-header">
                <span class="status-badge ${report.status}">${report.status.toUpperCase()}</span>
                <span class="data-date">${formatDate(report.created_at)}</span>
            </div>
            <div class="data-card-body">
                <p><strong>Reporter:</strong> ${escapeHtml(report.reporter_name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(report.reporter_email)}</p>
                <details class="data-details">
                    <summary>Scam Description</summary>
                    <p class="data-description">${escapeHtml(report.scam_description)}</p>
                </details>
            </div>
        </div>
    `).join('');
}

function refreshScans() {
    loadScans();
}

function refreshReports() {
    loadReports();
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleString();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    window.location.href = 'admin-login.html';
}
