// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyricss");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Haneure bitnadon byori", time: 15 },
  { text: "Jo molli bitnadon byori", time: 18 },
  { text: "Ne mame neryowannabwa", time: 27 },
  { text: "Gaseume segyojin byori", time: 32 },
  { text: "Gaseume bitnadon byori", time: 33 },
  { text: "Ama noin-got gata", time: 41 },
  { text: "Ttollineun soriga deullini", time: 47 },
  { text: "O star", time: 54 },
  { text: "Tteugoun simjangeul neukkini", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Yo my star Aju oren mon yetnalbuto na kkumkkwowatdon sarangi", time: 72 },
  { text: "Noin-gol ara", time: 78 },
  { text: "Onjena hamkke hejwo", time: 83 },
  { text: "Aju oren siganeul-lodo", time: 91 },
  { text: "Neul gateun jarieso bitnajugil", time: 97 },
  { text: "Nemam noegeman billyojulge", time: 104 },
  { text: "Gaseume segyojin byori", time: 108 },
  { text: "Gaseume bitnadon byori", time: 144 },
  { text: "Ama noin-got gata", time: 148 },
  { text: "O star", time: 153 },
  { text: "Tteugoun simjangeul neukkini", time: 158 },
  { text: "Yo my star Aju oren mon yetnalbuto na kkumkkwowatdon sarangi", time: 164 },
  { text: "Noin-gol ara", time: 169 },
  { text: "Onjena hamkke hejwo", time: 176 },
  { text: "Aju oren siganeul-lodo", time: 183 },
  { text: "Neul gateun jarieso bitnajugil", time: 188 },
  { text: "Nemam noegeman julge", time: 140 },
  { text: "Nimamsoge segyojin byoldo", time: 176 },
  { text: "Nimamsok bitnadon byoldo", time: 183 },
  { text: "Naege marhe yongwonhi nol saranghe", time: 188 },
  { text: "Nemam noman barabolgoya", time: 140 },
  { text: "Tto nodo namaneul barabwa julle", time: 164 },
  { text: "Uri soroye byori dwe jugil", time: 169 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);