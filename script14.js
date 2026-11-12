// ===================================================
//  CONFIGURACIÓN: edita todo lo que quieras aquí
// ===================================================
const CONFIG = {
  // Día en que empezaron a ser novios (año-mes-día, hora Lima)
  fechaInicio: "2025-09-12T00:00:00-05:00",

  // Mensaje que se escribe solo
  mensaje:
    "Mi amor, hoy celebramos 1 año y 2 meses de tenerte a mi lado. Cada día contigo es mi lugar favorito del mundo. ¡Te amo! 💕",

  // Fotos: guarda tus imágenes en una carpeta "fotos" junto a index.html
  fotos: [
    { src: "fotos/aniver1.jpeg", texto: "Recuerdo 1 ☕" },
    { src: "fotos/aniver10.jpeg", texto: "Recuerdo 1 😂" },
    { src: "fotos/aniver11.jpeg", texto: "Recuerdo 1 🌄" },
    { src: "fotos/aniver14.jpeg", texto: "Recuerdo 1💖" },
    { src: "fotos/aniver12.jpeg", texto: "Recuerdo 1 🧸" },
  ],

  // Tarjetas que giran al tocarlas
  razones: [
    { icono: "😊", titulo: "Tu sonrisa", texto: "Ilumina hasta mis días más difíciles." },
    { icono: "🤗", titulo: "Tus abrazos", texto: "Son mi lugar seguro favorito del mundo." },
    { icono: "😂", titulo: "Tu risa", texto: "Me contagias alegría sin esfuerzo." },
    { icono: "🧠", titulo: "Tu forma de ser", texto: "Eres inteligente, dulce y auténtica." },
    { icono: "🫶", titulo: "Cómo me cuidas", texto: "Siempre estás pendiente de mí." },
    { icono: "🌙", titulo: "Nuestras charlas", texto: "Contigo hasta el silencio se siente bonito." },
  ],

  // Línea de tiempo: edita los recuerdos
  hitos: [
    { fecha: "Sep 2025", texto: "Empezó nuestra historia 💕" },
    { fecha: "Hoy", texto: "¡1 año y 2 meses de amor! 🎉" },
  ],
};

// ===================================================
//  Utilidades
// ===================================================
const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const aleatorio = (min, max) => min + Math.random() * (max - min);
const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];
const SIMBOLOS = ["♥", "💖", "💕", "♡", "💗"];
const PETALOS = ["🌸", "🌷", "💮"];
const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===================================================
//  Flotantes de fondo (corazones y pétalos)
// ===================================================
function lanzarFlotante(padre, texto, clase, duracion, tamano) {
  const el = document.createElement("span");
  el.className = clase;
  el.textContent = texto;
  el.style.left = aleatorio(0, 100) + "vw";
  el.style.fontSize = tamano + "px";
  el.style.animationDuration = duracion + "s";
  padre.appendChild(el);
  setTimeout(() => el.remove(), duracion * 1000);
}

// ===================================================
//  Explosión de corazones
// ===================================================
function explotar(x, y, cantidad = 14) {
  for (let i = 0; i < cantidad; i++) {
    const h = document.createElement("span");
    h.className = "burst";
    h.textContent = elegir(SIMBOLOS);
    const angulo = Math.random() * Math.PI * 2;
    const distancia = aleatorio(60, 150);
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.setProperty("--dx", Math.cos(angulo) * distancia + "px");
    h.style.setProperty("--dy", Math.sin(angulo) * distancia + "px");
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}

// ===================================================
//  Destellos que siguen al cursor (solo mouse)
// ===================================================
function activarDestellos() {
  if (menosMovimiento) return;
  let ultimo = 0;
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const ahora = Date.now();
    if (ahora - ultimo < 60) return; // limita la cantidad
    ultimo = ahora;
    const s = document.createElement("span");
    s.className = "destello";
    s.textContent = elegir(["✦", "✧", "♥"]);
    s.style.color = elegir(["#ff8fab", "#c8a2ff", "#ffd166"]);
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    s.style.setProperty("--dx", aleatorio(-30, 30) + "px");
    s.style.setProperty("--dy", aleatorio(-30, 30) + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  });
}

// ===================================================
//  Contador y próximo mesiversario
// ===================================================
const inicioMs = new Date(CONFIG.fechaInicio).getTime();

function actualizarContador() {
  const s = Math.max(0, Math.floor((Date.now() - inicioMs) / 1000));
  $("dias").textContent = Math.floor(s / 86400);
  $("horas").textContent = pad(Math.floor((s % 86400) / 3600));
  $("minutos").textContent = pad(Math.floor((s % 3600) / 60));
  $("segundos").textContent = pad(s % 60);
}

function actualizarMesiversario() {
  const inicio = new Date(CONFIG.fechaInicio);
  const hoy = new Date();
  const dia = inicio.getDate();
  let objetivo = new Date(hoy.getFullYear(), hoy.getMonth(), dia);
  if (objetivo <= hoy) objetivo = new Date(hoy.getFullYear(), hoy.getMonth() + 1, dia);
  const dias = Math.ceil((objetivo - hoy) / 86400000);
  const texto =
    hoy.getDate() === dia
      ? "¡Hoy es nuestro mesiversario! 🎉"
      : `Faltan ${dias} días para nuestro próximo mesiversario 💕`;
  $("proximo").textContent = texto;
}

// ===================================================
//  Carrusel de fotos
// ===================================================
let indiceFoto = 0;
let autoplay = null;

function construirCarrusel() {
  CONFIG.fotos.forEach((f, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.src = f.src;
    img.alt = f.texto;
    img.loading = "lazy";
    // Si la foto no existe, muestra un marco bonito en su lugar
    img.onerror = () => {
      slide.innerHTML = `
        <div class="placeholder">
          <span>📷</span>
          <p>Agrega tu foto en<br><b>${f.src}</b></p>
        </div>
        <div class="pie">${f.texto}</div>`;
    };
    img.addEventListener("click", () => {
      if (img.naturalWidth) abrirLightbox(img.src);
    });

    const pie = document.createElement("div");
    pie.className = "pie";
    pie.textContent = f.texto;

    slide.appendChild(img);
    slide.appendChild(pie);
    $("pista").appendChild(slide);

    const punto = document.createElement("button");
    punto.className = "punto";
    punto.type = "button";
    punto.setAttribute("aria-label", "Ir a la foto " + (i + 1));
    punto.addEventListener("click", () => irFoto(i, true));
    $("puntos").appendChild(punto);
  });

  $("prev").addEventListener("click", () => irFoto(indiceFoto - 1, true));
  $("next").addEventListener("click", () => irFoto(indiceFoto + 1, true));

  // Deslizar con el dedo en el celular
  let inicioX = 0;
  $("carrusel").addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
  }, { passive: true });
  $("carrusel").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 40) irFoto(indiceFoto + (dx < 0 ? 1 : -1), true);
  });

  irFoto(0, false);
  iniciarAutoplay();
}

function irFoto(n, reiniciar) {
  const total = CONFIG.fotos.length;
  indiceFoto = (n + total) % total;
  $("pista").style.transform = `translateX(-${indiceFoto * 100}%)`;
  document.querySelectorAll(".punto").forEach((p, i) =>
    p.classList.toggle("activo", i === indiceFoto)
  );
  if (reiniciar) iniciarAutoplay();
}

function iniciarAutoplay() {
  clearInterval(autoplay);
  if (menosMovimiento) return;
  autoplay = setInterval(() => irFoto(indiceFoto + 1, false), 4500);
}

// Visor ampliado
function abrirLightbox(src) {
  $("lb-img").src = src;
  $("lightbox").classList.add("abierto");
}

function cerrarLightbox() {
  $("lightbox").classList.remove("abierto");
}

// ===================================================
//  Razones (tarjetas que giran)
// ===================================================
function construirRazones() {
  CONFIG.razones.forEach((r) => {
    const tarjeta = document.createElement("button");
    tarjeta.type = "button";
    tarjeta.className = "razon";
    tarjeta.innerHTML = `
      <div class="razon-inner">
        <div class="cara frente">
          <span class="icono">${r.icono}</span>
          <b>${r.titulo}</b>
        </div>
        <div class="cara dorso">${r.texto}</div>
      </div>`;
    tarjeta.addEventListener("click", () => tarjeta.classList.toggle("girada"));
    $("razones").appendChild(tarjeta);
  });
}

// ===================================================
//  Línea de tiempo
// ===================================================
function construirLinea() {
  CONFIG.hitos.forEach((h) => {
    const li = document.createElement("li");
    li.className = "hito";
    const fecha = document.createElement("b");
    fecha.textContent = h.fecha;
    const texto = document.createElement("span");
    texto.textContent = h.texto;
    li.appendChild(fecha);
    li.appendChild(texto);
    $("linea").appendChild(li);
  });
}

// ===================================================
//  Mensaje con efecto de escritura
// ===================================================
function escribir(el, texto, velocidad = 40) {
  const letras = Array.from(texto);
  let i = 0;
  el.textContent = "";
  el.classList.add("escribiendo");
  const t = setInterval(() => {
    el.textContent += letras[i++];
    if (i >= letras.length) {
      clearInterval(t);
      el.classList.remove("escribiendo");
    }
  }, velocidad);
}

// ===================================================
//  Música generada en el navegador (sin archivos externos)
// ===================================================
let ctxAudio = null;
let sonando = false;
let reloj = null;
let compas = 0;

const ACORDES = [
  [261.63, 329.63, 392.0],
  [220.0, 261.63, 329.63],
  [174.61, 220.0, 261.63],
  [196.0, 246.94, 293.66],
];
const MELODIA = [
  659.25, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25, 587.33,
  659.25, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33, 659.25,
];

function nota(freq, inicio, duracion, tipo, volumen) {
  const osc = ctxAudio.createOscillator();
  const gain = ctxAudio.createGain();
  osc.type = tipo;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, inicio);
  gain.gain.exponentialRampToValueAtTime(volumen, inicio + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
  osc.connect(gain);
  gain.connect(ctxAudio.destination);
  osc.start(inicio);
  osc.stop(inicio + duracion + 0.05);
}

function tocarCompas() {
  const t0 = ctxAudio.currentTime + 0.05;
  ACORDES[compas % ACORDES.length].forEach((f) => nota(f, t0, 1.6, "triangle", 0.035));
  for (let i = 0; i < 8; i++) {
    nota(MELODIA[(compas * 8 + i) % MELODIA.length], t0 + i * 0.2, 0.55, "sine", 0.12);
  }
  compas++;
}

function actualizarBotonMusica() {
  $("btn-musica").textContent = sonando ? "⏸ Pausar música" : "🎵 Poner música";
}

// Melodía generada (se usa si no hay un archivo musica.mp3 en la carpeta)
function reproducirSintetizada() {
  if (!ctxAudio) ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  ctxAudio.resume().then(() => {
    // Solo arranca si el navegador realmente dejó sonar el audio
    if (sonando || ctxAudio.state !== "running") return;
    tocarCompas();
    reloj = setInterval(tocarCompas, 1600);
    sonando = true;
    actualizarBotonMusica();
    quitarArranqueAutomatico();
  }).catch(() => {});
}

// Usa tu canción (musica.mp3) si existe; si no, la melodía generada
function reproducirMusica() {
  if (sonando) return;
  const archivo = $("musica");
  if (archivo && archivo.getAttribute("src")) {
    archivo.volume = 0.5;
    archivo.play()
      .then(() => {
        sonando = true;
        actualizarBotonMusica();
        quitarArranqueAutomatico();
      })
      .catch(() => reproducirSintetizada());
    return;
  }
  reproducirSintetizada();
}

function pausarMusica() {
  if (!sonando) return;
  const archivo = $("musica");
  if (archivo && !archivo.paused) archivo.pause();
  clearInterval(reloj);
  if (ctxAudio) ctxAudio.suspend();
  sonando = false;
  actualizarBotonMusica();
}

function alternarMusica() {
  if (sonando) pausarMusica();
  else reproducirMusica();
}

// Intenta sonar al abrir la página. Si el navegador lo bloquea (lo hace casi siempre),
// empieza con el primer toque, clic o tecla de la persona.
const EVENTOS_ARRANQUE = ["pointerdown", "keydown", "touchstart", "scroll"];

function intentarArranqueAutomatico() {
  reproducirMusica();
}

function quitarArranqueAutomatico() {
  EVENTOS_ARRANQUE.forEach((ev) =>
    document.removeEventListener(ev, intentarArranqueAutomatico, true)
  );
}

function musicaAutomatica() {
  try {
    if (!ctxAudio) ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    return; // el navegador no soporta audio
  }
  // Si el navegador ya permite sonido, suena de una vez
  if (ctxAudio.state === "running") {
    reproducirMusica();
    return;
  }
  // Si no, suena con el primer toque, clic o tecla de la persona
  EVENTOS_ARRANQUE.forEach((ev) =>
    document.addEventListener(ev, intentarArranqueAutomatico, { capture: true, passive: true })
  );
}

// ===================================================
//  Inicio
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  // Fondo
  for (let i = 0; i < 16; i++) setTimeout(() => lanzarFlotante($("fondo"), elegir(SIMBOLOS), "corazon", aleatorio(6, 12), aleatorio(12, 30)), i * 250);
  setInterval(() => lanzarFlotante($("fondo"), elegir(SIMBOLOS), "corazon", aleatorio(6, 12), aleatorio(12, 30)), 700);
  setInterval(() => lanzarFlotante($("petalos"), elegir(PETALOS), "petalo", aleatorio(9, 15), aleatorio(16, 26)), 1400);

  // Contenido
  actualizarContador();
  setInterval(actualizarContador, 1000);
  actualizarMesiversario();
  construirCarrusel();
  construirRazones();
  construirLinea();
  setTimeout(() => escribir($("mensaje"), CONFIG.mensaje), 600);

  // Destellos y explosión de bienvenida
  activarDestellos();
  setTimeout(() => explotar(window.innerWidth / 2, 200, 20), 400);

  // Música: intenta sonar sola; si el navegador lo exige, la pantalla de entrada la activa
  musicaAutomatica();

  // Pantalla de entrada: el toque inicia la música y muestra la página
  const intro = $("intro");
  const entrar = () => {
    reproducirMusica();
    intro.classList.add("oculto");
    setTimeout(() => intro.remove(), 900);
  };
  intro.addEventListener("click", entrar);
  intro.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") entrar();
  });

  // Osos: tocarlos hace explotar corazones
  ["panda", "oso"].forEach((id) => {
    $(id).addEventListener("click", (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      explotar(r.left + r.width / 2, r.top + r.height / 3);
    });
  });

  // Abrazo: los osos se acercan y explotan corazones
  $("btn-abrazo").addEventListener("click", (e) => {
    const escena = $("escena");
    const abrazado = escena.classList.toggle("abrazo");
    e.currentTarget.textContent = abrazado ? "👋 Soltar abrazo" : "🤗 Dar un abrazo";
    if (abrazado) {
      const r = escena.getBoundingClientRect();
      explotar(r.left + r.width / 2, r.top + r.height / 3, 22);
    }
  });

  // Música y sorpresa
  $("btn-musica").addEventListener("click", alternarMusica);
  $("btn-sorpresa").addEventListener("click", (e) => {
    const carta = $("carta");
    carta.classList.toggle("visible");
    if (carta.classList.contains("visible")) {
      const r = e.currentTarget.getBoundingClientRect();
      explotar(r.left + r.width / 2, r.top);
      carta.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Visor de fotos
  $("lb-cerrar").addEventListener("click", cerrarLightbox);
  $("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") cerrarLightbox();
  });
});
