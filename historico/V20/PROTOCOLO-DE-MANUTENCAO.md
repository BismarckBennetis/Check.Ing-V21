# Protocolo de manutenção — Check.In V20

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
- `JS-008` navegação principal e `JS-009` pesquisa lateral identificam comportamentos adicionados na V20.
- Comentários devem corresponder ao bloco e ao seletor que identificam.

## CSS e cascata

- Não apagar regras apenas porque um seletor se repete.
- Comparar contexto, ordem, especificidade, `!important`, estados e breakpoints.
- Remover bloco duplicado apenas quando seletor, contexto e todas as declarações forem idênticos e a posição posterior não neutralizar uma regra intermediária.
- Não remover `!important` em massa.
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
