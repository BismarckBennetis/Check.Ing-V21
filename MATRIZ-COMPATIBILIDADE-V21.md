# Matriz de compatibilidade — Check.In V21

## Alvos e estado de validação

| Navegador / motor | Alvo do projeto | Teste executado nesta entrega | Estado declarado |
|---|---|---|---|
| Chromium 144 (headless) | Referência técnica local | Sim: DOM, CSS, JS, calendário, pesquisa, scrollbars e 15 larguras | Testado nos limites descritos no relatório |
| Google Chrome (desktop/Android) | Prioritário | Não executado como aplicativo/navegador separado | Compatibilidade esperada nas versões modernas; requer smoke test real |
| Microsoft Edge (Chromium) | Prioritário | Não executado separadamente | Compatibilidade esperada nas versões modernas; requer smoke test real |
| Samsung Internet | Prioritário para Android | Não executado em aparelho físico | Compatibilidade esperada nas versões modernas; requer teste no M55 |
| Mozilla Firefox | Prioritário | Não executado | Compatibilidade esperada nas versões modernas; requer smoke test real |
| Safari macOS/iOS | Prioritário | Não executado | Compatibilidade esperada nas versões modernas; requer smoke test real |
| Internet Explorer 11 | Legado, não prioritário | Não executado | Parcial/degradado; sem garantia de layout ou fidelidade visual |

## Medidas de compatibilidade incluídas

- Remoção de `:has()` dos dois seletores de agenda afetados.
- Fallbacks de propriedades posicionais `inset` para `top/right/bottom/left`.
- Valores de fallback antes de `clamp()`, `min()`, `aspect-ratio` e usos selecionados de propriedades CSS customizadas.
- JavaScript emitido em ES5 e fallbacks para APIs específicas usadas no código ativo.
- Pesquisa sem acentos permanece operante mesmo quando `String.prototype.normalize` não existe.

## Limite estrutural do IE11

O IE11 não interpreta variáveis CSS modernas nem CSS Grid moderno; o projeto também usa amplamente `gap` e outros recursos modernos. O fallback local melhora certos componentes, mas não substitui uma implementação de layout legado. Por isso, o estado é **parcial/degradado**, não “compatível integralmente”.

## Limite dos testes desta entrega

A página foi montada em contexto in-memory para executar o Chromium sem depender de servidor local. Alguns recursos externos/relativos (como Google Fonts e imagens referenciadas por caminho) não foram carregados nesse contexto; os caminhos foram inspecionados estaticamente. Este teste não certifica renderização em navegador real, deploy GitHub Pages ou aparelho físico.
