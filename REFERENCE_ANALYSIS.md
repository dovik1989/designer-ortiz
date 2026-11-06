# Análise das referências — LUDOVIK V1

Inspeção realizada com Playwright + Google Chrome headless em 05/11/2026. Referências acessadas: https://evopixel.com.br/ e https://adr.ia.br/. Capturas e dados DOM em `artifacts/references/`. Nenhum código ou imagem das referências foi reutilizado.

## Medições reais da EvoPixel

Valores arredondados de getBoundingClientRect; Y é relativo ao documento. Dimensões em px. O termo dobra no briefing foi interpretado como seção narrativa, pois a faixa de tecnologias não ocupa uma viewport inteira.

| Seção | 1440 × 900: Y / altura | 1920 × 1080: Y / altura | 390 × 844: Y / altura |
|---|---|---|---|
| Hero | 0 / 900 | 0 / 1080 | 0 / 844 |
| Tecnologias | 900 / 74 | 1080 / 74 | 844 / 68 |
| Manifesto | 974 / 585 | 1154 / 661 | 912 / 531 |
| Serviços | 1559 / 941 | 1815 / 995 | 1443 / 1139 |
| Projetos | 2500 / 972 | 2810 / 1094 | 2582 / 810 |
| Processo | 3472 / 1637 | 3904 / 1693 | 3392 / 1770 |
| Sobre | 5109 / 847 | 5598 / 914 | 5163 / 914 |

| Propriedade | 1440 × 900 | 1920 × 1080 | 390 × 844 |
|---|---|---|---|
| H1: X / Y | 72 / 191 | 260 / 220 | 22 / 137 |
| H1: largura / altura | 533 / 180 | 560 / 278 | 346 / 93 |
| H1: fonte / entrelinha | 56,16 / 60,09 | 65 / 69,55 | 28,86 / 30,88 |
| Manifesto: padding superior / inferior | 144 / 129,6 | 170 / 145 | 90 / 77 |
| Serviços e projetos: padding vertical | 115,2 | 138 | 77 |
| Título manifesto: fonte / entrelinha | 43,2 / 56,16 | 52 / 67,6 | consultar JSON bruto |

Fonte observada: Manrope. O nó semântico header mede altura 0 porque os controles visuais são posicionados fora do fluxo; isso não significa ausência de navegação. A cápsula flutuante visível tem cerca de 58 px de altura na captura desktop (leitura visual, não medida DOM do header). O H1 em X=72 no desktop e X=22 no mobile evidencia margens fluidas. Não foi assumido um max-width exato a partir desse único elemento.

## Comportamentos observados e limites

- Hero atual usa uma cena visual de ponta a ponta; no mobile a composição preserva a pessoa e separa texto superior de descrição/ações inferiores.
- A navegação permanece no topo nas capturas após scroll e fica mais compacta nos trechos seguintes.
- Tecnologias em faixa baixa; manifesto centralizado; serviços em duas colunas com lista à esquerda e prévia à direita. A seleção aparece com maior contraste e seta; os itens têm separadores finos.
- Capturas de cinco posições de scroll e rodapé foram obtidas para cada viewport, com espera para estabilização. `measurements.json` registra estilos calculados e animações Web Animations detectadas; ele não captura todas as animações dirigidas por JavaScript.
- Não foi medido FPS, duração exata de hovers, curva de easing ou latência do scroll. A suavidade foi analisada qualitativamente, e os valores de animação adotados abaixo são escolhas da V1, não medições da referência.
- Layouts de serviços/projetos atuais da referência diferem de partes do briefing; as decisões explícitas do usuário têm prioridade: manifesto editorial em duas colunas, cinco serviços e carrossel de três posições visíveis.

## Rodapé ADR.IA

Altura DOM observada: 676 px em 1440 × 900; 706 px em 1920 × 1080; 762 px em 390 × 844. Composição centralizada, título em caixa alta, destaque serifado itálico lilás, CTA, grande respiro e divisão horizontal antes da navegação. Fundo quase preto e luz roxa ambiente. A V1 preserva essa estrutura com textos e marca próprios.

## Decisões de implementação

- Container máximo 1280 px: decisão do briefing, não medida atribuída à EvoPixel. Gutter 64/32/20 px, header 88/72 px e hero mínimo 90svh. Em mobile a altura acomoda texto e escultura sem sobreposição.
- Espaçamento vertical desktop 128–144 px; mobile 80–88 px, próximo ao ritmo medido.
- Space Grotesk auto-hospedada, Instrument Serif itálica e paleta explicitamente aprovada. H1 clamp(48px, 5.2vw, 84px), adaptado para 44 px nos telefones estreitos.
- Escultura geométrica original em SVG gerado matematicamente, com profundidade, iluminação e flutuação discreta. Nenhuma imagem gerada ou imagem de banco.
- GSAP/ScrollTrigger para entrada do hero, revelações editoriais e parallax; Lenis somente em ponteiro fino e sem movimento reduzido. Cleanup em React e suporte a navegação por âncoras.
- Serviços com details/summary nativos: operáveis sem JavaScript e por teclado. Hovers só em dispositivos com hover; clique abre detalhes com entregáveis e CTA próprio.
- Carrossel circular de cinco projetos, painel central maior, laterais menores/escurecidos, setas, teclado, arraste e toque; sem autoplay. Contador e legenda atualizados juntos.
- Sem mockup anterior ou screenshots de projetos na pasta: placeholders tipográficos explicitamente rotulados, nunca capturas fictícias. Páginas individuais mostram o estado real do material.
- Conteúdo estático servido pelo App Router; o essencial continua visível sem animação. Preferência de movimento reduzido desativa Lenis, parallax e entradas.

## Comparação com a implementação

As medidas finais, screenshots, testes de interação e comparação das proporções são registrados em `VALIDATION.md` e `artifacts/validation/`. Não se busca igualdade de pixels: conteúdo, identidade e composições são distintos por solicitação do briefing.
