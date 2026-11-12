import { ArrowDown, ArrowUpRight, Code2, Figma, Hexagon, Sparkles, Triangle, Braces } from 'lucide-react';
import { ContactLink } from './ui';
import { HeroAmoeba } from './hero-amoeba';

export function Hero(){return <section id="inicio" className="hero" aria-labelledby="hero-title"><div className="container hero-grid">
 <div className="hero-copy"><p className="hero-label" data-reveal>CRIAÇÃO DE SITES • LANDING PAGES • DESIGN</p><h1 id="hero-title"><span className="hero-line"><span>Experiências digitais</span></span><span className="hero-line"><span>que fazem seu negócio</span></span><span className="hero-line hero-accent"><span>avançar.<ArrowUpRight aria-hidden="true" /></span></span></h1>
 <p className="hero-description">Crio sites profissionais, rápidos e personalizados para valorizar sua marca, transmitir confiança e transformar visitantes em oportunidades de negócio.</p>
 <div className="hero-actions"><ContactLink>Solicitar orçamento</ContactLink><a className="text-link" href="#projetos">Conhecer projetos <ArrowUpRight size={19} aria-hidden="true" /></a></div>
 </div>
 <div className="hero-art"><div className="hero-art-inner"><HeroAmoeba /></div><span className="art-caption">Design com intenção.<br/>Tecnologia com direção.</span></div>
 <div className="hero-bottom"><p>Estratégia <span/> Design <span/> Desenvolvimento</p><a href="#manifesto" aria-label="Continue explorando: ir para o manifesto"><span>Continue explorando</span><ArrowDown size={17} aria-hidden="true" /></a></div>
 </div></section>;}
const technologies=[{name:'HTML',Icon:Code2},{name:'CSS',Icon:Braces},{name:'JavaScript',Icon:Hexagon},{name:'Figma',Icon:Figma},{name:'Vercel',Icon:Triangle},{name:'IA',Icon:Sparkles}];
export function Technologies(){return <div className="technology-strip" aria-label="Tecnologias que fazem parte do processo"><div className="container technology-list">{technologies.map(({name,Icon})=><div key={name}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>{name}</span></div>)}</div></div>;}
export function Manifesto(){return <section id="manifesto" className="manifesto section"><div className="container"><div className="manifesto-rule"/><div className="manifesto-grid"><div><h2 data-reveal>Mais do que<br/>presença digital.<br/>Soluções que fazem<br/>sentido para o<br/><em>seu negócio.</em></h2><p className="manifesto-description" data-reveal>Uma boa experiência nasce da conexão entre o que sua marca é e o que as pessoas precisam. Cada escolha tem um propósito — do primeiro clique ao próximo passo.</p></div><div className="principles">{[
 ['Clareza','Design que comunica. Caminhos simples para conectar sua marca às pessoas certas.'],
 ['Performance','Beleza e funcionamento no mesmo lugar. Experiências ágeis, leves e acessíveis.'],
 ['Evolução','Uma base pensada para acompanhar as ideias e os próximos passos do seu negócio.'],
].map(([title,text],i)=><article className="principle" data-reveal key={title}><span className="item-number">0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={20} aria-hidden="true" /></article>)}</div></div></div></section>;}
