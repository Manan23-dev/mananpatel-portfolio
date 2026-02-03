// Project Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing project filters...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');
    
    // Initialize filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectBoxes.forEach(box => {
                if (filterValue === 'all') {
                    box.classList.remove('hidden');
                    box.classList.add('visible');
                } else {
                    const categories = box.getAttribute('data-category');
                    if (categories && categories.includes(filterValue)) {
                        box.classList.remove('hidden');
                        box.classList.add('visible');
                    } else {
                        box.classList.add('hidden');
                        box.classList.remove('visible');
                    }
                }
            });
            
            // Update project count
            updateProjectCount(filterValue);
        });
    });
    
    function updateProjectCount(filter) {
        const visibleProjects = Array.from(projectBoxes).filter(box => {
            if (filter === 'all') return true;
            const categories = box.getAttribute('data-category');
            return categories && categories.includes(filter);
        });
        
        // Optional: Update a counter element if you add one
        const countElement = document.getElementById('projectCount');
        if (countElement) {
            countElement.textContent = visibleProjects.length;
        }
    }
    
    // Initialize with all projects visible
    updateProjectCount('all');
});
