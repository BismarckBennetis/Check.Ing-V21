# CHANGELOG — Check.In V21

**Base:** pacote Check.In V20 fornecido em 17/11/2026  
**Data:** 17/11/2026

## Objetivo

Preparar a aplicação para navegadores modernos distintos e melhorar a degradação em motores antigos, sem redesenhar componentes, alterar fluxos aprovados ou atribuir ações a controles ainda sem contrato funcional.

## Alterações aplicadas

1. **CSS com fallbacks progressivos:** declarações de `inset` passaram a ter `top/right/bottom/left` equivalentes antes da declaração moderna; foram adicionados valores anteriores a usos de `clamp()`, `min()`, `aspect-ratio` e variáveis CSS onde a alternativa era segura. Os navegadores modernos continuam recebendo a declaração moderna subsequente.
2. **Eliminação de `:has()` em dois seletores:** as seções das agendas de ontem e hoje receberam os IDs `agenda-compromissos-ontem` e `agenda-compromissos-hoje`. Os seletores CSS passaram a apontar diretamente para esses contêineres. A comparação de estilos calculados em Chromium entre V20 e V21 mostrou igualdade nos dois cabeçalhos afetados.
3. **JavaScript em sintaxe ES5:** o script foi transpilado para ES5 e recebeu fallbacks localizados para `Array.from`, `NodeList.prototype.forEach`, `String.prototype.padStart` e `Number.parseFloat`. A pesquisa mantém normalização Unicode quando disponível e usa tabela de acentos em motores sem `String.prototype.normalize`; `String.includes` foi substituído por `indexOf`.
4. **Eventos:** opções passivas foram removidas dos listeners de `scroll` e `resize` para evitar incompatibilidade em implementações antigas; os listeners continuam observando os mesmos eventos e executando as mesmas atualizações.
5. **Onda do painel esquerdo:** preservados os efeitos externos aprovados (`0.30` e `0.60`), a curva, o `viewBox`, `preserveAspectRatio="none"` e o gradiente `edgeSweep`. **Correção V21.1:** removidos o traço interno `#07190F` e seu filtro `innerShadow`, pois essa camada estava associada visualmente às ranhuras abaixo da curva. Não reintroduzir essa camada sem nova solicitação e validação visual.
6. **Documentação e índices:** atualizados inventário de dependências reais JS/HTML, índices de seletores, seletores repetidos, marcadores, migração dos dois IDs, matriz de navegadores, validações e manifesto SHA-256.
7. **Histórico:** os arquivos ativos de V20 foram preservados em `historico/V20/arquivos-ativos/`, junto da documentação e manifestos originais.

## O que não mudou

- Não foi redesenhada a interface nem alterada a estrutura dos cartões, listas, barras ou calendários.
- Não foram adicionados comportamentos a botões sem definição funcional. Os cinco botões do menu superior continuam presentes, porém o `script.js` deste pacote não contém listeners nem destinos de navegação para eles; a documentação V20 que descrevia `JS-008` não correspondia ao código entregue.
- Não foi adicionada persistência, API, banco de dados ou armazenamento local.
- Não foi iniciado o redesenho mobile planejado para uma etapa posterior.

## Resultado conhecido / limitações

- Teste de Chromium headless 144: calendário, pesquisa sem acentos, estado sem resultados, barras horizontal e vertical por teclado, unicidade dos IDs e ausência de erros JavaScript de execução passaram.
- Foram testadas larguras de 1600 a 320 CSS px. O overflow horizontal abaixo de 480 px é preexistente: a V20 e a V21 apresentaram os mesmos `scrollWidth` em todos os 15 breakpoints comparados. Não foi corrigido nesta atualização para não misturar escopos.
- Chrome, Edge, Firefox, Safari e Samsung Internet não foram executados individualmente nesta sessão. A compatibilidade desses navegadores é baseada na remoção do seletor `:has()` dos pontos afetados e no uso de recursos suportados pelas versões modernas; a matriz de validação real está em `MATRIZ-COMPATIBILIDADE-V21.md`.
- Internet Explorer 11 permanece suporte degradado, não paridade visual: o projeto continua usando CSS Grid, `gap`, variáveis CSS e outros recursos modernos em múltiplos componentes.
- O ambiente de teste in-memory bloqueou alguns recursos relativos/externos (imagens e Google Fonts); caminhos locais foram validados estaticamente. Não equivale a um teste hospedado no GitHub Pages ou em dispositivo físico.


## Correção complementar V21.1 — 17/11/2026

- Removido do SVG embutido em `tema-dark.css` o traço `stroke="#07190F"` com `stroke-width="20"`, `opacity="1"` e filtro `innerShadow` (blur 28, deslocamento Y 16).
- Removida também a definição do filtro `innerShadow`, que ficou sem uso.
- A curva, o recorte `belowWave`, o gradiente `edgeSweep`, o brilho inferior e as duas sombras externas (`0.30` e `0.60`) foram preservados.
- A V20 histórica já não continha esse traço nem esse filtro; a sincronização indevida ocorreu durante a preparação inicial da V21 e foi corrigida aqui.
- Validação executada nesta correção: SVG extraído da data URI e validado como XML; ausência de `#07190F`/`innerShadow` na onda; presença das duas camadas externas e do `edgeSweep` confirmada.
