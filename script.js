document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
});

function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('toggle');
    });
}

function initTheme() {
    const themeToggle = document.querySelector('#theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle change handler
    themeToggle.addEventListener('click', () => { 
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme); // Ensure this function is called to update the icon
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('#theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

function showBankingOutput() {
    const existingModal = document.querySelector('.output-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'output-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.innerHTML = '<h2>Banking Management System</h2>';
    
    const description = document.createElement('div');
    description.className = 'project-description';
    description.innerHTML = `
        <h3>Project Overview</h3>
        <p>A comprehensive banking system implemented in C that manages customer accounts and transactions.</p>
        
        <h3>Key Features</h3>
        <ul>
            <li>Account Creation and Management</li>
            <li>Deposit and Withdrawal Operations</li>
            <li>Balance Inquiry</li>
            <li>Transaction History</li>
            <li>Secure PIN Authentication</li>
        </ul>
        
        <h3>Sample Output</h3>
        <div class="terminal-output">
            <pre>
=== Welcome to Banking Management System ===

1. Create New Account
2. Login to Existing Account
3. Exit

Enter your choice: 1

Creating New Account...
Enter your name: John Doe
Enter initial deposit: $1000
Enter PIN: ****

Account created successfully!
Your account number is: 1001

=== Main Menu ===
1. Check Balance
2. Deposit
3. Withdraw
4. Transaction History
5. Logout

Enter your choice: 1

Current Balance: $1000.00
            </pre>
        </div>
    `;
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(description);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });

    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }, 300);
        }
    });

    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 12, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 12, 0.95)';
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function sendEmail(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const emailBody = `Hello, I am ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`;
    
    const mailtoLink = `mailto:sushantghimire498@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    document.getElementById('contact-form').reset();
    
    return false;
}

document.getElementById('contact-form').addEventListener('submit', sendEmail);

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserverOptions = {
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, sectionObserverOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    sectionObserver.observe(section);
});

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
