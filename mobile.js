/* ==========================================================
   CHECK.IN — MOBILE.JS
   ID: MOBJS-001 | REF: APP.SIDEBAR.TOGGLE
   Responsabilidade: controlar abertura e recolhimento
   do painel lateral e sua animação de entrada.
========================================================== */

(function () {
    "use strict";

    var BREAKPOINT_MOBILE = 652;

    var botaoMenu = document.querySelector("[data-menu-lateral-toggle]");
    var painelLateral = document.getElementById("painel-esquerdo");

    if (!botaoMenu || !painelLateral) {
        return;
    }

    var mediaMobile = typeof window.matchMedia === "function"
        ? window.matchMedia("(max-width: " + BREAKPOINT_MOBILE + "px)")
        : null;

    function estaNoMobile() {
        return mediaMobile
            ? mediaMobile.matches
            : window.innerWidth <= BREAKPOINT_MOBILE;
    }

    function atualizarEstado(aberto, animarEntrada) {

        /* No desktop, o painel permanece sempre visível. */
        if (!estaNoMobile()) {
            painelLateral.classList.remove("painel-abrindo");
            painelLateral.hidden = false;

            botaoMenu.setAttribute("aria-expanded", "true");
            botaoMenu.setAttribute("aria-label", "Menu lateral");

            return;
        }

        var estavaFechado = painelLateral.hidden;

        painelLateral.hidden = !aberto;

        /* MOBJS-002 — Animação de entrada do painel */
        if (aberto && animarEntrada && estavaFechado) {

            painelLateral.classList.remove("painel-abrindo");

            /* Reinicia a animação a cada abertura. */
            void painelLateral.offsetWidth;

            painelLateral.classList.add("painel-abrindo");

        } else if (!aberto) {

            painelLateral.classList.remove("painel-abrindo");

        }

        botaoMenu.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );

        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Recolher menu lateral" : "Abrir menu lateral"
        );
    }

    /* Estado inicial. */
    atualizarEstado(!painelLateral.hidden, false);

    /* Botão Menu. */
    botaoMenu.addEventListener("click", function () {

        if (!estaNoMobile()) return;

        atualizarEstado(painelLateral.hidden, true);

    });

    /* Clique fora recolhe o painel. */
    document.addEventListener("click", function (evento) {

        if (!estaNoMobile() || painelLateral.hidden) return;

        if (
            painelLateral.contains(evento.target) ||
            botaoMenu.contains(evento.target)
        ) {
            return;
        }

        atualizarEstado(false, false);

    }, false);

    /* Escape recolhe o painel. */
    document.addEventListener("keydown", function (evento) {

        if (!estaNoMobile() || painelLateral.hidden) return;

        if (evento.key === "Escape" || evento.key === "Esc") {

            atualizarEstado(false, false);

            botaoMenu.focus();
        }

    }, false);

    /* Redimensionamento da tela. */
    window.addEventListener("resize", function () {

        atualizarEstado(!painelLateral.hidden, false);

    }, false);

    /* ==========================================================
   MOBJS-003 | REF: PANEL.FINANCIAL.DUE_DATE.MOBILE
   FUNÇÃO: FORMATO CURTO DE VENCIMENTO NO MOBILE
========================================================== */

function atualizarFormatoDatasVencimento() {

    var datas = document.querySelectorAll(
        ".financeiro-conta-data[datetime]"
    );

    datas.forEach(function (elemento) {

        /* Preserva o texto original para o desktop. */
        if (!elemento.hasAttribute("data-texto-desktop")) {
            elemento.setAttribute(
                "data-texto-desktop",
                elemento.textContent
            );
        }

        var dataISO = elemento.getAttribute("datetime");

        var partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dataISO);

        if (!partes) return;

        if (estaNoMobile()) {

            var dia = partes[3];
            var mes = partes[2];
            var ano = partes[1].slice(-2);

            var dataCurta = dia + "/" + mes + "/" + ano;

            if (elemento.textContent.trim() !== dataCurta) {
                elemento.textContent = dataCurta;
            }

        } else {

            var textoOriginal = elemento.getAttribute(
                "data-texto-desktop"
            );

            if (elemento.textContent !== textoOriginal) {
                elemento.textContent = textoOriginal;
            }

        }

    });

}

/* Aplicação inicial. */
atualizarFormatoDatasVencimento();

/* Atualiza ao mudar o tamanho da tela. */
window.addEventListener(
    "resize",
    atualizarFormatoDatasVencimento,
    false
);

})();

