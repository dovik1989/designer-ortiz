import Image from 'next/image';
import type { Project } from '@/data/site';
export function ProjectArtwork({project,priority=false}:{project:Project;priority?:boolean}){
 return <div className={`project-artwork project-artwork-${project.slug}`}>
  <div className="project-browser-bar" aria-hidden="true"><span className="browser-dots"><i/><i/><i/></span><span className="project-browser-title">{project.name}</span></div>
  <div className="project-screenshot">{project.image&&<Image src={project.image} alt={project.imageAlt||`Projeto ${project.name}`} fill sizes="(max-width: 767px) 84vw, (max-width: 1599px) 40vw, 680px" priority={priority} className="project-image" draggable={false}/>}</div>
 </div>;
}
