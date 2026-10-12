/* ================= PERSONALIZA AQUÍ ================= */
const CONFIG = {
  nombre: "mi amor",                       // su nombre, ej. "Valeria"
  cancion: "musica/music.mp3",                             // opcional: su canción, ej. "musica/cancion.mp3". Vacío = cajita musical
  inicio: new Date(2025, 8, 12, 0, 0, 0),  // 12 sep 2025 (mes 8 = septiembre)

  // Fotos: deja src vacío para el marco decorativo, o pon la ruta/archivo de la foto.
  fotos: [
    { src: "fotos/1.jpeg", texto: "" },
    { src: "fotos/3.jpeg", texto: "" },
    { src: "fotos/6.jpeg", texto: "" },
    { src: "fotos/11.jpeg", texto: "" },
    { src: "fotos/13.jpeg", texto: "" },
    { src: "fotos/15.jpeg", texto: "" }
  ],
  slides: [
    { src: "fotos/5.jpeg", titulo: "", fecha: "" },
    { src: "fotos/7.jpeg", titulo: "", fecha: "" },
    { src: "fotos/9.jpeg", titulo: "", fecha: "" },
    { src: "fotos/10.jpeg", titulo: "", fecha: "" },
    { src: "fotos/14.jpeg", titulo: "", fecha: "" }
  ],
  historia: [
    { fecha: "12 · 09 · 2025", titulo: "Empezamos", texto: "El día que dijimos que sí y empezó lo nuestro." },
    { fecha: "Primeras semanas", titulo: "Aprendiendo de ti", texto: "Mensajes hasta tarde, nervios bonitos y ganas de verte siempre." },
    { fecha: "Diciembre 2025", titulo: "Nuestras primeras fiestas", texto: "Celebrar contigo hizo que todo brillara más." },
    { fecha: "12 · 09 · 2026", titulo: "Un año", texto: "Trescientos sesenta y cinco días y te sigo eligiendo." },
    { fecha: "12 · 10 · 2026", titulo: "Trece meses", texto: "Hoy. Y lo que falta, que es lo mejor." }
  ],
  cuando: [
    { titulo: "estés triste", texto: "Respira. Eres más fuerte de lo que crees y no estás sola. Llámame, que voy a estar ahí." },
    { titulo: "me extrañes", texto: "Cierra los ojos y piensa en nuestro último abrazo. Yo también te estoy extrañando ahora mismo." },
    { titulo: "no puedas dormir", texto: "Mira la luna. Es la misma que veo yo, y le pido que te cuide hasta que te vea." },
    { titulo: "dudes de ti", texto: "Te veo cada día y lo que veo es increíble. Créeme a mí cuando no puedas creerte a ti." }
  ],
  razones: [
    "Tu risa, que arregla cualquier día malo.",
    "Cómo me miras cuando crees que no me doy cuenta.",
    "Tu forma de cuidar a los que quieres.",
    "Que contigo puedo ser yo mismo, sin miedo.",
    "Tus abrazos, que se sienten como llegar a casa.",
    "Tu paciencia conmigo, incluso cuando no la merezco.",
    "Lo bonita que te ves sin darte cuenta.",
    "Nuestras conversaciones que nunca quiero terminar.",
    "Tu manera de soñar en grande.",
    "Que me haces querer ser mejor persona.",
    "Tus mensajes de buenos días.",
    "Cómo conviertes lo simple en algo especial.",
    "Que me elegiste, y me sigues eligiendo."
  ],
  vales: [
    "Una cita sorpresa planeada por mí",
    "Un día entero sin celulares, solo nosotros",
    "Un desayuno hecho con amor",
    "Una maratón de pelis con abrazos ilimitados",
    "Un masaje sin quejarme",
    "Ganar una discusión, sin preguntas"
  ]
};
/* ==================================================== */

const $ = (s) => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".nombre").forEach((n) => (n.textContent = CONFIG.nombre));

const tonos = [
  ["#7c2a3e", "#c98a6b"], ["#4a2341", "#b46b7a"], ["#6b3a2e", "#e0b07a"],
  ["#3b2348", "#8f6c9e"], ["#5a1f30", "#e8a3a8"], ["#2f2a44", "#c9a87a"]
];
const corazonSVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';

function medio(src, i, texto) {
  if (src) {
    const img = document.createElement("img");
    img.className = "foto"; img.src = src; img.alt = texto || ""; img.loading = "lazy";
    return img.outerHTML;
  }
  const [a, b] = tonos[i % tonos.length];
  return '<div class="vacia" style="background:radial-gradient(circle at 30% 25%,' + b + ',' + a + ' 70%)">' + corazonSVG + '<span>Foto ' + (i + 1) + '</span></div>';
}

// Lunas
["sep","oct","nov","dic","ene","feb","mar","abr","may","jun","jul","ago","sep"].forEach((m) => {
  const d = document.createElement("div"); d.className = "luna";
  d.innerHTML = "<i></i><span>" + m + "</span>"; $("#lunas").appendChild(d);
});

// Collage
const giros = [["-4deg","0px"],["3deg","18px"],["-2deg","-6px"],["5deg","10px"],["-3deg","-4px"],["2deg","14px"]];
CONFIG.fotos.forEach((f, i) => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "polaroid";
  b.style.setProperty("--r", giros[i % giros.length][0]);
  b.style.setProperty("--y", giros[i % giros.length][1]);
  b.setAttribute("aria-label", "Ver foto: " + f.texto);
  b.innerHTML = '<div class="marco">' + medio(f.src, i, f.texto) + '</div><figcaption></figcaption>';
  b.querySelector("figcaption").textContent = f.texto;
  b.addEventListener("click", () => abrirLuz(f, i, b));
  $("#collage").appendChild(b);
});

// Lightbox
function abrirLuz(f, i, origen) {
  const l = document.createElement("div");
  l.className = "luz"; l.setAttribute("role", "dialog"); l.setAttribute("aria-modal", "true");
  l.innerHTML = '<figure><div class="marco">' + medio(f.src, i, f.texto) + '</div><figcaption></figcaption></figure><button class="cerrar" type="button" aria-label="Cerrar">×</button>';
  l.querySelector("figcaption").textContent = f.texto;
  const cerrar = () => { l.remove(); document.removeEventListener("keydown", esc); origen.focus(); };
  const esc = (e) => { if (e.key === "Escape") cerrar(); };
  l.addEventListener("click", (e) => { if (e.target === l || e.target.classList.contains("cerrar")) cerrar(); });
  document.addEventListener("keydown", esc);
  document.body.appendChild(l);
  l.querySelector(".cerrar").focus();
}

// Slider
const pista = $("#pista"), puntos = $("#puntos");
CONFIG.slides.forEach((s, i) => {
  const d = document.createElement("div"); d.className = "slide";
  d.setAttribute("aria-roledescription", "diapositiva");
  d.innerHTML = '<div class="medio">' + medio(s.src, i + 2, s.titulo) + '</div><div class="pie"><small></small><b></b></div>';
  d.querySelector("small").textContent = s.fecha;
  d.querySelector("b").textContent = s.titulo;
  pista.appendChild(d);
  const p = document.createElement("button"); p.type = "button";
  p.setAttribute("aria-label", "Ir a la foto " + (i + 1));
  p.addEventListener("click", () => ir(i, true));
  puntos.appendChild(p);
});
let actual = 0, timer;
function ir(n, manual) {
  const total = CONFIG.slides.length;
  actual = (n + total) % total;
  pista.style.transform = "translateX(" + (-actual * 100) + "%)";
  [...pista.children].forEach((s, i) => s.classList.toggle("activa", i === actual));
  [...puntos.children].forEach((p, i) => p.setAttribute("aria-current", i === actual));
  if (manual) reiniciar();
}
function reiniciar() { clearInterval(timer); if (!reduce) timer = setInterval(() => ir(actual + 1), 5000); }
$("#prev").addEventListener("click", () => ir(actual - 1, true));
$("#next").addEventListener("click", () => ir(actual + 1, true));
$("#slider").addEventListener("mouseenter", () => clearInterval(timer));
$("#slider").addEventListener("mouseleave", reiniciar);
let x0 = null;
const ventana = document.querySelector(".ventana");
ventana.addEventListener("pointerdown", (e) => (x0 = e.clientX));
ventana.addEventListener("pointerup", (e) => {
  if (x0 === null) return;
  const dx = e.clientX - x0; x0 = null;
  if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1), true);
});
ir(0); reiniciar();

// Historia
CONFIG.historia.forEach((h) => {
  const li = document.createElement("li"); li.className = "hito";
  li.innerHTML = "<i></i><div><small></small><h3></h3><p></p></div>";
  li.querySelector("small").textContent = h.fecha;
  li.querySelector("h3").textContent = h.titulo;
  li.querySelector("p").textContent = h.texto;
  $("#historia").appendChild(li);
});

// Ábrela cuando
CONFIG.cuando.forEach((c) => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "tarjeta"; b.setAttribute("aria-pressed", "false");
  b.innerHTML = '<div class="giro"><div class="cara frente"><small>Ábrela cuando</small><b></b><span>♥</span></div><div class="cara atras"><p></p></div></div>';
  b.querySelector("b").textContent = c.titulo + "…";
  b.querySelector(".atras p").textContent = c.texto;
  b.addEventListener("click", () => b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"));
  $("#cuando").appendChild(b);
});

// Razones
CONFIG.razones.forEach((r, i) => {
  const li = document.createElement("li"); li.className = "razon";
  li.innerHTML = '<span class="n">' + (i + 1) + "</span><p></p>";
  li.querySelector("p").textContent = r;
  $("#razones").appendChild(li);
});

// Vales
let canjeados = [];
try { canjeados = JSON.parse(localStorage.getItem("vales13") || "[]"); } catch (e) {}
CONFIG.vales.forEach((v, i) => {
  const d = document.createElement("div"); d.className = "vale";
  d.innerHTML = "<small>Vale por</small><b></b>";
  d.querySelector("b").textContent = v;
  const sellar = () => { const e = document.createElement("span"); e.className = "estampa"; e.textContent = "Canjeado"; d.appendChild(e); };
  if (canjeados.includes(i)) { sellar(); }
  else {
    const btn = document.createElement("button"); btn.type = "button"; btn.textContent = "Canjear";
    btn.addEventListener("click", (ev) => {
      btn.remove(); sellar(); canjeados.push(i);
      try { localStorage.setItem("vales13", JSON.stringify(canjeados)); } catch (e) {}
      corazones(ev.clientX, ev.clientY, 10);
    });
    d.appendChild(btn);
  }
  $("#vales").appendChild(d);
});

// Contador
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  const ms = Math.max(0, Date.now() - CONFIG.inicio.getTime());
  let s = Math.floor(ms / 1000);
  const dias = Math.floor(s / 86400); s %= 86400;
  $("#c-dias").textContent = dias;
  $("#c-horas").textContent = pad(Math.floor(s / 3600));
  $("#c-min").textContent = pad(Math.floor((s % 3600) / 60));
  $("#c-seg").textContent = pad(s % 60);
  $("#c-semanas").textContent = Math.floor(dias / 7);
  $("#c-latidos").textContent = Math.floor(ms / 60000 * 72 / 1e6) + " M";
}
tick(); setInterval(tick, 1000);

// Carta
$("#sobre").addEventListener("click", () => {
  $("#sobre-wrap").hidden = true; $("#carta").hidden = false; petalos(22);
});

// Efectos
function petalos(n) {
  if (reduce) return;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span"); p.className = "petalo";
    p.style.left = Math.random() * 100 + "vw";
    p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
    p.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
    p.style.animationDuration = 4 + Math.random() * 4 + "s";
    p.style.animationDelay = Math.random() * 1.5 + "s";
    p.style.opacity = .5 + Math.random() * .5;
    document.body.appendChild(p); setTimeout(() => p.remove(), 10000);
  }
}
function corazones(x, y, n) {
  if (reduce) return;
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span"); c.className = "corazon"; c.textContent = "♥";
    c.style.left = x - 8 + "px"; c.style.top = y - 10 + "px";
    c.style.setProperty("--dx", (Math.random() * 80 - 40) + "px");
    c.style.setProperty("--s", 10 + Math.random() * 14 + "px");
    c.style.animationDelay = Math.random() * .2 + "s";
    document.body.appendChild(c); setTimeout(() => c.remove(), 1600);
  }
}
document.addEventListener("click", (e) => {
  if (e.target.closest("button,a,.luz")) return;
  corazones(e.clientX, e.clientY, 4);
});

const frases = ["Entonces, por trece meses más… y todos los que vengan.", "Te amo. Hoy y siempre.", "Contigo, todo.", "Eres mi lugar favorito."];
let k = 0;
$("#si").addEventListener("click", (e) => {
  $("#respuesta").textContent = frases[k++ % frases.length];
  petalos(40); corazones(e.clientX, e.clientY, 14);
});

// Cajita musical (melodía original sintetizada)
let ctx = null, sonando = false, paso = 0, prog;
const nota = (n) => 440 * Math.pow(2, (n - 69) / 12);
const melodia = [72,76,79,84, 83,79,76,79, 81,77,74,77, 79,76,72,76,
                 69,72,76,81, 79,76,72,76, 77,74,71,74, 72,67,72,76];
function tocar(midi, t) {
  const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
  o.type = "triangle"; o2.type = "sine";
  o.frequency.value = nota(midi); o2.frequency.value = nota(midi) * 2;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(.12, t + .01);
  g.gain.exponentialRampToValueAtTime(.0005, t + 1.6);
  const g2 = ctx.createGain(); g2.gain.value = .25;
  o.connect(g); o2.connect(g2); g2.connect(g); g.connect(ctx.destination);
  o.start(t); o2.start(t); o.stop(t + 1.7); o2.stop(t + 1.7);
}
function bucle() {
  const t = ctx.currentTime + .05;
  tocar(melodia[paso % melodia.length], t);
  if (paso % 4 === 0) tocar(melodia[paso % melodia.length] - 24, t);
  paso++;
}
let audio = null;
if (CONFIG.cancion) { audio = new Audio(CONFIG.cancion); audio.loop = true; audio.volume = .7; }
function iniciarMusica() {
  if (sonando) return;
  try {
    if (audio) {
      audio.play().then(() => { sonando = true; $("#musica").setAttribute("aria-pressed", "true"); }).catch(() => {});
      return;
    }
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctx.resume();
    sonando = true;
    $("#musica").setAttribute("aria-pressed", "true");
    bucle(); prog = setInterval(bucle, 380);
  } catch (e) {}
}
function pararMusica() {
  sonando = false;
  $("#musica").setAttribute("aria-pressed", "false");
  if (audio) audio.pause(); else clearInterval(prog);
}
$("#musica").addEventListener("click", () => (sonando ? pararMusica() : iniciarMusica()));

// Bienvenida: al abrir, empieza la música
const intro = $("#intro");
document.body.classList.add("cerrado");
function entrar() {
  intro.classList.add("fuera");
  document.body.classList.remove("cerrado");
  iniciarMusica();
  petalos(30);
  setTimeout(() => intro.remove(), 1300);
}
$("#entrar").addEventListener("click", entrar);
$("#entrar").focus();
// Respaldo: si la bienvenida ya no está, la primera interacción enciende la música
["pointerdown", "keydown", "touchstart"].forEach((ev) =>
  document.addEventListener(ev, function primera() {
    if (!document.getElementById("intro") && !sonando) iniciarMusica();
    document.removeEventListener(ev, primera);
  }, { once: true })
);

// Cielo estrellado con estrellas fugaces
const cv = $("#cielo"), cx = cv.getContext("2d");
let est = [], fugaz = null;
function size() {
  const dpr = window.devicePixelRatio || 1;
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  est = Array.from({ length: Math.round(innerWidth * innerHeight / 8500) }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.2 + .2, f: Math.random() * 6.3, v: .5 + Math.random() * 1.5
  }));
}
function draw(t) {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  for (const e of est) {
    const a = reduce ? .6 : .3 + .55 * Math.abs(Math.sin(e.f + t / 1000 * e.v));
    cx.fillStyle = "rgba(246,236,224," + a + ")";
    cx.beginPath(); cx.arc(e.x, e.y, e.r, 0, 6.283); cx.fill();
  }
  if (!reduce) {
    if (!fugaz && Math.random() < .003) fugaz = { x: Math.random() * innerWidth, y: Math.random() * innerHeight * .4, l: 0 };
    if (fugaz) {
      fugaz.l += 1;
      const x = fugaz.x + fugaz.l * 9, y = fugaz.y + fugaz.l * 4;
      const gr = cx.createLinearGradient(x, y, x - 90, y - 40);
      gr.addColorStop(0, "rgba(232,195,138,.9)"); gr.addColorStop(1, "rgba(232,195,138,0)");
      cx.strokeStyle = gr; cx.lineWidth = 1.4;
      cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x - 90, y - 40); cx.stroke();
      if (fugaz.l > 50) fugaz = null;
    }
    requestAnimationFrame(draw);
  }
}
size(); addEventListener("resize", size); requestAnimationFrame(draw);
