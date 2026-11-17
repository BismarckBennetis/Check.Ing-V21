# Protocolo de manutenção — Check.In V19

Este padrão é obrigatório para correções, novos componentes e otimizações.

1. **Inspecionar:** consultar os arquivos atuais e confirmar que correspondem à versão em uso.
2. **Rastrear:** localizar IDs funcionais, classes, marcadores, referências, dependências, regras anteriores/posteriores, `@media` e cascata.
3. **Comparar:** confrontar o código com capturas/vídeos, preservando componentes aprovados.
4. **Identificar a causa:** separar fatos, riscos e hipóteses.
5. **Corrigir:** aplicar a menor alteração tecnicamente suficiente; não acumular remendos.
6. **Verificar:** parsing, referências, duplicações, seletores, sintaxe JS, recursos locais e efeitos colaterais.
7. **Documentar:** atualizar os índices e o relatório quando houver mudança nos arquivos.

## Identificadores

- `id` HTML/SVG são contratos funcionais: não os renumerar sem rastrear todas as referências HTML, ARIA, CSS e JavaScript.
- `HTML/CSS/DARK/JS` são marcadores de comentário: novos marcadores usam o próximo número livre descrito em `LEIA-ME-PRIMEIRO.md`.
- Não reindexar marcadores em uma alteração pontual. Reindexação integral só deve ocorrer em auditoria de versão, com mapa de migração, como na V19.
- Comentários devem corresponder ao bloco e ao seletor que identificam.

## CSS e cascata

- Não apagar regras apenas porque um seletor se repete.
- Comparar contexto, ordem, especificidade, `!important`, estados e breakpoints.
- Remover bloco duplicado apenas quando seletor, contexto e todas as declarações forem idênticos e a posição posterior não esteja neutralizando uma regra intermediária.
- Não remover `!important` em massa.

## Scrollbars

- Preservar `JS-006` (horizontal) e `JS-007` (vertical) enquanto os contratos `data-scroll-for` e `data-scrollbar-for` forem usados.
- Cada barra deve apontar para um alvo existente e independente.
- Conferir a relação entre pai de posicionamento, lista, trilho, cursor e `ResizeObserver`/`MutationObserver`.

## Alterações manuais

Toda orientação deve indicar arquivo, linha verificada, ação, trecho original, bloco completo novo, justificativa, impacto e validação. Não afirmar que uma mudança foi testada sem executá-la.

## Estados de validação

Registrar separadamente `VALIDADO-ESTATICO`, `EM-TESTE` e `VALIDADO-VISUAL`. A aprovação visual depende de navegador real e de capturas comparáveis.
