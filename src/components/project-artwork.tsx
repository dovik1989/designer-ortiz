import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Project } from '@/data/site';

export function ProjectArtwork({project,priority=false}:{project:Project;priority?:boolean}){
 const colors={'--project-ink':project.color,'--project-surface':project.surface} as CSSProperties;
 return <div className={`project-artwork project-artwork-${project.slug}`} style={colors}>{project.image?<Image src={project.image} alt={project.imageAlt||`Projeto ${project.name}`} fill sizes="(max-width: 767px) 85vw, 780px" priority={priority} className="project-image"/>:<><div className="placeholder-top"><span>Seleção de projetos</span><ArrowUpRight size={19} aria-hidden="true"/></div><div className="placeholder-name" aria-hidden="true">{project.initials}</div><div className="placeholder-bottom"><span>Imagem do projeto<br/>a ser adicionada</span><span className="placeholder-tag">Placeholder</span></div></>}</div>;
}
