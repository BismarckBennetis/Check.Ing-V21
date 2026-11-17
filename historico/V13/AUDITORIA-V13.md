# Auditoria técnica — Check.In v13

## Resumo executivo

A versão recebida tem quatro arquivos ativos principais: `index.html`, `style.css`, `tema-dark.css` e `script.js`, além de imagens, configurações, licença e um relatório da versão 12. Esta auditoria foi feita diretamente nos arquivos da V13, comparando também os critérios documentados no relatório V12.

**A auditoria encontrou um erro de parsing HTML, um erro de parsing CSS, marcadores de busca duplicados/malformados e oportunidades de reutilização visual entre Estudo e Rotina.** Os erros de parsing e a estrutura dos identificadores foram corrigidos nesta cópia separada. Não houve alteração de atributos `id` do DOM nem de lógica executável do JavaScript.

## 1. Inventário da versão recebida

| Arquivo | Linhas na origem | Bytes na origem | Papel |
|---|---:|---:|---|
| `index.html` | 2.560 | 77.887 | Estrutura visual e SVGs inline |
| `style.css` | 6.402 | 158.378 | Estilos base e componentes |
| `tema-dark.css` | 1.871 | 58.675 | Sobrescritas/ajustes do tema escuro |
| `script.js` | 242 | 7.894 | Calendários e relógio/data |

O HTML referencia `style.css` antes de `tema-dark.css`, e carrega `script.js` no final do documento. Os recursos locais `logo-checkin-premium.png`, `alfinete.png.png` e favicons foram preservados. Todas as referências locais a `src`/`href` foram encontradas na cópia extraída.

## 2. Problemas confirmados na origem

### 2.1 Parsing HTML — um fechamento sem abertura

O HTML continha um `</span>` solto imediatamente após o SVG do relógio, na região original próxima à linha 811. Não havia uma abertura `<span>` correspondente dentro de `.horario-painel`. O parser HTML do lxml reportou `Unexpected end tag : span`. A cópia estruturada remove esse fechamento órfão; a validação posterior reporta zero erros de parsing HTML.

### 2.2 Parsing CSS — bloco de atividade sem fechamento

Em `style.css`, o seletor `.card-painel-novo .rotina-atividade` não terminava com `}` antes do comentário “STATUS VERMELHO — ATIVIDADE PENDENTE”. Um segundo seletor `.rotina-status-alerta` aparecia, assim, dentro do bloco da atividade e era lido como conteúdo inválido. O parser reportou erro de declaração na região original da linha 6158.

A cópia fecha corretamente o bloco de `.rotina-atividade` e remove esse fragmento inválido/repetido. As regras definitivas dos três estados dos indicadores ficam concentradas em `CSS-0340`. O parsing CSS agora apresenta zero erros de topo e zero erros de declaração.

### 2.3 Identificadores de comentários duplicados ou inconsistentes

| Arquivo | Situação na origem | Correção nesta cópia |
|---|---|---|
| HTML | `HTML-039` repetido 3 vezes; `HTML-040` 2 vezes; `HTML-060` 3 vezes | Marcadores únicos `HTML-084` a `HTML-087`; um comentário redundante foi removido |
| CSS principal | `CSS-0184` repetido em dois blocos | O segundo bloco recebeu `CSS-0346` |
| CSS principal | O comentário `CSS-0344` não usava o formato `ID:` nem tinha `REF`/seletor | Comentário padronizado como `CSS-0344` |
| CSS principal | O cabeçalho tinha várias regras independentes sob apenas `CSS-0345` | Foram adicionados IDs por parte, `CSS-0347` a `CSS-0354`; texto de horário/atividade recebeu `CSS-0355` e `CSS-0356` |
| Tema escuro | `DARK-0169` repetido 5 vezes sobre a mesma regra idêntica | As 5 cópias foram consolidadas em uma regra `DARK-0169` |
| Tema escuro | Comentários com prefixo `CSS-0332`, `CSS-0333`, `CSS-0334` dentro de `tema-dark.css`; `CSS-0332` também repetido | Renomeados para `DARK-0172` a `DARK-0175` |

A V13 já usava `HTML-001`–`HTML-083`, `CSS-0001`–`CSS-0345`, `DARK-0001`–`DARK-0171` e `JS-001`–`JS-005`, mas com lacunas históricas. As lacunas `HTML-042`–`HTML-044`, `CSS-0170` e `CSS-0332` foram preservadas; números antigos não foram reciclados.

### 2.4 IDs reais do DOM

O HTML contém 10 atributos `id` reais, sem duplicações. Eles incluem IDs dos símbolos e gradientes SVG, títulos ARIA e calendários. Esses atributos foram mantidos exatamente como estavam. Os marcadores `HTML-...` são comentários para busca e não substituem os atributos `id` do DOM.

## 3. Reutilização de estilos já existentes

A Rotina foi construída com seletores próprios, embora vários efeitos sejam os mesmos do Estudo. Esta comparação é a referência para os próximos pedidos:

| Efeito | Código de referência Estudo | Código atual Rotina | Observação |
|---|---|---|---|
| Título do painel | `.titulo-card`, `CSS-0111`, `CSS-0141`, `DARK-0041` | `titulo-card` no HTML e `CSS-0345` | A classe de título já foi compartilhada; a Rotina mantém o ajuste de posição horizontal e tamanho. |
| Ícone principal | `.estudo-icone`, `CSS-0140`, `DARK-0042` | `.painel-icone-neumo`, `CSS-0342`, `CSS-0344`, `CSS-0347` | O círculo de Rotina é maior (36 px); `CSS-0347` vem depois de `CSS-0342` e prevalece nas propriedades `background`, `border` e `box-shadow`. |
| Progresso | `.estudo-progresso*`, `CSS-0142` a `CSS-0145`, tema escuro correspondente | `.rotina-progresso*`, `CSS-0348` a `CSS-0351` | Há cópia de propriedades, não compartilhamento de classes. A largura preenchida é 75% em Rotina e 65% em Estudo. |
| Ver Detalhes | `.botao-detalhes`, `CSS-0148` a `CSS-0150`, `DARK-0085` | `.rotina-detalhes`, `CSS-0352` a `CSS-0354` | A Rotina duplica o estilo em vez de usar `.botao-detalhes`; por isso não herda automaticamente o refinamento dark `DARK-0085`. |

**Regra para as próximas alterações:** primeiro pesquisar a referência já aprovada; depois decidir se o componente pode compartilhar uma classe, ou se precisa somente de um modificador para diferenças reais. Não copiar um bloco inteiro sem conferir a cascata e o tema escuro.

## 4. Conflitos e manutenção CSS

- Na origem, a leitura de regras no nível superior encontrou 57 seletores exatos repetidos em `style.css`; na cópia, restam 53 nesse mesmo escopo. Em `tema-dark.css`, eram 7 e restam 6 no nível superior.
- A indexação recursiva, que também inclui regras dentro de `@media` e outros at-rules, encontrou 61 grupos de seletores repetidos em `style.css` e 17 em `tema-dark.css` (78 grupos no total). A relação completa, com linhas e contextos, está em `SELETORES-REPETIDOS.csv`. Nem toda repetição é defeito: muitas são refinamentos responsivos, estados e sobreposições. Não foram fundidas sem prova de equivalência.
- Não há propriedades duplicadas dentro da mesma regra CSS nas validações executadas.
- O CSS `CSS-0345` agora separa título, ícone, barra, percentual e botão em marcadores distintos. Isso evita que uma busca pelo título encontre regras de outros componentes sem identificação própria.
- A `REF` de cada comentário agora utiliza caminho hierárquico (`APP...`, `PANEL...`, `COMPONENT...`) comum entre os arquivos.

A lista completa das 621 regras CSS (incluindo regras aninhadas) está em `INDICE-SELETORES-CSS.csv`. O índice possui seletor, linha, contexto de `@media`, marcador/REF associado e propriedades.

## 5. Responsividade — ponto pendente

As media queries existentes em `style.css` e `tema-dark.css` não contêm regras específicas para `.rotina-conteudo`, `.rotina-cabecalho` ou `.card-painel-novo`. O painel Rotina organiza quatro colunas internas no desktop. A ausência de uma regra responsiva específica merece teste e correção em viewport estreita.

A tentativa de captura em Chromium headless foi bloqueada pelo ambiente com `ERR_BLOCKED_BY_ADMINISTRATOR`, inclusive usando servidor local. Portanto, a responsividade é uma **pendência identificada por análise estática**, não um defeito visual confirmado por captura.

## 6. JavaScript e dependências

- `node --check script.js`: aprovado, sem erro sintático.
- Os 12 seletores literais usados por `querySelector`/`querySelectorAll` foram encontrados no DOM: calendários, setas, relógio e campos de data. O mapeamento seletor → correspondências está em `DEPENDENCIAS-JS-HTML.csv`.
- Não há referência local de imagem, CSS, script ou favicon ausente.
- O JavaScript atual cobre calendários e relógio/data; não há lógica JavaScript específica para o painel Rotina nesta versão.
- **Ponto lógico a verificar:** os meses inicial/seguinte são calculados uma única vez na inicialização. Na virada de mês, a rotina atualiza o dia marcado, mas repovoa os calendários com os meses guardados em `dataset`, sem recalcular o par “mês atual + próximo mês”. Se a página permanecer aberta por essa virada, a janela de dois meses pode ficar desatualizada. O comportamento deve ser confirmado e corrigido em uma etapa própria.

## 7. Validações desta cópia estruturada

| Verificação | Resultado |
|---|---|
| Parsing HTML (lxml HTMLParser) | 0 erros após remover o `</span>` órfão |
| IDs reais do DOM | 10 atributos; nenhum duplicado |
| Marcadores HTML | 86 marcadores; 86 únicos |
| Marcadores CSS principal | 355 marcadores; 355 únicos |
| Marcadores tema escuro | 176 marcadores; 176 únicos |
| Marcadores JavaScript | 5 marcadores; 5 únicos |
| Parsing `style.css` | 0 erros de sintaxe; 0 propriedades duplicadas dentro da mesma regra |
| Parsing `tema-dark.css` | 0 erros de sintaxe; 0 propriedades duplicadas dentro da mesma regra |
| `node --check script.js` | Aprovado |
| Seletores JS | Todos os 12 seletores literais têm correspondência no HTML |
| Recursos locais | Nenhuma referência ausente |
| Validação visual em Chromium | Não concluída; execução bloqueada pelo ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`) |

Os blocos de referência arquivados seguem os sequenciais `HTML-089` e `CSS-0357`. O ajuste DARK de notificações segue `DARK-0176`.

O PDF `auditoria-checking 28.10.pdf` foi preservado sem alteração e não foi aberto. O SHA-256 da cópia é `e890250446b46c60f2d5fa86ed653fe8bb3ec0351b63ab3cdf80b7e126a7cb3a`; corresponde ao PDF da origem.

## 8. Conclusão e ordem recomendada das próximas etapas

1. Usar `MAPA-DO-PROJETO.md`, `INDICE-DE-REFERENCIAS.csv` e `INDICE-SELETORES-CSS.csv` como fonte de localização para todas as próximas correções. Consultar também `SELETORES-REPETIDOS.csv` antes de consolidar regras.
2. Reutilizar as classes genéricas do Estudo quando forem semanticamente equivalentes (principalmente botão de detalhes e progresso), sem copiar declarações duplicadas.
3. Fazer uma etapa própria de responsividade do painel Rotina.
4. Corrigir e testar a virada de mês do calendário.
5. Realizar validação visual real no navegador do usuário para registrar `VALIDADO-VISUAL` apenas depois da aprovação.

A pasta original recebida não foi modificada. Esta cópia contém apenas as correções pontuais de parsing, a padronização dos marcadores/referências e os documentos de manutenção.
