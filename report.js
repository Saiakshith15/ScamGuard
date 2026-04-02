// Report Page Form Handling
const API_BASE = window.location.origin;

document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');
    const successMessage = document.getElementById('successMessage');

    if (reportForm) {
        reportForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                reporterName: document.getElementById('reporterName').value,
                reporterEmail: document.getElementById('reporterEmail').value,
                scamDescription: document.getElementById('scamDescription').value
            };

            try {
                const res = await fetch(`${API_BASE}/api/report`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (data.success) {
                    reportForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
            } catch (err) {
                console.log('API unavailable, using localStorage');
            }

            const reports = JSON.parse(localStorage.getItem('scamReports') || '[]');
            reports.push({ ...formData, timestamp: new Date().toISOString() });
            localStorage.setItem('scamReports', JSON.stringify(reports));

            reportForm.style.display = 'none';
            successMessage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
