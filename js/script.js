        // Dark/Light Mode Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeToggleMobile = document.getElementById('themeToggleMobile');
        const body = document.body;
        let isDark = false; // Default is light mode

        function toggleTheme() {
            if (!isDark) {
                body.setAttribute('data-theme', 'dark');
                document.querySelectorAll('.theme-toggle i').forEach(icon => {
                    icon.className = 'fas fa-sun';
                });
                themeToggle.style.background = 'var(--primary-color)';
                themeToggle.style.color = 'white';
                themeToggleMobile.style.background = 'var(--primary-color)';
                themeToggleMobile.style.color = 'white';
            } else {
                body.removeAttribute('data-theme');
                document.querySelectorAll('.theme-toggle i').forEach(icon => {
                    icon.className = 'fas fa-moon';
                });
                themeToggle.style.background = 'var(--card-bg)';
                themeToggle.style.color = 'var(--text-color)';
                themeToggleMobile.style.background = 'var(--card-bg)';
                themeToggleMobile.style.color = 'var(--text-color)';
            }
            isDark = !isDark;
        }

        themeToggle.addEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);

        // Progress Bars Animation
        const progressBars = document.querySelectorAll('.progress-bar');

        function animateProgressBars() {
            progressBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = '0';
                // Trigger reflow to restart animation
                void bar.offsetWidth;
                bar.style.width = percent + '%';
            });
        }

        // Intersection Observer for skills section
        const skillsSection = document.querySelector('.skills');
        const observerOptions = {
            root: null,
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Scroll Animation Observer
        const scrollElements = document.querySelectorAll('.scroll-animate');

        function checkScroll() {
            const triggerBottom = window.innerHeight / 5 * 4;

            scrollElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < triggerBottom) {
                    element.classList.add('show');
                } else {
                    // Optional: Remove to have elements animate only once
                    // element.classList.remove('show');
                }
            });
        }

        // Initialize scroll animation on load
        window.addEventListener('load', () => {
            checkScroll();
            // Don't animate progress bars on load - wait for intersection
        });

        // Check scroll position on scroll
        window.addEventListener('scroll', checkScroll);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calculate offset considering navbar height
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));
                    if (offcanvas) {
                        offcanvas.hide();
                    }
                }
            });
        });

        // Scroll to Top Button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Navbar active link highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (pageYOffset >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        const socialTrigger = document.getElementById('socialTrigger');
        const socialContact = document.getElementById('socialContact');

        // Toggle contact panel with animation
        socialTrigger.addEventListener('click', (e) => {
            e.stopPropagation();

            // Toggle active state
            socialContact.classList.toggle('active');
            socialTrigger.classList.toggle('active');

            // Change icon based on state
            if (socialContact.classList.contains('active')) {
                socialTrigger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                socialTrigger.innerHTML = '<i class="fas fa-comment-dots"></i>';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!socialContact.contains(e.target) && e.target !== socialTrigger) {
                socialContact.classList.remove('active');
                socialTrigger.classList.remove('active');
                socialTrigger.innerHTML = '<i class="fas fa-comment-dots"></i>';
            }
        });

        // Time-based WhatsApp greeting
        const hour = new Date().getHours();
        let greeting;

        if (hour >= 5 && hour < 12) {
            greeting = "Good Morning";
        } else if (hour >= 12 && hour < 17) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Night";
        }

        const message = `Hi Raj, ${greeting}!`;
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "916369455827";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
            link.setAttribute('href', whatsappLink);
        });

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

       document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 1. WhatsApp Notification
    const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\nMessage: ${message}`;
    const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/916369455827?text=${encodedWhatsAppMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // 2. Email Notification (using FormSubmit.co - free service)
    fetch('https://formsubmit.co/ajax/rajkumarganesan1108@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            mobile: mobile,
            subject: subject,
            message: message,
            _replyto: email, // Optional: auto-reply to sender
            _subject: `New Contact Form: ${subject}` // Email subject
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    
    // Optional: Show success message
    alert('Thank you for your message! I will contact you soon.');
    
    // Reset the form
    this.reset();
});

document.getElementById('currentYear').textContent = new Date().getFullYear();