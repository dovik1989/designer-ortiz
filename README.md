# LUDOVIK — Estúdio Digital

V1 local construída com Next.js App Router, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lenis e Lucide React.

## Executar no Windows

Pré-requisito: Node.js 20.9 ou superior e npm. As dependências já estão instaladas nesta pasta.

```powershell
cd 'E:\Site\designer-ortiz'
npm.cmd run dev
```

Abra http://localhost:3001. A porta 3001 mantém o novo site separado do projeto Mimos & Caprichos na porta 3000. `npm.cmd` funciona mesmo quando a política do PowerShell impede executar npm.ps1.

```powershell
npm.cmd run build
npm.cmd run start
```

O modo de produção também usa a porta 3001. Encerre o servidor anterior com Ctrl+C antes de iniciar outro na mesma porta. Para mudar a porta: `npx.cmd next dev -p 3002`.

## Editar conteúdo

- `src/data/site.ts`: WhatsApp, redes sociais opcionais, navegação, serviços, cinco projetos e etapas do processo.
- `src/components/intro.tsx`: texto principal, tecnologias e manifesto.
- `src/components/studio.tsx`: apresentação e processo.
- `src/components/footer.tsx`: chamada final e rodapé.
- `src/app/globals.css`: paleta, espaçamento, tipografia e breakpoints.
- `src/app/layout.tsx`: metadados, título e fontes locais.

WhatsApp configurado: **+55 (19) 99462-3541**. Instagram e LinkedIn são exibidos automaticamente quando seus campos em `studio` forem preenchidos com URLs reais.

## Adicionar imagens reais aos projetos

1. Salve a imagem otimizada em `public/projects`, preferencialmente WebP.
2. Defina `image: '/projects/nome.webp'` e um `imageAlt` descritivo no projeto correspondente em `src/data/site.ts`.
3. Edite nome, categoria e descrição com as informações reais do trabalho.

O componente usa Next Image com dimensões reservadas e `object-fit: contain` para preservar a imagem inteira. As capas tipográficas atuais são **placeholders**, não reproduções de marcas ou screenshots. A página individual de cada projeto informa que a apresentação está em preparação. O quinto projeto é configurável pelo mesmo arquivo.

Para uma prévia visual nos serviços, `src/components/services.tsx` usa uma imagem do item correspondente quando `image` estiver preenchido; sem imagem, mostra informações textuais do serviço. Ajuste esse vínculo conforme os materiais forem selecionados.

## O que está implementado

- Header fixo e menu mobile nativo, com Escape e retorno de foco.
- Hero com escultura geométrica original em SVG, iluminação calculada, flutuação e parallax.
- Faixa de tecnologias, manifesto editorial e diferenciais.
- Cinco serviços expansíveis com entregáveis e contato contextual.
- Carrossel circular com cinco posições, setas, teclado, arraste com mouse e gesto de toque. Sem autoplay.
- Processo em quatro etapas, apresentação e rodapé centralizado conforme o briefing.
- Cinco páginas de projeto, privacidade, 404, robots e sitemap configurável.
- Fontes locais e respectivas licenças; sem imagens de banco ou capturas fictícias.
- Movimento reduzido; conteúdo principal, serviços e links alternativos do portfólio utilizáveis sem JavaScript.

## Verificar

Com o servidor em execução:

```powershell
npm.cmd run typecheck
npm.cmd run test:browser
```

Os testes usam o Google Chrome instalado. Caso necessário, instale o Chrome ou ajuste `channel` nos scripts. Para outra URL, configure `$env:TEST_URL = 'http://localhost:3002'`. O teste deve ser executado com a build atual do site.

`artifacts/validation/` contém screenshots e relatórios JSON; `VALIDATION.md` registra resultados e limites. `REFERENCE_ANALYSIS.md` contém as medidas reais das referências. Para repetir a inspeção externa: `node scripts/inspect-references.mjs` (requer internet e Chrome).

## Antes de publicar

Ainda faltam screenshots e descrições finais dos projetos, seleção do quinto projeto, links sociais e domínio. Configure o domínio em `.env.local` com `NEXT_PUBLIC_SITE_URL=https://seu-dominio` para metadados e sitemap; rode outro build depois. Revise o texto de privacidade conforme a hospedagem e as integrações reais. A V1 não inclui envio de formulário, análise de audiência ou backend de leads: os contatos abrem o WhatsApp.

Código versionado em https://github.com/dovik1989/designer-ortiz. Nenhum deploy foi executado. O arquivo `manual-scroll-cinema.pdf` foi preservado. O briefing da V1 define escultura SVG e parallax; não foram gerados vídeos ou implementadas cenas de vídeo controladas por scroll.

Capturas dos sites de referência e o PDF preexistente ficam somente na pasta local, fora do Git. As medições JSON e as capturas da implementação são versionadas.
