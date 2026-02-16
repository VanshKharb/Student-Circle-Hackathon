// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleLink = document.getElementById('toggleLink');
    const toggleText = document.getElementById('toggleText');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');

    let isLoginMode = true;

    // Toggle between Login and Signup
    function setupToggle() {
        const currentToggleLink = document.getElementById('toggleLink');
        currentToggleLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isLoginMode) {
                // Switch to Signup
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
                formTitle.textContent = 'Create Account';
                formSubtitle.textContent = 'Join the sustainable community';
                toggleText.innerHTML = 'Already have an account? <a href="#" id="toggleLink">Login</a>';
                isLoginMode = false;
            } else {
                // Switch to Login
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
                formTitle.textContent = 'Welcome Back!';
                formSubtitle.textContent = 'Login to continue sharing';
                toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggleLink">Sign Up</a>';
                isLoginMode = true;
            }
            
            // Re-setup toggle
            setupToggle();
        });
    }
    
    setupToggle();

    // Toggle password visibility - Login
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('loginPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Toggle password visibility - Signup
    if (toggleSignupPassword) {
        toggleSignupPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('signupPassword');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Login Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate login (replace with actual API call later)
        console.log('Login attempt:', { email, password, rememberMe });
        
        // Store user in localStorage (temporary, for demo)
        localStorage.setItem('user', JSON.stringify({ email, loggedIn: true }));
        
        // Success message
        alert('Login successful! 🎉');
        
        // Redirect to homepage
        window.location.href = 'index.html';
    });

    // Signup Form Submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Password strength validation
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        // Terms validation
        if (!agreeTerms) {
            alert('Please agree to the Terms & Conditions');
            return;
        }

        // Simulate signup (replace with actual API call later)
        console.log('Signup attempt:', { name, email, password });
        
        // Store user in localStorage (temporary, for demo)
        localStorage.setItem('user', JSON.stringify({ name, email, loggedIn: true }));
        
        // Success message
        alert('Account created successfully! 🎉');
        
        // Redirect to homepage
        window.location.href = 'index.html';
    });

    // Google login (placeholder)
    const googleButtons = document.querySelectorAll('.btn-google');
    googleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Google Sign-In will be integrated with backend');
            // TODO: Implement Google OAuth when backend is ready
        });
    });
});