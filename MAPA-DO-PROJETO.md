# Mapa do projeto — Check.In V21

## 1. Fonte e escopo

Base: pacote V20 enviado pelo usuário em 17/11/2026. O pacote de origem veio em RAR; a entrega V21 será ZIP. A V20 foi preservada em `historico/V20/`. Esta atualização é focada em compatibilidade progressiva, sem redesenho ou novas funcionalidades.

## 2. Estrutura de execução

`index.html` carrega `style.css`, depois `tema-dark.css`, e `script.js` no final do `body`. A ordem é contrato: o tema complementa/sobrepõe a camada-base.

```text
body
├── header.cabecalho
├── nav.menu-principal
│   └── 5 botões visuais (sem ação de navegação implementada no JS atual)
├── main.conteudo-principal
│   ├── aside.painel-esquerdo
│   │   ├── campo de pesquisa lateral
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
    ├── cartões de resumo e listas com scrollbars independentes
    └── #lista-proximos-lembretes
```

## 3. Identificadores e contratos

- O HTML contém 56 atributos `id`, todos únicos. Os 54 IDs funcionais da V20 foram preservados; a V21 acrescenta `agenda-compromissos-ontem` e `agenda-compromissos-hoje` nas seções de agenda.
- As agendas mantêm classes e estrutura interna; os dois IDs apenas fornecem um gancho CSS estrutural estável.
- `JS-001`/`JS-002`: estado e renderização dos calendários.
- `JS-003`: navegação mensal por setas.
- `JS-004`/`JS-005`: relógio, data e atualização ao retornar à aba.
- `JS-006`: três barras horizontais independentes via `data-scroll-for` e `scrollLeft`.
- `JS-007`: treze barras verticais via `data-scrollbar-for` e `scrollTop`.
- `JS-009`: pesquisa lateral, normalização de acentos e estado sem resultados.
- Não existe marcador `JS-008` nem lógica de navegação superior correspondente no `script.js` fornecido. Os cinco botões superiores são visuais/inertes nesta base; não atribuir destinos sem requisito definido.

## 4. Inventário CSS

- `style.css`: 476 regras, 2.654 declarações e 136 ocorrências `!important`.
- `tema-dark.css`: 630 regras, 2.822 declarações e 1.240 ocorrências `!important`.
- Total: 1.106 regras; 5.476 declarações; 1.376 ocorrências `!important`.
- O tema escuro permanece carregado após o CSS-base.
- Foram removidos os usos de `:has()` dos dois seletores de cabeçalho de agenda e substituídos por IDs equivalentes.
- `INDICE-SELETORES-CSS.csv` foi reconstruído por parsing PostCSS; `SELETORES-REPETIDOS.csv` lista repetição de seletor, não duplicação comprovada.

## 5. Compatibilidade e limites

- JS ativo transpilado para ES5; fallbacks locais para `Array.from`, `NodeList.forEach`, `String.padStart`, `Number.parseFloat` e pesquisa sem `String.normalize`.
- CSS recebe fallbacks localizados para recursos modernos onde a alternativa não compromete a cascata. Não há fallback completo para Grid, flex gap ou custom properties em todo o projeto.
- IE11 tem suporte apenas parcial; a composição da interface depende extensivamente de CSS Grid, `gap` e variáveis CSS.
- A matriz por navegador está em `MATRIZ-COMPATIBILIDADE-V21.md`.

## 6. Dados e persistência

- Não foram encontrados `localStorage`, `sessionStorage`, `indexedDB`, `fetch` ou endpoints de dados no código atual.
- Não há persistência ou backend; os dados continuam demonstrativos.
- Não adicionar funcionalidades a controles sem contrato funcional aprovado.
