// Form Submission Handler
document.getElementById('joinForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const gameCategory = document.getElementById('gameCategory').value;
    const message = document.getElementById('message').value;
    const terms = document.getElementById('terms').checked;

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
        showAlert('Please enter your first and last name', 'error');
        return;
    }

    if (!email.trim()) {
        showAlert('Please enter your email address', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    if (!gameCategory) {
        showAlert('Please select a game category', 'error');
        return;
    }

    if (!terms) {
        showAlert('Please agree to the Terms and Conditions', 'error');
        return;
    }

    // Prepare form data
    const formData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        gameCategory: gameCategory,
        message: message.trim(),
        submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    saveFormSubmission(formData);

    // Show success message
    showAlert('🎉 Welcome to Elite Gaming Hub! Your request has been submitted successfully!', 'success');

    // Reset form
    this.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Save form submission to localStorage
function saveFormSubmission(formData) {
    let submissions = JSON.parse(localStorage.getItem('gameHubSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('gameHubSubmissions', JSON.stringify(submissions));
    console.log('Form submitted:', formData);
}

// Alert function with styling
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-weight: 500;
        animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(alert);

    // Remove after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.community-card, .stat-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Log submissions in console for demo purposes
console.log('%c🎮 Elite Gaming Hub', 'font-size: 20px; color: #ff006e; font-weight: bold;');
console.log('%cWelcome to the Elite Gaming Hub!', 'font-size: 14px; color: #8338ec;');
console.log('Form submissions are stored in localStorage with key: "gameHubSubmissions"');
console.log('View submissions in console: localStorage.getItem("gameHubSubmissions")');