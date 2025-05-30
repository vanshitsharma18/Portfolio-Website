// Navbar active link switching on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'scroll-to-top';
scrollBtn.style.display = 'none';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Fade-in animation for sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    observer.observe(section);
});

// Portfolio filter functionality (if you add filter buttons)
const filterButtons = document.querySelectorAll('.portfolio-filters button');
const portfolioCardElements = document.querySelectorAll('.portfolio-card');
if (filterButtons.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.textContent.trim();
            portfolioCardElements.forEach(card => {
                if (filter === 'All' || (card.querySelector('span') && card.querySelector('span').textContent.includes(filter))) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact form basic validation feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                valid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        if (!valid) {
            e.preventDefault();
        }
    });
}

// Form submission feedback
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  fetch(this.action, {
    method: this.method,
    body: new FormData(this),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    submitBtn.textContent = 'Message Sent!';
    submitBtn.classList.add('success');
    contactForm.reset();
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('success');
      submitBtn.disabled = false;
    }, 3000);
  })
  .catch(error => {
    submitBtn.textContent = 'Error!';
    submitBtn.classList.add('error');
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('error');
      submitBtn.disabled = false;
    }, 3000);
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Animated counter for stats
function animateCounter(el, target) {
  let count = 0;
  const duration = 2000; // 2 seconds
  const frameDuration = 1000/60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  const increment = target / totalFrames;
  
  const counter = setInterval(() => {
    count += increment;
    if (count >= target) {
      el.textContent = target;
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(count);
    }
  }, frameDuration);
}

// Add IntersectionObserver for hero stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('span').forEach(stat => {
        const target = parseInt(stat.textContent);
        stat.textContent = '0';
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stats => {
  statsObserver.observe(stats);
});

// Portfolio modal functionality
const portfolioCards = document.querySelectorAll('.portfolio-card');
const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalLiveLink = document.getElementById('modalLiveLink');
const modalGithubLink = document.getElementById('modalGithubLink');
const closeModal = document.querySelector('.close-modal');

// Project details - you would expand this with your actual projects
const projectDetails = [
  {
    id: 1,
    title: "Serverless Notification System",
    description: "A scalable notification system built using AWS Lambda, API Gateway, and SNS. This project sends notifications through multiple channels including email, SMS, and push notifications.",
    tags: ["AWS", "Serverless", "Lambda", "API Gateway", "SNS"],
    liveLink: "#",
    githubLink: "https://github.com/vanshitsharma18/project1"
  },
  {
    id: 2,
    title: "Chatbot",
    description: "An AI-powered chatbot built with Python and Gemini API. The chatbot can answer questions, provide recommendations, and engage in natural conversation.",
    tags: ["Python", "Gemini API", "NLP", "Machine Learning"],
    liveLink: "https://github.com/vanshitsharma18/chatbot",
    githubLink: "https://github.com/vanshitsharma18/project2"
  }
];

portfolioCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const project = projectDetails[index];
    modalImage.src = card.querySelector('img').src;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    modalTags.innerHTML = '';
    project.tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'modal-tag';
      tagEl.textContent = tag;
      modalTags.appendChild(tagEl);
    });
    
    modalLiveLink.href = project.liveLink;
    modalGithubLink.href = project.githubLink;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});