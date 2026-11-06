'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigation, whatsappUrl } from '@/data/site';
import { Logo } from './ui';

export function Header() {
 const menu=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&menu.current?.open){menu.current.open=false;menu.current.querySelector('summary')?.focus();}};
  document.addEventListener('keydown',escape);
  return ()=>document.removeEventListener('keydown',escape);
 },[]);
 return <header className="site-header"><div className="container header-inner">
  <Link href="/" className="brand" aria-label="LUDOVIK — início"><Logo /></Link>
  <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
  <a className="header-contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={16} aria-hidden="true" /></a>
  <details className="mobile-menu" ref={menu}><summary aria-label="Menu de navegação"><Menu className="menu-open" size={23} aria-hidden="true" /><X className="menu-close" size={23} aria-hidden="true" /><span>Menu</span></summary>
   <nav aria-label="Navegação mobile">{navigation.map(link=><Link key={link.href} href={link.href} onClick={()=>{if(menu.current)menu.current.open=false;}}>{link.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}<a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Solicitar orçamento <ArrowUpRight size={20} aria-hidden="true" /></a></nav>
  </details>
 </div></header>;
}
