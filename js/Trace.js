export class Trace {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.history = [{ x: this.x, y: this.y }];
        this.speed = 2;
        this.angle = (Math.floor(Math.random() * 8) * Math.PI) / 4;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 30;
        this.active = true;
    }

    update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.history.push({ x: this.x, y: this.y });
        this.life++;
        if (this.life > this.maxLife) this.active = false;

        if (Math.random() < 0.05) { // 5% chance to change direction
            const angles = [0, Math.PI/4, Math.PI/2, Math.PI*0.75, Math.PI]; // Include 45-degree steps
            this.angle = angles[Math.floor(Math.random() * angles.length)];
        }
    }

    // Inside js/Trace.js
    draw(ctx) {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = '#00ff41'; // Your Matrix Green
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';

        // Create the "Glow"
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff41';

        ctx.moveTo(this.history[0].x, this.history[0].y);

        for (let i = 1; i < this.history.length - 1; i++) {
            // Find the midpoint between current and next point to create a curve
            const xc = (this.history[i].x + this.history[i + 1].x) / 2;
            const yc = (this.history[i].y + this.history[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.history[i].x, this.history[i].y, xc, yc);
        }

        ctx.stroke();
        ctx.shadowBlur = 0; // Reset for performance

        // DRAW THE NODES (The little circles at the start/end)
        this.drawNode(ctx, this.history[0].x, this.history[0].y); // Start node
        if (!this.active) {
            this.drawNode(ctx, this.x, this.y, true); // End node (filled)
        }
    }

    drawNode(ctx, x, y, isEnd = false) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        if (isEnd) {
            ctx.fillStyle = '#00ff41';
            ctx.fill();
        } else {
            ctx.strokeStyle = '#00ff41';
            ctx.stroke();
        }
    }
}