# Validação da V1 — 5 de novembro de 2026

Build de produção validada em http://localhost:3001. Evidências brutas: `artifacts/validation/results.json`, `axe-*.json` e 18 screenshots. Testes executados com Playwright e Google Chrome headless no Windows.

## Resultados

| Verificação | Resultado |
|---|---|
| Next.js production build | Aprovado; 13 páginas estáticas geradas, incluindo rotas auxiliares |
| TypeScript | Aprovado durante o build |
| 1440 × 900 | Sem overflow; interações aprovadas; Axe: 0 violações |
| 1920 × 1080 | Sem overflow; interações aprovadas; Axe: 0 violações |
| 390 × 844 | Sem overflow; interações aprovadas; Axe: 0 violações |
| 768 × 1024 | Sem overflow; interações aprovadas; Axe: 0 violações |
| 320 × 800 | Sem overflow; interações aprovadas; Axe: 0 violações |
| Carrossel | Setas, ciclo 01–05, Home/End, ArrowRight e arraste com mouse aprovados |
| Gesto mobile | Swipe via eventos reais de toque no protocolo do Chrome aprovado |
| Serviços | Cinco itens abrem e fecham; CTA contextual visível |
| Menu mobile | Abrir/fechar, Escape com foco e fechamento após navegação aprovados |
| WhatsApp | Todos os CTAs apontam para 5519994623541 com mensagem codificada |
| Sem JavaScript | Hero visível, serviços nativos e lista alternativa dos cinco projetos aprovados em 1440 e 390 px |
| Movimento reduzido | Lenis desativado; alteração da preferência durante a sessão remove Lenis |
| Movimento padrão | Entrada e revelação preservam conteúdo; Lenis ativo no desktop |
| Fontes e SVG | Carregados localmente, dimensões reservadas |
| Console | Nenhum erro JavaScript de página detectado |
| Rotas de conteúdo | Cinco projetos, privacidade, robots.txt e sitemap.xml retornam 200 |
| Página inexistente | Retorna 404 |

O Axe usou as tags WCAG 2 A/AA e WCAG 2.1 A/AA. Zero violações automatizadas não equivale a certificação completa de acessibilidade. O SVG decorativo tem alt vazio e aria-hidden; o portfólio tem anúncio de seleção, foco visível e controles identificados.

## Correções confirmadas

- Contraste das laterais do carrossel elevado; os microtextos decorativos dos inativos ficam ocultos, e o centro preserva a indicação de placeholder.
- Nome acessível do link Continue explorando contém o texto visível.
- Pontuação do hero mantida em avançar. antes da seta.
- Screenshots com foco limpo e seções enquadradas pelo topo, respeitando o header.
- Escultura extraída para um SVG separado, com exatamente a mesma geometria e animações nos wrappers.

## Performance medida e limites

HTML bruto da home: **997.770 → 73.439 bytes**, redução de aproximadamente **92,6%**. Os 2.304 polígonos deixam de ser repetidos no HTML/RSC; o asset SVG é baixado separadamente e pode ser reutilizado pelo navegador. Não se trata de redução equivalente no total de todos os recursos de rede.

O relatório de build indica 118 kB de First Load JS para a home e 103 kB compartilhados. GSAP, ScrollTrigger e Lenis são importados sob demanda no cliente. Fontes são locais; não há chamadas a serviços de imagem ou fontes externos durante a navegação da V1.

Não foi executado Lighthouse, medição de FPS, teste de leitor de tela real, Safari/Firefox ou dispositivo físico. O teste mobile usa emulação Chrome e eventos de toque. Não se atribui uma pontuação de performance sem medi-la.

## Comparação de proporções

Valores em pixels, arredondados. Medições reais das referências em `REFERENCE_ANALYSIS.md` e do projeto em `results.json`.

| Seção — 1440 × 900 | EvoPixel atual | LUDOVIK V1 |
|---|---:|---:|
| Hero | 900 | 915 |
| Tecnologias | 74 | 88 |
| Manifesto | 585 | 798 |
| Serviços | 941 | 1035 |
| Projetos | 972 | 1079 |

Padding vertical de serviços/projetos: referência 115,2 px e V1 129,6 px em 1440; no mobile 77 px e 80 px. O manifesto é mais alto porque o briefing exige título editorial e três diferenciais em colunas, empilhados no mobile. O carrossel preserva a composição solicitada, em vez de repetir a galeria atual da referência. Header e hero também preservam a direção específica LUDOVIK. Não é uma cópia de pixels.

## Evidências visuais

- `1440-hero.png`, `1920-hero.png`, `390-hero.png`: primeira viewport.
- `1440-full.png`, `1920-full.png`, `390-full.png`: página inteira desde o topo.
- Sufixos `manifesto`, `servicos`, `projetos` e `contato`: composição de cada seção nas três resoluções.
- Movimento reduzido foi usado para as capturas estáticas; a versão animada foi testada separadamente.

## Pendências reais

- Substituir as cinco capas-placeholder por imagens selecionadas e completar os textos de case. As páginas atuais não alegam escopo, resultados ou autoria não informados.
- Definir o quinto projeto, links de Instagram/LinkedIn e domínio de produção.
- O mockup anterior não foi disponibilizado; carrossel e rodapé seguem a descrição textual e a referência do briefing.
- Revisar privacidade conforme hospedagem e integrações antes de publicar.

Nenhum deploy foi executado. O versionamento no GitHub é independente da publicação. O PDF preexistente foi preservado. A edição de conteúdo está centralizada em `src/data/site.ts`; execução local e estrutura estão no README.
