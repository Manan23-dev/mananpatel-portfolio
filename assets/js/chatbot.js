// RAG-based "Ask Me Anything" Chatbot
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chatbot...');
    
    // Simple knowledge base based on your portfolio
    const knowledgeBase = {
        'project': {
            'redis': 'I used Redis in FlowAgent Multi-Agent Productivity Platform for caching and memory management in the multi-agent system.',
            'fastapi': 'I built several projects with FastAPI including the Document Search Assistant using RAG, Rental Management Service, FlowAgent, and Flask ML Services.',
            'langchain': 'I used LangChain in FlowAgent for multi-agent coordination and in the Document Search Assistant for RAG implementation.',
            'mongodb': 'MongoDB is used in Rental Management Service and LodgingHub for storing property listings and user data.',
            'react': 'I used React.js in FlowAgent for the frontend dashboard, and in LodgingHub for the full-stack platform.',
            'openai': 'I integrated OpenAI in FlowAgent for GPT-4 powered agents and in my current work at Amotions Inc. for LLM-based meeting insights.',
            'aws': 'I deployed services on AWS ECS, S3, Lambda for scalable cloud infrastructure.',
            'kubernetes': 'I deployed Vector Similarity Search Engine using Kubernetes for horizontal scalability.',
            'docker': 'I containerized applications with Docker including the FastAPI services, Flask ML Services, and ML pipelines.',
            'flask': 'I built Flask ML Services with Docker, MLflow, and automated CI/CD pipeline for production-ready ML microservices.',
            'stock': 'I built a Stock Price Prediction system using LSTMs and dynamic RNNs for time series forecasting.',
            'crop': 'I developed a Crop Disease Detection system using computer vision and deep learning to help farmers identify plant diseases.',
            'anime': 'I created an Anime GPT-2 Storyteller that generates creative stories using fine-tuned GPT-2 models.',
            'sago': 'I built the Sago Founder Re-engagement Agent that monitors signals and drafts personalized outreach emails.',
            'aegis': 'I developed AegisChain, an AI agent system for supply chain code security as part of a Cloud Run Hackathon project.',
            'smartsplit': 'I built SmartSplit, a Flutter-based expense tracking app with Firebase, OCR receipt scanning, and real-time sync.'
        },
        'skill': {
            'python': 'Python is my primary language with 5+ years experience, used extensively in AI/ML projects.',
            'typescript': 'TypeScript is used in my frontend projects including FlowAgent and Next.js applications.',
            'java': 'Java and Spring Boot used in my previous work at Paul Mason Consulting.',
            'go': 'Go is used for high-performance backend services.'
        },
        'education': {
            'masters': 'I have a Master of Science in Computer Science from Cal State East Bay (GPA: 3.57).',
            'bachelors': 'I have a Bachelor of Engineering in Computer Engineering from Gujarat Technological University (GPA: 3.8).'
        },
        'experience': {
            'current': 'I currently work at Amotions Inc. as a Software Engineer, building AI systems for real-time emotion detection.',
            'paul mason': 'I worked at Paul Mason Consulting as a Software Engineer, implementing ML microservices and fraud detection systems.'
        }
    };
    
    function initializeChatbot() {
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        
        if (!chatToggle || !chatContainer) return;
        
        // Toggle chat window
        chatToggle.addEventListener('click', function() {
            chatContainer.classList.toggle('active');
            if (chatContainer.classList.contains('active')) {
                chatInput.focus();
            }
        });
        
        // Send message
        function sendMessage() {
            const query = chatInput.value.trim().toLowerCase();
            if (!query) return;
            
            // Add user message
            addMessage(query, 'user');
            chatInput.value = '';
            
            // Find response
            const response = findResponse(query);
            setTimeout(() => {
                addMessage(response, 'bot');
            }, 500);
        }
        
        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function findResponse(query) {
            // Simple keyword matching
            for (let [category, items] of Object.entries(knowledgeBase)) {
                for (let [key, value] of Object.entries(items)) {
                    if (query.includes(key)) {
                        return value;
                    }
                }
            }
            
            // Check for common patterns
            if (query.includes('which project') || query.includes('what project')) {
                if (query.includes('redis')) return knowledgeBase.project.redis;
                if (query.includes('fastapi')) return knowledgeBase.project.fastapi;
                if (query.includes('langchain')) return knowledgeBase.project.langchain;
            }
            
            if (query.includes('skill') || query.includes('experience with')) {
                if (query.includes('python')) return knowledgeBase.skill.python;
                if (query.includes('typescript')) return knowledgeBase.skill.typescript;
            }
            
            if (query.includes('education') || query.includes('degree') || query.includes('gpa')) {
                return 'I have a Master\'s in Computer Science (GPA: 3.57) from Cal State East Bay and a Bachelor\'s in Computer Engineering (GPA: 3.8) from Gujarat Technological University.';
            }
            
            return 'I can answer questions about my projects, skills, experience, and education. Try asking "Which project used Redis?" or "What is your experience with Python?"';
        }
        
        // Add welcome message
        setTimeout(() => {
            addMessage('Hi! I\'m here to answer questions about Manan\'s portfolio. Try asking about projects, skills, or experience!', 'bot');
        }, 1000);
    }
    
    initializeChatbot();
});

