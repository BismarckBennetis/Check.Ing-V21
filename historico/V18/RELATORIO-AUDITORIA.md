# Relatório de auditoria geral — Check.In V18

## 1. Fonte e integridade

A auditoria foi realizada sobre os arquivos efetivos extraídos de `Check.In-v17.rar`, não sobre os snapshots antigos da Biblioteca. O RAR V17 original foi preservado sem alterações. A pasta V18 contém o projeto completo e seus 33 arquivos/recursos originais, mais os índices e relatórios atualizados.

## 2. Resultado dos identificadores

| Arquivo | Marcadores encontrados | Duplicados após reindexação | Próximo ID |
|---|---:|---:|---|
| `index.html` | 122 | 0 | `HTML-123` |
| `style.css` | 353 | 0 | `CSS-0354` |
| `tema-dark.css` | 221 | 0 | `DARK-0222` |
| `script.js` | 7 | 0 | `JS-008` |

Os marcadores agora são sequenciais pela ordem de ocorrência em cada arquivo. O problema original incluía `HTML-126` repetido, `CSS-0035` repetido três vezes e `DARK-0161` usado tanto no foco do botão lateral quanto nas sombras do cabeçalho. A migração completa está em `MIGRACAO-DE-IDS.csv`.

**IDs funcionais:** os 38 atributos `id` reais do DOM não foram renumerados. Todos continuam únicos. Os IDs SVG e as referências cruzadas também foram preservados.

## 3. Estrutura HTML, ARIA e recursos

- Elementos HTML: 1290.
- IDs reais do DOM: 38; duplicados: 0.
- Referências ARIA/`for`/`data-scroll-*`: 27; alvos ausentes: 0.
- Referências internas a fragmentos SVG/HTML: 17; destinos ausentes: 0.
- Referências locais `src`/`href`: 9; recursos ausentes: 0.
- Erros registrados pelo parser HTML: 0.

## 4. CSS — sintaxe, cascata e duplicações

| Arquivo | Regras qualificadas | Erros de parsing/declaração | Grupos de seletores repetidos restantes |
|---|---:|---:|---:|
| `style.css` | 453 | 0 | 62 |
| `tema-dark.css` | 336 | 0 | 38 |

A remoção pontual de duplicações foi limitada a três blocos comprovadamente idênticos: o bloco-base `.icone-comprovantes` duplicado; a segunda regra `display:none !important` de `.compromisso-categoria-seta`; e a segunda regra de cor dos ícones `.compromisso-documento`/`.compromisso-lixeira-icone`.

Não foi feita fusão em massa de seletores repetidos. Há camadas base/tema, breakpoints, estados e declarações `!important`; combinar esses blocos sem revisão visual poderia alterar a cascata. O índice `SELETORES-REPETIDOS.csv` mostra as ocorrências restantes.

Todos os seletores CSS baseados em IDs correspondem a IDs reais existentes no HTML.

## 5. JavaScript e barras de rolagem

- `node --check script.js`: **passed**.
- `JS-006`: controlador das três barras horizontais personalizadas da Rotina; preservado.
- `JS-007`: controlador das nove barras verticais independentes; preservado.
- Barras verticais independentes: 9; destinos inexistentes: 0.
- Listas com `data-scrollbar-vertical`: 8; regra central de ocultação presente: sim.
- Barras horizontais personalizadas da Rotina: 3.
- As três barras verticais específicas da Rotina permanecem ocultas por regra isolada em `tema-dark.css`; o `overflow-y` e a rolagem por roda/trackpad permanecem disponíveis.

## 6. Preservação visual e funcional

- `.cabecalho::before` (neumorfismo do cabeçalho) não foi alterado.
- `.cabecalho::after` continua com o SVG aprovado das duas sombras: primeira sombra `#27e86b`/35%; segunda sombra `#064b2d`/55%; geometria, filtros, alcance e máscaras preservados.
- O cartão Pendente da Rotina não teve regras visuais alteradas nesta auditoria.
- As barras horizontais da Rotina não foram removidas nem reestilizadas.
- Os IDs reais e o conteúdo JavaScript permaneceram inalterados.

## 7. Classes possivelmente sem correspondência estática

As classes `.calendario-dia` são geradas pelo JavaScript. `.teste-neumorfico` e `.esfera-neumorfica` pertencem ao bloco HTML arquivado/comentado. `.estudo-prioridade-concluida`, `.compromisso-documento` e `.compromisso-pendencias-cabecalho` não têm uso estático confirmado no HTML/JS atual; foram mantidas, não removidas, porque podem representar estados futuros ou conteúdo gerado externamente.

## 8. Verificações não executadas ou limitações

A auditoria estática está concluída. A validação visual automatizada deve ser considerada complementar: uma captura local não garante que todos os estados de hover, scroll e responsividade estejam aprovados. A confirmação final deve ocorrer no navegador do projeto.

## 9. Arquivos de apoio

- `MIGRACAO-DE-IDS.csv` — mapeamento antigo → novo.
- `INDICE-DE-REFERENCIAS.csv` — índice de comentários/REFs.
- `INDICE-SELETORES-CSS.csv` — seletores, propriedades e contextos.
- `SELETORES-REPETIDOS.csv` — repetições conservadas.
- `DEPENDENCIAS-JS-HTML.csv` — chamadas JS e correspondências estáticas/dinâmicas.
- `VALIDACAO-ESTATICA.json` / `VALIDACAO-FINAL.json` — saída estruturada das verificações.
