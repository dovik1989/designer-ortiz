---
name: "LUDOVIK — Estúdio Digital"
description: "Sistema editorial escuro com geometria roxa e contraste entre grotesca e serifada itálica."
colors:
  bg: "#08080c"
  surface: "#101017"
  surface-hover: "#15101d"
  purple: "#a63dff"
  purple-hover: "#b65fff"
  lilac: "#c3a5ff"
  text: "#f5f4f8"
  muted: "#a4a2af"
  line: "#27252f"
  soft-line: "#1c1a24"
  ink-on-purple: "#08080c"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(48px, 5.2vw, 84px)"
    fontWeight: 500
    lineHeight: 1.055
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(36px, 3.9vw, 60px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.035em"
  serif:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(25px, 2.45vw, 38px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-.035em"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  control: "4px"
  circle: "50%"
spacing:
  gutter: "64px"
  section: "clamp(120px, 9vw, 144px)"
  heading-gap: "64px"
  control-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.ink-on-purple}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "15px 25px"
  button-primary-hover:
    backgroundColor: "{colors.purple-hover}"
  button-secondary:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "15px 25px"
  icon-button:
    textColor: "{colors.text}"
    rounded: "{rounded.circle}"
    width: "52px"
    height: "52px"
  icon-button-hover:
    backgroundColor: "{colors.lilac}"
    textColor: "{colors.bg}"
  service-row:
    padding: "32px 0"
  project-artwork:
    padding: "28px"
---

# Design System: LUDOVIK — Estúdio Digital

## Overview

**Creative North Star: "Design com intenção. Tecnologia com direção."**

O sistema construído reúne estrutura editorial, superfícies quase pretas e acentos roxos. Space Grotesk organiza a leitura e Instrument Serif itálica destaca os momentos pessoais. Listas abertas, números discretos e linhas finas sustentam a hierarquia; a geometria do hero concentra a expressão visual.

Este documento registra o código existente, sem substituir o contrato de direção em `docs/home-direction.md`. A fonte normativa dos tokens é `src/app/globals.css`; fontes locais são configuradas em `src/app/layout.tsx`. Componentes, comportamento e cores das capas vêm de `src/components` e `src/data/site.ts`.

**Key Characteristics:**

- Fundo escuro contínuo e superfícies tonais, sem sombras de cards.
- Títulos amplos, listas editoriais e detalhes serifados em lilás.
- Escultura vetorial original e portfólio com projeto central e laterais.
- Ações compactas com setas, foco lilás e alternativas para movimento reduzido.

## Colors

Os valores exatos estão no frontmatter, com os mesmos nomes das propriedades CSS. As rampas OKLCH no sidecar são derivações apenas para visualização do painel, não cores adicionais usadas na interface.

### Primary

- **Roxo de ação — purple:** botões principais, palavra de destaque do hero, pontos da marca e pequenos detalhes geométricos.
- **Roxo de interação — purple-hover:** fundo do botão principal ao passar o ponteiro.
- **Tinta sobre roxo — ink-on-purple:** texto e ícones escuros nos botões principais.

### Secondary

- **Lilás de leitura — lilac:** serifada, serviços abertos, links de apoio, foco e controles em hover.

### Neutral

- **Preto de base — bg:** corpo, cabeçalho fixo e fundo contínuo.
- **Superfície — surface:** serviços, faixa de tecnologias e menu mobile.
- **Branco de leitura — text:** títulos e conteúdo principal.
- **Cinza de apoio — muted:** parágrafos, rótulos e navegação em repouso.
- **Linha — line / soft-line:** divisórias, bordas dos controles e separações mais discretas.
- **Superfície de hover — surface-hover:** variável declarada no código, atualmente sem consumidor; não representa um estado implementado.

As cinco capas têm pares próprios de tinta/superfície em `src/data/site.ts`: Mimos & Caprichos (`#E5BCCF / #33232E`), Fortis (`#D8E6BC / #242D22`), W11 (`#B6CBF5 / #20283B`), Sensedia (`#D2B7FA / #2A203B`) e Próximo projeto (`#C3A5FF / #201729`). São dados de apresentação por projeto, não uma segunda paleta global.

**The Contrast Rule.** A ação principal usa tinta escura sobre roxo; textos de apoio usam muted e destaques legíveis usam lilac.

## Typography

**Display Font / Body Font:** Space Grotesk, com fallback sans-serif. Arquivos locais nas espessuras regular (400), medium (500) e semibold (600), carregados com `display: swap`.

**Serif Accent:** Instrument Serif itálica, peso (400), com fallback Georgia, serif. O seletor de ênfase aplica a família, o peso e a cor lilás; a itálica é a variante local disponível.

A hierarquia do frontmatter registra os valores base. As substituições responsivas fazem parte do sistema e não devem ser perdidas ao reutilizar o título.

- **Display:** hero; espaçamento de letras (-.04em), linhas (1.055). Em ≥1600px, tamanho fixo (80px); em ≤1150px, `clamp(46px, 5.3vw, 64px)`; em ≤900px, (48px); em ≤767px, `clamp(40px, 10.6vw, 64px)`, linha (1.08); em ≤359px, (36px).
- **Headline:** h2 base. O manifesto usa `clamp(36px, 3.6vw, 55px)`, linha (1.15), e ênfase (1.18em). Cabeçalhos de seção passam a (38px) em ≤900px e `clamp(33px, 8.5vw, 44px)` em ≤767px; as exceções locais de projetos e sobre permanecem no CSS.
- **Title:** títulos dos serviços; em ≤900px usam (25px), em ≤767px `clamp(22px, 5.8vw, 30px)`. Princípios usam (27px / 1.2), processo (24px / 1.2) e legenda de projeto (21px / 1.3).
- **Body:** base (16px / 1.65). Descrição do hero (16px / 1.75), largura máxima (420px); manifesto (15px / 1.85), máximo (430px); sobre (15px / 1.9), máximo (455px).
- **Label:** botões (14px / 1.4), navegação desktop (13px), numeração editorial (11px / 1.6) com algarismos tabulares. Não há família monoespaçada.
- **Fecho:** título do rodapé em `clamp(36px, 6vw, 88px)`, linha (1.05), letras (-.04em); primeira linha semibold, segunda serifada (1.12em). Em ≤767px, título `clamp(33px, 9.2vw, 56px)` e serifada (1.5em).

**The Two Voices Rule.** A grotesca sustenta estrutura e informação; a serifada itálica marca a voz pessoal sem substituir os textos funcionais.

## Layout

O contêiner mede `min(1280px, calc(100% - var(--gutter) * 2))`, centralizado. O espaçamento vertical de seção usa o token section; divisórias e áreas abertas organizam a página. O cabeçalho tem altura (88px), posição fixa e grade (1fr auto 1fr), com lacuna (32px).

O hero base usa grade (1.15fr 1fr), altura mínima `calc(100svh - var(--header-height))` e padding vertical (64px 108px). O manifesto tem colunas (1.1fr 1fr), lacuna (100px). Serviços usam linhas amplas em vez de cards. Processo tem quatro colunas, lacuna (34px). Sobre tem duas colunas iguais com lacuna (110px).

| Media query exata | Alterações principais |
| --- | --- |
| min-width: 1600px | Hero com altura mínima `calc(94svh - var(--header-height))`; arte com largura `calc(100% + 100px)`; h1 (80px). |
| max-width: 1150px | Gutter (40px); hero (1.2fr 1fr); serviços com grade (40px 1fr 240px 32px); manifesto com lacuna (64px). |
| max-width: 900px | Gutter (32px); seção (100px); cabeçalho (76px); hero com altura mínima (750px); processo em duas colunas. |
| max-width: 767px | Gutter (20px); seção (80px); cabeçalho (72px); menu nativo; hero e manifesto em uma coluna; arte abaixo das ações; sobre empilhado com texto antes do monograma. |
| max-width: 359px | Hero (36px), ações empilhadas; processo em uma coluna; redes empilhadas. |

As regras max-width são cumulativas na ordem acima. A rolagem por âncora reserva (104px) no HTML base e (90px) em ≤767px. Lenis, quando habilitado, usa offset de âncora (-96px). A faixa de tecnologias tem seis colunas e altura mínima (86px), passando a três colunas e (124px) em ≤767px.

O carrossel base usa largura de slide `min(780px, 61vw)`, intervalo (35px) e altura `calc(min(780px, 61vw) * .615 + 20px)`. Em ≤900px usa (70vw) e altura correspondente; em ≤767px usa (82vw), intervalo (18px) e altura correspondente. Legenda limitada a (780px); no mobile passa a duas colunas com a seleção na linha inteira.

Rotas de projeto usam topo (150px), arte na proporção (1.9) e padding (40px); em ≤767px, topo (110px), proporção (1.4) e padding (20px). Texto legal tem largura máxima (860px), topo (150px), reduzido para (110px) no mobile.

## Elevation & Depth

Não há `box-shadow` no sistema. A profundidade vem de superfícies tonais, linhas, iluminação vetorial e escala/opacidade das posições do carrossel. Cada nível de distância do slide reduz escala em (.075), opacidade em (.2) e brilho em (.2); o projeto central ocupa z-index (2).

Os brilhos laterais do rodapé são gradientes radiais `rgb(166 61 255 / .075)`, transparentes a (68%), sem sombra de card. O cabeçalho usa z-index (50), o atalho de conteúdo (100).

**The Flat Surface Rule.** Preserve a leitura editorial com superfícies planas, linhas finas e profundidade concentrada na arte e no carrossel.

## Shapes

Botões e contato do cabeçalho têm cantos discretos pelo token control. Controles de ícone, órbita do monograma e pequenos pontos usam circle. Capas e linhas editoriais não recebem arredondamento de card. A arte do hero é um nó toroidal original em SVG (640 × 640), servido em `public/sculpture.svg`, gerado por `scripts/generate-sculpture.mjs`; `src/components/sculpture.tsx` apenas carrega a imagem decorativa, sem canvas ou raster.

## Components

### Buttons and links

Botão principal com altura mínima (54px), gap (24px) e padding do frontmatter. Hover troca para purple-hover e sobe (-2px); a seta desloca (2px, -2px). Fundo/cor transitam em (.25s), transform em (.4s), com easing `cubic-bezier(.22, 1, .36, 1)`. O secundário tem borda (1px) line e hover em lilac. O link textual tem alvo mínimo (44px), sublinhado que cresce de escala (.32) a (1), duração (.45s), e seta com deslocamento.

O botão circular base mede (52px), com borda (1px) line. No carrossel mede (46px), reduzido para (44px) em ≤767px. Hover usa lilac com tinta bg. Botões desabilitados têm opacidade (.4) e cursor de indisponibilidade; os controles circulares do carrossel não têm extremidades desabilitadas, pois a navegação é circular.

**Foco e acesso:** todo `:focus-visible` tem contorno lilás (2px), afastado (6px). A área do carrossel ajusta o afastamento para (-8px). O atalho “Pular para o conteúdo” aparece no foco. Ícones decorativos são ocultados da árvore acessível.

### Navigation

Cabeçalho fixo sólido, borda inferior soft-line. Links desktop usam muted, tornam-se text no hover e revelam linha lilás em (.4s). Em ≤767px, `details/summary` substitui a navegação desktop: abertura nativa, links de (56px) de altura mínima e painel surface. Com JavaScript, Escape fecha o menu e devolve foco ao summary; clicar em uma âncora também fecha.

### Editorial service list

Cada serviço é um `details` independente com borda superior line; a última linha recebe borda inferior. Resumo base com grade (60px 1fr 340px 42px), gap (16px), altura mínima (116px). Aberto, título e ícone de menos ficam lilás. Em ponteiro que admite hover, o padding horizontal do resumo cresce para (16px), título fica lilás e seta gira (45deg).

Corpo base em colunas (1fr .8fr), gap (90px), padding (0 60px 40px 76px). Mobile: resumo com grade (26px 1fr 24px), padding vertical (26px), altura mínima (100px); descrição vai à segunda linha, ícone de mais substitui seta, corpo recebe padding (0 0 28px 38px). Nota lateral fica oculta. Prévia por imagem só aparece se o dado correspondente existir; atualmente os cinco itens usam nota textual.

### Project carousel and artwork

Cinco projetos em sequência circular, sem autoplay. Arraste horizontal, botões e teclado (ArrowLeft, ArrowRight, Home, End) selecionam o projeto; o texto da seleção usa `aria-live="polite"`. Os slides laterais têm `aria-hidden`, não recebem ponteiro e ocultam os pequenos rótulos das capas, preservando a leitura do centro. Sem JavaScript, links alternativos dos cinco projetos ficam disponíveis via `noscript`.

A capa base tem proporção (1.625), texto central grande e rótulo explícito de placeholder. Todos os dados atuais de imagem são nulos; nenhuma capa é screenshot de projeto. Quando uma imagem real for configurada, Next Image reserva o espaço e usa `object-fit: contain`.

### Hero, monogram and footer

A escultura decorativa tem flutuação de (9s), variando de (-2deg) a (2deg) e até (-18px) na vertical. O parallax GSAP desloca a arte até (90px), rotação (5deg), scrub (1). Revelações usam deslocamento (28px), duração (.85s), executadas uma vez; entrada do hero usa (1.15s) com stagger (.1s), quando a página inicia próxima do topo.

O monograma L. é tipográfico, com órbita elíptica de borda line. O rodapé segue o fecho centralizado aprovado a partir da referência ADR.IA: chamada grotesca maiúscula, pergunta serifada abaixo, descrição e contato. Padding da chamada (124px 0 110px), reduzido para (90px 0 76px) no mobile; navegação e linhas legais ficam abaixo de uma divisória.

**Movimento reduzido:** GSAP só inicia revelações/parallax em `prefers-reduced-motion: no-preference`. Lenis exige ponteiro fino e a mesma preferência, com duração (1.05), `syncTouch: false`. Em reduce, CSS desliga a flutuação, define duração de animações/transições (.01ms), uma iteração e rolagem automática; não há autoplay no portfólio. Conteúdo base permanece no documento antes da melhoria por JavaScript.

Não existem campos de formulário, diálogos, notificações ou backend de leads nesta V1. Os contatos abrem WhatsApp. Redes sociais só aparecem quando URLs reais forem preenchidas.

## Do's and Don'ts

### Do:

- **Do** manter o preto contínuo, as superfícies tonais e os acentos roxo/lilás nos papéis existentes.
- **Do** preservar Space Grotesk na estrutura e Instrument Serif itálica nos destaques pessoais.
- **Do** usar listas editoriais, linhas finas e números discretos para serviços e etapas.
- **Do** manter foco visível, navegação por teclado e a alternativa de movimento reduzido.
- **Do** identificar capas provisórias e registrar origem de novos assets em ASSETS.md.

### Don't:

- **Don't** substituir a escultura vetorial por imagem de banco ou captura fictícia.
- **Don't** transformar cada seção editorial em card com sombra.
- **Don't** inventar screenshots, resultados, depoimentos ou links sociais.
- **Don't** adicionar autoplay ou tornar animação uma condição para ler o conteúdo.

## Ajustes de mobile e contato — 08/11/2026

No celular e em tablets de até 900px, a seção Sobre apresenta primeiro o retrato, em recorte horizontal com transição suave para o fundo, seguido pelo nome e pela biografia completa. Os três destaques ocupam colunas compactas; a chamada de WhatsApp e o LinkedIn ficam na mesma linha. Parágrafos da apresentação usam 16px / 1.75. Os demais textos de apoio ganham legibilidade, e a linha de processo tem intervalos menores.

O contato flutuante fica no canto inferior direito em todas as rotas, fora dos contêineres animados: círculo violeta #8050e6, ícone branco e halo suave, conforme a referência fornecida. Mede 56px no desktop e 52px no mobile, respeita safe areas e o foco por teclado, e é ocultado durante a abertura do menu mobile. O rodapé reserva espaço inferior para o botão.
