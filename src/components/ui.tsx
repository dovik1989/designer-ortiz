import { ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '@/data/site';

export function ContactLink({ children = 'Conversar no WhatsApp', className = '', subject }: { children?: React.ReactNode; className?: string; subject?: string }) {
  return <a href={whatsappUrl(subject)} className={`button button-primary ${className}`} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}

export function Logo() { return <span className="wordmark">LUDOVIK<span>.</span></span>; }
