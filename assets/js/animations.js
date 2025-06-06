// Background Animation Effects
function addMovingStuff() {
    const bgElement = document.getElementById('backgroundStuff');
    if (!bgElement) return;
    
    // Add floating dots
    const dotCount = 30;
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        const dotSize = Math.random() * 4 + 1;
        dot.style.width = dotSize + 'px';
        dot.style.height = dotSize + 'px';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 6 + 's';
        dot.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        bgElement.appendChild(dot);
    }

    // Add falling code lines
    const codeLines = [
        'const distributed = true;',
        'async function deploy() {',
        'kafka.connect();',
        'ml.predict(data);',
        'kubernetes.scale();',
        'redis.cache(key);',
        'docker.build();',
        'aws.lambda();'
    ];

    for (let i = 0; i < 8; i++) {
        const codeEl = document.createElement('div');
        codeEl.className = 'falling-code';
        codeEl.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
        codeEl.style.left = Math.random() * 100 + '%';
        codeEl.style.animationDelay = Math.random() * 8 + 's';
        codeEl.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        bgElement.appendChild(codeEl);
    }

    // Add geometric shapes
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${i % 3 === 0 ? 'round' : i % 3 === 1 ? 'triangle' : ''}`;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 15 + 's';
        
        bgElement.appendChild(shape);
    }
}

// Initialize background effects when page loads
window.addEventListener('load', function() {
    addMovingStuff();
    
    // Initialize typewriter effect
    const typingEl = document.querySelector('.code-text');
    if (typingEl) {
        const originalContent = typingEl.textContent;
        setTimeout(() => {
            typeText(typingEl, originalContent, 100);
        }, 1500);
    }
});

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
    
    addChar();
}

// Enhanced Intersection Observer for fade-in effects
function setupEnhancedIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for staggered animation effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 150);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEnhancedIntersectionObserver();
    
    // Force show content if animations fail
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }, 3000);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Animation Error:', e.error);
    
    // Fallback: show all content if there are errors
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add('visible');
    });
});

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on mobile devices
    if (window.innerWidth < 768) {
        const bgElement = document.getElementById('backgroundStuff');
        if (bgElement) {
            const elements = bgElement.querySelectorAll('.dot, .falling-code, .shape');
            elements.forEach((el, index) => {
                if (index % 2 === 0) {
                    el.style.display = 'none';
                }
            });
        }
    }
    
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', function() {
        const bgElement = document.getElementById('backgroundStuff');
        if (bgElement) {
            if (document.hidden) {
                bgElement.style.animationPlayState = 'paused';
            } else {
                bgElement.style.animationPlayState = 'running';
            }
        }
    });
}

// Initialize performance optimizations
window.addEventListener('load', optimizeAnimations);