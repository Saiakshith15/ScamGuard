// Admin Login Handler
const API_BASE = window.location.origin;

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        window.location.href = 'admin.html';
        return;
    }

    const loginForm = document.getElementById('adminLoginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;

            try {
                const res = await fetch(`${API_BASE}/api/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await res.json();

                if (data.success) {
                    // Store login status
                    sessionStorage.setItem('adminLoggedIn', 'true');
                    sessionStorage.setItem('adminUsername', username);
                    
                    // Redirect to admin dashboard
                    window.location.href = 'admin.html';
                } else {
                    // Show error
                    errorMessage.textContent = data.message || 'Invalid username or password';
                    errorMessage.style.display = 'block';
                }
            } catch (err) {
                errorMessage.textContent = 'Failed to connect to server. Make sure the server is running.';
                errorMessage.style.display = 'block';
            }
        });
    }
});
