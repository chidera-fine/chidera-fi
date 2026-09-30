


        const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                if (card.getAttribute('data-filter') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

productCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease';
    card.style.opacity = '1';
});

const addBtns = document.querySelectorAll('.add-btn');

addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-info h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        const originalText = btn.textContent;
        btn.textContent = '✓ Added!';
        btn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
        
        console.log(`Added ${productName} (${productPrice}) to cart`);
        
        if (Notification.permission === 'granted') {
            new Notification('Chidera\'s Clothing', {
                body: `${productName} added to cart! (${productPrice})`
            });
        }
    });
});

if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value
        };
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        submitBtn.disabled = true;
        
        contactForm.reset();
        
        console.log('Contact Form Data:', data);
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

const ctaBtn = document.querySelector('.cta-btn');

if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        const shopSection = document.getElementById('shop');
        shopSection.scrollIntoView({ behavior: 'smooth' });
    });
}

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.product-image img').forEach(img => {
        imageObserver.observe(img);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        if (!card.getAttribute('data-filter')) {
            if (index < 6) {
                card.setAttribute('data-filter', 'purple');
            } else if (index < 10) {
                card.setAttribute('data-filter', 'yellow');
            } else {
                card.setAttribute('data-filter', 'carton');
            }
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
}, 100);

window.addEventListener('scroll', debouncedScroll);

let cartCount = 0;

function updateCartCounter() {
    cartCount++;
    console.log(`Items in cart: ${cartCount}`);
}

addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        updateCartCounter();
    });
});

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

document.addEventListener('DOMContentLoaded', () => {
    const priceElements = document.querySelectorAll('.product-price');
    priceElements.forEach(el => {
        console.log(`Product price: ${el.textContent}`);
    });
});

const productCards2 = document.querySelectorAll('.product-card');

productCards2.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        console.log('Swiped left');
    }
    if (touchEndX > touchStartX + 50) {
        console.log('Swiped right');
    }
}

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

console.log('%cWelcome to Chidera\'s Clothing! 👗✨', 
    'font-size: 20px; color: #6B2D5C; font-weight: bold;');
console.log('%cThank you for visiting our store', 
    'font-size: 14px; color: #FFD700;');
