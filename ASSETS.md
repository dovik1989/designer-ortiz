# Fontes e recursos visuais

- Space Grotesk: Google Fonts, https://github.com/google/fonts/tree/main/ofl/spacegrotesk . Arquivos servidos localmente em public/fonts; licença OFL incluída.
- Instrument Serif (italic): Google Fonts, https://github.com/google/fonts/tree/main/ofl/instrumentserif . Arquivo local e licença OFL incluídos.
- Ícones: Lucide React, dependência npm do projeto.
- Escultura do hero: geometria original de nó toroidal, criada em código neste projeto (scripts/generate-sculpture.mjs; asset public/sculpture.svg). Não é uma imagem de banco ou gerada por IA.
- Capas dos projetos: capturas reais dos sites publicados, servidas em public/projects. URLs, dimensões e datas de captura registradas em public/projects/provenance.json.
- Retrato da seção Sobre: foto fornecida pelo usuário em "Imagem do ChatGPT 8 de nov. de 2026, 14_49_03.png", copiada sem alterações para public/images/ludovik-portrait.png (1122 × 1402). Exibida com Next Image para servir versões responsivas otimizadas.
- Marca LUDOVIK — Opção A: SVG branco fornecido pelo usuário em LUDOVIK_Kit_Identidade_Visual/LUDOVIK_Identidade_Visual_Arquivos/01_Logotipos, copiado sem alterações para public/brand/LUDOVIK_wordmark_branco.svg.
- Favicons, ícones Apple/Android e manifest: arquivos fornecidos pelo usuário na pasta 03_Favicons do mesmo kit, preservados em public/brand. /favicon.ico e /icon.svg apontam para os novos arquivos por rewrites.
- Imagem Open Graph: arquivo fornecido pelo usuário em 04_Social_SEO/LUDOVIK_open_graph.png (1200 × 630), copiado sem alterações para public/brand e compartilhado por Open Graph/Twitter.
- Tokens de marca: 05_Design_System/ludovik-tokens.css do kit, copiado sem alterações e importado pelo layout. As cinco cores-base usam esses tokens; as fontes, os raios e os espaçamentos atuais foram preservados.
- Screenshots em artifacts/references documentam sites externos para análise, não são servidas pela aplicação.
- Screenshots em artifacts/validation registram a implementação local, não são imagens de projetos do portfólio.
- manual-scroll-cinema.pdf: arquivo preexistente do usuário, mantido intacto e fora de public/.

Os arquivos raster de marca em public/brand foram fornecidos pelo usuário no kit de identidade visual e não foram redesenhados. Para novos recursos, registre origem/licença ou prompt exato neste arquivo antes de publicar.

- Capa Sucatas Valinhos atualizada em 07/11/2026: captura real em navegador de https://sucatas-valinhos-ambiental.vercel.app/, após a publicação do commit 70d9035. Resolução 1440 × 900, otimizada em WebP pelo fluxo de captura existente. Arquivo public/projects/sucatas-valinhos-ambiental-70d9035.webp; nome versionado para renovar o cache da prévia.
