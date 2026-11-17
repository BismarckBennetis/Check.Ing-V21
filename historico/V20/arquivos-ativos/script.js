  /* ID: JS-001 | REF: PANEL.CALENDAR.INITIAL_STATE | ESTADO E DATAS INICIAIS */
  /* ==================================================
    CALENDÁRIO CHECK-IN
    Objetivo: mostrar o mês atual e o próximo mês.
    ================================================== */

  /* Obtém a data de hoje usando o computador */
  let hoje = new Date();
  let temporizadorAtualizacao = null;

  /* Define os nomes dos meses em português */
  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  /* Obtém o mês atual e o ano atual */
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  /* Calcula o primeiro dia do próximo mês */
  const proximoMes = new Date(anoAtual, mesAtual + 1, 1);

  /* ==================================================
    PREENCHER OS DIAS DOS CALENDÁRIOS
    Objetivo: mostrar os dias da semana e os números
    de cada mês nas posições corretas.
    ================================================== */

  /* Define as abreviações dos dias da semana,
    começando pelo domingo. */
  const nomesDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  /* ID: JS-002 | REF: PANEL.CALENDAR.DAY_RENDERING | GERAÇÃO DOS DIAS DO CALENDÁRIO */
  /* Preenche um calendário com o mês, o ano e os dias correspondentes. */
  function preencherCalendario(identificador, mes, ano) {
    /* Localiza o cartão do calendário que será atualizado. */
    const calendario = document.querySelector(identificador);

    /* Localiza os espaços do título, do ano e dos dias. */
    const titulo = calendario.querySelector(".calendario-titulo");
    const anoElemento = calendario.querySelector(".calendario-ano");
    const cabecalhoDias = calendario.querySelector(".calendario-dias-semana");
    const gradeDias = calendario.querySelector(".calendario-dias");

    /* Atualiza o nome do mês e o ano exibidos no cabeçalho. */
    titulo.textContent = nomesMeses[mes];
    anoElemento.textContent = ano;

    /* Guarda o mês e o ano exibidos para permitir a navegação. */
    calendario.dataset.mes = mes;
    calendario.dataset.ano = ano;

    /* Limpa os nomes e números anteriores antes de desenhar novamente. */
    cabecalhoDias.innerHTML = "";
    gradeDias.innerHTML = "";

    /* Adiciona os sete nomes dos dias da semana. */
    nomesDias.forEach(function (nome) {
      const diaSemana = document.createElement("span");
      diaSemana.textContent = nome;
      cabecalhoDias.appendChild(diaSemana);
    });

    /* Descobre em qual dia da semana o mês começa. */
    const primeiroDia = new Date(ano, mes, 1).getDay();

    /* Descobre quantos dias existem neste mês. */
    const quantidadeDias = new Date(ano, mes + 1, 0).getDate();

    /* Verifica se este calendário mostra o mês e o ano atuais. */
  const dataAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
  );

    /* Cria espaços vazios antes do primeiro dia do mês. */
    for (let i = 0; i < primeiroDia; i++) {
      const espacoVazio = document.createElement("span");
      gradeDias.appendChild(espacoVazio);
    }

    /* Cria uma célula para cada dia do mês. */
for (let numeroDia = 1; numeroDia <= quantidadeDias; numeroDia++) {
    const celulaDia = document.createElement("span");
    celulaDia.classList.add("calendario-dia");
    celulaDia.textContent = numeroDia;

    /* Compara a data completa com a data atual. */
    const dataCelula = new Date(ano, mes, numeroDia);

    /* Marca os dias anteriores. */
    if (dataCelula < dataAtual) {
        celulaDia.classList.add("dia-passado");
    }

    /* Destaca o dia atual. */
    if (dataCelula.getTime() === dataAtual.getTime()) {
        celulaDia.classList.add("hoje");
    }

    /* Adiciona o número à grade. */
    gradeDias.appendChild(celulaDia);
}

}
  
  /* Preenche o calendário do mês atual. */
  preencherCalendario("#calendario-atual", mesAtual, anoAtual);

  /* Preenche o calendário do próximo mês. */
  preencherCalendario(
    "#calendario-proximo",
    proximoMes.getMonth(),
    proximoMes.getFullYear(),
  );

  /* ID: JS-003 | REF: PANEL.CALENDAR.MONTH_NAVIGATION | NAVEGAÇÃO MENSAL */
  /* ==================================================
    NAVEGAÇÃO DOS CALENDÁRIOS
    Permite avançar ou voltar um mês pelas setas.
    ================================================== */

  /* Localiza os dois calendários da página. */
  const calendarios = document.querySelectorAll(".calendario");

  /* Configura as setas de cada calendário separadamente. */
  calendarios.forEach(function (calendario) {
    /* Localiza o botão que volta um mês. */
    const setaAnterior = calendario.querySelector(".seta-anterior");

    /* Localiza o botão que avança um mês. */
    const setaProxima = calendario.querySelector(".seta-proxima");

    /* Volta um mês quando a seta esquerda é clicada. */
    setaAnterior.addEventListener("click", function () {
      /* Lê o mês e o ano mostrados neste calendário. */
      let mes = Number(calendario.dataset.mes);
      let ano = Number(calendario.dataset.ano);

      /* Calcula o mês anterior, inclusive na mudança de ano. */
      mes--;

      if (mes < 0) {
        mes = 11;
        ano--;
      }

      /* Atualiza este calendário com o mês anterior. */
      preencherCalendario("#" + calendario.id, mes, ano);
    });

    /* Avança um mês quando a seta direita é clicada. */
    setaProxima.addEventListener("click", function () {
      /* Lê o mês e o ano mostrados neste calendário. */
      let mes = Number(calendario.dataset.mes);
      let ano = Number(calendario.dataset.ano);

      /* Calcula o próximo mês, inclusive na mudança de ano. */
      mes++;

      if (mes > 11) {
        mes = 0;
        ano++;
      }

      /* Atualiza este calendário com o próximo mês. */
      preencherCalendario("#" + calendario.id, mes, ano);
    });
  });

  /* ID: JS-004 | REF: APP.CLOCK_AND_CALENDAR.DATE_SYNC | RELÓGIO E ATUALIZAÇÃO DIÁRIA */
  function verificarDataEAgendarAtualizacao() {
    const agora = new Date();

      const horarioValor = document.querySelector(".horario-valor");
      const dataValor = document.querySelector(".data-valor");
      const diaData = dataValor.querySelector(".data-dia");
      const mesData = dataValor.querySelector(".data-mes");
      const anoData = dataValor.querySelector(".data-ano");

      horarioValor.textContent =
      String(agora.getHours()).padStart(2, "0") +
      ":" +
      String(agora.getMinutes()).padStart(2, "0");

      diaData.textContent = String(agora.getDate()).padStart(2, "0");
      mesData.textContent = String(agora.getMonth() + 1).padStart(2, "0");
      anoData.textContent = agora.getFullYear();

    const mudouDia =
      agora.getFullYear() !== hoje.getFullYear() ||
      agora.getMonth() !== hoje.getMonth() ||
      agora.getDate() !== hoje.getDate();

    if (mudouDia) {
      hoje = agora;

      calendarios.forEach(function (calendario) {
        preencherCalendario(
          "#" + calendario.id,
          Number(calendario.dataset.mes),
          Number(calendario.dataset.ano),
        );
      });
    }

    clearTimeout(temporizadorAtualizacao);

    const proximoMinuto = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate(),
      agora.getHours(),
      agora.getMinutes() + 1,
    );

    temporizadorAtualizacao = setTimeout(
      verificarDataEAgendarAtualizacao,
      proximoMinuto.getTime() - agora.getTime(),
    );
  }

  /* ID: JS-005 | REF: APP.CLOCK.VISIBILITY_REFRESH | RETORNO DA ABA AO PRIMEIRO PLANO */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      verificarDataEAgendarAtualizacao();
    }
  });

  verificarDataEAgendarAtualizacao();

  /* Utilitário compartilhado pelos controladores de rolagem. */
  function limitarValor(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
  }

  /* ID: JS-006 | REF: COMPONENT.SCROLLBAR.HORIZONTAL | SELETOR: .rotina-barra-horizontal[data-scroll-for] */
  /* UMA ROTINA COMPARTILHADA: CADA BARRA CONTROLA SOMENTE scrollLeft */
  (function configurarBarrasHorizontais() {

    const barras = document.querySelectorAll(
      '.rotina-barra-horizontal[data-scroll-for]'
    );

    if (!barras.length) return;

    barras.forEach(function (barra) {
      if (barra.dataset.scrollInitialized === 'horizontal') return;

      const lista = document.getElementById(barra.dataset.scrollFor);
      const trilho = barra.querySelector('.rotina-barra-trilho');
      const cursor = barra.querySelector('.rotina-barra-cursor');

      if (!lista || !trilho || !cursor) return;

      barra.dataset.scrollInitialized = 'horizontal';

      let arrastando = false;
      let deslocamentoCursor = 0;

      function obterMedidas() {
  const larguraTrilho = trilho.clientWidth;
  const larguraVisivel = lista.clientWidth;
  const larguraTotal = lista.scrollWidth;

  const rolagemMaxima = Math.max(
    0,
    larguraTotal - larguraVisivel
  );

  if (!larguraTrilho) {
    return {
      larguraTrilho: 0,
      larguraCursor: 0,
      deslocamentoMaximo: 0,
      rolagemMaxima: rolagemMaxima
    };
  }

  const proporcaoVisivel = rolagemMaxima > 0 && larguraTotal > 0
    ? larguraVisivel / larguraTotal
    : 1;

  const larguraMinima = Math.min(28, larguraTrilho);

  const larguraCursor = Math.min(
    larguraTrilho,
    Math.max(larguraMinima, larguraTrilho * proporcaoVisivel)
  );

  return {
    larguraTrilho: larguraTrilho,
    larguraCursor: larguraCursor,
    deslocamentoMaximo: Math.max(0, larguraTrilho - larguraCursor),
    rolagemMaxima: rolagemMaxima
  };
}

      function atualizarBarra() {
        const medidas = obterMedidas();
        if (!medidas.larguraTrilho) return;

        const progresso = medidas.rolagemMaxima > 0
          ? limitarValor(lista.scrollLeft / medidas.rolagemMaxima, 0, 1)
          : 0;

        cursor.style.width = medidas.larguraCursor + 'px';
        cursor.style.left = (medidas.deslocamentoMaximo * progresso) + 'px';

        barra.setAttribute('aria-valuenow', String(Math.round(progresso * 100)));
        barra.setAttribute('aria-disabled', medidas.rolagemMaxima > 0 ? 'false' : 'true');
      }

      function moverListaPeloCursor(posicaoX) {
        const medidas = obterMedidas();
        if (medidas.rolagemMaxima <= 0 || medidas.deslocamentoMaximo <= 0) return;

        const retangulo = trilho.getBoundingClientRect();
        const novaPosicao = limitarValor(
          posicaoX - retangulo.left - deslocamentoCursor,
          0,
          medidas.deslocamentoMaximo
        );

        const progresso = novaPosicao / medidas.deslocamentoMaximo;
        lista.scrollLeft = progresso * medidas.rolagemMaxima;
        atualizarBarra();
      }

      barra.addEventListener('pointerdown', function (evento) {
        if (evento.pointerType === 'mouse' && evento.button !== 0) return;
        if (obterMedidas().rolagemMaxima <= 0) return;

        const cursorClicado = evento.target === cursor || cursor.contains(evento.target);

        if (cursorClicado) {
          deslocamentoCursor = evento.clientX - cursor.getBoundingClientRect().left;
        } else {
          deslocamentoCursor = cursor.offsetWidth / 2;
          moverListaPeloCursor(evento.clientX);
        }

        arrastando = true;
        barra.setPointerCapture(evento.pointerId);
        evento.preventDefault();
      });

      barra.addEventListener('pointermove', function (evento) {
        if (!arrastando) return;
        moverListaPeloCursor(evento.clientX);
      });

      function finalizarArraste() {
        arrastando = false;
      }

      barra.addEventListener('pointerup', finalizarArraste);
      barra.addEventListener('pointercancel', finalizarArraste);
      barra.addEventListener('lostpointercapture', finalizarArraste);

      /* A rolagem vertical nativa não é interceptada nem modificada aqui. */
      lista.addEventListener('scroll', atualizarBarra, { passive: true });
      window.addEventListener('resize', atualizarBarra, { passive: true });

      barra.addEventListener('keydown', function (evento) {
        const passo = 40;
        const maximo = Math.max(
  0,
  lista.scrollWidth - lista.clientWidth
);

if (evento.key === 'ArrowRight') {
  lista.scrollLeft = Math.min(maximo, lista.scrollLeft + passo);
} else if (evento.key === 'ArrowLeft') {
  lista.scrollLeft = Math.max(0, lista.scrollLeft - passo);
} else if (evento.key === 'Home') {
  lista.scrollLeft = 0;
} else if (evento.key === 'End') {
  lista.scrollLeft = maximo;
} else {
  return;
}

        evento.preventDefault();
        atualizarBarra();
      });

      if (typeof ResizeObserver !== 'undefined') {
        const observadorDeTamanho = new ResizeObserver(atualizarBarra);
        observadorDeTamanho.observe(lista);
        observadorDeTamanho.observe(trilho);
        Array.from(lista.children).forEach(function (item) {
          observadorDeTamanho.observe(item);
        });
      }

      if (typeof MutationObserver !== 'undefined') {
        const observadorDeConteudo = new MutationObserver(function () {
          atualizarBarra();
        });
        observadorDeConteudo.observe(lista, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });
      }

      atualizarBarra();
    });
  })();


/* ID: JS-007 | REF: COMPONENT.SCROLLBAR.VERTICAL | CONTROLADORES INDEPENDENTES */
/* Cada barra manipula exclusivamente o scrollTop do elemento indicado em data-scrollbar-for. */
(function configurarBarrasVerticais() {
  const barras = document.querySelectorAll('.ci-scrollbar-vertical[data-scrollbar-for]');
  if (!barras.length) return;

  barras.forEach((barra) => {
    if (barra.dataset.scrollInitialized === 'vertical') return;

    const lista = document.getElementById(barra.dataset.scrollbarFor);
    const trilho = barra.querySelector('.ci-scrollbar-trilho');
    const cursor = barra.querySelector('.ci-scrollbar-cursor');
    const ancora = barra.parentElement;
    if (!lista || !trilho || !cursor || !ancora) return;

    barra.dataset.scrollInitialized = 'vertical';
    let arrastando = false;
    let deslocamentoCursor = 0;

    function medidas() {
      const alturaTrilho = trilho.clientHeight;
      const alturaVisivel = lista.clientHeight;
      const alturaTotal = lista.scrollHeight;
      const rolagemMaxima = Math.max(0, alturaTotal - alturaVisivel);
      if (!alturaTrilho || !alturaVisivel || !alturaTotal) {
        return { alturaTrilho, alturaCursor: 0, deslocamentoMaximo: 0, rolagemMaxima };
      }
      const proporcao = rolagemMaxima > 0 ? alturaVisivel / alturaTotal : 1;
      const alturaMinima = Math.min(26, alturaTrilho);
      const alturaCursor = Math.min(alturaTrilho, Math.max(alturaMinima, alturaTrilho * proporcao));
      return {
        alturaTrilho,
        alturaCursor,
        deslocamentoMaximo: Math.max(0, alturaTrilho - alturaCursor),
        rolagemMaxima
      };
    }

    function posicionar() {
      const largura = barra.offsetWidth || 10;
      const deslocamentoX = Number.parseFloat(barra.dataset.offsetX || '0') || 0;
      barra.style.top = lista.offsetTop + 'px';
      barra.style.left = (lista.offsetLeft + lista.clientWidth - largura + deslocamentoX) + 'px';
      barra.style.height = lista.clientHeight + 'px';
    }

    function atualizar() {
      posicionar();
      const m = medidas();
      const rolavel = m.rolagemMaxima > 0 && m.alturaTrilho > 0;
      barra.hidden = !rolavel;
      barra.setAttribute('aria-disabled', rolavel ? 'false' : 'true');
      if (!rolavel) {
        cursor.style.height = '0px';
        cursor.style.top = '0px';
        barra.setAttribute('aria-valuenow', '0');
        return;
      }
      const progresso = limitarValor(lista.scrollTop / m.rolagemMaxima, 0, 1);
      cursor.style.height = m.alturaCursor + 'px';
      cursor.style.top = (m.deslocamentoMaximo * progresso) + 'px';
      barra.setAttribute('aria-valuenow', String(Math.round(progresso * 100)));
    }

    function moverLista(posicaoY) {
      const m = medidas();
      if (m.rolagemMaxima <= 0 || m.deslocamentoMaximo <= 0) return;
      const r = trilho.getBoundingClientRect();
      const escala = r.height / (trilho.clientHeight || 1);
      const posicao = (posicaoY - r.top) / (escala || 1);
      const cursorTop = limitarValor(posicao - deslocamentoCursor, 0, m.deslocamentoMaximo);
      lista.scrollTop = (cursorTop / m.deslocamentoMaximo) * m.rolagemMaxima;
      atualizar();
    }

    barra.addEventListener('pointerdown', (evento) => {
      if (evento.pointerType === 'mouse' && evento.button !== 0) return;
      const m = medidas();
      if (m.rolagemMaxima <= 0) return;
      const cursorRect = cursor.getBoundingClientRect();
      const trilhoRect = trilho.getBoundingClientRect();
      const clicouNoCursor = evento.clientY >= cursorRect.top && evento.clientY <= cursorRect.bottom;
      const escala = trilhoRect.height / (trilho.clientHeight || 1);
      deslocamentoCursor = clicouNoCursor
        ? (evento.clientY - cursorRect.top) / (escala || 1)
        : m.alturaCursor / 2;
      arrastando = true;
      barra.setPointerCapture(evento.pointerId);
      if (!clicouNoCursor) moverLista(evento.clientY);
      evento.preventDefault();
    });

    barra.addEventListener('pointermove', (evento) => {
      if (arrastando) moverLista(evento.clientY);
    });
    const finalizarArraste = () => { arrastando = false; };
    barra.addEventListener('pointerup', finalizarArraste);
    barra.addEventListener('pointercancel', finalizarArraste);
    barra.addEventListener('lostpointercapture', finalizarArraste);

    lista.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar, { passive: true });
    barra.addEventListener('keydown', (evento) => {
      const passo = Math.max(24, Math.round(lista.clientHeight * 0.15));
      const maximo = Math.max(0, lista.scrollHeight - lista.clientHeight);
      if (evento.key === 'ArrowDown') lista.scrollTop = Math.min(maximo, lista.scrollTop + passo);
      else if (evento.key === 'ArrowUp') lista.scrollTop = Math.max(0, lista.scrollTop - passo);
      else if (evento.key === 'PageDown') lista.scrollTop = Math.min(maximo, lista.scrollTop + lista.clientHeight);
      else if (evento.key === 'PageUp') lista.scrollTop = Math.max(0, lista.scrollTop - lista.clientHeight);
      else if (evento.key === 'Home') lista.scrollTop = 0;
      else if (evento.key === 'End') lista.scrollTop = maximo;
      else return;
      evento.preventDefault();
      atualizar();
    });

    if (typeof ResizeObserver !== 'undefined') {
      const resize = new ResizeObserver(atualizar);
      resize.observe(lista);
      resize.observe(ancora);
      Array.from(lista.children).forEach((item) => resize.observe(item));
      // Mantém uma referência por barra durante todo o ciclo de vida do componente.
      barra._ciResizeObserver = resize;
    }
    if (typeof MutationObserver !== 'undefined') {
      const mutations = new MutationObserver(atualizar);
      mutations.observe(lista, { childList: true, subtree: true, characterData: true, attributes: true });
      barra._ciMutationObserver = mutations;
    }
    atualizar();
  });
})();

  /* ID: JS-009 | REF: APP.SIDEBAR.SEARCH | FILTRO DOS ITENS DO MENU LATERAL */
  (function configurarPesquisaLateral() {
    const campo = document.querySelector(".menu-lateral-pesquisa input[type='search']");
    const botoes = Array.from(document.querySelectorAll(".menu-lateral-botoes .botao-menu-lateral"));
    const aviso = document.querySelector(".menu-lateral-sem-resultados");
    if (!campo || !botoes.length) return;

    function normalizar(texto) {
      return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
    }

    campo.addEventListener("input", function () {
      const termo = normalizar(campo.value);
      let quantidadeVisivel = 0;

      botoes.forEach(function (botao) {
        const corresponde = !termo || normalizar(botao.textContent).includes(termo);
        botao.hidden = !corresponde;
        if (corresponde) quantidadeVisivel++;
      });

      if (aviso) aviso.hidden = quantidadeVisivel > 0;
    });
  })();
