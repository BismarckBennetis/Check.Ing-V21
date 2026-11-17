# Check.In V21.1 — correção visual complementar

A V21 é uma evolução conservadora da V20. O foco é compatibilidade progressiva entre navegadores, fallbacks localizados, remoção de `:has()` de dois seletores e preservação dos refinamentos visuais previamente aprovados. O objetivo foi preservar a interface e os comportamentos já existentes, sem antecipar o redesenho mobile ou inventar funcionalidades.

## Arquivos ativos

- `index.html` — estrutura dos painéis, IDs, SVGs, ARIA e alvos de rolagem.
- `style.css` — estilos-base e regras de estrutura.
- `tema-dark.css` — tema escuro, componentes, efeitos e regras responsivas.
- `script.js` — calendários, relógio/data, barras de rolagem e pesquisa lateral, agora emitido em ES5 com fallbacks localizados.
- `imagens/` — logo, favicons e recursos gráficos.

**Ordem de carregamento:** `style.css` antes de `tema-dark.css`; `script.js` ao final do `body`. Preserve essa ordem.

## Como abrir

Extraia o ZIP mantendo a pasta `Check.In-V21` inteira e abra `index.html` com Live Server no VS Code. Mantenha `imagens/` no mesmo nível do HTML.

## Compatibilidade pretendida

- Alvo principal: versões modernas de Chrome/Chromium, Edge, Firefox, Safari e Samsung Internet.
- Internet Explorer 11: apenas degradação parcial; não há promessa de equivalência visual ou de layout.
- Consulte `MATRIZ-COMPATIBILIDADE-V21.md` para separar testes executados, compatibilidade esperada e limitações.

## Limites conhecidos importantes

- O teste comparativo encontrou overflow horizontal entre 320 e 480 px, mas ele já existia na V20 e permaneceu idêntico na V21 nos 15 breakpoints comparados. O ajuste do layout mobile continua como etapa separada.
- Os cinco botões visuais do menu superior não têm listeners ou destinos funcionais no `script.js` desta versão. Não foram ativados por inferência.
- A aplicação não possui LocalStorage, SessionStorage, IndexedDB, backend, banco de dados ou API de dados. Os dados exibidos continuam demonstrativos.
- Não foram implementadas novas ações nos botões pendentes nem nos ícones decorativos de Próximos Lembretes.

## Documentação

- `CHANGELOG-V21.md` — alterações V21 e correção V21.1; escopo preservado.
- `RELATORIO-AUDITORIA.md` — diagnóstico, alterações, resultados e limitações.
- `MAPA-DO-PROJETO.md` — estrutura e contratos reais atuais.
- `PROTOCOLO-DE-MANUTENCAO.md` — padrão obrigatório para próximas alterações.
- `MATRIZ-COMPATIBILIDADE-V21.md` — compatibilidade por navegador e nível de validação.
- `INDICE-DE-REFERENCIAS.csv` — marcadores atualizados a partir do código ativo.
- `INDICE-SELETORES-CSS.csv` e `SELETORES-REPETIDOS.csv` — índices reconstruídos por análise do CSS.
- `DEPENDENCIAS-JS-HTML.csv` — seletores e destinos efetivamente usados pelo JavaScript.
- `MIGRACAO-DE-IDS-V21.csv` — dois IDs de contêiner adicionados para os seletores das agendas.
- `VALIDACAO-ESTATICA.json`, `VALIDACAO-FINAL.json`, `VALIDACAO-RUN-V21.json`, `VALIDACAO-LEGACY-FALLBACKS.json`, `VALIDACAO-RECURSOS-V21.json` e `VALIDACAO-ONDA-PAINEL.json` — resultados técnicos.
- `CHECKSUMS-SHA256.txt` — hashes dos arquivos do pacote, exceto o próprio manifesto.
- `historico/V20/` — snapshot dos arquivos ativos e documentação original da V20.


## Prévia do efeito corrigido

- `painel-esquerdo-onda-v21.1-preview.png` — renderização auxiliar do SVG atualizado, sem o traço interno `#07190F`.
- `painel-esquerdo-v21-preview-inicial.png` — captura da V21 inicial, preservada apenas como referência histórica; não representa a correção V21.1.
