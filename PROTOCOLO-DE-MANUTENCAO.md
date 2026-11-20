# Protocolo de manutenção — Check.In V21

Este padrão é obrigatório para correções, novos componentes e otimizações.

1. **Inspecionar:** consultar os arquivos efetivamente abertos e confirmar a versão em uso.
2. **Rastrear:** localizar IDs funcionais, classes, marcadores, referências, dependências, regras anteriores/posteriores, media queries e cascata.
3. **Comparar:** confrontar o código com capturas/referências e preservar componentes aprovados.
4. **Identificar a causa:** separar fatos comprovados, riscos, hipóteses e preferências.
5. **Corrigir:** aplicar a menor alteração tecnicamente suficiente; não acumular remendos.
6. **Verificar:** parsing, referências, duplicações, seletores, sintaxe JS, recursos locais e efeitos colaterais.
7. **Documentar:** atualizar índices, changelog, validações e SHA-256 quando houver mudança.
8. **Validar:** repetir testes estáticos, funcionais e visuais nos breakpoints afetados.

## Identificadores

- IDs HTML/SVG são contratos funcionais: não renumerá-los sem rastrear todas as referências HTML, ARIA, CSS e JavaScript.
- `HTML/CSS/DARK/JS` são marcadores de comentário. Em auditoria de versão, a reindexação integral exige mapa de migração.
- `JS-006` horizontal e `JS-007` vertical são contratos de rolagem; preservar enquanto `data-scroll-for` e `data-scrollbar-for` existirem.
- `JS-009` identifica a pesquisa lateral. O índice V20 citava um contrato `JS-008` para navegação superior, mas esse marcador e seus listeners não existem no código ativo desta origem; não presumir que os cinco botões superiores navegam.
- Comentários devem corresponder ao bloco e ao seletor que identificam.

## CSS e cascata

- Não apagar regras apenas porque um seletor se repete.
- Comparar contexto, ordem, especificidade, camadas, estados e breakpoints.
- A ordem ativa é `@layer base, theme, responsive`, declarada em `style.css`.
- `style.css` contém estrutura/base; `tema-dark.css` contém tema; `mobile.css` contém ajustes responsivos. A ordem de `<link>` em `index.html` também é um contrato: `style.css` → `tema-dark.css` → `mobile.css`.
- Não introduzir `!important` como mecanismo normal de precedência. Antes, corrigir a camada, o escopo e a especificidade do seletor.
- Uma exceção com `!important` exige justificativa técnica registrada (por exemplo, integração externa ou estilo inline imutável), escopo mínimo e teste de regressão; não reintroduzir prioridades em bloco.
- Remover regras repetidas somente quando contexto, estados, media queries e declarações forem equivalentes. Se a repetição for intencional, documentar o refinamento em vez de fundir cegamente.
- Preservar a estética Soft UI/neumórfica aprovada e a identidade verde/grafite. Não recuperar propostas visuais experimentais rejeitadas.

## Funcionalidades

- Não inventar comportamento de controles que não tenham requisito funcional definido.
- Antes de implementar criar/editar/excluir, pesquisa semântica ou persistência, definir os contratos, feedback, tratamento de erro, acessibilidade e modelo de dados.

## Scrollbars

- Preservar `JS-006` e `JS-007`.
- Cada barra deve apontar para alvo existente e independente.
- Conferir pai de posicionamento, lista, trilho, cursor e observadores `ResizeObserver`/`MutationObserver`.

## Alterações manuais

Toda orientação deve indicar arquivo, linha verificada, ação, trecho original, bloco completo novo, justificativa, impacto e validação. Não afirmar que uma mudança foi testada sem executá-la.

## Estados de validação

Registrar separadamente `VALIDADO-ESTATICO`, `EM-TESTE` e `VALIDADO-VISUAL`. A aprovação visual depende de navegador real e capturas comparáveis.


## Compatibilidade entre navegadores — V21 em diante

- O alvo primário são versões modernas de Chrome/Chromium, Edge, Firefox, Safari e Samsung Internet.
- Para mudanças em CSS, verificar suporte e fallback sem alterar a declaração moderna aprovada; preservar as camadas `base` → `theme` → `responsive` e a ordem dos três `<link>` ativos.
- Para JavaScript, manter sintaxe ES5 no arquivo ativo enquanto o objetivo de compatibilidade legado permanecer; qualquer API moderna adicionada deve ter teste de disponibilidade e fallback comprovado.
- Não usar `:has()` em seletores essenciais sem alternativa estrutural equivalente; preferir IDs/classes explícitos quando a estrutura já permitir isso.
- Internet Explorer 11 é apenas degradação parcial enquanto CSS Grid, `gap`, variáveis CSS e recursos não suportados continuarem no projeto. Não declarar suporte integral sem matriz de testes real.
- Testes de Chromium headless não substituem testes em Chrome, Edge, Firefox, Safari, Samsung Internet e dispositivos físicos.
- Registrar separadamente: teste executado, compatibilidade inferida por recursos, e navegador/dispositivo não testado.
