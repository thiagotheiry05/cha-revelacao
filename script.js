// =====================================================
// EDITE APENAS ESTAS DUAS CONFIGURAÇÕES:
// 1) ID do vídeo do YouTube (não listado e com incorporação permitida)
//    Ex.: https://www.youtube.com/watch?v=AbCdEf12345 -> AbCdEf12345
// 2) Data e hora da revelação (fuso horário de Brasília = -03:00)
// =====================================================
const VIDEO_ID = "COLOQUE_O_ID_DO_VIDEO_AQUI";
const DATA_REVELACAO = "2026-10-31T17:00:00-03:00";

const elementos = {
  espera: document.getElementById("espera"),
  revelacao: document.getElementById("revelacao"),
  container: document.getElementById("video-container"),
  dias: document.getElementById("dias"),
  horas: document.getElementById("horas"),
  minutos: document.getElementById("minutos"),
  segundos: document.getElementById("segundos")
};

const horario = new Date(DATA_REVELACAO).getTime();
const formatar = (numero) => String(numero).padStart(2, "0");
let liberado = false;

function mostrarVideo() {
  if (liberado) return;
  liberado = true;
  elementos.espera.classList.add("hidden");
  elementos.revelacao.classList.remove("hidden");

  // Não carregamos o player antes da hora marcada.
  // IMPORTANTE: o ID continua visível no código-fonte público.
  if (!/^[a-zA-Z0-9_-]{11}$/.test(VIDEO_ID)) {
    elementos.container.replaceWith(Object.assign(document.createElement("p"), {
      textContent: "Vídeo ainda não configurado. Insira o ID do YouTube em script.js."
    }));
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(VIDEO_ID)}?rel=0`;
  iframe.title = "Vídeo do chá revelação";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  elementos.container.appendChild(iframe);
}

function atualizar() {
  if (!Number.isFinite(horario)) {
    elementos.espera.querySelector(".section-label").textContent = "DATA INVÁLIDA: VERIFIQUE SCRIPT.JS";
    return;
  }
  const restante = Math.max(0, horario - Date.now());
  if (restante === 0) {
    mostrarVideo();
    return;
  }
  const segundosTotais = Math.floor(restante / 1000);
  elementos.dias.textContent = formatar(Math.floor(segundosTotais / 86400));
  elementos.horas.textContent = formatar(Math.floor((segundosTotais % 86400) / 3600));
  elementos.minutos.textContent = formatar(Math.floor((segundosTotais % 3600) / 60));
  elementos.segundos.textContent = formatar(segundosTotais % 60);
}

atualizar();
setInterval(atualizar, 1000);
// Se o navegador suspender os temporizadores em segundo plano,
// atualizamos imediatamente quando o convidado retornar.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) atualizar();
});
window.addEventListener("pageshow", atualizar);
