// Result Page Display
document.addEventListener('DOMContentLoaded', function() {
    const riskLevel = sessionStorage.getItem('riskLevel');
    const scanData = sessionStorage.getItem('scanData');

    if (!riskLevel) {
        // If no risk level found, redirect to scan page
        window.location.href = 'scan.html';
        return;
    }

    const riskBadge = document.getElementById('riskBadge');
    const riskExplanation = document.getElementById('riskExplanation');

    // Set badge text and class
    riskBadge.textContent = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) + ' Risk';
    riskBadge.className = 'risk-badge ' + riskLevel;

    // Set explanation text
    let explanation = '';
    const data = scanData ? JSON.parse(scanData) : null;

    switch (riskLevel) {
        case 'high':
            explanation = `
                <strong>High Risk Detected</strong><br><br>
                This job posting shows multiple red flags that indicate it may be a scam. 
                ${data && data.paymentRequired === 'yes' ? '<strong>Warning:</strong> The posting requires upfront payment, which is a major red flag. Legitimate employers never require payment from employees.' : ''}
                ${data && data.contactEmail && data.contactEmail.includes('@gmail.com') ? 'The use of a free email service (Gmail) instead of a company domain is suspicious. ' : ''}
                We strongly recommend avoiding this opportunity and reporting it if you haven't already. 
                Legitimate job opportunities do not require upfront payments, use free email services, or promise unrealistic earnings.
            `;
            break;
        case 'medium':
            explanation = `
                <strong>Medium Risk Detected</strong><br><br>
                This job posting has some concerning elements that warrant caution. 
                While it may be legitimate, there are several factors that suggest you should proceed with extra care. 
                We recommend verifying the company's legitimacy through their official website, checking for reviews online, 
                and being cautious about sharing personal information or making any payments. 
                If something seems too good to be true, it often is.
            `;
            break;
        case 'low':
            explanation = `
                <strong>Low Risk Detected</strong><br><br>
                This job posting appears to have fewer red flags compared to typical scam postings. 
                However, it's always important to remain vigilant. We recommend:
                <ul style="margin-top: 1rem; padding-left: 1.5rem;">
                    <li>Verifying the company exists and has a legitimate website</li>
                    <li>Researching the company online for reviews and complaints</li>
                    <li>Never paying upfront fees or purchasing equipment before starting</li>
                    <li>Being cautious if contacted via unsolicited emails or messages</li>
                </ul>
                If you encounter any suspicious behavior during the application process, trust your instincts and report it.
            `;
            break;
    }

    riskExplanation.innerHTML = explanation;
});
