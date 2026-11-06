import { Header } from '@/components/header';
import { Hero, Technologies, Manifesto } from '@/components/intro';
import { Services } from '@/components/services';
import { Projects } from '@/components/projects';
import { Process, About } from '@/components/studio';
import { Footer } from '@/components/footer';
import { Motion } from '@/components/motion';

export default function Home(){return <><Header/><Motion><main id="conteudo"><Hero/><Technologies/><Manifesto/><Services/><Projects/><Process/><About/></main><Footer/></Motion></>;}
