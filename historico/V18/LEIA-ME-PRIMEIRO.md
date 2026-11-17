# Check.In V18 — pacote auditado

Esta versão foi gerada a partir do `Check.In-v17.rar` enviado pelo usuário. O RAR original não foi alterado.

## Arquivos ativos

- `index.html` — estrutura dos painéis, IDs funcionais, SVGs e barras independentes.
- `style.css` — estilos-base.
- `tema-dark.css` — tema escuro, curvas/sombras do cabeçalho e barras personalizadas.
- `script.js` — calendários, relógio/data e controladores de rolagem.
- `imagens/` — logo e favicons.

## O que foi feito na V18

1. Reindexação sequencial e sem duplicidades dos comentários `HTML`, `CSS`, `DARK` e `JS`, na ordem física dos respectivos arquivos.
2. Preservação integral dos IDs reais do DOM e dos IDs SVG.
3. Remoção de três blocos CSS comprovadamente idênticos e redundantes, sem consolidação em massa de seletores que participam da cascata.
4. Atualização dos índices e do relatório de auditoria.
5. Preservação dos dois efeitos de sombra do cabeçalho, do cartão Pendente aprovado e das barras horizontais da Rotina.

## Próximos marcadores livres

- HTML: `HTML-123`
- CSS: `CSS-0354`
- Tema escuro: `DARK-0222`
- JavaScript: `JS-008`

## Como abrir

Extraia a pasta inteira, abra `index.html` pelo Live Server no VS Code e mantenha a pasta `imagens/` no mesmo diretório do arquivo HTML.

## Documentação

Consulte `MAPA-DO-PROJETO.md`, `RELATORIO-AUDITORIA.md`, `INDICE-DE-REFERENCIAS.csv`, `INDICE-SELETORES-CSS.csv`, `SELETORES-REPETIDOS.csv`, `DEPENDENCIAS-JS-HTML.csv` e `MIGRACAO-DE-IDS.csv`.

A validação estática está registrada nos arquivos JSON. A aprovação visual final deve ser confirmada no navegador local.
