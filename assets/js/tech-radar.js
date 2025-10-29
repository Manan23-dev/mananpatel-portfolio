// Tech Radar Visualization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Tech Radar...');
    
    function createTechRadar() {
        const radarContainer = document.getElementById('techRadar');
        if (!radarContainer) return;
        
        const radarData = {
            languages: [
                { name: 'Python', level: 95, category: 'Backend' },
                { name: 'TypeScript', level: 85, category: 'Frontend' },
                { name: 'Java', level: 80, category: 'Backend' },
                { name: 'Go', level: 75, category: 'Backend' },
                { name: 'C++', level: 70, category: 'Systems' },
                { name: 'C#', level: 70, category: 'Backend' }
            ],
            frameworks: [
                { name: 'FastAPI', level: 95, category: 'Backend' },
                { name: 'React.js', level: 90, category: 'Frontend' },
                { name: 'Next.js', level: 85, category: 'Frontend' },
                { name: 'Spring Boot', level: 80, category: 'Backend' },
                { name: 'LangChain', level: 90, category: 'AI/ML' },
                { name: 'PyTorch', level: 85, category: 'AI/ML' }
            ],
            databases: [
                { name: 'PostgreSQL', level: 90, category: 'Database' },
                { name: 'MongoDB', level: 85, category: 'Database' },
                { name: 'Redis', level: 90, category: 'Cache' },
                { name: 'Cassandra', level: 75, category: 'Database' }
            ],
            cloud: [
                { name: 'AWS', level: 85, category: 'Cloud' },
                { name: 'Docker', level: 90, category: 'DevOps' },
                { name: 'Kubernetes', level: 80, category: 'DevOps' },
                { name: 'GCP', level: 75, category: 'Cloud' }
            ]
        };
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        canvas.className = 'tech-radar-canvas';
        radarContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = 250;
        
        // Draw radar circles
        function drawRadarGrid() {
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.lineWidth = 1;
            
            // Draw concentric circles
            for (let i = 1; i <= 5; i++) {
                const radius = (maxRadius * i) / 5;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Draw lines
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 * i) / 8;
                const x = centerX + Math.cos(angle) * maxRadius;
                const y = centerY + Math.sin(angle) * maxRadius;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
        
        // Draw tech stack points
        function drawTechPoints() {
            let allTech = [...radarData.languages, ...radarData.frameworks, ...radarData.databases, ...radarData.cloud];
            
            allTech.forEach((tech, index) => {
                const categoryColors = {
                    'Backend': '#ff9500',
                    'Frontend': '#8b5cf6',
                    'AI/ML': '#3b82f6',
                    'Database': '#00ff88',
                    'DevOps': '#ffb84d',
                    'Cloud': '#60a5fa',
                    'Cache': '#a78bfa',
                    'Systems': '#fbbf24'
                };
                
                const color = categoryColors[tech.category] || '#ff9500';
                const angle = (Math.PI * 2 * index) / allTech.length;
                const distance = (maxRadius * tech.level) / 100;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                // Draw point
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw text
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(tech.name, x, y + 20);
                
                // Draw connecting line
                ctx.strokeStyle = color;
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            });
        }
        
        // Animation function
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRadarGrid();
            drawTechPoints();
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    createTechRadar();
});

