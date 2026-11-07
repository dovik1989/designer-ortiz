import { Header } from '@/components/header';
import { Hero, Technologies, Manifesto } from '@/components/intro';
import { Services } from '@/components/services';
import { Projects } from '@/components/projects';
import { ProjectCTA } from '@/components/project-cta';
import { Process, About } from '@/components/studio';
import { FAQSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import { Motion } from '@/components/motion';

export default function Home(){return <><Header/><Motion><main id="conteudo"><Hero/><Technologies/><Manifesto/><Services/><Projects/><ProjectCTA/><Process/><About/><FAQSection/></main><Footer/></Motion></>;}
