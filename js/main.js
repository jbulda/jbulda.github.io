import { CircuitBoard } from './CircuitBoard.js';
import { SkillRadar } from './SkillRadar.js'; 
import { Trace } from './Trace.js';

// 1. Initialize Circuit Background
const board = new CircuitBoard('hero-canvas');
board.animate();
window.boostParticles = () => board.boost();

// 2. Initialize Skill Radar
const mySkills = [
    { name: "SAPUI5", level: 95 },
    { name: "BTP / Cloud", level: 90 },
    { name: "OData v4", level: 85 },
    { name: "Clean Core", level: 80 },
    { name: "SVG/Canvas", level: 92 }
];

const radar = new SkillRadar('skill-radar', mySkills);
radar.render();

// Force the function to be available globally
if (!document.documentElement.getAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'light');
}

window.toggleTheme = function() {
    const html = document.documentElement;
    
    // 1. Brief pause for the engine
    document.body.style.pointerEvents = 'none'; 
    
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    // 2. Re-enable after the CSS transition finishes (match your CSS time)
    setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
    }, 150);
};

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let traces = [];

function init() {
    // 1. Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 2. Initial batch of traces
    for (let i = 0; i < 20; i++) {
        traces.push(new Trace(canvas));
    }
}

function animate() {
    // This creates the "fade" effect. 
    // It MUST be dark to let the green #00ff41 shine.
    ctx.fillStyle = 'rgba(10, 14, 20, 0.15)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    traces.forEach(trace => {
        trace.update();
        trace.draw(ctx);
    });
    requestAnimationFrame(animate);
}

// 5. Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();

// Example logic to handle the active state
const dockItems = document.querySelectorAll('.dock-item');

dockItems.forEach(item => {
    item.addEventListener('click', function() {
        // 1. Remove active class from all items
        dockItems.forEach(i => i.classList.remove('active'));
        
        // 2. Add active class to the clicked item
        this.classList.add('active');
    });
});

/* --- Navigation Scroll Spy with Bottom Detection --- */
const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px', 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    // Only run if we aren't at the very bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

    if (!isAtBottom) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveState(id);
            }
        });
    }
}, observerOptions);

// Function to update the dock state
function updateActiveState(id) {
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeLink = document.querySelector(`.dock-item[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// Manual listener for the footer/bottom-out effect
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
        updateActiveState('contact'); // Replace 'contact' with your actual section ID
    }
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});