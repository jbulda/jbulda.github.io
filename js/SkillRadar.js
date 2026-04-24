export class SkillRadar {
    constructor(containerId, skills) {
        this.container = document.getElementById(containerId);
        this.details = document.getElementById('skill-details');
        this.skills = skills;
        this.size = 300;
        this.radius = this.size * 0.4;
        this.center = this.size / 2;
    }

    render() {
        let svg = `<svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}" style="overflow: visible;">`;

        // 1. Draw Background Polygons
        for (let i = 1; i <= 5; i++) {
            let r = (this.radius / 5) * i;
            svg += `<polygon points="${this.getPoints(r)}" class="radar-grid" />`;
        }

        // 2. Draw Skill Area
        const skillPoints = this.skills.map((s, i) => {
            const r = (s.level / 100) * this.radius;
            const angle = (Math.PI * 2 * i) / this.skills.length;
            return `${this.center + r * Math.sin(angle)},${this.center - r * Math.cos(angle)}`;
        }).join(" ");
        svg += `<polygon points="${skillPoints}" class="skill-area" />`;

        // 3. Draw Nodes
        // Inside js/SkillRadar.js -> render()
        this.skills.forEach((s, i) => {
            const r = (s.level / 100) * this.radius;
            const angle = (Math.PI * 2 * i) / this.skills.length;
            const cx = this.center + r * Math.sin(angle);
            const cy = this.center - r * Math.cos(angle);

            // Explicitly styling the nodes to ensure visibility on black
            svg += `<circle cx="${cx}" cy="${cy}" r="6" 
            fill="#00ff41" 
            stroke="#050505" 
            stroke-width="2" 
            class="skill-node" 
            data-name="${s.name}" 
            data-level="${s.level}%" 
            style="filter: drop-shadow(0 0 5px #00ff41); cursor: pointer;" />`;
        });

        svg += `</svg>`;
        this.container.innerHTML = svg;
        this.addInteractivity();
    }

    getPoints(r) {
        return this.skills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / this.skills.length;
            return `${this.center + r * Math.sin(angle)},${this.center - r * Math.cos(angle)}`;
        }).join(" ");
    }

    addInteractivity() {
        this.container.querySelectorAll('.skill-node').forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                // Using theme variables for colors and matching your "System Diagnostics" aesthetic
                this.details.innerHTML = `
                <h3>${e.target.dataset.name}</h3>
                <p>Proficiency Level: <span style="color: var(--hero-title-text); font-weight: bold;">${e.target.dataset.level}</span></p>
                <div class="progress-bar" style="margin-top: 15px; background: rgba(255, 255, 255, 0.1);">
                    <div class="progress" style="width: ${e.target.dataset.level}; background: var(--accent); box-shadow: 0 0 10px var(--accent);"></div>
                </div>
            `;

                // Subtle glow effect using your accent variable
                this.details.style.borderColor = 'var(--accent)';
                this.details.style.boxShadow = '0 0 20px var(--accent-glow)';
            });

            node.addEventListener('mouseleave', () => {
                // Revert to your standard "glass" border and shadow
                this.details.style.borderColor = 'var(--hero-border)';
                this.details.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
            });
        });
    }
}