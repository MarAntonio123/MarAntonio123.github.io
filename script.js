/* ==========================================================
   PERSONALIZA SOLO ESTA PARTE
   ========================================================== */
const CONFIG = {
  tuNombre: "MARCO ANTONIO CHOQQUE HUAMANI",
  nombrePareja: "YENNY ASUCENA APARICIO SUCASACA",

  // Formato recomendado: AAAA-MM-DDT00:00:00
  fechaInicio: "2025-09-12T00:00:00",

  // Frases que aparecerán con efecto máquina de escribir
  frases: [
    "Mi lugar favorito siempre será contigo.",
    "Tú haces especiales mis días normales.",
    "Y volvería a encontrarte una y mil veces."
  ],

  // Cambia estas razones por cosas reales de tu relación
  razones: [
    {
      titulo: "Tu forma de sonreír",
      texto: "Porque incluso en un día difícil tienes esa manera de cambiar completamente mi ánimo."
    },
    {
      titulo: "Cómo me escuchas",
      texto: "Porque contigo siento que puedo hablar de cualquier cosa y seguir siendo completamente yo."
    },
    {
      titulo: "Nuestras locuras",
      texto: "Porque no importa el plan: contigo hasta lo improvisado termina convirtiéndose en recuerdo."
    },
    {
      titulo: "Tu corazón",
      texto: "Porque admiro la forma en que quieres, ayudas, cuidas y haces sentir especiales a las personas."
    },
    {
      titulo: "La calma que me das",
      texto: "Porque a veces un abrazo tuyo dice mucho más que cualquier palabra."
    },
    {
      titulo: "Todo lo que somos",
      texto: "Porque amo nuestra historia completa: lo bonito, lo imperfecto, lo aprendido y todo lo que viene."
    }
  ]
};

/* ==========================================================
   ELEMENTOS
   ========================================================== */
const welcomeScreen = document.getElementById("welcomeScreen");
const startExperience = document.getElementById("startExperience");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const heartsLayer = document.getElementById("heartsLayer");
const cursorGlow = document.getElementById("cursorGlow");

let musicPlaying = false;
let typeTimer;
let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

/* ==========================================================
   PERSONALIZACIÓN AUTOMÁTICA
   ========================================================== */
function applyPersonalization() {
  const ids = {
    yourName: CONFIG.tuNombre,
    partnerName: CONFIG.nombrePareja,
    signatureName: CONFIG.tuNombre,
    finalPartnerName: CONFIG.nombrePareja,
    footerName: CONFIG.tuNombre,
    letterPartnerName: CONFIG.nombrePareja,
    letterYourName: CONFIG.tuNombre
  };

  Object.entries(ids).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });

  const startDate = new Date(CONFIG.fechaInicio);

  const prettyDate = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(startDate);

  document.getElementById("anniversaryPretty").textContent = prettyDate;
  document.getElementById("letterDate").textContent = prettyDate;

  document.title = `${CONFIG.tuNombre} & ${CONFIG.nombrePareja} ❤️`;
}

/* ==========================================================
   EXPERIENCIA INICIAL + MÚSICA
   ========================================================== */
async function startPage() {
  welcomeScreen.classList.add("hide");
  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 28);

  try {
    bgMusic.volume = 0.55;
    await bgMusic.play();
    musicPlaying = true;
    musicBtn.classList.add("playing");
  } catch (error) {
    // Algunos navegadores pueden bloquear el audio.
    musicPlaying = false;
    musicBtn.classList.remove("playing");
  }
}

async function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove("playing");
  } else {
    try {
      await bgMusic.play();
      musicPlaying = true;
      musicBtn.classList.add("playing");
    } catch (error) {
      console.log("El navegador bloqueó la reproducción automática.");
    }
  }
}

startExperience.addEventListener("click", startPage);
musicBtn.addEventListener("click", toggleMusic);

/* ==========================================================
   CONTADOR DE TIEMPO JUNTOS
   ========================================================== */
function updateCounter() {
  const now = new Date();
  const start = new Date(CONFIG.fechaInicio);
  let diff = now - start;

  const caption = document.getElementById("counterCaption");

  // Si la fecha está en el futuro, funciona como cuenta regresiva.
  if (diff < 0) {
    diff = Math.abs(diff);
    caption.textContent = "Contando los segundos para nuestra fecha especial.";
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").textContent = days.toLocaleString("es-ES");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

/* ==========================================================
   EFECTO MÁQUINA DE ESCRIBIR
   ========================================================== */
function typeWriter() {
  const target = document.getElementById("typewriter");
  const phrase = CONFIG.frases[phraseIndex];

  if (!deleting) {
    target.textContent = phrase.slice(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === phrase.length) {
      deleting = true;
      typeTimer = setTimeout(typeWriter, 1900);
      return;
    }
  } else {
    target.textContent = phrase.slice(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % CONFIG.frases.length;
    }
  }

  typeTimer = setTimeout(typeWriter, deleting ? 34 : 66);
}

/* ==========================================================
   TARJETAS DE RAZONES
   ========================================================== */
function renderReasons() {
  const grid = document.getElementById("reasonsGrid");

  CONFIG.razones.forEach((reason, index) => {
    const card = document.createElement("article");
    card.className = "reason-card reveal";
    card.innerHTML = `
      <span class="reason-number">${String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>${reason.titulo}</h3>
        <p>${reason.texto}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================
   APARICIÓN AL HACER SCROLL
   ========================================================== */
function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.13
  });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ==========================================================
   FOTOS / LIGHTBOX
   ========================================================== */
function setupImages() {
  document.querySelectorAll(".photo-card img").forEach((img) => {
    img.addEventListener("error", () => img.classList.add("is-missing"));
  });

  const modal = document.getElementById("photoModal");
  const modalImage = document.getElementById("modalImage");

  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");

      if (img.classList.contains("is-missing")) return;

      modalImage.src = card.dataset.full;
      openModal(modal);
    });
  });
}

/* ==========================================================
   CARTA
   ========================================================== */
document.getElementById("openLetter").addEventListener("click", (event) => {
  const modal = document.getElementById("letterModal");
  const rect = event.currentTarget.getBoundingClientRect();

  burstHearts(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    18
  );

  setTimeout(() => openModal(modal), 180);
});

/* ==========================================================
   MODALES
   ========================================================== */
function openModal(modal) {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(document.getElementById(button.dataset.close));
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.show").forEach(closeModal);
  }
});

/* ==========================================================
   CORAZONES FLOTANTES
   ========================================================== */
function createFloatingHeart() {
  if (document.hidden) return;

  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.25 ? "♥" : "♡";

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${10 + Math.random() * 15}px`;
  heart.style.opacity = `${0.25 + Math.random() * 0.45}`;
  heart.style.setProperty("--drift-x", `${-60 + Math.random() * 120}px`);
  heart.style.animationDuration = `${7 + Math.random() * 6}s`;

  heartsLayer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(createFloatingHeart, 950);

function burstHearts(x, y, amount = 24) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > 0.15 ? "♥" : "♡";

    heart.style.position = "fixed";
    heart.style.zIndex = "600";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = "none";
    heart.style.color = i % 4 === 0 ? "#e9c48c" : "#ef8eaa";
    heart.style.fontSize = `${12 + Math.random() * 18}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 180;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 45;
    const rotate = -140 + Math.random() * 280;

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(.5)", opacity: 0 },
        { opacity: 1, offset: 0.12 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rotate}deg) scale(1.2)`,
          opacity: 0
        }
      ],
      {
        duration: 1100 + Math.random() * 800,
        easing: "cubic-bezier(.17,.67,.3,1)",
        fill: "forwards"
      }
    ).onfinish = () => heart.remove();

    document.body.appendChild(heart);
  }
}

document.getElementById("heartBurstBtn").addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  burstHearts(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    55
  );
});

/* ==========================================================
   BRILLO DEL CURSOR
   ========================================================== */
window.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

/* ==========================================================
   INICIO
   ========================================================== */
applyPersonalization();
renderReasons();
setupRevealObserver();
setupImages();
typeWriter();

// Hace visible el primer bloque aunque el navegador cargue ya desplazado.
setTimeout(() => {
  document.querySelectorAll(".hero .reveal").forEach(el => el.classList.add("visible"));
}, 350);
