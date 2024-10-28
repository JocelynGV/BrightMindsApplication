function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check (replace with real authentication in production)
    if (username === 'HCI' && password === 'HCI') {
        // Show logging in message
        const message = document.createElement('div');
        message.textContent = 'Logging in...';
        message.style.fontSize = '18px';
        message.style.color = 'blue';
        message.style.marginTop = '20px';
        document.querySelector('.container').appendChild(message);

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = 'home.html'; // Redirect to welcome.html
        }, 2000); // 2 seconds delay
    } else {
        alert('Invalid username or password!'); // Alert for invalid credentials
    }
}