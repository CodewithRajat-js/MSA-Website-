document.addEventListener('DOMContentLoaded', () => {
    console.log("MSA Hackathon Script Loaded");

    try {
        // Countdown Timer
        // Use ISO format for better compatibility
        const targetDate = new Date('2026-03-27T16:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const gap = targetDate - now;

            const container = document.querySelector('.countdown-container');
            if (!container) return;

            if (gap < 0) {
                container.innerHTML = "<h3>EVENT STARTED</h3>";
                return;
            }

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const d = Math.floor(gap / day);
            const h = Math.floor((gap % day) / hour);
            const m = Math.floor((gap % hour) / minute);
            const s = Math.floor((gap % minute) / second);

            const dEl = document.getElementById('days');
            const hEl = document.getElementById('hours');
            const mEl = document.getElementById('minutes');
            const sEl = document.getElementById('seconds');

            if (dEl) dEl.innerText = d < 10 ? '0' + d : d;
            if (hEl) hEl.innerText = h < 10 ? '0' + h : h;
            if (mEl) mEl.innerText = m < 10 ? '0' + m : m;
            if (sEl) sEl.innerText = s < 10 ? '0' + s : s;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Scroll Observer
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('prepare-reveal');
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal, .timeline-item').forEach(el => {
            el.classList.add('prepare-reveal'); // Hide initially for animation
            observer.observe(el);
        });

        // FAQ Accordion
        const questions = document.querySelectorAll('.faq-question');
        questions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                item.classList.toggle('active');
            });
        });

        // 3D Tilt Effect
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });

        // Hero Particles
        const canvas = document.getElementById('hero-particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particlesArray;

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2;
                    this.speedX = (Math.random() * 1.5) - 0.75;
                    this.speedY = (Math.random() * 1.5) - 0.75;
                    this.color = '#7c4dff';
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            function initParticles() {
                particlesArray = [];
                const numberOfParticles = (canvas.height * canvas.width) / 10000;
                for (let i = 0; i < numberOfParticles; i++) {
                    particlesArray.push(new Particle());
                }
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }

                // Connect particles
                for (let a = 0; a < particlesArray.length; a++) {
                    for (let b = a + 1; b < particlesArray.length; b++) {
                        const dx = particlesArray[a].x - particlesArray[b].x;
                        const dy = particlesArray[a].y - particlesArray[b].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(124, 77, 255, ${1 - distance / 100})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
                requestAnimationFrame(animateParticles);
            }

            initParticles();
            animateParticles();
        }

    } catch (e) {
        console.error("MSA Script Error:", e);
        // Fallback: Make everything visible if script crashes
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('visible'));
    }
});
