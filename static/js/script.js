// Header com scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Scroll suave para seções
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Filtros do Portfólio
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class de todos os botões
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Adiciona active class ao botão clicado
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
        item.classList.remove("hidden");
        // Adiciona animação
        item.style.animation = "fadeInUp 0.6s ease-out";
      } else {
        item.style.display = "none";
        item.classList.add("hidden");
      }
    });
  });
});

// Formulário de Contato
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Pega os valores do formulário
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const service = formData.get("service");
  const message = formData.get("message");

  // Validação básica
  if (!name || !email || !service || !message) {
    showNotification(
      "Por favor, preencha todos os campos obrigatórios.",
      "error"
    );
    return;
  }

  // Simula envio do formulário
  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  // Simula delay de envio
  setTimeout(() => {
    showNotification(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "success"
    );
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Sistema de notificações
function showNotification(message, type = "info") {
  // Remove notificação anterior se existir
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Adiciona estilos
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#27ae60"
            : type === "error"
            ? "#8B0000"
            : "#B22222"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  document.body.appendChild(notification);

  // Anima entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Botão fechar
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove após 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Animação de entrada dos elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observa elementos para animação
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .stat, .about-content > div"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + "+";
    }
  }, 16);
}

// Anima contadores quando a seção about estiver visível
const aboutSection = document.querySelector(".about");
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = document.querySelectorAll(".stat h3");
        counters.forEach((counter) => {
          const target = parseInt(counter.textContent);
          animateCounter(counter, target);
        });
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

aboutObserver.observe(aboutSection);

// Efeito parallax suave no hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
});

// Validação de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validação de telefone brasileiro
function isValidPhone(phone) {
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  return phoneRegex.test(phone);
}

// Adiciona validação em tempo real
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (emailInput.value && !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = "#8B0000";
        showNotification("Por favor, insira um email válido.", "error");
      } else {
        emailInput.style.borderColor = "#e1e8ed";
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", () => {
      if (phoneInput.value && !isValidPhone(phoneInput.value)) {
        phoneInput.style.borderColor = "#8B0000";
        showNotification("Por favor, insira um telefone válido.", "error");
      } else {
        phoneInput.style.borderColor = "#e1e8ed";
      }
    });
  }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Loading state para imagens (quando adicionar imagens reais)
function preloadImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.style.transition = "opacity 0.3s ease";
    if (img.complete && img.naturalWidth !== 0) {
      img.style.opacity = "1";
    } else {
      img.style.opacity = "0";
      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
    }
  });
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();

  // Adiciona classe para animações CSS
  document.body.classList.add("loaded");

  // Mostra uma mensagem de boas-vindas
  setTimeout(() => {
    showNotification(
      "Bem-vindo ao site da Luiza Lopes A.Arte da Fotografia! 📸",
      "info"
    );
  }, 1000);
});

// Função para alternar tema claro/escuro (opcional)
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Carrega tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

// Slider Hero
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector("#slider-hero .slider-track");
  const slides = track.querySelectorAll("li");
  const prevBtn = document.querySelector("#slider-hero .slider-prev");
  const nextBtn = document.querySelector("#slider-hero .slider-next");
  const dotsContainer = document.querySelector(".hero-image .slider-dots");
  let index = 0;

  function slideTo(i) {
    track.style.transform = `translateX(-${i * 100}%)`;
    index = i;
    updateDots();
  }

  function updateDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === index) dot.classList.add("active");
      dot.addEventListener("click", () => slideTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  prevBtn.addEventListener("click", () => {
    index = Math.max(index - 1, 0);
    slideTo(index);
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    slideTo(index);
  });

  // Inicializa
  slideTo(0);
});
