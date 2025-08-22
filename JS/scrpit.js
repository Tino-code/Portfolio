// Add CSS variable for photo background
document.documentElement.style.setProperty('--photo-bg', 'linear-gradient(135deg, rgba(179, 141, 151, 0.1), rgba(213, 172, 169, 0.1))');

// Custom cursor (disable on mobile)
const cursor = document.querySelector('.custom-cursor');
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
} else {
    // Hide cursor on mobile
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// Hover effects for interactive elements (disable on mobile)
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');

if (!isMobile) {
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced scroll animations with mobile optimization
const observerOptions = {
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Parallax effect for background shapes (reduced on mobile)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.bg-shape');
    const parallaxSpeed = isMobile ? 0.2 : 0.5; // Reduced parallax on mobile

    shapes.forEach((shape, index) => {
        const speed = parallaxSpeed + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic text typing effect (faster on mobile)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when hero is visible
const heroTitle = document.querySelector('.hero h1');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typingSpeed = isMobile ? 100 : 150; // Faster typing on mobile
            typeWriter(heroTitle, 'A Developer and An Entrepreneur', typingSpeed);
            heroObserver.unobserve(entry.target);
        }
    });
});

heroObserver.observe(heroTitle);

// Mobile-specific photo animations
if (isMobile) {
    // Add touch interaction for photo
    const photoContainer = document.querySelector('.photo-container');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (photoContainer && profilePhoto) {
        // Add touch feedback
        photoContainer.addEventListener('touchstart', () => {
            photoContainer.style.transform = 'scale(0.95) translateY(-5px)';
        });
        
        photoContainer.addEventListener('touchend', () => {
            photoContainer.style.transform = 'scale(1) translateY(0px)';
        });
        
        // Enhanced photo visibility on mobile
        const photoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mobile-photo-visible');
                }
            });
        }, { threshold: 0.3 });
        
        photoObserver.observe(photoContainer);
    }
}

// Handle resize events for responsive behavior
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const newIsMobile = window.innerWidth <= 768;
        
        // Update cursor behavior on resize
        if (newIsMobile && !isMobile) {
            cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        } else if (!newIsMobile && isMobile) {
            cursor.style.display = 'block';
            document.body.style.cursor = 'none';
        }
        
        // Refresh page if switching between mobile/desktop
        if (newIsMobile !== isMobile) {
            location.reload();
        }
    }, 250);
});

// Mobile photo entrance animation
if (isMobile) {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-photo-visible {
            animation: mobilePhotoEntrance 0.8s ease forwards !important;
        }
        
        @keyframes mobilePhotoEntrance {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(30px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0px);
            }
        }
        
        .photo-container:active {
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}