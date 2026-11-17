# Changelog — Check.In V19

## Base

- Origem: `Check.In-v18(2).rar`.
- Nova versão: `Check.In V19`.
- Tipo de atualização: manutenção e otimização conservadora.

## Alterações aplicadas

### Continuação — padronização visual dos cards do Painel Estudo

- As sete superfícies do Estudo — quadro semanal, Prioridade, Dias de Estudo, Data de Início, A Partir das, Pendências e Horas Diárias — passaram a corresponder ao acabamento dos indicadores Financeiros: fundo e borda transparentes, raio de 12px e quatro sombras externas.
- O grafite é fornecido pela superfície do painel atrás dos componentes, como nos indicadores Financeiros; os reflexos laterais mantêm o recorte curvo, com verde nos componentes positivos/neutros e vermelho em Pendências.
- Títulos, ícones, textos, tipografia, dimensões, espaçamentos, estrutura HTML e funcionalidades JavaScript foram preservados. O botão Metas manteve seu tratamento e comportamento próprios.
- Nenhum HTML, JavaScript ou painel fora do Estudo foi alterado.
- As referências dos seletores afetados foram sincronizadas com as linhas atuais; o restante dos índices não foi reindexado nesta alteração pontual.
- `LEIA-ME-PRIMEIRO.md`, `MAPA-DO-PROJETO.md` e `RELATORIO-AUDITORIA.md` passaram a registrar os próximos marcadores com base nos arquivos ativos; marcadores duplicados preexistentes foram documentados, sem reindexação.

### CSS — `tema-dark.css`

- Removidas quatro regras exatamente duplicadas: segunda ocorrência de `.lembrete-identificacao`, `.lembrete-icone`, `#titulo-lembrete` e `.lembrete-resumo-hoje`.
- Removida regra `.compromisso-evento-cabecalho h4 { font-size: 53px; }`, que não tinha efeito sobre os elementos existentes porque a regra qualificada por `#painel-compromisso` estabelece `font-size: 16px !important`.
- Corrigido o comentário malformado `/* /* ID: DARK-0258`.
- Atualizada a descrição do bloco dos cards do Lembrete para refletir uma lista por card.
- Removidos comentários obsoletos que classificavam como aposentados marcadores CSS que continuam ativos; referências antigas de blocos DARK foram substituídas por descrições funcionais.

### Marcadores de manutenção

- Reindexados em sequência os comentários `HTML`, `CSS`, `DARK` e `JS`.
- Formalizados seis comentários informais do Lembrete como marcadores `HTML-119` a `HTML-124`; os marcadores posteriores foram deslocados para preservar a sequência.
- Nenhum `id` funcional do HTML/SVG foi renumerado.

### Documentação

- Relatórios e índices refeitos com base nos arquivos efetivos da V18 recebida.
- Corrigidos terminadores `-->` que haviam entrado por engano em valores `REF` dos índices HTML.
- RAR original V18 preservado em `historico/V18/Check.In-v18-origem.rar`, com SHA-256 registrado.
- Documentos de referência V18 arquivados em `historico/V18/`.

## Preservado

- Estrutura DOM e conteúdo do HTML.
- Lógica JavaScript e contratos dos controladores JS-006/JS-007.
- IDs do DOM, IDs SVG, destinos ARIA e atributos `data-scroll-*`.
- Regras base de `style.css`.
- Recursos gráficos e estrutura de pastas.

## Validação

- HTML: parsing sem erros.
- CSS: parsing sem erros de declaração/folha.
- JavaScript: `node --check` aprovado.
- Referências locais e alvos de rolagem: todos encontrados.
- Os sete componentes do Estudo e os indicadores Financeiros correspondentes foram comparados lado a lado no Chromium. Os estilos computados confirmaram correspondência de superfície, borda, raio e sombras; os reflexos também foram conferidos, preservando o vermelho de Pendências.
- As dimensões permaneceram: quadro semanal 341×62px; Prioridade 329×37px; Dias de Estudo e Pendências 337×38px; Data de Início, A Partir das e Horas Diárias 161×40px. Metas permaneceu 161×40px.
- A validação visual foi feita no Chromium; não representa certificação de todas as telas, breakpoints ou interações da aplicação.
- As validações acima são complementares às limitações visuais/funcionais documentadas para a V19.
