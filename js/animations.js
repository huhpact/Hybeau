document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffects();
    initCardHoverEffects();
    initCounterAnimations();
    initTypewriterEffect();
    initFloatingAnimation();
    initScrollReveal();
});

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .about-visual img');
    
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                if (isInViewport(element)) {
                    element.style.transform = `translate3d(0, ${rate}px, 0)`;
                }
            });
        }, 10));
    }
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach(card => {
        const image = card.querySelector('.article-image img');
        const content = card.querySelector('.article-content');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.08)';
                image.style.filter = 'brightness(1.1)';
            }
            
            if (content) {
                content.style.transform = 'translateY(-4px)';
            }
            
            const category = card.querySelector('.article-category');
            if (category) {
                category.style.transform = 'scale(1.05)';
                category.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = '';
                image.style.filter = '';
            }
            
            if (content) {
                content.style.transform = '';
            }
            
            const category = card.querySelector('.article-category');
            if (category) {
                category.style.transform = '';
                category.style.boxShadow = '';
            }
        });
    });
}

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const duration = 2000; 
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (counter.textContent.includes('K+')) {
                        displayValue = displayValue + 'K+';
                    } else if (counter.textContent.includes('+')) {
                        displayValue = displayValue + '+';
                    }
                    
                    counter.textContent = displayValue;
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.innerHTML;
    const gradientText = heroTitle.querySelector('.gradient-text');
    
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.innerHTML = '';
            heroTitle.style.opacity = '1';
            
            let i = 0;
            const speed = 50; 
            
            function typeWriter() {
                if (i < text.length) {
                    const char = text.charAt(i);
                    if (char === '<') {
                        const tagEnd = text.indexOf('>', i);
                        heroTitle.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        heroTitle.innerHTML += char;
                        i++;
                    }
                    setTimeout(typeWriter, speed);
                }
            }
            
            typeWriter();
        }, 500);
    }
}

function initFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const randomDelay = Math.random() * 2000;
        const randomDuration = 4000 + Math.random() * 2000;
        
        card.style.animationDelay = randomDelay + 'ms';
        card.style.animationDuration = randomDuration + 'ms';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-title, .section-description, .about-stats, .newsletter-form');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        revealObserver.observe(element);
    });
}

function initButtonRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initTextAnimations() {
    const textElements = document.querySelectorAll('h2, h3, .lead');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const words = text.textContent.split(' ');
                
                text.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
                
                const wordSpans = text.querySelectorAll('.word');
                wordSpans.forEach((word, index) => {
                    word.style.opacity = '0';
                    word.style.transform = 'translateY(20px)';
                    word.style.display = 'inline-block';
                    word.style.transition = `all 0.5s ease ${index * 0.1}s`;
                    
                    setTimeout(() => {
                        word.style.opacity = '1';
                        word.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                textObserver.unobserve(text);
            }
        });
    }, { threshold: 0.3 });
    
    textElements.forEach(element => {
        textObserver.observe(element);
    });
}

function initInputEffects() {
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterInput) {
        newsletterInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.style.background = 'rgba(255, 255, 255, 0.25)';
        });
        
        newsletterInput.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
            this.style.background = '';
        });
    }
}

function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-primary');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .word {
        transition: all 0.5s ease;
    }
    
    .magnetic {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style);

setTimeout(() => {
    initButtonRippleEffect();
    initInputEffects();
    initMagneticEffect();
}, 1000);