// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticles();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeContactForm();
    initializeSmoothScrolling();
});

// Initialize Particles (CSS-based alternative)
function initializeParticles() {
    // Create additional floating elements for enhanced visual effect
    const particlesContainer = document.getElementById('particles-js');
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            pointer-events: none;
            animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add CSS keyframes for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize Typing Animation
function initializeTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Desarrollador Full-Stack',
        'Diseñador UI/UX',
        'Innovador Tecnológico',
        'Solucionador de Problemas'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .about-card, .contact-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize Skill Progress Bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate Counter Function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Initialize Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '¡Mensaje Enviado!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showNotification('¡Gracias! Tu mensaje ha sido enviado.', 'success');
            }, 2000);
        }, 1500);
    });
}

// Initialize Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize General Animations
function initializeAnimations() {
    // Add mousemove parallax effect to hero
    const hero = document.querySelector('.hero');
    const profileCard = document.querySelector('.profile-card');
    const floatingIcons = document.querySelectorAll('.floating-icon');

    hero.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Parallax effect for profile card
        const translateX = (mouseX - 0.5) * 20;
        const translateY = (mouseY - 0.5) * 20;
        
        profileCard.style.transform = `translate(${translateX}px, ${translateY}px)`;

        // Parallax effect for floating icons
        floatingIcons.forEach((icon, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 10;
            const y = (mouseY - 0.5) * speed * 10;
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Add tilt effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#48bb78' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        opacity: 0;
        transform: translateX(300px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add floating animation to elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    floatingElements.forEach((element, index) => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
    });
}

// Initialize floating animations after DOM load
setTimeout(addFloatingAnimation, 2000);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Performance optimization
let ticking = false;

function updateParallax() {
    // Parallax effects
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Preload images and optimize performance
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}

// Initialize intersection observer for lazy loading
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        preloadImages();
    }
}

// Theme switcher (future enhancement)
function initializeThemeSwitcher() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(e) {
        if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    prefersDark.addListener(updateTheme);
    updateTheme(prefersDark);
}

// Initialize theme
initializeThemeSwitcher();

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Service worker registration for PWA (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}