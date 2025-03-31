document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle nav
        navLinks.classList.toggle('active');
        
        // Animate links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
    

    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Mostrar estado de "enviando"
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            if (response.ok) {
                // Criar elemento de sucesso
                const successDiv = document.createElement('div');
                successDiv.className = 'alert-success';
                successDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Mensagem enviada com sucesso!</span>
                `;
                
                
                document.head.appendChild(style);
                
                document.body.appendChild(successDiv);
                form.reset();
                
                // Remover o aviso após 5 segundos
                setTimeout(() => {
                    successDiv.remove();
                    style.remove();
                }, 5000);
            }
        })
        .finally(() => {
            submitBtn.innerHTML = 'Enviar Mensagem';
            submitBtn.disabled = false;
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('toggle');
                    navItems.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Scroll reveal animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    sr.reveal('.hero-content, .hero-image', { delay: 300 });
    sr.reveal('.about-image, .about-text', { origin: 'left', interval: 100 });
    sr.reveal('.skills-description, .skills-bars', { origin: 'left', interval: 100 });
    sr.reveal('.project-item', { interval: 200 });
    sr.reveal('.contact-info, .contact-form', { origin: 'left', interval: 100 });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    
    // Animate progress bars on scroll
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});