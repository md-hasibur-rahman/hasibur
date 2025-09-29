// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const mediaItems = document.querySelectorAll('.media-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDetails = document.getElementById('lightbox-details');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter media items with animation
        mediaItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('show');
                    item.classList.remove('hidden');
                }, index * 100);
            } else {
                item.classList.add('hidden');
                item.classList.remove('show');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox functionality
function openLightbox(button) {
    const mediaItem = button.closest('.media-item');
    const img = mediaItem.querySelector('img');
    const mediaInfo = mediaItem.querySelector('.media-info');
    const title = mediaInfo.querySelector('h4').textContent;
    const details = Array.from(mediaInfo.querySelectorAll('p')).map(p => p.textContent).join('\n');
    const dataType = mediaItem.getAttribute('data-type');
    
    lightboxTitle.textContent = title;
    lightboxDetails.textContent = details;
    
    if (dataType === 'video') {
        // For demo purposes, we'll show the thumbnail as image
        // In a real scenario, you'd have actual video URLs
        lightboxImg.src = img.src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
    } else {
        lightboxImg.src = img.src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
    }
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
}

function closeLightbox() {
    lightbox.classList.remove('show');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close lightbox when clicking outside the content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.media-item, .section-title, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Profile image hover effect
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
        profileImg.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to profile title
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) {
        const originalText = profileTitle.textContent;
        setTimeout(() => {
            typeWriter(profileTitle, originalText, 80);
        }, 1500);
    }
});

// Add floating animation to social links
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-10px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Animate elements on load
    const elementsToAnimate = document.querySelectorAll('.profile-section, .media-item');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add image lazy loading
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add custom cursor effect for media items
document.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    item.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

// Add keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            // Previous image logic would go here
        } else if (e.key === 'ArrowRight') {
            // Next image logic would go here
        }
    }
});

// Repository Navigation System
const repositoryData = {
    'portfolio': {
        title: 'Personal Portfolio',
        description: 'My complete portfolio website showcasing 3 years of software development experience and professional journey.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        features: [
            'Fully Responsive Design',
            'Animated UI Elements',
            'Interactive Project Gallery',
            'Multi-Repository Navigation',
            'Professional Contact Form'
        ],
        stats: {
            commits: '150+',
            files: '25',
            languages: '3',
            size: '2.5 MB'
        },
        githubUrl: 'https://github.com/md-hasibur-rahman/portfolio',
        liveUrl: 'https://md-hasibur-rahman.github.io/portfolio'
    },
    'web-projects': {
        title: 'ওয়েব ডেভেলপমেন্ট প্রজেক্ট',
        description: 'বিভিন্ন ধরনের ওয়েব অ্যাপ্লিকেশন এবং ওয়েবসাইট যা আমি তৈরি করেছি।',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
        features: [
            'ই-কমার্স ওয়েবসাইট',
            'ব্লগিং প্ল্যাটফর্ম',
            'টাস্ক ম্যানেজমেন্ট অ্যাপ',
            'রিয়েল-টাইম চ্যাট অ্যাপ',
            'ওয়েদার অ্যাপ্লিকেশন'
        ],
        stats: {
            commits: '300+',
            files: '120',
            languages: '5',
            size: '15 MB'
        },
        githubUrl: 'https://github.com/md-hasibur-rahman/web-projects',
        liveUrl: 'https://md-hasibur-rahman.github.io/web-projects'
    },
    'mobile-apps': {
        title: 'মোবাইল অ্যাপ্লিকেশন',
        description: 'Android এবং iOS প্ল্যাটফর্মের জন্য তৈরি করা বিভিন্ন মোবাইল অ্যাপ।',
        technologies: ['Flutter', 'React Native', 'Firebase', 'SQLite'],
        features: [
            'ক্রস-প্ল্যাটফর্ম অ্যাপ',
            'অফলাইন ডেটা স্টোরেজ',
            'পুশ নোটিফিকেশন',
            'সোশ্যাল লগইন',
            'পেমেন্ট ইন্টিগ্রেশন'
        ],
        stats: {
            commits: '200+',
            files: '80',
            languages: '4',
            size: '10 MB'
        },
        githubUrl: 'https://github.com/md-hasibur-rahman/mobile-apps',
        liveUrl: 'https://play.google.com/store/apps/developer?id=md-hasibur-rahman'
    },
    'data-science': {
        title: 'ডেটা সাইন্স প্রজেক্ট',
        description: 'মেশিন লার্নিং, ডেটা অ্যানালাইসিস এবং AI সংক্রান্ত প্রজেক্টসমূহ।',
        technologies: ['Python', 'TensorFlow', 'Pandas', 'Jupyter', 'Scikit-learn'],
        features: [
            'প্রেডিক্টিভ মডেলিং',
            'ডেটা ভিজুয়ালাইজেশন',
            'নেচারাল ল্যাঙ্গুয়েজ প্রসেসিং',
            'ইমেজ রিকগনিশন',
            'টাইম সিরিজ অ্যানালাইসিস'
        ],
        stats: {
            commits: '180+',
            files: '45',
            languages: '2',
            size: '25 MB'
        },
        githubUrl: 'https://github.com/md-hasibur-rahman/legal-software',
        liveUrl: 'https://md-hasibur-rahman.github.io/legal-software'
    },
    'game-dev': {
        title: 'গেম ডেভেলপমেন্ট',
        description: 'বিভিন্ন ধরনের গেম এবং ইন্টারঅ্যাক্টিভ অ্যাপ্লিকেশন।',
        technologies: ['Unity', 'C#', 'JavaScript', 'HTML5 Canvas'],
        features: [
            '2D/3D গেম',
            'মাল্টিপ্লেয়ার সাপোর্ট',
            'মোবাইল গেম',
            'ওয়েব-বেসড গেম',
            'AR/VR এক্সপেরিয়েন্স'
        ],
        stats: {
            commits: '250+',
            files: '200',
            languages: '3',
            size: '50 MB'
        },
        githubUrl: 'https://github.com/md-hasibur-rahman/enterprise-solutions',
        liveUrl: 'https://md-hasibur-rahman.github.io/enterprise-solutions'
    },
    'open-source': {
        title: 'ওপেন সোর্স কন্ট্রিবিউশন',
        description: 'বিভিন্ন ওপেন সোর্স প্রজেক্টে আমার অবদান এবং কমিউনিটি কাজ।',
        technologies: ['Various', 'Git', 'GitHub Actions', 'Documentation'],
        features: [
            'বাগ ফিক্স',
            'নতুন ফিচার যোগ',
            'ডকুমেন্টেশন উন্নতি',
            'কোড রিভিউ',
            'কমিউনিটি সাপোর্ট'
        ],
        stats: {
            commits: '500+',
            files: '300+',
            languages: '10+',
            size: '100+ MB'
        },
        githubUrl: 'https://github.com/md-hasibur-rahman/government-projects',
        liveUrl: 'https://github.com/md-hasibur-rahman'
    }
};

function openRepository(repoName) {
    const repo = repositoryData[repoName];
    if (!repo) return;
    
    // Hide main sections
    document.getElementById('home').style.display = 'none';
    document.getElementById('pinterest').style.display = 'none';
    document.getElementById('projects').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    
    // Create or show repository page
    let repoPage = document.getElementById(`repo-${repoName}`);
    if (!repoPage) {
        repoPage = createRepositoryPage(repoName, repo);
        document.body.appendChild(repoPage);
    }
    
    repoPage.style.display = 'block';
    repoPage.scrollIntoView({ behavior: 'smooth' });
    
    // Update URL without page reload
    history.pushState({ repo: repoName }, repo.title, `#repo-${repoName}`);
}

function createRepositoryPage(repoName, repo) {
    const page = document.createElement('section');
    page.id = `repo-${repoName}`;
    page.className = 'repo-page';
    
    page.innerHTML = `
        <div class="container">
            <div class="repo-header">
                <a href="#" class="back-btn" onclick="goBackToMain()">
                    <i class="fas fa-arrow-left"></i> মূল পেজে ফিরুন
                </a>
                <h1 class="section-title">${repo.title}</h1>
                <p class="section-subtitle">${repo.description}</p>
            </div>
            
            <div class="repo-content">
                <div class="repo-stats">
                    <div class="stat-card">
                        <span class="stat-number">${repo.stats.commits}</span>
                        <span class="stat-label">কমিট</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${repo.stats.files}</span>
                        <span class="stat-label">ফাইল</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${repo.stats.languages}</span>
                        <span class="stat-label">ভাষা</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${repo.stats.size}</span>
                        <span class="stat-label">সাইজ</span>
                    </div>
                </div>
                
                <h3>ব্যবহৃত প্রযুক্তি</h3>
                <div class="project-tech" style="margin-bottom: 2rem;">
                    ${repo.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <h3>মূল বৈশিষ্ট্যসমূহ</h3>
                <ul style="margin-bottom: 2rem; padding-left: 2rem;">
                    ${repo.features.map(feature => `<li style="margin-bottom: 0.5rem; color: #64748b;">${feature}</li>`).join('')}
                </ul>
                
                <div class="project-actions" style="justify-content: center; gap: 2rem;">
                    <a href="${repo.githubUrl}" target="_blank" class="btn-primary">
                        <i class="fab fa-github"></i> GitHub দেখুন
                    </a>
                    <a href="${repo.liveUrl}" target="_blank" class="btn-secondary">
                        <i class="fas fa-external-link-alt"></i> লাইভ দেখুন
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return page;
}

function goBackToMain() {
    // Hide all repository pages
    document.querySelectorAll('.repo-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show main sections
    document.getElementById('home').style.display = 'block';
    document.getElementById('pinterest').style.display = 'block';
    document.getElementById('projects').style.display = 'block';
    document.getElementById('contact').style.display = 'block';
    
    // Update URL
    history.pushState({}, 'আমার ওয়েবসাইট', '/');
    
    // Scroll to projects section
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.repo) {
        openRepository(event.state.repo);
    } else {
        goBackToMain();
    }
});

// Check URL on page load for direct repository links
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#repo-')) {
        const repoName = hash.replace('#repo-', '');
        if (repositoryData[repoName]) {
            openRepository(repoName);
        }
    }
});


// Contact Form Enhancement with Formspree
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return false;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showFormMessage('Oops! There was a problem sending your message. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Add form field animations
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // Function to show form messages
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Insert message after form
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
});

console.log('🎉 Website loaded successfully! All animations and interactions are ready.');
