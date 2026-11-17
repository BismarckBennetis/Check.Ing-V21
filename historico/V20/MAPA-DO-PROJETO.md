# Mapa do projeto — Check.In V20

## 1. Fonte e escopo

Base: pacote Check-In V19 fornecido em 13/11/2026. O original foi preservado; a V20 foi implementada em cópia separada. A atualização foi conservadora e priorizou responsividade, navegação, pesquisa, consolidação CSS, reindexação e documentação.

## 2. Estrutura de execução

`index.html` carrega `style.css` e depois `tema-dark.css`; `script.js` é carregado ao final do `body`. A ordem é um contrato: o tema escuro complementa/sobrepõe a camada-base.

```text
body
├── header.cabecalho
├── nav.menu-principal
│   └── 5 botões com aria-controls → painéis
├── main.conteudo-principal
│   ├── aside.painel-esquerdo
│   │   ├── pesquisa lateral
│   │   └── 5 botões filtráveis
│   ├── section.area-conteudo
│   │   └── div.grade-cards
│   │       ├── article#painel-financeiro
│   │       ├── article#painel-estudo
│   │       ├── article#painel-rotina
│   │       └── article#painel-compromisso
│   └── aside.painel-calendarios
│       ├── section#calendario-atual
│       └── section#calendario-proximo
└── section#painel-lembrete
    ├── 3 cartões de resumo com listas/scrollbars independentes
    └── #lista-proximos-lembretes com barra vertical própria
```

## 3. Inventário e marcadores

| Arquivo | Responsabilidade | Marcadores V20 | Próximo |
|---|---|---:|---|
| `index.html` | Estrutura, painéis, SVGs, ARIA e alvos | 131 | `HTML-132` |
| `style.css` | Estilos-base | 352 | `CSS-353` |
| `tema-dark.css` | Tema escuro, componentes e responsividade | 244 | `DARK-245` |
| `script.js` | Calendários, relógio, scrollbars, navegação e pesquisa | 9 | `JS-010` |

Os IDs HTML/SVG funcionais não são marcadores. Os 52 IDs funcionais da V19 continuam preservados; a V20 acrescenta `painel-financeiro` e `painel-estudo`, totalizando 54 IDs únicos.

## 4. Rolagem e contratos

- `JS-006`: três barras horizontais via `data-scroll-for` e `scrollLeft`.
- `JS-007`: treze barras verticais via `data-scrollbar-for` e `scrollTop`.
- Todos os destinos são únicos e existem no HTML.
- Os controladores observam conteúdo e dimensões com `ResizeObserver`/`MutationObserver` quando disponíveis.
- Não alterar `JS-006`, `JS-007`, `data-scroll-for` ou `data-scrollbar-for` sem rastrear todos os vínculos.

## 5. Navegação e pesquisa

- `JS-008` liga os cinco botões `.menu-principal .botao-menu[aria-controls]` aos painéis identificados por ID. Usa `scrollIntoView` e respeita `prefers-reduced-motion`.
- `JS-009` filtra os botões laterais em resposta ao campo `type=search`; normaliza diacríticos e caixa e atualiza a mensagem `role=status` quando não há resultados.
- Os botões laterais continuam sem ações de destino definidas. Não presumir navegação ou operações sem uma decisão funcional.

## 6. CSS e responsividade

- `style.css`: 467 regras qualificadas de primeiro nível; 137 ocorrências `!important`.
- `tema-dark.css`: 398 regras qualificadas de primeiro nível; 892 ocorrências `!important`.
- Parsing CSS sem erros; nenhuma assinatura de regra qualificada integralmente duplicada foi detectada.
- 11 blocos exatamente duplicados no tema escuro do Lembrete foram removidos. Regras parecidas com declarações/contextos diferentes foram mantidas.
- `!important` não foi removido em massa. Revisões futuras devem considerar ordem de carregamento e especificidade.
- Breakpoints responsivos da V20 reorganizam o grid principal, painéis, Rotina, Compromisso, Lembrete, menus e calendários. Matriz testada: 1600, 1440, 1280, 1200, 1024, 900, 800, 768, 653, 652, 480, 390, 360 e 320 px.

## 7. JavaScript, dados e dependências

- `node --check script.js` aprovado.
- Não foram encontrados LocalStorage, SessionStorage, IndexedDB, cookies, `fetch` ou APIs de dados no código atual.
- A aplicação não possui persistência ou migração de dados. Dados de demonstração são definidos no HTML/JS.
- Google Fonts é a dependência externa identificada para tipografia; requer rede.

## 8. Limitações e pendências

- Treze botões nativos permanecem sem ações JavaScript definidas: exigir especificação antes de implementar.
- Ícones de editar/excluir/expandir em Próximos Lembretes permanecem decorativos.
- Não há backend nem persistência.
- O teste visual in-memory do Chromium não carregou todos os recursos por caminhos relativos; os caminhos locais foram conferidos estaticamente. Teste de publicação em Live Server continua recomendado.
