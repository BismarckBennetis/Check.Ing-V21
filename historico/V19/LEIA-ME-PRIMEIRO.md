# Check.In V19 — pacote otimizado e auditado

A V19 foi criada a partir do pacote `Check.In-v18(2).rar` enviado nesta conversa. O original foi preservado sem alterações em `historico/V18/Check.In-v18-origem.rar`, acompanhado de seu SHA-256 para rollback. Os relatórios e índices antigos também estão em `historico/V18/`. A V19 é uma cópia de trabalho independente.

## Arquivos ativos

- `index.html` — estrutura dos painéis, IDs funcionais, símbolos SVG, listas e barras independentes.
- `style.css` — estilos-base e identidade visual clara.
- `tema-dark.css` — tema escuro, identidade gráfica, sombras, cartões e barras personalizadas.
- `script.js` — calendários, relógio/data e controladores de rolagem horizontal e vertical.
- `imagens/` — logo, favicons e ícones do projeto.

## O que mudou na V19

1. Reindexação dos marcadores de comentário HTML, CSS, DARK e JS em sequência física, sem renumerar nenhum `id` real do DOM ou SVG.
2. Remoção de quatro regras CSS idênticas no tema escuro, mantendo a primeira ocorrência e preservando os demais blocos repetidos que participam da cascata.
3. Remoção de uma regra de `font-size: 53px` que não prevalecia sobre a regra mais específica e importante de 16px do painel Compromisso.
4. Correção de um comentário de manutenção que começava com `/* /* ID`.
5. Atualização dos índices, dependências, relatório de auditoria e validações para refletir os arquivos reais da V18 recebida.
6. Preservação da estrutura HTML, dos dados de demonstração, das funcionalidades JavaScript, das barras, dos estilos aprovados e dos recursos gráficos.
7. Arquivamento dos documentos de auditoria e índices V18 em `historico/V18/`.

## Próximos marcadores livres

- HTML: `HTML-131`
- CSS: `CSS-0355`
- Tema escuro: `DARK-0249`
- JavaScript: `JS-008`

Os marcadores ativos incluem lacunas e duplicações anteriores à tarefa atual. Em uma correção pontual, não reindexe os marcadores existentes; use o próximo número após o maior identificador.

## Como abrir

Extraia o ZIP mantendo a pasta inteira e abra `index.html` com Live Server no VS Code. A pasta `imagens/` deve permanecer ao lado do HTML.

## Documentação

- `RELATORIO-AUDITORIA.md` — diagnóstico, evidências, riscos e plano de evolução.
- `MAPA-DO-PROJETO.md` — estrutura e contratos entre arquivos.
- `CHANGELOG-V19.md` — alterações realizadas.
- `INDICE-DE-REFERENCIAS.csv` — marcadores e descrições.
- `INDICE-SELETORES-CSS.csv` — seletores, propriedades e contextos.
- `SELETORES-REPETIDOS.csv` — seletores repetidos mantidos após auditoria.
- `DEPENDENCIAS-JS-HTML.csv` — dependências estáticas do JavaScript.
- `MIGRACAO-DE-IDS.csv` — migração de marcadores V18 → V19 (não são IDs funcionais do DOM).
- `VALIDACAO-ESTATICA.json` e `VALIDACAO-FINAL.json` — resultados das verificações.

## Estado de validação

A validação estática da V19 foi registrada nos relatórios. Na continuação de padronização do Estudo, os sete componentes foram comparados lado a lado com indicadores Financeiros no Chromium; os estilos computados e dimensões foram verificados. Isso valida o acabamento visual desse escopo, mas não certifica todas as telas, breakpoints ou interações da aplicação, que ainda devem ser testados no navegador local.
