// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const skillLevels = document.querySelectorAll('.skill-level');
const levelBars = document.querySelectorAll('.level-bar');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const currentYear = document.getElementById('currentYear');
const scrollIndicator = document.querySelector('.scroll-indicator');
const profileImage = document.getElementById('profileImage');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active nav link
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll indicator click
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animate skill bars when they come into view
function animateSkills() {
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        if (isElementInViewport(skill)) {
            skill.style.width = `${level}%`;
        }
    });
    
    levelBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (isElementInViewport(bar)) {
            bar.style.width = `${level}%`;
        }
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
    );
}

// Handle contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Change button text to show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }, 1500);
});

// Interactive profile image effect
profileImage.addEventListener('mouseenter', () => {
    profileImage.style.filter = 'brightness(1.2) contrast(1.1)';
});

profileImage.addEventListener('mouseleave', () => {
    profileImage.style.filter = 'brightness(1) contrast(1)';
});

// Initialize particles.js for background effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if particles.js is loaded
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ff3366"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff3366",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Animate skills on page load
    animateSkills();
    
    // Listen for scroll events to animate skills
    window.addEventListener('scroll', animateSkills);
});

// Add typing effect to hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    const accentText = "ANIME";
    
    // Split the text to find the accent part
    const parts = originalText.split(accentText);
    
    // Recreate the title with a typing effect
    if (parts.length === 2) {
        heroTitle.innerHTML = '';
        
        const firstPart = document.createTextNode(parts[0]);
        const accentSpan = document.createElement('span');
        accentSpan.className = 'accent';
        accentSpan.textContent = '';
        const lastPart = document.createTextNode(parts[1]);
        
        heroTitle.appendChild(firstPart);
        heroTitle.appendChild(accentSpan);
        heroTitle.appendChild(lastPart);
        
        // Type the accent word
        let i = 0;
        const typeAccent = () => {
            if (i < accentText.length) {
                accentSpan.textContent += accentText.charAt(i);
                i++;
                setTimeout(typeAccent, 100);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeAccent, 500);
    }
}

// Initialize typing effect when page loads
window.addEventListener('load', initTypingEffect);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    // Only apply parallax on larger screens
    if (window.innerWidth > 768) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});