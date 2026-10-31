// =====================================================
// EDITE APENAS A DATA E OS LINKS ABAIXO, SE NECESSÁRIO.
// Use -03:00 para o horário de Brasília.
// =====================================================
const DATA_REVELACAO = "2026-10-31T14:20:00-03:00";
const CANVA_EMBED_URL = "https://www.canva.com/design/DAHZhHBylhY/JK335Q0j8npqzE62g3a4dA/watch?embed";
const CANVA_VIDEO_URL = "https://www.canva.com/design/DAHZhHBylhY/JK335Q0j8npqzE62g3a4dA/watch";

const espera = document.getElementById("espera");
const revelacao = document.getElementById("revelacao");
const container = document.getElementById("video-container");
const erro = document.getElementById("erro");
const alvo = new Date(DATA_REVELACAO).getTime();
let playerCriado = false;

function mostrarRevelacao() {
  espera.hidden = true;
  revelacao.hidden = false;
  if (playerCriado) return;
  const iframe = document.createElement("iframe");
  iframe.src = CANVA_EMBED_URL;
  iframe.title = "Vídeo do chá revelação no Canva";
  iframe.allow = "fullscreen";
  iframe.allowFullscreen = true;
  iframe.loading = "eager";
  container.appendChild(iframe);
  document.getElementById("abrir-canva").href = CANVA_VIDEO_URL;
  playerCriado = true;
}

function atualizar() {
  if (!Number.isFinite(alvo)) {
    erro.hidden = false;
    erro.textContent = "Data inválida. Confira DATA_REVELACAO no script.js.";
    return;
  }
  const restante = Math.max(0, alvo - Date.now());
  if (restante === 0) {
    mostrarRevelacao();
    return;
  }
  const total = Math.floor(restante / 1000);
  const valores = {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60
  };
  for (const [id, valor] of Object.entries(valores)) {
    document.getElementById(id).textContent = String(valor).padStart(2, "0");
  }
}

atualizar();
setInterval(atualizar, 1000);
// Corrige a contagem quando o celular volta de uma aba suspensa.
document.addEventListener("visibilitychange", () => { if (!document.hidden) atualizar(); });
window.addEventListener("pageshow", atualizar);
