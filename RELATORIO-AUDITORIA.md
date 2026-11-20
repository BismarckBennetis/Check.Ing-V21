# Relatório de auditoria e atualização — Check.In V21

**Data:** 17/11/2026  
**Base:** `Check.In-V20(5).rar`, enviado nesta conversa  
**Entrega:** pacote V21 em ZIP  
**Escopo:** compatibilidade progressiva e preservação de comportamento/estética aprovados.

## 1. Integridade da origem

- O arquivo enviado nesta mensagem é `.rar`, não `.zip`; foi extraído e utilizado como fonte principal.
- O repositório interno estava em `main` sem alterações locais e identificava o commit `933600d`.
- O manifesto SHA-256 original da V20 divergia apenas para `tema-dark.css`: esperado `40081362c7ab79c97522ff2dccfb207c302445dfce109850d0ce1f5bb17f0ffd`; cálculo sobre o arquivo do pacote `d1363761fef1a2a69b019c2c0379674d89f3819ca2a1253b45dbce06e5768580`. O manifesto V21 foi recriado após as alterações.
- Os quatro arquivos ativos originais (`index.html`, `style.css`, `tema-dark.css`, `script.js`) estão preservados em `historico/V20/arquivos-ativos/`.

## 2. Alterações e justificativas

### 2.1 CSS sem `:has()` nos cabeçalhos de agenda

Os dois seletores de posicionamento utilizavam `:has(> #lista-compromissos-ontem)` e `:has(> #lista-compromissos-hoje)`. O suporte deste seletor varia por versão de navegador e não existe no IE11. Foram adicionados IDs aos contêineres de agenda já existentes e os seletores passaram a usar esses IDs diretamente. Não houve mudança na estrutura interna ou nos estilos declarados.

**Validação:** em Chromium 144, os estilos calculados dos cabeçalhos das agendas ontem/hoje são idênticos entre V20 e V21 (`left`, `right`, `top`, `height`, `transform`, `position`, `margin` e `padding`).

### 2.2 Fallbacks CSS

- `inset` recebeu propriedades posicionais equivalentes declaradas antes da forma abreviada moderna.
- `clamp()`, `min()` e `aspect-ratio` receberam valores anteriores como fallback.
- Algumas declarações com variáveis CSS receberam valores literais anteriores; não foi possível oferecer fallback universal para todas as propriedades sem replicar a paleta e a cascata inteira.
- Nenhuma regra global `!important` foi removida. A camada moderna posterior continua a prevalecer nos navegadores que suportam as sintaxes atuais.

### 2.3 JavaScript ES5

O `script.js` foi transpilado para ES5. Foram adicionados fallbacks para `Array.from`, `NodeList.prototype.forEach`, `String.prototype.padStart` e `Number.parseFloat`. A pesquisa mantém `String.normalize` quando presente e usa uma tabela de substituição de acentos quando ausente. A busca usa `indexOf` em vez de `includes`. Listeners de `scroll` e `resize` usam assinatura compatível sem opção `passive`.

### 2.4 Onda verde do painel esquerdo

Preservados os efeitos externos aprovados (`0.30` e `0.60`), a curva original, `viewBox 0 0 900 1600`, `preserveAspectRatio="none"`, gradiente `edgeSweep` e dimensionamento `100% 56%`. Na correção V21.1, removidos o traço interno `#07190F` e o filtro `innerShadow`, que não faziam parte da V20 histórica e foram reincorporados indevidamente na V21 inicial.

## 3. Resultado de verificações

| Verificação | Resultado |
|---|---|
| Parsing PostCSS de `style.css` e `tema-dark.css` | Aprovado; 476 e 630 regras, respectivamente |
| Parsing JavaScript com alvo ES5 | Aprovado; sem diagnósticos de sintaxe |
| `node --check script.js` | Aprovado |
| IDs HTML | 56 IDs, todos únicos; nenhum duplicado |
| Referências locais em HTML | 9 caminhos relativos encontrados; todos os arquivos existem após remover query strings de cache |
| Índice de marcadores | 742 ocorrências ativas indexadas, todas com linha correspondente |
| Fallbacks posicionais e de sintaxe | Todos os `inset` têm propriedades posicionais anteriores; fallbacks de `clamp()`, `min()` e `aspect-ratio` confirmados nos respectivos blocos |
| `:has()` nos CSS ativos | Zero ocorrências |
| Validação XML do SVG embutido da onda | Aprovado |
| Calendário: próximo/anterior | Aprovado em Chromium 144 |
| Pesquisa `configuracao` sem acento | Encontrou “Configuração” |
| Fallbacks simulados sem `Array.from`, `NodeList.forEach`, `padStart`, `Number.parseFloat` e `String.normalize` | Aprovado; pesquisa continuou encontrando “Configuração” |
| Estado da pesquisa sem resultado | Aprovado |
| Barras de rolagem horizontal/vertical por teclado | Aprovado; scrollLeft e scrollTop avançaram |
| Erros JavaScript de execução | Zero erros de página |
| Layout: V20 × V21 em 15 larguras | Mesmos scrollWidths em todos os breakpoints |

### Larguras avaliadas

`1600, 1440, 1280, 1200, 1024, 900, 800, 768, 653, 652, 480, 412, 390, 360 e 320 CSS px`.

O overflow horizontal em 480, 412, 390, 360 e 320 px existe na V20 e permaneceu com exatamente os mesmos `scrollWidth` na V21: 622, 536, 514, 484 e 460 px, respectivamente. A causa principal observada no teste é a navegação horizontal de categorias de Lembrete que ultrapassa a largura do viewport. Foi mantida sem alteração porque a V21 desta entrega não é a etapa de correção do layout mobile.

## 4. Discrepâncias documentais identificadas

A documentação que veio na V20 descrevia um contrato `JS-008` para navegação superior e afirmava que cinco botões tinham `aria-controls`. A inspeção do código fonte efetivo não confirma isso: os cinco botões superiores existem, mas não possuem `aria-controls`, e o `script.js` não contém o listener nem destinos de navegação correspondentes. O índice de dependências foi corrigido para refletir o código real. Nenhuma ação foi inventada na V21.

## 5. Limitações e riscos residuais

1. Somente Chromium 144 headless foi executado funcionalmente nesta sessão. Chrome, Edge, Firefox, Safari e Samsung Internet ainda precisam de smoke test em aplicativos reais.
2. O ambiente in-memory não carregou alguns recursos com caminhos relativos nem Google Fonts; por isso o teste não valida a experiência visual completa com todos os assets.
3. IE11 não tem paridade visual garantida. CSS Grid, `gap`, custom properties e outras declarações modernas permanecem distribuídos pelos estilos; os fallbacks melhoram a degradação mas não substituem layouts legados completos.
4. O overflow horizontal mobile é herdado da V20 e permanece pendente para a etapa mobile.
5. Não foram implementados botões do menu superior, persistência, backend ou ações decorativas.

## 6. Parecer

A V21 está tecnicamente atualizada e validada para as alterações de compatibilidade introduzidas, sem mudança observada nos estilos de agenda afetados ou nos resultados de largura em comparação com a V20. Não deve ser descrita como certificada em múltiplos navegadores ainda: essa certificação depende dos testes reais listados na matriz.


### 2.5 Correção visual V21.1 — remoção da sombra interna

A imagem enviada em 17/11/2026 mostra ranhuras escuras abaixo da curva. A inspeção do SVG ativo apontou uma camada adicional: um caminho alinhado à curva com `stroke="#07190F"`, espessura 20, opacidade 1, recortado por `belowWave` e processado pelo filtro `innerShadow` (blur 28, deslocamento Y 16). A V20 histórica não contém esse caminho nem esse filtro. Foram removidos somente esse caminho e a definição do filtro. A hipótese técnica é que a camada desfocada/offset recortada produziu as marcas; a correção foi validada estruturalmente no SVG. A confirmação final da aparência deve ser feita no navegador/dispositivo. As sombras externas e o gradiente aprovados foram mantidos.


# Auditoria V21.2 — cascata e painel lateral (20/11/2026)

## 1. Causa-raiz do botão Notifique-me recortado

A inspeção da árvore DOM revelou um fechamento extra de `span` e a ausência do fechamento de `div.area-inferior-painel`. A estrutura do HTML colocava o título e o botão dentro do contêiner de relógio/data, que tem altura fixa de 44px e `overflow:hidden` no CSS-base. Deslocamentos posteriores em CSS tentavam compensar uma árvore inválida; por isso não resolviam a causa. A V21.2 fecha o `span.data-valor`, o `div.data-painel` e o `div.area-inferior-painel` na ordem correta.

## 2. Erro de estado no JavaScript

`verificarDataEAgendarAtualizacao()` continha uma referência residual a `diaSemanaData`/`nomesDiasPainel`, apesar de o HTML já não possuir `.data-semana`. A referência provocava erro de execução durante a atualização da data. A V21.2 remove essa saída não utilizada e aplica `classList.toggle()` somente em `.data-dia`. A apresentação resultante é `20/11/2026`, sem nome de dia da semana; no feriado nacional, apenas o número recebe o ciano.

## 3. Cascata CSS refatorada

| Folha | Regras | Declarações | `!important` final |
|---|---:|---:|---:|
| `style.css` | 487 | 2.751 | 0 |
| `tema-dark.css` | 664 | 3.023 | 0 |
| `mobile.css` | 53 | 180 | 0 |
| **Total** | **1.204** | **5.954** | **0** |

A ordem explícita `@layer base, theme, responsive` substitui a dependência de centenas de prioridades individuais. As regras do estado `[hidden]` foram movidas para a última posição da camada responsiva; o teste confirmou `display:none` enquanto o atributo está presente e retorno ao display esperado quando é removido.

Não foram apagados seletores apenas por aparecerem mais de uma vez. `SELETORES-REPETIDOS.csv` foi reconstruído para revisão; repetição em media queries/estados pode ser intencional.

## 4. Mobile

O CSS mobile continha `translate:-55px -15px` no painel, `translate:-60px` no título/botão e margem inferior negativa no botão. Esses valores retiravam componentes do fluxo e podiam esconder o controle. A V21.2 remove essas compensações e utiliza margens de fluxo nos elementos de espaçamento. Em 375px, o painel medido foi `[x=8, y=179, w=256.89, h=491.8]`; a linha de relógio/data foi `[x=23, y=505, w=226.89, h=44]`; o título ficou em `y=597`; o botão em `y=617.8`, com `40×40px` e dentro dos limites do painel.

## 5. Verificações executadas

- `node --check script.js` e `node --check mobile.js`: aprovados.
- Parsing PostCSS das três folhas: aprovado; uma declaração de camada por arquivo de componente, sem camadas aninhadas duplicadas.
- HTML: 62 IDs, todos únicos; 0 referências locais quebradas em `src`/`href`.
- Alvos de rolagem: 4 horizontais e 14 verticais; todos os destinos existem.
- Chromium 144: sem erros de página; navegação NOVEMBRO→DEZEMBRO→NOVEMBRO; pesquisa `configuracao` encontra “Configuração”; mensagem vazia e reset; classe de feriado apenas no número; fundo verde de hoje confirmado por `background-image` linear-gradient.
- Mobile 375px: abertura/fechamento por botão, Escape e clique externo; `[hidden]` mapeia para `display:none`; sem erros JS.
- Viewports: 1440, 1024, 700, 653, 652, 480, 375 e 320px; o botão cabe integralmente no painel em todos os casos.

## 6. Limitações

- O overflow horizontal em 480px ou menos permanece: 622px em 480, 536px em 412, 514px em 390, 499px em 375, 484px em 360 e 460px em 320. Esta entrega corrige o fluxo/recorte do painel lateral, não redesenha toda a navegação mobile.
- Apenas Chromium 144 headless foi executado. Chrome estável, Edge, Firefox, Safari, Samsung Internet e aparelhos físicos ainda requerem smoke test.
- Google Fonts foram bloqueadas no fixture in-memory; foi usado o fallback. Não equivale a validar deploy ou rede real.
- CSS Cascade Layers exigem navegador moderno; IE11 não aplica essa arquitetura.

## 7. Parecer

A correção do botão não depende mais de deslocamentos artificiais ou prioridades forçadas. O HTML define os limites reais dos componentes; a base, o tema e a responsividade têm camadas explícitas; os estados de data e feriado são expressos por classe no elemento correto. A validação cobre os fluxos listados, mas não certifica outros motores de navegador.
