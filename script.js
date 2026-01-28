document.addEventListener('DOMContentLoaded', () => {
    // === Preloader ===
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('fade-out');
        // Enable generic CSS animations if needed
    }, 2500); // Wait for aesthetics

    // === Mouse Parallax Effect ===
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Parallax Effect
        const moveX = (window.innerWidth / 2 - posX) * 0.02;
        const moveY = (window.innerHeight / 2 - posY) * 0.02;

        const particles = document.querySelector('.particles');
        if (particles) {
            particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // === Countdown Timer ===
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 14); // Set launch date to 14 days from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            // Launch date passed
            document.querySelector('.countdown-container').innerHTML = '<h3 class="gold-text">We have launched!</h3>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // === Form Handling ===
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const button = form.querySelector('button');
        const originalText = button.innerText;

        // Simulate API call
        button.innerText = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            // Show Royal Modal
            const modal = document.getElementById('royal-modal');
            const closeBtn = document.getElementById('close-modal');

            modal.classList.remove('hidden');
            // Force reflow
            void modal.offsetWidth;
            modal.classList.add('active');

            closeBtn.onclick = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300); // Wait for transition
            };

            // Close on outside click
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeBtn.click();
                }
            }

            form.reset();
            button.innerText = 'Joined';

            // Revert button text after a few seconds
            setTimeout(() => {
                button.innerText = originalText;
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
});
