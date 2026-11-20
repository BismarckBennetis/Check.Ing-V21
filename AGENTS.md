# AGENTS.md — Padrão permanente de desenvolvimento do Check-In

## 1. Identidade e comunicação
O projeto é o Check-In.

- Comunique-se sempre em português brasileiro.
- Explique os procedimentos de maneira didática e técnica.
- Não invente informações, estruturas, seletores, linhas ou funcionalidades.
- Questione premissas incorretas e apresente evidências.
- Separe fatos comprovados, hipóteses e dúvidas.

## 2. Regra fundamental: investigar antes de alterar
Nunca modifique um arquivo antes de compreender o contexto da alteração.

Antes de propor qualquer correção:

1. Examine os arquivos atuais do projeto.
2. Identifique o elemento HTML envolvido.
3. Localize todas as regras CSS relacionadas.
4. Localize todas as referências JavaScript relacionadas.
5. Investigue duplicações e conflitos.
6. Verifique especificidade, herança, cascata e sobrescritas.
7. Verifique regras posteriores que possam modificar o mesmo elemento.
8. Compare com componentes semelhantes que funcionam corretamente.
9. Identifique a causa comprovada antes de propor a solução.
Não confunda coincidência visual com causa técnica.

## 3. Arquivos e versões

- Trabalhe sempre com a versão atualmente presente no ambiente de trabalho.
- Não considere arquivos históricos como versões ativas.
- Documentos de auditorias anteriores são referências, não verdades absolutas.
- Verifique os arquivos ativos antes de utilizar resultados de relatórios antigos.
- Nunca utilize linhas de versões anteriores como se fossem atuais.
- Se houver divergência entre documentação e código ativo, informe a divergência.

## 4. Auditoria obrigatória de CSS
Sempre que uma alteração envolver CSS, examine obrigatoriamente:

- style.css
- tema-dark.css
- mobile.css
Considere também a ordem dos três `<link>` em `index.html` e a arquitetura de camadas ativas: `base`, `theme`, `responsive`.
Investigue:

- Todas as ocorrências do seletor principal.
- Seletores relacionados e descendentes.
- Regras duplicadas.
- Especificidade.
- Herança.
- Ordem de carregamento.
- Sobrescritas posteriores.
- Uso de `!important` e se a precedência pode ser resolvida pela camada/especificidade correta.
- Media queries.
- Estados de interação.
- Regras que alterem dimensões, posicionamento, sombras, cores ou visibilidade.
Não declare que existe conflito sem demonstrar a relação entre as regras.

Não crie uma nova regra no final do CSS apenas para esconder um problema causado por uma regra anterior, quando for possível corrigir a origem.

Na V21.2, a cascata ativa é organizada em `@layer base, theme, responsive`. Não introduza `!important` como rotina. Uma exceção exige justificativa técnica específica, seletor mínimo e validação de regressão. Não remova prioridades de forma cega: primeiro migre a precedência para as camadas corretas, depois teste estados e breakpoints.

## 5. Auditoria de HTML e JavaScript
Para alterações em HTML:

- Localize o elemento exato.
- Verifique classes, IDs, atributos e estrutura hierárquica.
- Preserve os identificadores e referências existentes.
- Identifique dependências CSS e JavaScript.
Para alterações em JavaScript:

- Localize todas as referências ao elemento.
- Examine eventos diretos e delegados.
- Verifique querySelector, querySelectorAll, getElementById e demais referências.
- Preserve funcionalidades e integrações existentes.
- Não declare que um elemento não possui comportamento sem investigar possíveis mecanismos indiretos.

## 6. Protocolo obrigatório para apresentar alterações
Toda correção deverá ser apresentada com:

1. Nome exato do arquivo.
2. Número das linhas da versão atual.
3. Código original encontrado.
4. Diagnóstico técnico.
5. Operação necessária: substituir, inserir ou remover.
6. Código completo pronto para copiar.
7. Explicação do motivo da mudança.
8. Possíveis impactos em outros componentes.
Nunca invente números de linha.

Se não conseguir localizar o trecho exato, peça o código atual ou faça uma nova leitura do arquivo.

Não apresente instruções vagas como "procure pela classe" quando for possível identificar o local exato.

Quando houver várias alterações, numere cada intervenção separadamente.

## 7. Preservação do projeto

- Não altere funcionalidades aprovadas sem autorização.
- Não remova IDs, classes, eventos ou componentes sem comprovar que são obsoletos.
- Não elimine regras CSS apenas porque parecem repetidas.
- Não crie dependências desnecessárias.
- Não reestruture arquivos inteiros para corrigir um problema localizado.
- Prefira alterações pequenas, rastreáveis e reversíveis.
- Não execute alterações fora do escopo autorizado.

## 8. Padrão visual — Neumorfismo
O neumorfismo deverá transmitir profundidade natural e integração com a superfície.

Sombras externas:

- Luz deslocada para cima e para a esquerda, com deslocamentos X/Y negativos.
- Sombra escura deslocada para baixo e para a direita, com deslocamentos positivos.
- Evitar contornos artificiais e aparência neon.
Sombras internas:

- Utilizar inset quando necessário para simular profundidade interna.
- Manter iluminação e sombra coerentes com a superfície.
- Evitar excesso de brilho.
Não transforme automaticamente elementos neumórficos em skeuomórficos.

## 9. Padrão visual — Skeuomorfismo
O skeuomorfismo deverá transmitir materialidade e acabamento físico.

Características:

- Gradientes metálicos.
- Aro ou borda com aparência de acabamento.
- Relevos e chanfros.
- Sombras externas e internas em camadas.
- Brilho controlado.
- Profundidade tátil.
Não utilizar neon como substituto de iluminação ou profundidade.

## 10. Componentes visualmente aprovados
Respeite os acabamentos que já foram aprovados pelo usuário.

- O painel Financeiro principal possui acabamento skeuomórfico metálico verde escuro aprovado.
- O painel Study possui acabamento skeuomórfico aprovado.
- Os indicadores internos devem preservar seus acabamentos próprios, sem receber automaticamente o acabamento do painel externo.
- O ícone Study está finalizado e não deve ser alterado sem solicitação explícita.
- Ícones devem manter regras de aparência separadas dos painéis.
- Geometrias podem compartilhar dimensões, mas acabamentos devem permanecer isolados por componente.
Considere:

- Painel: contêiner externo.
- Card: indicador ou conteúdo interno.
Não altere componentes aprovados apenas para padronizar visualmente outros elementos.

## 11. Autorizações e permissões

- Antes de editar código, apresente o diagnóstico e a proposta.
- Aguarde autorização explícita para a alteração específica.
- A autorização para uma alteração não representa autorização para outras alterações.
- Não exclua arquivos.
- Não execute comandos destrutivos.
- Não instale dependências sem autorização.
- Mantenha as permissões interativas e solicite aprovação para operações relevantes.

## 12. Validação depois da alteração
Depois de uma alteração autorizada:

1. Verifique o bloco modificado.
2. Verifique se existem regras conflitantes.
3. Confirme que os identificadores e dependências foram preservados.
4. Informe o que foi realmente testado.
5. Separe validação estática de validação visual.
6. Não afirme que algo funciona no navegador se não foi efetivamente testado.

## 13. Conduta permanente
O objetivo é manter o Check-In organizado, estável e tecnicamente consistente.

A prioridade é corrigir a causa, preservar o que funciona e evitar regressões.

Não priorize rapidez em detrimento de precisão.

Quando não tiver certeza, informe claramente que não tem certeza.

Estas regras devem ser consultadas antes de qualquer trabalho no projeto.
