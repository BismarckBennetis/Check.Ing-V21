# Protocolo de manutenção — Check.In V16

Este padrão é obrigatório para correções, novos componentes e otimizações do projeto.

1. **Inspecionar:** consultar os arquivos HTML, CSS e JavaScript envolvidos e confirmar que são as versões atuais.
2. **Rastrear:** localizar IDs, classes, marcadores, referências, dependências, regras anteriores/posteriores, `@media` e cascata.
3. **Comparar:** confrontar o código com capturas e vídeos fornecidos, respeitando os componentes visualmente validados.
4. **Identificar a causa:** separar fatos comprovados de hipóteses; não apresentar hipótese como diagnóstico confirmado.
5. **Corrigir:** propor alteração pequena, com ID sequencial exclusivo, `REF` hierárquica e indicação exata do local. Reutilizar seletores e componentes quando a semântica for a mesma; preferir modificadores pequenos a cópias completas.
6. **Verificar:** conferir parsing, referências, duplicações, seletores, sintaxe JS, recursos locais e possíveis efeitos colaterais. Fazer teste visual no navegador quando disponível e registrar explicitamente quando não for realizado.

## Regras complementares

- Nunca apagar uma regra apenas porque o seletor aparece mais de uma vez. Conferir ordem, especificidade, `!important`, estados e contexto responsivo.
- Nunca renumerar atributos `id` do DOM sem rastrear todas as referências HTML, ARIA, SVG e JavaScript.
- Nunca reutilizar marcadores removidos; lacunas antigas são históricas.
- Preservar comportamentos e painéis já validados, salvo pedido explícito.
- Não remover arquivos de imagem sem verificar referências em HTML, CSS, JavaScript e recursos carregados dinamicamente. Arquivos-fonte (por exemplo, favicon master) devem ser distinguidos dos recursos de runtime.
- Atualizar índices e relatórios quando os seletores, IDs, dependências ou recursos mudarem.
- Registrar a validação com clareza: `VALIDADO-ESTATICO`, `EM-TESTE` ou `VALIDADO-VISUAL`. A aprovação visual depende da conferência no navegador.
