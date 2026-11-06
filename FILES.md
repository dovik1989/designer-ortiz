# Modificações da V1

O diretório não possuía código de aplicação. Todos os arquivos de código e documentação listados abaixo foram criados. `manual-scroll-cinema.pdf` foi preservado e não foi alterado. Nenhum arquivo do projeto Mimos & Caprichos foi modificado.

| Grupo | Arquivos |
|---|---|
| Configuração | package.json, package-lock.json, tsconfig.json, next.config.ts, postcss.config.cjs, tailwind.config.ts, .gitignore, next-env.d.ts (gerado por Next) |
| Aplicação | src/app/layout.tsx, page.tsx, globals.css, icon.svg, not-found.tsx, robots.ts, sitemap.ts |
| Rotas internas | src/app/projetos/[slug]/page.tsx, src/app/privacidade/page.tsx |
| Componentes | src/components/header.tsx, ui.tsx, intro.tsx, sculpture.tsx, motion.tsx, services.tsx, project-artwork.tsx, projects.tsx, studio.tsx, footer.tsx |
| Conteúdo | src/data/site.ts |
| Fontes | public/fonts/space-grotesk-{regular,medium,semibold}.ttf, instrument-serif-italic.ttf e duas licenças OFL |
| Verificação | scripts/inspect-references.mjs, scripts/validate.mjs, scripts/generate-sculpture.mjs, public/sculpture.svg, artifacts/references/*, artifacts/validation/* |
| Documentação | README.md, REFERENCE_ANALYSIS.md, PRODUCT.md, ASSETS.md, FILES.md, VALIDATION.md, DESIGN.md, docs/home-direction.md, .impeccable/design.json |

`.next/`, `node_modules/` e o cache TypeScript são artefatos locais; não são código para revisão. O código é versionado em https://github.com/dovik1989/designer-ortiz. Nenhum deploy foi executado.
