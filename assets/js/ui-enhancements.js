// UI Enhancements: Animated Counters, Search, etc.
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing UI enhancements...');
    
    // Animated counters
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Initialize counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Project search functionality
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const projectBoxes = document.querySelectorAll('.project-box');
            
            projectBoxes.forEach(box => {
                const projectName = box.querySelector('.project-name')?.textContent.toLowerCase() || '';
                const projectAbout = box.querySelector('.project-about')?.textContent.toLowerCase() || '';
                const techLabels = Array.from(box.querySelectorAll('.tech-label')).map(el => el.textContent.toLowerCase()).join(' ');
                
                if (projectName.includes(searchTerm) || 
                    projectAbout.includes(searchTerm) || 
                    techLabels.includes(searchTerm)) {
                    box.classList.remove('hidden');
                    box.classList.add('visible');
                } else {
                    box.classList.add('hidden');
                    box.classList.remove('visible');
                }
            });
        });
    }
    
    // Add smooth scroll to filtered results
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const firstVisible = document.querySelector('.project-box.visible');
                if (firstVisible) {
                    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        });
    });
});
