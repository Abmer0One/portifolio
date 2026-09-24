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
    const animateElements = document.querySelectorAll('.education-card, .training-card, .experience-card, .experience-card-impact, .service-card, .skill-item, .skills-group-card, .project-card');
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
    const cards = document.querySelectorAll('.education-card, .training-card, .experience-card, .experience-card-impact, .service-card, .skills-group-card');
    
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
    id: "dcs",
    title: "DCS — Qualificação de Fornecedores",
    badge: "Enterprise",
    image: "img/dcs.jpeg",
    tags: [".NET 8", "Blazor WASM", "SQL Server", "CQRS / MediatR", "Active Directory", "SHA-256 Audit"],
    isCorporate: true,
    link: null,
    descriptionShort: {
      pt: "Plataforma corporativa que digitaliza todo o processo de qualificação de fornecedores de uma grande empresa do setor energético: candidaturas online, análise técnica, fluxos A/B/C, relatórios PDF automáticos e auditoria imutável com cadeia SHA-256.",
      en: "Enterprise platform digitalizing the vendor qualification workflow for a major national energy utility: online applications, technical evaluation, A/B/C flows, automated PDF reports, and immutable SHA-256 audit chaining."
    },
    details: {
      pt: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Contexto</h6>
        <p class="case-study-text">Digitalização ponta-a-ponta do processo de qualificação e homologação de fornecedores de uma grande empresa do setor energético nacional — substituindo processos manuais e despachos físicos em papel por um fluxo único, centralizado e totalmente rastreável.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Destaques Técnicos</h6>
        <ul class="case-study-list">
          <li>Backend .NET 8 com Minimal APIs, arquitetura Vertical Slice e CQRS (MediatR)</li>
          <li>Autenticação SSO via LDAP/Active Directory, com mapeamento dinâmico de 5 perfis e matriz de acessos configurável</li>
          <li>Auditoria imutável com encadeamento criptográfico SHA-256, capaz de detetar qualquer adulteração de registos</li>
          <li>Checklists de avaliação técnica dinâmicas e versionadas, com fluxos de decisão A/B/C</li>
          <li>Geração server-side de relatórios PDF (QuestPDF) com envio automático por email (MailKit)</li>
          <li>Armazenamento de ficheiros em MinIO, compatível com S3</li>
          <li>Frontend SPA em Blazor WebAssembly com AntDesign e rotas protegidas por permissões</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>Meu Papel</h6>
        <p class="case-study-text">Arquiteto da Solução e Desenvolvedor Full-Stack, com liderança técnica da equipa de desenvolvimento de aplicações.</p>`,
      en: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Context</h6>
        <p class="case-study-text">End-to-end digitalization of the vendor qualification and compliance workflow for a major national energy utility — replacing manual processes and paper-based dispatches with a single, centralized and fully traceable flow.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Technical Highlights</h6>
        <ul class="case-study-list">
          <li>.NET 8 backend with Minimal APIs, Vertical Slice architecture and CQRS (MediatR)</li>
          <li>LDAP/Active Directory SSO authentication with dynamic mapping of 5 roles and a configurable access matrix</li>
          <li>Immutable audit trail with SHA-256 cryptographic chaining, able to detect any record tampering</li>
          <li>Dynamic, versioned technical evaluation checklists with A/B/C decision flows</li>
          <li>Server-side PDF report generation (QuestPDF) with automatic email delivery (MailKit)</li>
          <li>File storage on MinIO, S3-compatible</li>
          <li>Blazor WebAssembly SPA frontend with AntDesign and permission-protected routes</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>My Role</h6>
        <p class="case-study-text">Solution Architect and Full-Stack Developer, providing technical leadership to the application engineering team.</p>`,
    }
  },
  {
    id: "rntsurvey",
    title: "RNTSurvey — Inquéritos Corporativos",
    badge: "Enterprise",
    image: "img/rnt_survey.jpeg",
    tags: [".NET 9", "ASP.NET Core MVC", "SQL Server", "Clean Architecture", "Active Directory", "Chart.js", "QuestPDF"],
    isCorporate: true,
    link: null,
    descriptionShort: {
      pt: "Sistema web corporativo para gestão e análise de inquéritos internos: distribuição por tokens seguros, controlo anti-duplicação de respostas, fichas físicas com QR Code e dashboards interativos com gráficos configuráveis.",
      en: "Corporate web platform for internal surveys and analytics: secure token distribution, multi-layer anti-duplication, physical QR-code forms integration, and executive dashboards with customizable charts."
    },
    details: {
      pt: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Contexto</h6>
        <p class="case-study-text">Instrumento centralizado para diagnósticos organizacionais e inquéritos corporativos de grande porte — com integridade de dados garantida, eliminando folhas de cálculo dispersas e respostas duplicadas.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Destaques Técnicos</h6>
        <ul class="case-study-list">
          <li>Clean Architecture em 4 camadas (Domain, Application, Infrastructure e Web), com Repository Pattern e Unit of Work</li>
          <li>Autenticação integrada com Active Directory (LDAP)</li>
          <li>Anti-duplicação em duas camadas: colaborador autenticado + fingerprinting de dispositivo</li>
          <li>Dashboards executivos com Chart.js — gráficos radar, doughnut, barras e pizza configuráveis</li>
          <li>Exportação automática em PDF (QuestPDF) e Excel (EPPlus)</li>
          <li>Módulo de auditoria completa com histórico de alterações em JSON</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>Meu Papel</h6>
        <p class="case-study-text">Concepção, arquitetura de software e desenvolvimento full-stack em C# / .NET 9.</p>`,
      en: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Context</h6>
        <p class="case-study-text">A centralized instrument for organizational diagnostics and enterprise surveys — guaranteeing data integrity while eliminating scattered spreadsheets and duplicate responses.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Technical Highlights</h6>
        <ul class="case-study-list">
          <li>Clean Architecture across 4 layers (Domain, Application, Infrastructure and Web) with Repository Pattern and Unit of Work</li>
          <li>Integrated Active Directory (LDAP) authentication</li>
          <li>Two-layer anti-duplication: authenticated employee + device fingerprinting</li>
          <li>Executive dashboards with Chart.js — configurable radar, doughnut, bar and pie charts</li>
          <li>Automatic PDF (QuestPDF) and Excel (EPPlus) exports</li>
          <li>Full audit module with JSON change history</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>My Role</h6>
        <p class="case-study-text">Concept, software architecture and full-stack development in C# / .NET 9.</p>`
    }
  },
  {
    id: "webbiometric",
    title: "WebBiometric — Gestão de Ponto Biométrico",
    badge: "Enterprise",
    image: "img/webbiometric.jpeg",
    tags: [".NET 8", "C#", "ASP.NET Core MVC", "Web API", "Apache Thrift", "Background Services", "Hardware Integration", "SQL Server"],
    isCorporate: true,
    link: null,
    descriptionShort: {
      pt: "Plataforma web corporativa em .NET 8 para gestão centralizada de terminais biométricos Sigma. Integração via Apache Thrift, coleta automática por serviços em segundo plano, dashboard em tempo real e exportação para folha de pagamento.",
      en: "Enterprise .NET 8 platform for centralized biometric terminal management. Direct Sigma hardware integration via Apache Thrift, automated background attendance collection, real-time dashboard, and payroll export."
    },
    details: {
      pt: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Contexto & Desafio</h6>
        <p class="case-study-text">A organização registava o ponto dos colaboradores através de terminais biométricos Sigma em múltiplos pontos de acesso. A exploração manual dos dados provocava falta de visibilidade sobre o estado dos equipamentos e risco de perda de registos. O desafio foi centralizar toda a operação de assiduidade numa única aplicação web, com monitorização em tempo real, coleta automática e aplicação de regras de negócio diferenciadas (horário normal, turnos, motoristas e horários de proteção à maternidade).</p>

        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Destaques Técnicos & Arquitetura</h6>
        <ul class="case-study-list">
          <li><strong>Arquitetura em 3 Projetos:</strong> Solução em .NET 8 dividida em Aplicação MVC, API RESTful e biblioteca de modelos partilhados.</li>
          <li><strong>Integração com Hardware:</strong> Comunicação direta com o SDK dos terminais biométricos Sigma MA5G via protocolo Apache Thrift, adaptado e recompilado para .NET 8.</li>
          <li><strong>Background Services Resilientes:</strong> Coleta automática de picagens a cada 3 minutos, com rotinas de reconexão automática e tolerância a falhas de comunicação.</li>
          <li><strong>Dashboard em Tempo Real:</strong> Painel operacional com atualização automática a cada 15 segundos para visualização do estado dos terminais e fluxo diário de picagens.</li>
          <li><strong>Motor Inteligente de Assiduidade:</strong> Identificação de intervalos de almoço e processamento de regras por tipo de jornada (normal com 4 picagens e turnos com 2 picagens).</li>
          <li><strong>Gestão Remota & Exportação Salarial:</strong> Sincronização remota do relógio dos terminais e exportação em formatos formatados (.dat e .csv) para alimentação direta do sistema de folha de pagamento.</li>
          <li><strong>Auditoria Centralizada:</strong> Rastreabilidade e registo de eventos operacionais com Serilog.</li>
        </ul>

        <h6 class="case-study-heading"><i class="fas fa-check-circle me-2"></i>Resultado & Impacto</h6>
        <p class="case-study-text">Acompanhamento centralizado em tempo real de todos os terminais, eliminando o trabalho manual de consolidação e o risco de extravio de dados. A exportação automatizada reduziu substancialmente o tempo de fecho dos registos para processamento salarial.</p>

        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>Meu Papel</h6>
        <p class="case-study-text">Concepção, arquitetura de software, integração de protocolos de hardware e desenvolvimento full-stack em C# / .NET 8.</p>
      `,
      en: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Context & Challenge</h6>
        <p class="case-study-text">Employee attendance was recorded across multiple access points via Sigma biometric terminals. Manual data extraction led to zero visibility over hardware downtime and risks of lost attendance records. The challenge was to centralize biometric operations into a unified web application with automated background collection and dynamic business rules for distinct work shifts.</p>

        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Technical Highlights & Architecture</h6>
        <ul class="case-study-list">
          <li><strong>3-Project Solution Architecture:</strong> .NET 8 solution structured into an MVC Application, RESTful Web API, and shared model library.</li>
          <li><strong>Direct Hardware Integration:</strong> Direct socket communication with Sigma MA5G SDK via Apache Thrift protocol, customized and recompiled for .NET 8.</li>
          <li><strong>Resilient Background Services:</strong> Automated punch collection every 3 minutes with automatic reconnection and retry logic.</li>
          <li><strong>Live Operational Dashboard:</strong> Real-time operational board with 15-second auto-refresh for terminal connectivity and daily logs.</li>
          <li><strong>Smart Attendance Engine:</strong> Automated meal-break detection and distinct processing for regular and shift workers.</li>
          <li><strong>Remote Management & Payroll Export:</strong> Remote terminal clock synchronization and formatted exports (.dat and .csv) for direct payroll integration.</li>
          <li><strong>Centralized Logging:</strong> Full operational audit trail and diagnostic logging with Serilog.</li>
        </ul>

        <h6 class="case-study-heading"><i class="fas fa-check-circle me-2"></i>Result & Impact</h6>
        <p class="case-study-text">Real-time centralized monitoring of all terminals, eliminating manual consolidation and preventing record loss. Formatted automated export drastically reduced payroll preparation turnaround time.</p>

        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>My Role</h6>
        <p class="case-study-text">Solution design, software architecture, hardware protocol integration, and full-stack engineering with C# / .NET 8.</p>
      `
    }
  },
  {
    id: "tuie",
    title: "Tuie Táxi",
    badge: "Mobile App",
    image: "img/Tuie.jpeg",
    tags: ["Flutter", "Firebase", "Maps API", "Payments", "Notifications"],
    isCorporate: false,
    link: "https://github.com/Abmer0One/tuie_taxi_driver/tree/master",
    descriptionShort: {
      pt: "Plataforma de serviços de táxi com geolocalização em tempo real, solicitação de corridas e pagamentos online para condutores e passageiros.",
      en: "Taxi service platform with real-time geolocation, ride requesting and online payments for drivers and passengers."
    },
    details: {
      pt: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Contexto</h6>
        <p class="case-study-text">Plataforma de serviços de táxi desenvolvida para a DENTEC, destinada a conectar passageiros e condutores com corridas acompanhadas em tempo real.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Destaques Técnicos</h6>
        <ul class="case-study-list">
          <li>Geolocalização em tempo real com APIs de mapas</li>
          <li>Solicitação e gestão de corridas integradas</li>
          <li>Pagamentos online incorporados</li>
          <li>Aplicações distintas para condutores e passageiros</li>
          <li>Notificações em tempo real com Firebase</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>Meu Papel</h6>
        <p class="case-study-text">Desenvolvimento da aplicação móvel do condutor em Flutter, incluindo mapas, pagamentos e comunicação em tempo real.</p>`,
      en: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Context</h6>
        <p class="case-study-text">Taxi service platform built for DENTEC, connecting passengers and drivers with real-time tracked rides.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Technical Highlights</h6>
        <ul class="case-study-list">
          <li>Real-time geolocation with Maps APIs</li>
          <li>Integrated ride request and management</li>
          <li>Built-in online payments</li>
          <li>Separate apps for drivers and passengers</li>
          <li>Real-time notifications with Firebase</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>My Role</h6>
        <p class="case-study-text">Development of the driver mobile app in Flutter, including maps, payments and real-time communication.</p>`
    }
  },
  {
    id: "liturgia",
    title: "Liturgia Paz",
    badge: "Mobile App",
    image: "img/liturgia.jpeg",
    tags: ["Flutter", "Firebase", "Chat", "Calendar", "Documents"],
    isCorporate: false,
    link: "https://github.com/Abmer0One/liturgia_paz",
    descriptionShort: {
      pt: "Aplicação móvel para gestão da comissão de liturgia: calendário litúrgico, leituras diárias, grupos, agenda de ensaios, chat e documentos partilhados.",
      en: "Mobile app for liturgy commission management: liturgical calendar, daily readings, groups, rehearsal schedule, chat and shared documents."
    },
    details: {
      pt: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Contexto</h6>
        <p class="case-study-text">Aplicação para gestão integral da comissão de liturgia, centralizando informação antes dispersa em papel e grupos de mensagens.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Destaques Técnicos</h6>
        <ul class="case-study-list">
          <li>Calendário litúrgico com missas e festas</li>
          <li>Leituras diárias e informações sobre santos</li>
          <li>Gestão de grupos litúrgicos e agenda de ensaios</li>
          <li>Chat interno e documentos partilhados</li>
          <li>Notificações e controlo de acessos</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>Meu Papel</h6>
        <p class="case-study-text">Desenvolvimento completo da aplicação (Android/iOS) em Flutter com backend Firebase.</p>`,
      en: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Context</h6>
        <p class="case-study-text">Application for the full management of the liturgy commission, centralizing information previously scattered across paper and messaging groups.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Technical Highlights</h6>
        <ul class="case-study-list">
          <li>Liturgical calendar with masses and festivities</li>
          <li>Daily readings and saints information</li>
          <li>Liturgical group management and rehearsal scheduling</li>
          <li>Internal chat and shared documents</li>
          <li>Notifications and access control</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>My Role</h6>
        <p class="case-study-text">Full development of the application (Android/iOS) in Flutter with a Firebase backend.</p>`
    }
  },
  {
    id: "manta",
    title: "MANTA",
    badge: "Mobile App",
    image: "img/manta.jpeg",
    tags: ["Flutter", "Firebase", "Booking", "Geolocation", "Notifications"],
    isCorporate: false,
    link: "https://github.com/Abmer0One/manta_mobile",
    descriptionShort: {
      pt: "Aplicação de agendamento de serviços de salão de beleza e spa em Luanda: pesquisa, comparação, marcação online e gestão de profissionais.",
      en: "Booking app for beauty salon and spa services in Luanda: search, comparison, online scheduling and professional management."
    },
    details: {
      pt: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Contexto</h6>
        <p class="case-study-text">Aplicação de agendamento de serviços de salão de beleza e spa em Luanda, criada para simplificar a descoberta e a marcação de serviços.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Destaques Técnicos</h6>
        <ul class="case-study-list">
          <li>Pesquisa e comparação de salões e serviços</li>
          <li>Agendamento online com confirmação</li>
          <li>Histórico de agendamentos e notificações</li>
          <li>Gestão de profissionais e disponibilidade</li>
          <li>Suporte à localização</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>Meu Papel</h6>
        <p class="case-study-text">Desenvolvimento da aplicação móvel em Flutter com backend Firebase.</p>`,
      en: `
        <h6 class="case-study-heading"><i class="fas fa-info-circle me-2"></i>Context</h6>
        <p class="case-study-text">Booking application for beauty salon and spa services in Luanda, built to simplify service discovery and scheduling.</p>
        <h6 class="case-study-heading"><i class="fas fa-microchip me-2"></i>Technical Highlights</h6>
        <ul class="case-study-list">
          <li>Salon and service search and comparison</li>
          <li>Online booking with confirmation</li>
          <li>Booking history and notifications</li>
          <li>Professional and availability management</li>
          <li>Location support</li>
        </ul>
        <h6 class="case-study-heading"><i class="fas fa-user-tie me-2"></i>My Role</h6>
        <p class="case-study-text">Development of the mobile application in Flutter with a Firebase backend.</p>`
    }
  }
];

const container = document.getElementById("projects-container");
let currentProjectIndex = null;

function renderProjects(lang) {
    if (!container) return;
    container.innerHTML = '';
    const t = translations[lang] || translations['pt'];

    projects.forEach((project, index) => {
        const col = document.createElement("div");
                col.className = "col-lg-4 col-md-6 fade-in-up";

        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

        col.innerHTML = `
            <div class="project-card h-100 shadow-sm rounded-3 overflow-hidden" onclick="showProjectModal(${index})">
                <div class="project-img-wrap">
                    <img src="${project.image}" alt="${project.title}" class="project-img" />
                    <span class="project-badge">${project.badge}</span>
                </div>
                <div class="project-content">
                    <h5 class="project-title">${project.title}</h5>
                    <p class="project-summary">${project.descriptionShort[lang] || project.descriptionShort.pt}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <span class="project-view-more">${t['projects.view_details'] || 'Ver detalhes'} <i class="fas fa-arrow-right ms-1"></i></span>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function showProjectModal(index) {
    const project = projects[index];
    currentProjectIndex = index;
    const lang = localStorage.getItem('lang') || 'pt';
    const t = translations[lang] || translations['pt'];

    let existingModal = document.getElementById('projectCaseStudyModal');
    if (existingModal) existingModal.remove();

    const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

    // Smart action: corporate projects get an internal-system note, others get a GitHub link
    let actionHtml;
    if (project.isCorporate) {
        actionHtml = `<span class="modal-corporate-note"><i class="fas fa-lock me-2"></i>${t['projects.corporate_internal'] || 'Sistema Corporativo Interno'}</span>`;
    } else {
        actionHtml = `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-custom"><i class="fab fa-github me-2"></i>${t['projects.view_github'] || 'Ver no GitHub'}</a>`;
    }

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'projectCaseStudyModal';
    modal.tabIndex = -1;
    modal.setAttribute('aria-labelledby', 'projectCaseStudyModalLabel');

    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content modal-case-study">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="projectCaseStudyModalLabel">${project.title}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="${t['projects.close'] || 'Fechar'}"></button>
                </div>
                <div class="modal-body">
                    <div class="case-study-img">
                        <img src="${project.image}" alt="${project.title}" class="img-fluid rounded-3">
                    </div>
                    <div class="case-study-techs">${tagsHtml}</div>
                    ${project.details[lang] || project.details.pt}
                </div>
                <div class="modal-footer border-0">
                    ${actionHtml}
                    <button type="button" class="btn btn-secondary-custom" data-bs-dismiss="modal">${t['projects.close'] || 'Fechar'}</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
        if (currentProjectIndex === index) currentProjectIndex = null;
    });
}

// ===== INTERNATIONALIZATION (i18n) SYSTEM =====

const translations = {
    en: {
        // Brand
        "brand": "ABIÚD MOTA",

        // Skip nav
        "skip_nav": "Skip to main content",

        // Navbar
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.experience": "Experience",
        "nav.skills": "Skills",
        "nav.services": "Services",
        "nav.education": "Education",
        "nav.contact": "Contact",
        "nav.language": "Language",
        "nav.portuguese": "Portuguese",
        "nav.english": "English",

        // Hero
        "hero.greeting": "Hi!",
        "hero.title": "Computer Engineer and development team leader",
        "hero.subtitle": "I build and coordinate web, mobile and enterprise solutions, turning complex processes into functional digital products.",
        "hero.support": "Experience in technical leadership, application development and delivery of solutions for real-world contexts.",
        "hero.button": "View Projects",
        "hero.button_contact": "Talk to Me",
        "hero.email": "Email",
        "hero.phone": "Phone",
        "hero.location": "Location",

        // About
        "about.title": "Who am I?",
        "about.subtitle": "Computer Engineer with experience in application development and coordination",
        "about.description": "I am a Computer Engineer with experience in developing and coordinating web, mobile and enterprise applications. I currently lead the application development area at RNT-EP, where I oversee priority setting, technical execution and the evolution of digital solutions. Throughout my career, I have participated in the creation of transport, commerce, delivery and service management applications, combining software development with an understanding of the processes that solutions need to improve.",
        "about.download_cv": "DOWNLOAD CV",

        // Impact Stats
        "stats.years_label": "Years of Experience",
        "stats.apps_label": "Applications Developed",
        "stats.sectors_label": "Industry Sectors",

        // Education
        "education.title": "Education",
        "education.academic_title": "Academic Education",
        "education.degree1": "Computer Engineering",
        "education.school1": "Universidade Metodista de Angola",
        "education.period1": "2013 – 2019",

        // Training
        "training.title": "Professional Training",
        "training.subtitle": "Professional Training",
        "training.course1": "ITIL 4 Foundation",
        "training.org1": "Assertiva",
        "training.course2": "Cybersecurity Fundamentals",
        "training.org2": "Hanzolo Technology, Systems & Security Lda",
        "training.course3": "Corporate Governance and Change Management",
        "training.org3": "Academia BAI",
        "training.course4": "Productivity with Artificial Intelligence",
        "training.org4": "Academia BAI",
        "training.course5": "Data Forensics Processing, Analysis and Visualization Program",
        "training.org5": "Deloitte",

        // Languages
        "languages.title": "Languages",
        "languages.portuguese": "Portuguese",
        "languages.portuguese_level": "Level: Advanced",
        "languages.english": "English",
        "languages.english_level": "Level: Intermediate",

        // Experience
        "experience.title": "Professional Experience",
        "experience.lbl_context": "Context",
        "experience.lbl_challenge": "Challenge",
        "experience.lbl_action": "Action",
        "experience.lbl_result": "Result",
        "experience.rnt.title": "Head of Application Development Division",
        "experience.rnt.period": "Since Feb. 2024",
        "experience.rnt.context": "Leadership of planning, development and evolution of applications and corporate systems.",
        "experience.rnt.challenge": "Coordinate a team and ensure that digital solutions respond to the organisation's operational needs, maintaining quality, predictability and business alignment.",
        "experience.rnt.action": "Priority setting, task distribution, execution monitoring, coordination with internal areas and supervision of technical decisions and application delivery.",
        "experience.rnt.result": "Consolidation of the development team and continuous delivery of digital solutions for the organisation.",
        "experience.dentec.title": "Mobile Developer",
        "experience.dentec.period": "Mar. 2022 – Nov. 2022",
        "experience.dentec.challenge": "Create mobile applications capable of supporting transport operations and ride management in real-time contexts.",
        "experience.dentec.action": "Development of TT-Taxi and Tuie applications, including geolocation, tracking, payments, ride management and mobile interfaces with Flutter.",
        "experience.dentec.result": "Applications launched and operational for drivers and passengers.",
        "experience.metodsoft.title": "Web and Mobile Developer",
        "experience.metodsoft.period": "Apr. 2021 – Nov. 2021",
        "experience.metodsoft.challenge": "Develop digital platforms for e-commerce and healthcare service management.",
        "experience.metodsoft.action": "Creation of the So Vendas app and Consulfarma platform, focused on e-commerce, geolocation, deliveries and order management.",
        "experience.metodsoft.result": "Operational platforms with complete sales and delivery features.",
        "experience.sysgest.title": "HelpDesk Technician",
        "experience.sysgest.period": "Jun. 2019 – Mar. 2021",
        "experience.sysgest.challenge": "Ensure effective technical support for school software and identification systems.",
        "experience.sysgest.action": "Customer service, RFID card issuance and configuration, and specialised technical support for school management software.",
        "experience.sysgest.result": "Consolidated support service with efficient incident resolution.",

        // Skills
        "skills.title": "Technical Skills",
        "skills.mobile_title": "Mobile Development",
        "skills.web_title": "Web Development",
        "skills.backend_title": "Backend, Data and Integration",

        // Services
        "services.title": "Services",
        "services.webdev": "Web Application Development",
        "services.webdev_desc": "Creation of modern, responsive and optimised web applications, including functional interfaces and integration with existing systems.",
        "services.mobiledev": "Mobile Application Development",
        "services.mobiledev_desc": "Development of mobile applications for Android and iOS, including authentication, geolocation, payments and operational management features.",
        "services.integration": "Enterprise Systems and Integration",
        "services.integration_desc": "Development and integration of enterprise systems, specialised technical support and technical project management.",
        "services.complementary_label": "Complementary skills:",
        "services.complementary_items": "UI/UX Design, Technical Support, Project Management",

        // Projects
        "projects.title": "Selected Projects",
        "projects.description": "Case studies of applications I developed, with details on the problem, process and outcome.",
        "projects.view_details": "View details",
        "projects.corporate_internal": "Internal Enterprise System",
        "projects.view_github": "View on GitHub",
        "projects.close": "Close",

        // Contact
        "contact.title": "Shall we turn a need into a digital product?",
        "contact.description": "If you need support in application development, enterprise system evolution or technical leadership of a project, get in touch.",
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

        // Skip nav
        "skip_nav": "Saltar para o conteúdo principal",

        // Navbar
        "nav.home": "Início",
        "nav.projects": "Projetos",
        "nav.experience": "Experiência",
        "nav.skills": "Competências",
        "nav.services": "Serviços",
        "nav.education": "Formação",
        "nav.contact": "Contacto",
        "nav.language": "Idioma",
        "nav.portuguese": "Português",
        "nav.english": "Inglês",

        // Hero
        "hero.greeting": "Olá!",
        "hero.title": "Engenheiro Informático e líder de equipas de desenvolvimento",
        "hero.subtitle": "Crio e coordeno soluções web, mobile e corporativas para transformar processos complexos em produtos digitais funcionais.",
        "hero.support": "Experiência em liderança técnica, desenvolvimento de aplicações e entrega de soluções para contextos reais.",
        "hero.button": "Ver Projetos",
        "hero.button_contact": "Falar Comigo",
        "hero.email": "Email",
        "hero.phone": "Telefone",
        "hero.location": "Localização",

        // About
        "about.title": "Quem sou eu?",
        "about.subtitle": "Engenheiro Informático com experiência em desenvolvimento e coordenação de aplicações",
        "about.description": "Sou Engenheiro Informático com experiência no desenvolvimento e coordenação de aplicações web, mobile e sistemas corporativos. Atualmente lidero a área de desenvolvimento de aplicações na RNT-EP, onde acompanho a definição de prioridades, a execução técnica e a evolução de soluções digitais. Ao longo do meu percurso, participei na criação de aplicações de transporte, comércio, entregas e gestão de serviços, combinando desenvolvimento de software com compreensão dos processos que as soluções precisam de melhorar.",
        "about.download_cv": "DESCARREGAR CV",

        // Impact Stats
        "stats.years_label": "Anos de experiência",
        "stats.apps_label": "Aplicações desenvolvidas",
        "stats.sectors_label": "Setores de atuação",

        // Education
        "education.title": "Formação",
        "education.academic_title": "Formação Académica",
        "education.degree1": "Engenharia Informática",
        "education.school1": "Universidade Metodista de Angola",
        "education.period1": "2013 – 2019",

        // Training
        "training.title": "Formação Profissional",
        "training.subtitle": "Formação Profissional",
        "training.course1": "ITIL 4 Foundation",
        "training.org1": "Assertiva",
        "training.course2": "Fundamentos de Cibersegurança",
        "training.org2": "Hanzolo Tecnologia, Sistemas & Segurança Lda",
        "training.course3": "Governança Corporativa e Gestão da Mudança",
        "training.org3": "Academia BAI",
        "training.course4": "Produtividade com Inteligência Artificial",
        "training.org4": "Academia BAI",
        "training.course5": "Programa em tratamento, análise e visualização forense de dados",
        "training.org5": "Deloitte",

        // Languages
        "languages.title": "Idiomas",
        "languages.portuguese": "Português",
        "languages.portuguese_level": "Nível: Avançado",
        "languages.english": "Inglês",
        "languages.english_level": "Nível: Intermédio",

        // Experience
        "experience.title": "Experiência Profissional",
        "experience.lbl_context": "Contexto",
        "experience.lbl_challenge": "Desafio",
        "experience.lbl_action": "Intervenção",
        "experience.lbl_result": "Resultado",
        "experience.rnt.title": "Chefe de Divisão de Desenvolvimento de Aplicações",
        "experience.rnt.period": "Desde fevereiro de 2024",
        "experience.rnt.context": "Liderança do planeamento, desenvolvimento e evolução de aplicações e sistemas corporativos.",
        "experience.rnt.challenge": "Coordenar uma equipa e garantir que as soluções digitais respondem às necessidades operacionais da organização, mantendo qualidade, previsibilidade e alinhamento com o negócio.",
        "experience.rnt.action": "Definição de prioridades, distribuição de tarefas, acompanhamento da execução, articulação com as áreas internas e supervisão das decisões técnicas e da entrega das aplicações.",
        "experience.rnt.result": "Consolidação da equipa de desenvolvimento e entrega contínua de soluções digitais para a organização.",
        "experience.dentec.title": "Desenvolvedor de Aplicações Móveis",
        "experience.dentec.period": "Março de 2022 – novembro de 2022",
        "experience.dentec.challenge": "Criar aplicações móveis capazes de apoiar operações de transporte e gestão de corridas em contexto real.",
        "experience.dentec.action": "Desenvolvimento das aplicações TT-Taxi e Tuie, incluindo funcionalidades de geolocalização, rastreio, pagamentos, gestão de corridas e interfaces móveis com Flutter.",
        "experience.dentec.result": "Aplicações lançadas e operacionais para condutores e passageiros.",
        "experience.metodsoft.title": "Desenvolvedor Web e Mobile",
        "experience.metodsoft.period": "Abril de 2021 – novembro de 2021",
        "experience.metodsoft.challenge": "Desenvolver plataformas digitais para comércio eletrónico e gestão de serviços de saúde.",
        "experience.metodsoft.action": "Criação da app So Vendas e plataforma Consulfarma, com foco em e-commerce, geolocalização, entregas e gestão de encomendas.",
        "experience.metodsoft.result": "Plataformas operacionais com funcionalidades completas de venda e entrega.",
        "experience.sysgest.title": "Técnico de HelpDesk",
        "experience.sysgest.period": "Junho de 2019 – março de 2021",
        "experience.sysgest.challenge": "Garantir suporte técnico eficaz para software escolar e sistemas de identificação.",
        "experience.sysgest.action": "Atendimento ao cliente, emissão e configuração de cartões RFID, e suporte técnico especializado para software de gestão escolar.",
        "experience.sysgest.result": "Serviço de suporte consolidado com resolução eficiente de incidências.",

        // Skills
        "skills.title": "Competências Técnicas",
        "skills.mobile_title": "Desenvolvimento Mobile",
        "skills.web_title": "Desenvolvimento Web",
        "skills.backend_title": "Backend, Dados e Integração",

        // Services
        "services.title": "Serviços",
        "services.webdev": "Desenvolvimento de Aplicações Web",
        "services.webdev_desc": "Criação de aplicações web modernas, responsivas e otimizadas, incluindo interfaces funcionais e integrações com sistemas existentes.",
        "services.mobiledev": "Desenvolvimento de Aplicações Móveis",
        "services.mobiledev_desc": "Desenvolvimento de aplicações móveis para Android e iOS, incluindo funcionalidades de autenticação, geolocalização, pagamentos e gestão operacional.",
        "services.integration": "Sistemas Corporativos e Integração",
        "services.integration_desc": "Desenvolvimento e integração de sistemas corporativos, suporte técnico especializado e gestão técnica de projetos de software.",
        "services.complementary_label": "Competências complementares:",
        "services.complementary_items": "UI/UX Design, Suporte Técnico, Gestão de Projetos",

        // Projects
        "projects.title": "Projetos Selecionados",
        "projects.description": "Casos de estudo de aplicações que desenvolvi, com detalhe sobre o problema, o processo e o resultado.",
        "projects.view_details": "Ver detalhes",
        "projects.corporate_internal": "Sistema Corporativo Interno",
        "projects.view_github": "Ver no GitHub",
        "projects.close": "Fechar",

        // Contact
        "contact.title": "Vamos transformar uma necessidade num produto digital?",
        "contact.description": "Se procuras apoio no desenvolvimento de aplicações, na evolução de sistemas corporativos ou na liderança técnica de um projeto, entra em contacto comigo.",
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

    // Re-render projects with new language
    renderProjects(lang);

    // Re-open the project modal in the new language if one is open
    const openModalEl = document.getElementById('projectCaseStudyModal');
    if (openModalEl && currentProjectIndex !== null) {
        const openIndex = currentProjectIndex;
        const instance = bootstrap.Modal.getInstance(openModalEl);
        if (instance) instance.hide();
        setTimeout(() => showProjectModal(openIndex), 350);
    }

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

    // Render dynamic projects
    renderProjects(lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Typing effect on hero title
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
                    setTimeout(typeWriter, 80);
                }
            };

            setTimeout(typeWriter, 800);
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
`;
document.head.appendChild(style);

