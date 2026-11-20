# Matriz de compatibilidade — Check.In V21.2

## Alvos e estado de validação

| Navegador / motor | Estado nesta entrega |
|---|---|
| Chromium 144 headless | **Executado**: DOM, camadas CSS, calendário, feriados, pesquisa, scrollbars, painel mobile e viewports 1440, 1024, 700, 653, 652, 480, 375 e 320 CSS px. |
| Google Chrome estável | Não executado separadamente. Esperado em versões modernas com CSS Cascade Layers; requer smoke test. |
| Microsoft Edge (Chromium) | Não executado separadamente. Esperado em versões modernas com CSS Cascade Layers; requer smoke test. |
| Firefox | Não executado. Requer smoke test em versão moderna. |
| Safari macOS/iOS | Não executado. Requer smoke test em versão moderna. |
| Samsung Internet | Não executado em aparelho físico. Requer teste real Android. |
| Internet Explorer 11 | **Não suportado por esta arquitetura**: não aplica CSS Cascade Layers. Não há equivalência visual garantida. |

## Arquitetura da cascata

- `style.css` estabelece `@layer base, theme, responsive` e abriga a estrutura.
- `tema-dark.css` abriga a aparência na camada `theme`.
- `mobile.css` abriga os ajustes responsivos na camada `responsive`.
- As três folhas ativas não contêm declarações `!important`.
- `[hidden] { display: none; }` está no fim da camada responsiva, garantindo que o estado funcional do atributo prevaleça sobre estilos visuais anteriores.

## Limite móvel conhecido

O teste Chromium encontrou overflow horizontal abaixo de 480px: `scrollWidth` = 622px (480), 536px (412), 514px (390), 499px (375), 484px (360) e 460px (320). A V21.2 corrige o recorte do painel esquerdo/Notifique-me e o fluxo desses elementos, mas não executa uma reformulação completa do layout mobile.

## Limites da validação

O runtime foi Chromium 144 headless usando o HTML, CSS e JavaScript do pacote em fixture in-memory. Os links de Google Fonts foram bloqueados nesse contexto; fontes fallback foram usadas. Não houve teste em navegador comercial separado, aparelho físico, domínio de produção ou deploy.
