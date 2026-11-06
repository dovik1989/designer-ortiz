import Link from 'next/link';
import { ContactLink, Logo } from '@/components/ui';
export default function NotFound(){return <main id="conteudo" className="container not-found"><Link href="/" className="brand"><Logo/></Link><p className="accent">404</p><h1>Esse caminho ainda<br/>não foi desenhado.</h1><p>Volte ao início para encontrar o que está procurando.</p><div className="hero-actions"><Link className="button button-secondary" href="/">Voltar ao início</Link><ContactLink/></div></main>;}
