document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeMenuToggle();
    initializeScrollToTop();
    initializeResumeDownload();
    setupIntersectionObserver();
    setupActiveNavigation();
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
                
                const navMenu = document.getElementById('navigation');
                const menuToggle = document.getElementById('menuToggle');
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    const menuIcon = menuToggle.querySelector('i');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    });
}

function initializeScrollEffects() {
    const typingElement = document.querySelector('.code-text');
    if (typingElement) {
        const originalContent = typingElement.textContent;
        typeText(typingElement, originalContent, 100);
    }
}

function typeText(element, text, speed = 100) {
    let currentChar = 0;
    element.innerHTML = '';
    
    function addChar() {
        if (currentChar < text.length) {
            element.innerHTML += text.charAt(currentChar);
            currentChar++;
            setTimeout(addChar, speed);
        }
    }
    
    setTimeout(addChar, 1000);
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const userName = formData.get('name');
            const userEmail = formData.get('email');
            const userMessage = formData.get('message');
            
            const emailSubject = `Portfolio Contact from ${userName}`;
            const emailBody = `Hello Manan,\n\n${userMessage}\n\nBest regards,\n${userName}\n${userEmail}`;
            
            const mailLink = `mailto:manan2301patel@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            window.location.href = mailLink;
            
            this.reset();
            showNotification('Email client opened! Thank you for reaching out.');
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
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }
}

function initializeScrollToTop() {
    const scrollButton = document.getElementById('backToTop');
    
    if (scrollButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
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

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

function setupActiveNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.menu a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

function showNotification(message) {
    alert(message);
}

function smoothScrollPolyfill() {
    if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop;
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

function initializeAccessibility() {
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
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const menuToggle = document.getElementById('menuToggle');
    const navigation = document.getElementById('navigation');
    
    if (menuToggle && navigation) {
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

window.addEventListener('load', function() {
    smoothScrollPolyfill();
    initializeAccessibility();
    initializeLazyLoading();
});