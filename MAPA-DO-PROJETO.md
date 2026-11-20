# Mapa do projeto — Check.In V21.2

## 1. Fonte e escopo

Base: pacote Check.In V21.1, derivado do arquivo V20 fornecido pelo usuário. A V21.2 corrige contratos de estrutura/estado e reorganiza a cascata CSS sem redesenhar os painéis ou introduzir novas funcionalidades.

## 2. Ordem de execução

`index.html` carrega:
1. `style.css` (`@layer base` e declaração da ordem global);
2. `tema-dark.css` (`@layer theme`);
3. `mobile.css` (`@layer responsive`);
4. `script.js` e `mobile.js` no final do `body`.

A ordem global declarada é `@layer base, theme, responsive`. A camada responsiva vence as regras de tema e base sem recorrer a `!important`.

## 3. Árvore dos componentes principais

```text
body
├── header.cabecalho
├── nav.menu-principal
├── main.conteudo-principal
│   ├── aside#painel-esquerdo.painel-esquerdo
│   │   ├── nav.menu-lateral
│   │   ├── div.area-inferior-painel
│   │   │   ├── div.horario-painel
│   │   │   └── div.data-painel
│   │   ├── h2.notificacao-titulo
│   │   └── button.botao-notifique
│   ├── section.area-conteudo
│   │   └── div.grade-cards (Financeiro, Estudo, Rotina e Compromisso)
│   └── aside.painel-calendarios
└── section#painel-lembrete
```

**Contrato importante:** `.area-inferior-painel` contém apenas os dois blocos de relógio e data. `Notifique-me` fica fora desse contêiner de 44px; por isso não herda seu `overflow:hidden` nem sua geometria.

## 4. IDs e JavaScript

- O HTML contém **62 IDs, todos únicos**.
- `JS-001`/`JS-002`: estado e renderização dos calendários.
- `JS-003`: navegação mensal.
- `JS-004`/`JS-005`: relógio, data e atualização ao retornar à aba.
- `JS-006`: barras horizontais — **4 alvos**.
- `JS-007`: barras verticais — **14 alvos**.
- `JS-008`: datas móveis/fixas de feriados nacionais; destaca apenas `.data-dia` e células do calendário.
- `JS-009`: pesquisa lateral e estado sem resultados.
- `MOBJS-001`: abre/recolhe o painel, fecha por Escape e clique externo, sincroniza `hidden` e `aria-expanded`.
- O JavaScript não procura nem cria um nome de dia da semana dentro do campo data.

## 5. Inventário CSS atualizado

| Folha | Camada | Regras | Declarações | `!important` |
|---|---|---:|---:|---:|
| `style.css` | base | 487 | 2.751 | 0 |
| `tema-dark.css` | theme | 664 | 3.023 | 0 |
| `mobile.css` | responsive | 53 | 180 | 0 |
| **Total** |  | **1.204** | **5.954** | **0** |

O estado `[hidden]` está na última regra de `@layer responsive`, sem prioridade forçada. A lista de seletores repetidos é um índice de análise, não uma afirmação de duplicação eliminável: media queries, estados e variações de componente podem legitimamente reutilizar o mesmo seletor.

## 6. Dados e limites

- Não há backend, banco de dados ou persistência local implementados.
- Não foram adicionadas ações aos botões do menu superior sem contrato funcional definido.
- O overflow horizontal móvel abaixo de 480px continua pendente e documentado em `LEIA-ME-PRIMEIRO.md` e no relatório.
