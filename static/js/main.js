// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Apply animation classes to elements
    animateElementsOnScroll();
    
    // Initialize form validation and enhancements
    initializeForm();
    
    // Add smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize charts if on dashboard page
    if (document.querySelector('.dashboard-charts')) {
        initializeCharts();
    }
    
    // Add active class to current nav item
    highlightCurrentNavItem();
});

// Animate elements when they come into view
function animateElementsOnScroll() {
    // Add animation classes to cards
    document.querySelectorAll('.card:not(.result-container)').forEach(card => {
        card.classList.add('animate-in');
    });
    
    // Add staggered animation to metric cards
    document.querySelectorAll('.metric-card').forEach((card, index) => {
        card.classList.add('stagger-item');
    });
    
    // Add left/right animations to specific elements
    document.querySelectorAll('.animate-left-trigger').forEach(el => {
        el.classList.add('animate-left');
    });
    
    document.querySelectorAll('.animate-right-trigger').forEach(el => {
        el.classList.add('animate-right');
    });
    
    // Add floating animation to specific elements
    document.querySelectorAll('.float-element').forEach(el => {
        el.classList.add('animate-float');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Form validation and enhancements
function initializeForm() {
    const form = document.querySelector('form');
    if (form) {
        // Add animation to form elements
        const formGroups = form.querySelectorAll('.col-md-6');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
        });
        
        // Form submission animation
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                
                // Highlight empty fields
                const inputs = form.querySelectorAll('input[required]');
                inputs.forEach(input => {
                    if (!input.value) {
                        input.classList.add('is-invalid');
                        input.parentElement.classList.add('shake');
                        setTimeout(() => {
                            input.parentElement.classList.remove('shake');
                        }, 500);
                    } else {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    }
                });
                
                // Show alert for empty fields
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-danger mt-3 animate__animated animate__shakeX';
                alertDiv.textContent = 'Please fill in all required fields.';
                
                // Remove any existing alerts
                const existingAlert = form.querySelector('.alert');
                if (existingAlert) {
                    existingAlert.remove();
                }
                
                form.appendChild(alertDiv);
            } else {
                // Add loading animation when form is valid and submitted
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';
                    submitBtn.disabled = true;
                }
            }
            
            form.classList.add('was-validated');
        });
        
        // Real-time validation feedback with animations
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (!this.value) {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                    
                    // Add subtle pulse animation on valid input
                    this.classList.add('pulse-once');
                    setTimeout(() => {
                        this.classList.remove('pulse-once');
                    }, 500);
                }
            });
            
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
            });
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add highlight animation to target
                targetElement.classList.add('highlight-target');
                setTimeout(() => {
                    targetElement.classList.remove('highlight-target');
                }, 2000);
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Highlight current nav item based on URL
function highlightCurrentNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '/' && link.getAttribute('href') === '/') {
            link.classList.add('active');
        }
    });
}

// Initialize interactive charts if on dashboard page
function initializeCharts() {
    // This function would be expanded if we were using client-side charts
    // Currently we're using server-side generated charts with matplotlib
    
    // Add animation to chart containers
    const chartContainers = document.querySelectorAll('.card:has(img)');
    chartContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.animation = `fadeIn 0.8s ease-out ${index * 0.2}s forwards`;
    });
}

// Add some dynamic effects to the page
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for certain elements
    document.querySelectorAll('.parallax-element').forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
    
    // Sticky navbar effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollPosition > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

