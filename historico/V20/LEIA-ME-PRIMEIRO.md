# Check.In V20 — pacote atualizado

A V20 é uma evolução conservadora da V19, com foco em responsividade, navegação superior, pesquisa lateral, consolidação CSS e atualização documental. O pacote V19 original permanece preservado fora desta cópia; o histórico V12–V19 continua disponível em `historico/`.

## Arquivos ativos

- `index.html` — estrutura dos painéis, IDs, SVGs, ARIA e alvos de rolagem.
- `style.css` — estilos-base e regras de estrutura.
- `tema-dark.css` — tema escuro, componentes, efeitos e regras responsivas.
- `script.js` — calendários, relógio/data, controladores `JS-006`/`JS-007`, navegação `JS-008` e pesquisa `JS-009`.
- `imagens/` — logo, favicons e recursos gráficos.

## Alterações V20

1. Reorganização responsiva do layout principal e dos painéis.
2. Menu principal com navegação para os cinco painéis e suporte a movimento reduzido.
3. Pesquisa lateral funcional, com normalização de acentos e estado sem resultados.
4. Correção da declaração CSS órfã e remoção de onze regras exatamente duplicadas do tema escuro.
5. Reindexação sequencial dos marcadores de manutenção.
6. Atualização dos índices, relatório, mapa, validações e checksums.

## Estado e limites

- 54 IDs funcionais de DOM/SVG, todos únicos. Os 52 IDs da V19 foram preservados; `painel-financeiro` e `painel-estudo` foram adicionados para navegação acessível.
- 13 barras verticais e 3 horizontais, com destinos únicos existentes.
- `JS-006` e `JS-007` mantidos como contratos dos controladores.
- Não há LocalStorage, SessionStorage, IndexedDB, backend ou API de dados no estado atual. A aplicação continua usando dados de demonstração.
- Treze botões nativos e ações decorativas de Próximos Lembretes ainda dependem de definição funcional. Não foram atribuídas ações por suposição.

## Como abrir

Extraia o ZIP mantendo a pasta `Check.In-V20` inteira e abra `index.html` com Live Server no VS Code. Mantenha a pasta `imagens/` no mesmo nível do HTML.

## Documentação

- `RELATORIO-AUDITORIA.md` — diagnóstico e resultado técnico da atualização.
- `MAPA-DO-PROJETO.md` — arquitetura e contratos.
- `CHANGELOG-V20.md` e `VERSION.txt` — histórico e identificação da versão.
- `PROTOCOLO-DE-MANUTENCAO.md` — regras de manutenção.
- `INDICE-DE-REFERENCIAS.csv` — marcadores de manutenção.
- `INDICE-SELETORES-CSS.csv` — seletores, contexto e propriedades.
- `SELETORES-REPETIDOS.csv` — seletores repetidos em contextos/estados distintos.
- `DEPENDENCIAS-JS-HTML.csv` — referências estáticas JavaScript/HTML.
- `MIGRACAO-DE-IDS.csv` — migração dos comentários V19 → V20; não representa IDs funcionais de DOM.
- `VALIDACAO-ESTATICA.json` e `VALIDACAO-FINAL.json` — resultados e limitações dos testes.
- `VALIDACAO-ONDA-PAINEL.json` — causa e testes específicos da onda luminosa no painel esquerdo.
- `CHECKSUMS-SHA256.txt` — hashes dos arquivos do pacote, exceto o próprio manifesto.
