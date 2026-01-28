    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isDark = true;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        isDark = false;
    }

    themeToggle.addEventListener('click', () => {
        if (isDark) {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
        isDark = !isDark;
    });

    // Sticky Navigation
    const stickyNav = document.getElementById('stickyNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }
    });

    // Scroll Down Button
    const scrollDown = document.getElementById('scrollDown');
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Pricing Accordion
    const pricingHeaders = document.querySelectorAll('.pricing-header');
    pricingHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');
            
            // Close all other accordions
            pricingHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            if (!isActive) {
                header.classList.add('active');
                const content = header.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                header.classList.remove('active');
                header.nextElementSibling.style.maxHeight = null;
            }
        });
    });

    // Portfolio Card Lighting Effect
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Open first pricing item by default
    if (pricingHeaders.length > 0) {
        pricingHeaders[0].click();
    }