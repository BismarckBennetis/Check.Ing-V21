# Check.In V21.2 — refatoração da cascata e correção do painel lateral

A V21.2 parte da V21.1 e corrige a origem estrutural do recorte do botão **Notifique-me**. Também reorganiza as três folhas CSS em camadas explícitas, elimina declarações `!important` e remove uma referência JavaScript obsoleta a um elemento de dia da semana que não existe no HTML.

## Arquivos ativos

- `index.html` — estrutura, IDs, SVGs, atributos ARIA e alvos de rolagem.
- `style.css` — estrutura e aparência-base, dentro de `@layer base`.
- `tema-dark.css` — tema escuro e componentes, dentro de `@layer theme`.
- `mobile.css` — ajustes responsivos, dentro de `@layer responsive`.
- `script.js` — calendário, feriados nacionais, relógio/data, barras de rolagem e pesquisa lateral.
- `mobile.js` — abertura/recolhimento do painel lateral e formato compacto das datas de vencimento.
- `imagens/` — logo e favicons utilizados pelo HTML.

**Ordem de carregamento:** `style.css`, `tema-dark.css`, `mobile.css`; depois `script.js` e `mobile.js`, ao final do `body`. Preserve essa ordem. A sequência de camadas declarada em `style.css` é `base`, `theme`, `responsive`.

## O que mudou nesta refatoração

1. **Cascata CSS:** as três folhas foram organizadas em camadas nativas. A base define estrutura; o tema define aparência; o mobile ajusta o que precisa responder ao viewport. As 1.493 declarações `!important` existentes nas folhas ativas foram removidas. O estado HTML `[hidden]` foi movido para a última regra da camada responsiva e continua ocultando elementos sem prioridade forçada.
2. **Estrutura do painel esquerdo:** `.area-inferior-painel` agora contém apenas relógio e data. O título e o botão Notifique-me são irmãos desse bloco, diretamente dentro de `#painel-esquerdo`. Antes, um fechamento inválido de `span` e a ausência do fechamento do contêiner mantinham título e botão dentro da área de 44px com `overflow:hidden`.
3. **JavaScript:** eliminada a referência inválida a `diaSemanaData`/`nomesDiasPainel`. O feriado destaca somente `.data-dia`; não exibe nome do dia da semana. A célula do calendário preserva o fundo verde do dia atual e recebe ciano apenas no número e na borda quando for feriado nacional.
4. **Mobile:** removidas as translações artificiais que moviam o painel inteiro e empurravam Notifique-me para fora do fluxo. O botão mantém 40×40px no mobile, com o SVG interno no tamanho definido pelo tema responsivo.

## Como abrir

Extraia o ZIP mantendo a pasta `Check.Ing-V21.2` inteira e abra `index.html` com Live Server no VS Code. Mantenha `imagens/` no mesmo nível do HTML.

## Compatibilidade e limites

- A cascata usa CSS Cascade Layers (`@layer`). Utilize navegadores modernos com suporte a esse recurso. Internet Explorer 11 não aplica essas camadas e não é um alvo compatível desta arquitetura.
- Validação funcional executada em Chromium 144 headless, com estilos e scripts reais do pacote executados em fixture in-memory. Foram avaliados 1440, 1024, 700, 653, 652, 480, 375 e 320 CSS px.
- Firefox, Safari, Chrome estável, Edge e dispositivos físicos não foram executados individualmente nesta sessão.
- O overflow horizontal mobile abaixo de 480px permanece preexistente: `scrollWidth` continua em 622px a 480px, 536px a 412px, 514px a 390px, 499px a 375px, 484px a 360px e 460px a 320px. Não foi misturado a esta refatoração estrutural.
- As Google Fonts externas foram bloqueadas no ambiente in-memory; o fallback de fonte foi utilizado durante os testes. O pacote mantém os links originais.
- O projeto não ganhou backend, persistência ou novas ações para botões sem contrato funcional.

## Documentação e índices

- `CHANGELOG-V21.md` — histórico de V21, V21.1 e V21.2.
- `RELATORIO-AUDITORIA.md` — auditoria e evidências desta refatoração.
- `MAPA-DO-PROJETO.md` — árvore e responsabilidades atuais.
- `MATRIZ-COMPATIBILIDADE-V21.md` — requisitos de browser e testes executados.
- `INDICE-SELETORES-CSS.csv`, `SELETORES-REPETIDOS.csv`, `INDICE-DE-REFERENCIAS.csv` e `DEPENDENCIAS-JS-HTML.csv` — índices reconstruídos com os arquivos ativos da V21.2.
- `VALIDACAO-REFATORACAO-V21.2.json` — registro consolidado dos testes e limites.
- `CHECKSUMS-SHA256.txt` — integridade dos arquivos do pacote, exceto o próprio manifesto.
- `historico/V20/` — snapshot histórico preservado.
