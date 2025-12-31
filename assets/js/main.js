document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initTabFunctionality();
    initScrollAnimations();
    initFormValidation();
    initQuizFunctionality();
    initNavbarScroll();
    initSportCardHover();
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function initTabFunctionality() {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('[id]');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('href') === `#${id}`) {
                        tab.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section.id && document.querySelector(`a[href="#${section.id}"]`)) {
            observer.observe(section);
        }
    });
}

function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.card, .feature-card, .player-card, .position-item, .info-card, .language-card, .value-item, .about-card, .sport-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                } else {
                    input.style.borderColor = '#4CAF50';
                }
            });
            
            if (isValid) {
                showSuccessMessage(form);
            } else {
                showErrorMessage(form);
            }
        });
        
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
}

function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(26, 143, 60, 0.95);
        color: white;
        padding: 2rem 3rem;
        border-radius: 12px;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        animation: slideIn 0.5s ease;
    `;
    message.innerHTML = '<h3 style="margin-bottom: 1rem;">✓ Success!</h3><p>Your form has been submitted successfully.</p>';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            message.remove();
            if (form.action && !form.action.includes('#')) {
                window.location.href = form.action;
            }
        }, 500);
    }, 2000);
}

function showErrorMessage(form) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 68, 68, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    message.textContent = '⚠ Please fill in all required fields';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

function initQuizFunctionality() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.closest('.quiz-card');
            if (parent) {
                parent.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.style.borderColor = '';
                    opt.style.background = '';
                });
            }
            
            this.style.borderColor = 'var(--accent-gold)';
            this.style.background = 'rgba(212, 175, 55, 0.2)';
            
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar, .header');
    let lastScroll = 0;
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '';
        }
        
        lastScroll = currentScroll;
    });
}

function initSportCardHover() {
    const sportCards = document.querySelectorAll('.sport-card');
    
    sportCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    const playerCards = document.querySelectorAll('.player-card');
    playerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.player-image');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.player-image');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
