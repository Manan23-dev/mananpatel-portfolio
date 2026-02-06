// Core Portfolio Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initializing...');
    
    initializeNavigation();
    initializeContactForm();
    initializeMenuToggle();
    initializeScrollToTop();
    initializeResumeDownload();
    setupActiveNavigation();
    initializeAccessibility();
    initializeThemeToggle();
    
    // Ensure content is visible
    forceShowContent();
});

function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navigation');
                const menuToggle = document.getElementById('menuToggle');
                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    const menuIcon = menuToggle.querySelector('i');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const userName = formData.get('name') || 'Unknown';
            const userEmail = formData.get('email') || '';
            const userMessage = formData.get('message') || '';
            
            if (!userName.trim() || !userEmail.trim() || !userMessage.trim()) {
                showNotification('Please fill in all fields before submitting.');
                return;
            }
            
            const emailSubject = `Portfolio Contact from ${userName}`;
            const emailBody = `Hello Manan,\n\n${userMessage}\n\nBest regards,\n${userName}\n${userEmail}`;
            
            const mailLink = `mailto:manan2301patel@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            try {
                window.location.href = mailLink;
                this.reset();
                showNotification('Email client opened! Thank you for reaching out.');
            } catch (error) {
                console.error('Email error:', error);
                showNotification('Please email me directly at manan2301patel@gmail.com');
            }
        });
    }
}

function initializeMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navigation = document.getElementById('navigation');
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', function() {
            navigation.classList.toggle('open');
            
            const menuIcon = this.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navigation.contains(e.target)) {
                navigation.classList.remove('open');
                const menuIcon = menuToggle.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    }
}

function initializeScrollToTop() {
    const scrollButton = document.getElementById('backToTop');
    
    if (scrollButton) {
        // Throttle scroll events for better performance
        let isScrolling = false;
        
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    if (window.pageYOffset > 300) {
                        scrollButton.classList.add('visible');
                    } else {
                        scrollButton.classList.remove('visible');
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
        
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeResumeDownload() {
    const resumeButton = document.getElementById('downloadResume');
    
    if (resumeButton) {
        resumeButton.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Resume download will be available soon! Please contact me directly at manan2301patel@gmail.com for my latest resume.');
        });
    }
}

function initializeThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const storageKey = 'theme-preference';

    function setIcon(isPureDark) {
        const icon = toggle.querySelector('i');
        if (!icon) return;
        icon.classList.toggle('fa-moon', !isPureDark);
        icon.classList.toggle('fa-sun', isPureDark);
    }

    function applyTheme(theme) {
        const isPureDark = theme === 'pure-dark';
        document.body.classList.toggle('theme-pure-dark', isPureDark);
        setIcon(isPureDark);
    }

    // Load saved theme
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved === 'pure-dark' || saved === 'tech-sunset') {
            applyTheme(saved);
        } else {
            applyTheme('tech-sunset');
        }
    } catch (e) {
        applyTheme('tech-sunset');
    }

    toggle.addEventListener('click', () => {
        const isPureDark = document.body.classList.contains('theme-pure-dark');
        const nextTheme = isPureDark ? 'tech-sunset' : 'pure-dark';
        applyTheme(nextTheme);
        try {
            localStorage.setItem(storageKey, nextTheme);
        } catch (e) {
            // ignore
        }
    });
}

function setupActiveNavigation() {
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.menu a');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

function initializeAccessibility() {
    // Skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--main-orange);
        color: var(--dark-bg);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Focus management for mobile menu
    const navigation = document.getElementById('navigation');
    if (navigation) {
        const menuLinks = navigation.querySelectorAll('a');
        menuLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Tab' && index === menuLinks.length - 1 && navigation.classList.contains('open')) {
                    setTimeout(() => {
                        navigation.classList.remove('open');
                        const menuIcon = menuToggle.querySelector('i');
                        if (menuIcon) {
                            menuIcon.classList.remove('fa-times');
                            menuIcon.classList.add('fa-bars');
                        }
                    }, 100);
                }
            });
        });
    }
}

function showNotification(message) {
    // Create a better notification system
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--main-orange);
        color: var(--dark-bg);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        max-width: 300px;
        box-shadow: var(--orange-glow);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function forceShowContent() {
    // Ensure all content is visible even if animations fail
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
                console.log('Force showing:', element);
            }
        });
        
        // Special handling for sections that might be hidden
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        
        console.log('Content visibility ensured');
    }, 2000);
}

// Smooth scroll polyfill for older browsers
function initializeSmoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 80;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    function animateScroll(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animateScroll);
                        }
                    }
                    
                    function easeInOutQuad(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }
                    
                    requestAnimationFrame(animateScroll);
                }
            });
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    
    // Ensure content is visible even if there are errors
    forceShowContent();
});

// Initialize additional features when page loads
window.addEventListener('load', function() {
    initializeSmoothScrollPolyfill();
    
    // Log successful initialization
    console.log('Portfolio fully loaded');
});

// Handle viewport changes
window.addEventListener('resize', debounce(function() {
    // Refresh any layout-dependent features
    setupActiveNavigation();
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}