// Scan Page Form Handling
const API_BASE = window.location.origin;

document.addEventListener('DOMContentLoaded', function() {
    const scanForm = document.getElementById('scanForm');

    if (scanForm) {
        scanForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                jobTitle: document.getElementById('jobTitle').value,
                companyName: document.getElementById('companyName').value,
                contactEmail: document.getElementById('contactEmail').value,
                salaryOffered: document.getElementById('salaryOffered').value,
                jobDescription: document.getElementById('jobDescription').value,
                paymentRequired: document.querySelector('input[name="paymentRequired"]:checked').value
            };

            sessionStorage.setItem('scanData', JSON.stringify(formData));

            try {
                const res = await fetch(`${API_BASE}/api/scan`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (data.success) {
                    sessionStorage.setItem('riskLevel', data.riskLevel);
                    window.location.href = 'result.html';
                    return;
                }
            } catch (err) {
                console.log('API unavailable, using local calculation');
            }

            const riskLevel = calculateRiskLevel(formData);
            sessionStorage.setItem('riskLevel', riskLevel);
            window.location.href = 'result.html';
        });
    }
});

function calculateRiskLevel(data) {
    let riskScore = 0;

    // Check for payment requirement (major red flag)
    if (data.paymentRequired === 'yes') {
        riskScore += 50;
    }

    // Check email domain (free email services are suspicious for companies)
    const emailDomain = data.contactEmail.split('@')[1]?.toLowerCase();
    const suspiciousDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    if (suspiciousDomains.includes(emailDomain)) {
        riskScore += 20;
    }

    // Check for suspicious keywords in job description
    const suspiciousKeywords = [
        'work from home',
        'make money fast',
        'no experience needed',
        'guaranteed income',
        'easy money',
        'upfront payment',
        'registration fee',
        'processing fee'
    ];
    const descriptionLower = data.jobDescription.toLowerCase();
    suspiciousKeywords.forEach(keyword => {
        if (descriptionLower.includes(keyword)) {
            riskScore += 5;
        }
    });

    // Check for unusually high salary mentions
    const salaryMatch = data.salaryOffered.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (salaryMatch) {
        const salaryNum = parseFloat(salaryMatch[1].replace(/,/g, ''));
        // If salary is mentioned as yearly and over 100k for entry level, suspicious
        if (salaryNum > 100000 && descriptionLower.includes('entry')) {
            riskScore += 15;
        }
    }

    // Determine risk level
    if (riskScore >= 40) {
        return 'high';
    } else if (riskScore >= 20) {
        return 'medium';
    } else {
        return 'low';
    }
}
