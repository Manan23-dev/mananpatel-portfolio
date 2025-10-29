// Parallax Effects for Enhanced Interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing parallax effects...');
    
    // Parallax background layers
    function initParallaxLayers() {
        const backgroundStuff = document.getElementById('backgroundStuff');
        if (!backgroundStuff) return;
        
        // Create layered parallax effect for project cards
        const projectBoxes = document.querySelectorAll('.project-box');
        projectBoxes.forEach((box, index) => {
            box.addEventListener('mousemove', function(e) {
                const rect = box.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 10;
                const moveY = (y - centerY) / 10;
                
                box.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${moveY}deg) translateY(-10px)`;
            });
            
            box.addEventListener('mouseleave', function() {
                box.style.transform = '';
            });
        });
    }
    
    // Enhanced scroll parallax
    function initScrollParallax() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const scrollTop = rect.top;
                const scrollBottom = rect.bottom;
                
                if (scrollTop < window.innerHeight && scrollBottom > 0) {
                    const parallaxSpeed = section.dataset.parallax || 0.5;
                    const offset = scrollTop * parallaxSpeed;
                    
                    // Only apply to certain elements
                    const parallaxElements = section.querySelectorAll('.parallax-layer');
                    parallaxElements.forEach((el, index) => {
                        el.style.transform = `translateY(${offset * (index + 1) * 0.1}px)`;
                    });
                }
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    // Staggered reveal animations
    function initStaggeredReveals() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // Stagger delay
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            revealObserver.observe(el);
        });
    }
    
    initParallaxLayers();
    initScrollParallax();
    initStaggeredReveals();
});

