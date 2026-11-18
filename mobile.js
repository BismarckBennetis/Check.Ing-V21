
/* ==========================================================
   CHECK.IN — MOBILE.JS
   ID: MOBJS-001 | REF: APP.SIDEBAR.TOGGLE
   Responsabilidade: abrir e recolher o painel lateral no mobile.
   Não altera as funcionalidades de script.js.
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

    function atualizarEstado(aberto) {
        if (!estaNoMobile()) {
            painelLateral.hidden = false;
            botaoMenu.setAttribute("aria-expanded", "true");
            botaoMenu.setAttribute("aria-label", "Menu lateral");
            return;
        }

        painelLateral.hidden = !aberto;
        botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Recolher menu lateral" : "Abrir menu lateral"
        );
    }

    atualizarEstado(!painelLateral.hidden);

    botaoMenu.addEventListener("click", function () {
        if (!estaNoMobile()) return;
        atualizarEstado(painelLateral.hidden);
    });

    document.addEventListener("click", function (evento) {
        if (!estaNoMobile() || painelLateral.hidden) return;

        if (
            painelLateral.contains(evento.target) ||
            botaoMenu.contains(evento.target)
        ) {
            return;
        }

        atualizarEstado(false);
    }, false);

    document.addEventListener("keydown", function (evento) {
        if (!estaNoMobile() || painelLateral.hidden) return;

        if (evento.key === "Escape" || evento.key === "Esc") {
            atualizarEstado(false);
            botaoMenu.focus();
        }
    }, false);

    window.addEventListener("resize", function () {
        atualizarEstado(!painelLateral.hidden);
    }, false);
})();
