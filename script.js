document.addEventListener('DOMContentLoaded', function() {
    // Navigation - Effet de défilement
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            navbar.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animation des éléments du CV au scroll
    const resumeItems = document.querySelectorAll('.resume-item');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Fonction pour animer les éléments visibles
    function animateOnScroll() {
        resumeItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }
    
    // Exécuter l'animation au chargement et au scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links li a');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    
    // Animation du texte dans le hero
    const heroTitle = document.querySelector('.animate-text');
    const originalText = heroTitle.textContent;
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent = originalText.substring(0, i + 1) + '|';
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.textContent = originalText;
            heroTitle.classList.add('animate-text');
        }
    }
    
    // Démarrer l'animation d'écriture après un court délai
    setTimeout(() => {
        heroTitle.textContent = '|';
        i = 0;
        typeWriter();
    }, 500);
    
    // Animations au défilement
    const faders = document.querySelectorAll('.section-header, .profile-card, .post, .website-card, .ecommerce-card, .design-project');
    
    // Ajouter la classe fade-in à tous les éléments à animer
    faders.forEach((fader, index) => {
        fader.classList.add('fade-in');
        fader.style.setProperty('--i', index % 3);
    });
    
    // Observer les éléments pour les animer au défilement
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Animation des posts Instagram
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.addEventListener('mouseenter', () => {
            post.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        post.addEventListener('mouseleave', () => {
            post.style.transform = '';
        });
    });
    
    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fermer le menu mobile si ouvert
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajustement pour la barre de navigation fixe
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation des couleurs dans la section design
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.1)';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.transform = '';
        });
    });
    
    // Effet parallaxe sur le hero
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
});

  const form = document.getElementById('myForm');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('https://script.google.com/macros/s/AKfycbwEoaZ6gEZNTgI-599OpmKLaLBMcfHR_dnxRwTlfwgny90oTbnKQjde8hH2TJOLKkc26w/exec', {  // Mets ici l’URL de ton Web App
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(res => {
      alert('Votre message a bien été envoyé !');
      form.reset();
    })
    .catch(error => alert('Erreur lors de l\'envoi : ' + error.message));
  });