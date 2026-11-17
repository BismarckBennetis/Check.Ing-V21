# Mapa do projeto — Check.In V19

## 1. Fonte e escopo

Base: `Check.In-v18(2).rar`. A pasta V18 foi copiada para a V19. A limpeza foi deliberadamente conservadora: reindexação de comentários de manutenção, remoção de quatro regras CSS integralmente repetidas e remoção de uma sobrescrita sem efeito. O HTML funcional e a lógica JavaScript foram preservados.

## 2. Estrutura de execução

`index.html` carrega `style.css`, depois `tema-dark.css`, e `script.js` no final do `body`. O tema escuro complementa/sobrepõe a camada base; a ordem e a especificidade continuam sendo contratos do projeto.

```text
main.conteudo-principal
└── section.area-conteudo
    └── div.grade-cards
        ├── article.card-financeiro
        ├── article.card-estudo
        ├── article#painel-rotina
        └── article#painel-compromisso

Painel Lembrete
└── #painel-lembrete
    └── .lembrete-resumo-grade
        ├── #card-lembrete-pendencias → 1 lista → 2 tarefas → 1 barra
        ├── #card-lembrete-ontem      → 1 lista → 2 tarefas → 1 barra
        └── #card-lembrete-hoje       → 1 lista → 2 tarefas → 1 barra
```

## 3. Inventário e marcadores

| Arquivo | Responsabilidade | Marcadores ativos | Próximo |
|---|---|---:|---|
| `index.html` | Estrutura dos painéis, 49 IDs funcionais, SVGs, ARIA e alvos de rolagem | 130 distintos; `HTML-125` duplicado | `HTML-131` |
| `style.css` | Estilos-base e tema claro | 353; maior `CSS-0354` | `CSS-0355` |
| `tema-dark.css` | Tema escuro, componentes, efeitos, cartões e barras | 245; `DARK-0245` duplicado; maior `DARK-0248` | `DARK-0249` |
| `script.js` | Calendários, relógio/data, três barras horizontais e doze verticais | 7 | `JS-008` |

Os marcadores `HTML/CSS/DARK/JS` são comentários de manutenção. Não devem ser confundidos com atributos `id` do DOM ou IDs de símbolos SVG.

## 4. Rolagem e isolamento

- `JS-006` controla as três barras horizontais personalizadas da Rotina via `data-scroll-for` e `scrollLeft`.
- `JS-007` controla doze barras verticais via `data-scrollbar-for` e `scrollTop`.
- Cada barra vertical aponta para um alvo distinto; os doze destinos existem e cada barra está no mesmo contêiner pai do seu alvo.
- O painel Lembrete possui três listas independentes, seis cartões de demonstração e uma barra vertical por lista.
- A rolagem nativa é ocultada em algumas listas, mas o `overflow` e a interação de rolagem permanecem.

## 5. CSS e manutenção

- `style.css`: 453 regras qualificadas; 54 grupos de seletores repetidos em contextos/estados diferentes.
- `tema-dark.css`: 399 regras qualificadas; 33 grupos de seletores repetidos mantidos.
- A limpeza-base V19 removeu blocos CSS exatamente duplicados; esse resultado não representa uma auditoria integral das adições posteriores presentes nos arquivos ativos.
- As declarações `!important` são numerosas (859 somadas); foram preservadas para não quebrar a cascata. Recomenda-se revisão incremental, não remoção em massa.
- Na limpeza-base V19, quatro regras idênticas do cabeçalho/identificação do Lembrete e borda do card Hoje foram deduplicadas.
- A regra de 53px do título do Compromisso foi removida por não conseguir prevalecer sobre `#painel-compromisso .compromisso-evento-cabecalho h4` com `font-size: 16px !important`.

## 6. JavaScript

O JavaScript tem sete marcadores de manutenção, passa em `node --check`, não usa `fetch`, `localStorage`, `sessionStorage` nem IndexedDB. Os dois controladores de scroll observam conteúdo/tamanho para atualizar os cursores. A lógica dos controladores foi preservada nesta versão.

## 7. Limitações de validação

A validação de parsing e referências foi executada. A tentativa de captura em Chromium headless não concluiu neste ambiente (processo expirou); portanto, layout, cliques, rolagem por ponteiro e responsividade visual continuam pendentes de validação no navegador local.
