
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

        /* MOBJS-002 — Animação de abertura em cascata */
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

    /* Estado inicial: preserva o comportamento atual. */
    atualizarEstado(!painelLateral.hidden, false);

    /* Botão Menu */
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

})();
