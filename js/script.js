// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--darker-bg)';
        navbar.style.backdropFilter = 'none';
    }
});

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.education-card, .training-card, .experience-card, .service-card, .skill-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ===== FORM VALIDATION (if contact form is added) =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// ===== MOBILE MENU CLOSE ON LINK CLICK =====
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// ===== PRELOADER (optional) =====
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== HOVER EFFECTS FOR CARDS =====
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.education-card, .training-card, .experience-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== LAZY LOADING FOR IMAGES =====
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===== THEME TOGGLE (optional dark/light mode) =====
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// ===== CONTACT FORM SUBMISSION (if form exists) =====
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Mensagem enviada com sucesso!';
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-dependent functions here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== PROJECTS SECTION DYNAMIC CONTENT =====
const projects = [
  {
    title: "Liturgia Paz",
    image: "img/liturgia.jpeg",
    description: `
      App Flutter para gerenciamento da comissão de liturgia. Inclui calendário litúrgico com missas e festas, leituras diárias, informações sobre santos, gerenciamento de grupos litúrgicos, agenda de ensaios, chat interno, documentos compartilhados, notificações e controle de acesso. Versão Android/iOS.`,
    link: "https://github.com/Abmer0One/liturgia_paz"
  },
  {
    title: "Tuie Táxi",
    image: "img/Tuie.jpeg",
    description: `
      Aplicação mobile de serviços de táxi com funcionalidades de localização em tempo real, solicitação de corridas e integração com pagamentos online. Interface intuitiva para condutores e passageiros.`,
    link: "https://github.com/Abmer0One/tuie_taxi_driver/tree/master"
  },
  {
    title: "MANTA",
    image: "img/manta.jpeg",
    description: `
      Aplicativo de agendamento de serviços de Salão de Beleza e Spa em Luanda. Permite encontrar, comparar e agendar serviços em diferentes salões e spas, com suporte à localização, notificações, histórico de agendamentos e gestão dos profissionais.`,
    link: "https://github.com/Abmer0One/manta_mobile"
  }
];

const container = document.getElementById("projects-container");

projects.forEach((project, index) => {
  const col = document.createElement("div");
  col.className = "col-lg-4 col-md-6 fade-in-up";

  col.innerHTML = `
    <div class="project-card h-100 shadow-sm rounded-3 overflow-hidden" data-bs-toggle="modal" data-bs-target="#projectModal" onclick="showProjectModal(${index})">
      <img src="${project.image}" alt="${project.title}" class="project-img" />
      <div class="project-content p-3">
        <h5 class="mb-2">${project.title}</h5>
        <p class="text-muted">${project.description.substring(0, 90)}...</p>
      </div>
    </div>
  `;

  container.appendChild(col);
});

function showProjectModal(index) {
  const project = projects[index];
  document.getElementById("projectModalLabel").innerText = project.title;
  document.getElementById("projectModalImg").src = project.image;
  document.getElementById("projectModalDescription").innerText = project.description;
  document.getElementById("projectModalLink").href = project.link;
}

// ===== INTERNATIONALIZATION (i18n) SYSTEM =====

const translations = {
    en: {
        // Brand
        "brand": "ABIÚD MOTA",
        
        // Navbar
        "nav.home": "Home",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.skills": "Skills",
        "nav.services": "Services",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "nav.language": "Language",
        "nav.portuguese": "Portuguese",
        "nav.english": "English",

        // Hero
        "hero.greeting": "Hi!",
        "hero.title": "Hi, I'm Abiúd Mota",
        "hero.subtitle": "Computer Engineer | Web & Mobile Developer",
        "hero.button": "See Projects",
        "hero.email": "Email",
        "hero.phone": "Phone",
        "hero.location": "Location",

        // About
        "about.title": "Who am I?",
        "about.subtitle": "I'm Abiúd Mota, Computer Engineer | Web & Mobile Developer",
        "about.description": "I'm a passionate application developer with a strong background in Computer Engineering from Universidade Metodista de Angola and experience in major companies like RNT-EP. I focus on building efficient, functional solutions and always seek impactful projects in web, mobile, and enterprise systems.",
        "about.name": "Name:",
        "about.age": "Age:",
        "about.from": "From:",
        "about.download_cv": "DOWNLOAD CV",

        // Education
        "education.title": "Education",
        "education.degree1": "Computer Engineering",
        "education.school1": "Universidade Metodista de Angola",
        "education.period1": "2013 - 2019",
        "education.degree2": "HVAC Technician",
        "education.school2": "IMP Pascual Luvualu",
        "education.period2": "2010 - 2012",
        "education.degree3": "Basic Education",
        "education.school3": "Complexo Escolar Santa Teresa",
        "education.period3": "1998 - 2009",

        // Training
        "training.title": "Professional Training",
        "training.course1": "ITIL 4 Foundation",
        "training.org1": "Assertiva",
        "training.course2": "Cybersecurity Fundamentals",
        "training.org2": "Hanzolo Technology, Systems & Security Lda",
        "training.course3": "Corporate Governance and Change Management",
        "training.org3": "Academia BAI",
        "training.course4": "Productivity with Artificial Intelligence",
        "training.org4": "Academia BAI",

        // Languages
        "languages.title": "Languages",
        "languages.portuguese": "Portuguese",
        "languages.portuguese_level": "Level: Advanced",
        "languages.english": "English",
        "languages.english_level": "Level: Intermediate",

        // Experience
        "experience.title": "Professional Experience",
        "experience.rnt.title": "Head of Application Development Division - RNT‑EP",
        "experience.rnt.period": "Since Feb. 2024",
        "experience.rnt.desc": "Responsible for planning, executing, and leading the application and corporate software development team at RNT‑EP.",
        "experience.dentec.title": "Mobile Developer - DENTEC",
        "experience.dentec.period": "Mar. 2022 – Nov. 2022",
        "experience.dentec.desc": "Developed TT-Taxi and Tuie apps with tracking, payment, geolocation, and ride management features.",
        "experience.metodsoft.title": "Web/Mobile Developer - METODSOFT",
        "experience.metodsoft.period": "Apr. 2021 – Nov. 2021",
        "experience.metodsoft.desc": "Developed So Vendas app and Consulfarma platform focusing on e-commerce and delivery.",
        "experience.sysgest.title": "HelpDesk Technician - SYSGEST",
        "experience.sysgest.period": "Jun. 2019 – Mar. 2021",
        "experience.sysgest.desc": "Customer support, RFID card issuing and configuration, and support for school software.",

        // Skills
        "skills.title": "Technical Skills",

        // Services
        "services.title": "My Services",
        "services.webdev": "Web Development",
        "services.webdev_desc": "Modern and responsive web applications using best technologies.",
        "services.mobiledev": "Mobile Development",
        "services.mobiledev_desc": "Native and hybrid mobile apps for Android and iOS.",
        "services.uiux": "UI/UX Design",
        "services.uiux_desc": "Design of intuitive interfaces and exceptional user experiences.",
        "services.support": "Technical Support",
        "services.support_desc": "Expert technical support and maintenance for enterprise systems.",
        "services.integration": "System Integration",
        "services.integration_desc": "System integration and corporate solutions.",
        "services.pm": "Project Management",
        "services.pm_desc": "IT project management and development team leadership.",

        // Projects
        "projects.title": "My Projects",
        "projects.description": "Some of the main projects I've developed recently.",
        "projects.modal_title": "Project Details",
        "projects.modal_btn": "See Project",

        // Contact
        "contact.title": "Get in Touch",
        "contact.description": "Interested in working with me? Let's talk about your next project!",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.location": "Location",
        "contact.button": "Send Message",

        // Footer
        "footer.rights": "All rights reserved."
    },
    pt: {
        // Brand
        "brand": "ABIÚD MOTA",
        
        // Navbar
        "nav.home": "Início",
        "nav.about": "Sobre",
        "nav.experience": "Experiência",
        "nav.skills": "Competências",
        "nav.services": "Serviços",
        "nav.projects": "Projetos",
        "nav.contact": "Contato",
        "nav.language": "Idioma",
        "nav.portuguese": "Português",
        "nav.english": "Inglês",

        // Hero
        "hero.greeting": "Olá!",
        "hero.title": "Olá, eu sou o Abiúd Mota",
        "hero.subtitle": "Engenheiro Informático | Desenvolvedor de Aplicações Web & Mobile",
        "hero.button": "Ver Projetos",
        "hero.email": "Email",
        "hero.phone": "Telefone",
        "hero.location": "Localização",

        // About
        "about.title": "Quem sou eu?",
        "about.subtitle": "Sou Abiúd Mota, Engenheiro Informático | Desenvolvedor de Aplicações Web & Mobile",
        "about.description": "Sou um desenvolvedor de aplicações apaixonado por tecnologia e inovação. Com sólida formação em Engenharia Informática pela Universidade Metodista de Angola e experiência em grandes empresas como a RNT-EP, busco sempre criar soluções técnicas eficientes e funcionais. Minha trajetória profissional reflete o compromisso com a qualidade, a aprendizagem contínua e o desejo constante de contribuir para projetos impactantes nas áreas de desenvolvimento web, mobile e sistemas corporativos.",
        "about.name": "Nome:",
        "about.age": "Idade:",
        "about.from": "de:",
        "about.download_cv": "BAIXAR CV",

        // Education
        "education.title": "Formação Acadêmica",
        "education.degree1": "Engenharia Informática",
        "education.school1": "Universidade Metodista de Angola",
        "education.period1": "2013 - 2019",
        "education.degree2": "Técnico de Climatização e Frio",
        "education.school2": "IMP Pascual Luvualu",
        "education.period2": "2010 – 2012",
        "education.degree3": "Ensino de Base",
        "education.school3": "Complexo Escolar Santa Teresa",
        "education.period3": "1998 – 2009",

        // Training
        "training.title": "Formação Profissional",
        "training.course1": "ITIL 4 Foundation",
        "training.org1": "Assertiva",
        "training.course2": "Fundamentos de Cibersegurança",
        "training.org2": "Hanzolo Tecnologia, Sistemas & Segurança Lda",
        "training.course3": "Governança Corporativa e Gestão da Mudança",
        "training.org3": "Academia BAI",
        "training.course4": "Productividade com Inteligência Artificial",
        "training.org4": "Academia BAI",

        // Languages
        "languages.title": "Idiomas",
        "languages.portuguese": "Português",
        "languages.portuguese_level": "Nível: Avançado",
        "languages.english": "Inglês",
        "languages.english_level": "Nível: Intermédio",

        // Experience
        "experience.title": "Experiência Profissional",
        "experience.rnt.title": "Chefe de Divisão de Desenvolvimento de Aplicações - RNT‑EP",
        "experience.rnt.period": "Desde Fev. 2024",
        "experience.rnt.desc": "Responsável pelo planeamento, execução e liderança da equipa de desenvolvimento de aplicações e software corporativo na Rede Nacional de Transporte de Electricidade (RNT‑EP).",
        "experience.dentec.title": "Desenvolvedor Mobile - DENTEC",
        "experience.dentec.period": "Mar. 2022 – Nov. 2022",
        "experience.dentec.desc": "Criação das apps TT-Taxi e Tuie com funcionalidades de rastreio, pagamentos, geolocalização e gerenciamento de corridas.",
        "experience.metodsoft.title": "Dev Web/Mobile - METODSOFT",
        "experience.metodsoft.period": "Abr. 2021 – Nov. 2021",
        "experience.metodsoft.desc": "Desenvolvimento da app So Vendas e plataforma Consulfarma com foco em e-commerce, geolocalização e entregas.",
        "experience.sysgest.title": "Técnico de HelpDesk - SYSGEST",
        "experience.sysgest.period": "Jun. 2019 – Mar. 2021",
        "experience.sysgest.desc": "Atendimento ao cliente, emissão e configuração de cartões RFID, e suporte técnico para software escolar.",

        // Skills
        "skills.title": "Competências Técnicas",

        // Services
        "services.title": "Meus Serviços",
        "services.webdev": "Web Development",
        "services.webdev_desc": "Desenvolvimento de aplicações web modernas e responsivas usando as melhores tecnologias.",
        "services.mobiledev": "Mobile Development",
        "services.mobiledev_desc": "Criação de aplicações mobile nativas e híbridas para Android e iOS.",
        "services.uiux": "UI/UX Design",
        "services.uiux_desc": "Design de interfaces intuitivas e experiências de usuário excepcionais.",
        "services.support": "Technical Support",
        "services.support_desc": "Suporte técnico especializado e manutenção de sistemas corporativos.",
        "services.integration": "System Integration",
        "services.integration_desc": "Integração de sistemas e desenvolvimento de soluções corporativas.",
        "services.pm": "Project Management",
        "services.pm_desc": "Gestão de projetos de tecnologia e liderança de equipas de desenvolvimento.",

        // Projects
        "projects.title": "Meus Projetos",
        "projects.description": "Alguns dos principais projetos que desenvolvi recentemente.",
        "projects.modal_title": "Detalhes do Projeto",
        "projects.modal_btn": "Ver Projeto",

        // Contact
        "contact.title": "Entre em Contato",
        "contact.description": "Interessado em trabalhar comigo? Vamos conversar sobre seu próximo projeto!",
        "contact.email": "Email",
        "contact.phone": "Telefone",
        "contact.location": "Localização",
        "contact.button": "Enviar Mensagem",

        // Footer
        "footer.rights": "Todos os direitos reservados."
    }
};

// ===== i18n FUNCTIONS WITH IMPROVEMENTS =====

function setLanguage(lang) {
    // Validate language
    if (!translations[lang]) {
        console.warn(`Language '${lang}' not supported. Falling back to 'pt'.`);
        lang = 'pt';
    }
    
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Show language change notification
    showLanguageChangeNotification(lang);
}

function applyTranslations(lang) {
    // Add fade effect during translation
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getTranslation(key, lang);
            
            if (translation) {
                // Animate text change
                el.style.transition = 'opacity 0.2s ease';
                el.style.opacity = '0';
                
                setTimeout(() => {
                    el.textContent = translation;
                    el.style.opacity = '1';
                }, 100);
            }
        });
        
        // Restore body opacity
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 200);
        
    }, 100);
}

function getTranslation(key, lang) {
    // Get translation with fallback
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    
    // Fallback to Portuguese if English translation not found
    if (lang === 'en' && translations['pt'] && translations['pt'][key]) {
        console.warn(`Translation for '${key}' not found in English. Using Portuguese fallback.`);
        return translations['pt'][key];
    }
    
    // Fallback to English if Portuguese translation not found
    if (lang === 'pt' && translations['en'] && translations['en'][key]) {
        console.warn(`Translation for '${key}' not found in Portuguese. Using English fallback.`);
        return translations['en'][key];
    }
    
    // If no translation found, return the key itself
    console.warn(`Translation for '${key}' not found in any language.`);
    return key;
}

function showLanguageChangeNotification(lang) {
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    const langName = lang === 'pt' ? 'Português' : 'English';
    const flag = lang === 'pt' ? '🇵🇹' : '🇬🇧';
    notification.innerHTML = `${flag} ${langName}`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// ===== INITIALIZE i18n ON PAGE LOAD =====
document.addEventListener("DOMContentLoaded", () => {
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    const lang = localStorage.getItem('lang') || 'pt';
    applyTranslations(lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update typing effect with correct language
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const titleText = getTranslation('hero.title', lang);
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < titleText.length) {
                    heroTitle.textContent += titleText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }, 500);
});

// ===== CSS ANIMATIONS FOR LANGUAGE TRANSITIONS =====
const style = document.createElement('style');
style.textContent = `
    .language-transition {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .language-transition.changing {
        opacity: 0.7;
        transform: scale(0.98);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

