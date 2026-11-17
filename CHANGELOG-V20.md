# Changelog — Check.In V20

## Base e preservação

- Origem: pacote `Check.In-V19(1).rar` enviado em 13/11/2026.
- A V20 foi criada em cópia de trabalho separada; o RAR V19 original não foi alterado.
- O histórico V12–V19 foi preservado; a documentação imediatamente anterior foi arquivada em `historico/V19/`.
- Nenhuma camada de persistência ou API foi introduzida.

## Alterações implementadas

### Responsividade

- Reorganizado o layout principal em grid para manter a composição desktop e evitar a compressão simultânea de sidebar, painéis e calendários.
- Em larguras intermediárias, sidebar e conteúdo permanecem lado a lado e os calendários passam para uma faixa abaixo.
- Em tablet e mobile, as áreas são empilhadas e os painéis Rotina, Compromisso e Lembrete liberam altura para conteúdo variável.
- Corrigidos deslocamentos fixos da Rotina em telas menores e larguras expandidas que ultrapassavam o contêiner.
- Ajustado o menu principal para manter os cinco rótulos legíveis entre 320 e 1150 px.
- Mantida a estrutura desktop existente em 1600 px, com as áreas principais preservadas em 274 px / 988 px / 262 px no teste de referência.

### Funcionalidades definidas e implementadas

- Os cinco botões superiores agora possuem `aria-controls` e navegam até o painel correspondente por rolagem, respeitando `prefers-reduced-motion`.
- A pesquisa lateral agora filtra os cinco itens existentes, ignorando acentos e diferenças de caixa; informa quando não há resultados.
- As ações não especificadas dos demais botões não foram inventadas. Permanecem documentadas como pendência de definição funcional.

### HTML e CSS

- Adicionados os IDs `painel-financeiro` e `painel-estudo`, preservando todos os 52 IDs funcionais anteriores.
- Adicionada mensagem acessível de estado vazio à pesquisa lateral.
- Removida declaração CSS órfã `linear-gradient()` sem propriedade, que era inválida.
- Removidas 11 regras exatamente duplicadas no tema escuro do painel Lembrete; regras semelhantes com declarações diferentes foram preservadas.
- Ajustada a regra base do grid Compromisso para permitir que o breakpoint mobile de uma coluna prevaleça.
- Nenhum conjunto de estilos aprovado foi substituído por redesign; a aparência e a estrutura desktop foram preservadas nos testes comparativos.

### Marcadores e índices

- Reindexados os comentários `HTML`, `CSS`, `DARK` e `JS` em ordem física e sequencial.
- Marcadores finais: HTML 131, CSS 352, DARK 244 e JS 009.
- Os contratos `JS-006` (horizontal) e `JS-007` (vertical) foram preservados.
- Nenhum ID funcional antigo do DOM/SVG foi renumerado; dois IDs novos foram acrescentados para os painéis principais.
- Índices, relatório, mapa, changelog, validações e SHA-256 foram atualizados a partir dos arquivos V20.

## Pendências conhecidas

- Treze botões nativos permanecem sem ação JavaScript definida, além dos cinco controles de navegação superior e quatro setas dos calendários. É necessária definição do comportamento esperado antes de implementar essas ações.
- Os ícones de editar, excluir e expandir em Próximos Lembretes permanecem visuais; sua semântica e persistência ainda não foram definidas.
- O projeto não possui armazenamento persistente ou backend; recarregar a aplicação restaura os dados de demonstração.
- A carga das fontes Google Fonts depende de rede.

## Validação

- HTML: parsing sem erros; 54 IDs funcionais, todos únicos; todos os IDs anteriores preservados.
- CSS: parsing sem erros em `style.css` e `tema-dark.css`; nenhuma assinatura de regra integralmente duplicada restante.
- JavaScript: `node --check` aprovado; os 558 linhas originais foram mantidas como prefixo, com JS-008/009 acrescentados ao final.
- Chromium: sem exceções JavaScript no carregamento nos 14 breakpoints testados; largura do documento igual à viewport entre 1600 px e 320 px.
- Navegação superior, filtro de pesquisa, navegação do calendário e interações representativas de teclado nas barras vertical/horizontal aprovados; detalhes em `VALIDACAO-FINAL.json`.
- As referências locais de recursos foram verificadas estaticamente; o harness em memória não carregou todas as imagens por caminho relativo, então o teste visual não certifica a renderização final de todos os assets.

## Correção pontual posterior — onda do painel esquerdo (16/11/2026)

- **Causa:** o SVG da onda usa `viewBox="0 0 900 1600"` e era desenhado em uma caixa de fundo muito mais larga do que alta (`background-size: 100% 56%`). Sem `preserveAspectRatio`, o SVG aplica o padrão `xMidYMid meet`, centralizando o desenho dentro da caixa e deixando a onda com largura visual reduzida. O alinhamento do `background-position` não corrigia esse espaço interno.
- **Correção:** adicionado `preserveAspectRatio="none"` ao elemento raiz do SVG embutido em `.painel-esquerdo::after`. A geometria vetorial agora acompanha a caixa completa do pseudo-elemento; o traço percorre as duas laterais e o preenchimento alcança a borda inferior.
- **Escopo:** somente `tema-dark.css` recebeu alteração funcional. HTML, CSS-base e JavaScript não foram modificados nesta correção.
- **Validação:** SVG decodificado e XML válido; renderização Chromium da regra real em 5 combinações de largura/altura (230×420, 260×639, 704×639, 704×1100 e 760×900). A validação foi feita em fixture isolada com os blocos CSS reais do painel, não em uma sessão completa do Live Server. Detalhes em `VALIDACAO-ONDA-PAINEL.json`.

### 16/11/2026 — Curva inferior com cauda integrada

- A curva do painel esquerdo agora nasce praticamente na borda inferior, próxima à lateral esquerda, e sobe suavemente para se integrar à onda principal.
- Preenchimento, traço nítido, brilhos e `clipPath` compartilham a mesma geometria.
- Os gradientes verdes e os dois halos desfocados permanecem limitados à região inferior da curva; a superfície acima mantém o gradiente escuro estrutural.
- Removidas as duas camadas escuras da sombra do campo de pesquisa, preservando as duas camadas verdes já aprovadas.
- Alteração funcional restrita a `tema-dark.css`; HTML, `style.css` e JavaScript preservados.
- Validação XML/SVG estática aprovada e prévia visual em Chromium validada em 288×640 e 704×640; validação final na aplicação completa depende de recarregar o projeto local.
