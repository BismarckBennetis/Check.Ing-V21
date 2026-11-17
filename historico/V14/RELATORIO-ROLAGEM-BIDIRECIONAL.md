# Correção da rolagem bidirecional — Check.In V14

## Comportamento definido
- A barra vertical nativa de cada lista continua controlando `scrollTop` (tarefas acima/abaixo).
- A barra inferior personalizada controla exclusivamente `scrollLeft` (conteúdo horizontal da tarefa).
- Os três cartões usam uma única implementação JavaScript reutilizável.
- Linhas com nomes extensos passam a expandir na horizontal; o texto não é truncado, e a lista revela o restante pelo deslocamento horizontal.
- Posição e altura externa dos cartões não foram alteradas. Semanal permanece acima de Pendente.

## Arquivos alterados
- `index.html`: nomes acessíveis das três barras especificam rolagem horizontal.
- `style.css`: CSS-0368 permite overflow nos dois eixos; linhas de Pendente preservam sua altura e podem crescer na largura.
- `tema-dark.css`: DARK-0205 define larguras intrínsecas das linhas, mantém as barras verticais nativas e oculta apenas as barras horizontais nativas no Chromium, mantendo as barras inferiores personalizadas.
- `script.js`: JS-006 passa a calcular cursor com `scrollWidth/clientWidth` e controlar somente `scrollLeft`; removeu qualquer escrita em `scrollTop`.

## Validações
Validações sintáticas e de estrutura são executadas na geração do pacote. A inspeção visual final ainda precisa ser feita no navegador local.
