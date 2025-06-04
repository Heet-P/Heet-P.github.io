// Matrix Animation
class MatrixAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixBg = document.getElementById('matrix-bg');
        this.matrixBg.appendChild(this.canvas);
        
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
        
        this.ctx.font = `${this.fontSize}px 'Fira Code'`;
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.init();
    }
}

// Initialize Matrix Animation
const matrix = new MatrixAnimation();

// Handle window resize
window.addEventListener('resize', () => {
    matrix.resize();
});

// Mobile Navigation Toggle
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;

document.querySelector('.nav-container').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize typing animation for the welcome message
const welcomeText = document.querySelector('.command');
if (welcomeText) {
    welcomeText.textContent = '';
    new TypingAnimation(welcomeText, 'welcome_to_cse_hub', 150);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('show');
        }
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('subjectSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const subjectCards = document.querySelectorAll('.subject-card');
            const results = [];
            
            subjectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const code = card.querySelector('.subject-code').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || code.includes(searchTerm)) {
                    results.push({
                        title: card.querySelector('h3').textContent,
                        code: card.querySelector('.subject-code').textContent,
                        href: card.getAttribute('href')
                    });
                }
            });
            
            // Display results
            if (searchTerm.length > 0 && results.length > 0) {
                searchResults.innerHTML = results.map(result => `
                    <a href="${result.href}" class="search-result-item">
                        ${result.title}
                        <span class="subject-code">${result.code}</span>
                    </a>
                `).join('');
                searchResults.classList.add('show');
            } else {
                searchResults.classList.remove('show');
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('show');
            }
        });
    }
});

// Global Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('global-search');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    document.querySelector('.search-container').appendChild(searchResults);

    // Subject data structure
    const subjects = {
        'sem1': [
            { title: 'Engineering Mathematics - 1', code: 'MSUD101', path: 'subjects/msud101.html' },
            { title: 'Engineering Physics - 1', code: 'PSUD101', path: 'subjects/psud101.html' },
            { title: 'English', code: 'HS101', path: 'subjects/hs101.html' },
            { title: 'Programming in C', code: 'CEUC101', path: 'subjects/ceuc101.html' }
        ],
        'sem2': [
            { title: 'Engineering Mathematics - 2', code: 'MSUD102', path: 'subjects/msud102.html' },
            { title: 'Engineering Physics - 2', code: 'PSUD102', path: 'subjects/psud102.html' },
            { title: 'Object Oriented Programming', code: 'CEUC102', path: 'subjects/ceuc102.html' },
            { title: 'Digital Electronics', code: 'CEUS101', path: 'subjects/ceus101.html' },
            { title: 'Elements of Engineering', code: 'EEUS101', path: 'subjects/eeus101.html' }
        ]
    };

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            searchResults.classList.remove('show');
            return;
        }

        const results = [];
        
        // Search through all subjects
        Object.values(subjects).flat().forEach(subject => {
            if (subject.title.toLowerCase().includes(searchTerm) || 
                subject.code.toLowerCase().includes(searchTerm)) {
                results.push(subject);
            }
        });

        // Display results
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => `
                <a href="${result.path}" class="search-result-item">
                    ${result.title}
                    <span class="subject-code">${result.code}</span>
                </a>
            `).join('');
            searchResults.classList.add('show');
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.classList.add('show');
        }
    }

    // Search on button click
    searchBtn.addEventListener('click', performSearch);

    // Search on input change
    searchInput.addEventListener('input', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && 
            !searchBtn.contains(e.target) && 
            !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
});
