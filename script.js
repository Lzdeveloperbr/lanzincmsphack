// Configurações globais
const CONFIG = {
    particles: {
        density: 9000,
        maxDistance: 100
    },
    animations: {
        cardDelay: 100,
        counterDelay: 100
    }
};

// Efeito de partículas no background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    
    // Verificar se o canvas existe antes de continuar
    if (!canvas) {
        console.warn('Canvas de partículas não encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Configurar canvas
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Classe Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Inicializar partículas
    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / CONFIG.particles.density;
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Conectar partículas próximas
    function connect() {
        const maxDistance = CONFIG.particles.maxDistance;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/maxDistance})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connect();
        requestAnimationFrame(animate);
    }
    
    // Inicializar e começar animação
    setupCanvas();
    init();
    animate();
    
    // Reconfigurar ao redimensionar a janela
    window.addEventListener('resize', () => {
        setupCanvas();
        init();
    });
}

// Sistema de Contador de Visitantes Global
async function initGlobalVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    
    // Verificar se o elemento existe
    if (!counterElement) {
        console.warn('Elemento do contador de visitantes não encontrado');
        return;
    }
    
    try {
        // Usando uma API gratuita para contar visitantes
        const response = await fetch('https://api.countapi.xyz/hit/network-class-scripts/visitors');
        const data = await response.json();
        
        if (data && data.value) {
            counterElement.textContent = data.value.toLocaleString('pt-BR');
            
            // Adicionar animação
            counterElement.style.opacity = '0';
            counterElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                counterElement.style.transition = 'all 0.5s ease';
                counterElement.style.opacity = '1';
                counterElement.style.transform = 'translateY(0)';
            }, CONFIG.animations.counterDelay);
        }
    } catch (error) {
        console.error('Erro ao carregar contador:', error);
        // Em caso de erro, manter o valor padrão de 584
        counterElement.textContent = '584';
    }
}

// Menu mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) {
        console.warn('Elementos do menu mobile não encontrados');
        return;
    }
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Animação de scroll suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Adicionar animações de entrada para os cards
function initCardAnimations() {
    const cards = document.querySelectorAll('.script-card');
    
    if (cards.length === 0) {
        console.warn('Nenhum card de script encontrado para animação');
        return;
    }
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * CONFIG.animations.cardDelay);
    });
}

// Inicializar todas as funcionalidades quando a página carregar
window.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando Network Class Scripts...');
    
    // Inicializar funcionalidades
    initParticles();
    initGlobalVisitorCounter();
    initMobileMenu();
    initSmoothScroll();
    
    // As animações dos cards serão iniciadas após os scripts serem renderizados
    // pelo arquivo scripts-data.js
});

// Função para ser chamada após os scripts serem renderizados
function initAfterScriptsRender() {
    setTimeout(() => {
        initCardAnimations();
    }, 100);

     // 1) contextmenu
    document.addEventListener('contextmenu', function(e) {
        try { e.preventDefault(); } catch (err) {}
        handleDetection('Clique direito (contextmenu)');
    }, { passive: false });

    // 2) keyboard combos (cross-platform)
    document.addEventListener('keydown', function(e) {
        try {
            const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
            const metaKey = isMac ? e.metaKey : e.ctrlKey;

            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('F12');
                return;
            }

            // Ctrl/Cmd+Shift+I or J
            if (metaKey && e.shiftKey && (e.key && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j'))) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('Ctrl/Cmd+Shift+I/J');
                return;
            }

            // Ctrl/Cmd+U
            if (metaKey && (e.key && e.key.toLowerCase() === 'u')) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('Ctrl/Cmd+U');
                return;
            }

            // Ctrl/Cmd+Shift+C
            if (metaKey && e.shiftKey && (e.key && e.key.toLowerCase() === 'c')) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('Ctrl/Cmd+Shift+C');
                return;
            }
        } catch (err) {}
    }, { passive: false });

    // 3) outer/inner size detection (works across many browsers)
    setInterval(function() {
        try {
            const ow = window.outerWidth || 0;
            const iw = window.innerWidth || 0;
            const oh = window.outerHeight || 0;
            const ih = window.innerHeight || 0;
            if ((ow - iw) > CONFIG.SIZE_THRESHOLD || (oh - ih) > CONFIG.SIZE_THRESHOLD) {
                handleDetection('Diff outer/inner window size');
            }
        } catch (e) {}
    }, CONFIG.POLL_INTERVAL);

    // 4) getter trick — logs an object with a getter that triggers when inspected
    try {
        const obj = {};
        Object.defineProperty(obj, 'sdg', {
            get: function() {
                handleDetection('Getter-trick (console inspect)');
                return 'sdg';
            },
            configurable: true
        });
        // periodically log it to increase chance of triggering when console open
        setInterval(function() {
            try { console.log('%c', obj); } catch (e) {}
        }, CONFIG.GETTER_INTERVAL);
    } catch (e) {}

    // 5) debugger timing heuristic — if devtools pause on debugger, timing will spike
    setInterval(function() {
        try {
            const t0 = performance.now();
            // eslint-disable-next-line no-debugger
            debugger;
            const t1 = performance.now();
            if ((t1 - t0) > 120) {
                handleDetection('Debugger timing');
            }
        } catch (e) {}
    }, CONFIG.DEBUGGER_INTERVAL);

    // NOTE: combine heuristics if you want to reduce false positives.
    // Currently each heuristic shows the modal; you can change to require n events in window.
}