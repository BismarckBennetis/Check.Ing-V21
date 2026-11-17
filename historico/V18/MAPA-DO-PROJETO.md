# Mapa do projeto — Check.In V18 auditado

## 1. Fonte e escopo

Esta versão foi gerada a partir do arquivo enviado `Check.In-v17.rar`. O arquivo V17 original foi mantido intacto. A versão V18 contém o mesmo conjunto funcional de arquivos e recursos, com reindexação dos marcadores de comentário, atualização dos índices e remoção de três blocos CSS comprovadamente duplicados.

## 2. Estrutura de execução

`index.html` carrega `style.css`, depois `tema-dark.css`, e por fim `script.js`. O tema escuro sobrepõe os estilos-base; a ordem, especificidade, estados e media queries devem ser considerados antes de consolidar regras repetidas.

```text
main.conteudo-principal
└── section.area-conteudo
    └── div.grade-cards
        ├── article.card-financeiro
        ├── article.card-estudo
        ├── article#painel-rotina
        └── article#painel-compromisso
```

Rotina e Compromisso são irmãos diretos dentro de `.grade-cards`.

## 3. Arquivos ativos e marcadores

| Arquivo | Responsabilidade | Marcadores | Próximo livre |
|---|---|---:|---|
| `index.html` | Estrutura, IDs DOM, referências SVG, nove barras verticais independentes e três barras horizontais da Rotina | 122 | `HTML-123` |
| `style.css` | Regras-base, geometria, layouts, tipografia e estados | 353 | `CSS-0354` |
| `tema-dark.css` | Paleta escura, relevo, componentes personalizados, sombras do cabeçalho e ocultação das barras verticais da Rotina | 221 | `DARK-0222` |
| `script.js` | Calendários, relógio/data, três barras horizontais e nove controladores verticais independentes | 7 | `JS-008` |

Os marcadores estão sequenciais pela ordem em que aparecem em cada arquivo. Os IDs reais do DOM e os IDs SVG não foram renumerados.

## 4. Rolagem e isolamento

- `JS-006` controla `scrollLeft` das três barras `.rotina-barra-horizontal[data-scroll-for]`.
- `JS-007` controla `scrollTop` das nove barras `.ci-scrollbar-vertical[data-scrollbar-for]`. Cada instância aponta para um alvo por `data-scrollbar-for`.
- `[data-scrollbar-vertical]` oculta as barras nativas sem remover `overflow` ou a rolagem por roda, trackpad e toque.
- As três barras verticais personalizadas da Rotina também estão ocultas por seus IDs específicos em `tema-dark.css`; as barras horizontais inferiores permanecem no HTML/CSS/JS.
- Os nove alvos verticais são: Financeiro vencidas, Estudo atividades, Rotina pendências, Rotina ontem, Rotina hoje, Compromisso pendentes, Compromisso ontem, Compromisso hoje e conteúdo do Compromisso.

## 5. Cabeçalho e componentes aprovados

- `.cabecalho::before` e o efeito neumórfico permanecem no CSS-base/tema sem alterações.
- `.cabecalho::after` mantém o SVG vetorial das duas sombras: primeira sombra verde `#27e86b` com opacidade 35%, segunda `#064b2d` com opacidade 55%, desfoque e alcance conforme o bloco V17.
- O cartão Pendente da Rotina não teve regras visuais alteradas.
- O painel Compromisso mantém a reutilização do símbolo SVG de lixeira; o botão `Descartar` removido na versão anterior continua ausente.

## 6. Auditoria de repetição e limpeza

Foram removidos três blocos CSS exatamente duplicados: um bloco `.icone-comprovantes` no CSS-base e duas regras repetidas no tema escuro (ocultação da seta de categoria e cor dos ícones de documento/lixeira). Os seletores repetidos que possuem declarações diferentes, prioridades, breakpoints ou camadas de tema foram mantidos. Confira `SELETORES-REPETIDOS.csv`.

## 7. Índices atualizados

- `INDICE-DE-REFERENCIAS.csv`: todos os marcadores, REF e linhas.
- `INDICE-SELETORES-CSS.csv`: regras qualificadas, contexto @media/at-rules, propriedades e marcador associado quando identificável.
- `SELETORES-REPETIDOS.csv`: seletores repetidos e linhas.
- `DEPENDENCIAS-JS-HTML.csv`: seletores JS e correspondências estáticas/dinâmicas.
- `MIGRACAO-DE-IDS.csv`: relação entre marcadores antigos e novos.
- `VALIDACAO-ESTATICA.json` e `VALIDACAO-FINAL.json`: resultados da inspeção.

## 8. Regra de manutenção

IDs de comentários são marcadores de manutenção; atributos `id` do DOM e IDs SVG são contratos funcionais para CSS, JavaScript, `aria-controls`, `href` e `<use>`. Nunca renumerar IDs reais sem atualizar todas as referências e validar cada dependência. Para novos marcadores, use o próximo livre indicado acima.

## 9. Estado de validação

A auditoria estática foi refeita sobre os arquivos desta V18. A validação visual deve ser confirmada na máquina do usuário após abrir o projeto, especialmente posição das barras, rolagem e aparência final do cabeçalho.
