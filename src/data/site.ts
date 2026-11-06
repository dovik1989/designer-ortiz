export const studio = {
  name: 'LUDOVIK',
  phone: '5519994623541',
  phoneDisplay: '(19) 99462-3541',
  instagram: '',
  linkedin: '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
};

export function whatsappUrl(subject = 'Olá, Ludovik! Quero conversar sobre um projeto.') {
  return `https://wa.me/${studio.phone}?text=${encodeURIComponent(subject)}`;
}

export const navigation = [
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Sobre', href: '/#sobre' },
];

export const services = [
  { name: 'Landing pages', description: 'Uma página. Uma mensagem clara. Um próximo passo.', detail: 'Páginas que organizam sua oferta e conduzem o visitante até a ação que importa para o seu negócio.', deliverables: ['Estrutura e direção visual', 'Design responsivo', 'WhatsApp e formulários'], subject: 'Quero conversar sobre uma landing page.' },
  { name: 'Sites institucionais', description: 'O seu negócio, apresentado à altura do que entrega.', detail: 'Uma presença própria para apresentar sua empresa, comunicar seus diferenciais e facilitar novas conversas.', deliverables: ['Arquitetura de conteúdo', 'Interface sob medida', 'Base para SEO'], subject: 'Quero conversar sobre um site institucional.' },
  { name: 'Identidade visual', description: 'Personalidade que se reconhece em cada ponto de contato.', detail: 'Um sistema visual coerente para a sua marca se expressar com clareza, do primeiro contato aos pequenos detalhes.', deliverables: ['Direção criativa', 'Marca e universo visual', 'Aplicações e guia de uso'], subject: 'Quero conversar sobre identidade visual.' },
  { name: 'E-commerce', description: 'Uma experiência de compra pensada do início ao fim.', detail: 'Lojas digitais que aproximam seus produtos de quem procura por eles, com navegação simples e uma jornada de compra clara.', deliverables: ['Organização do catálogo', 'Design da experiência', 'Integrações por escopo'], subject: 'Quero conversar sobre um e-commerce.' },
  { name: 'Automações e IA', description: 'Menos tarefas repetidas. Mais espaço para o que importa.', detail: 'Conexões entre ferramentas e fluxos que simplificam a rotina da sua empresa. A tecnologia se adapta ao processo.', deliverables: ['Mapeamento de processos', 'Integrações entre ferramentas', 'Fluxos de atendimento'], subject: 'Quero conversar sobre automações e IA.' },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  initials: string;
  color: string;
  surface: string;
  image: string | null;
  imageAlt: string;
  description: string;
};

// Adicione arquivos em public/projects e use /projects/arquivo.webp em image.
// Os nomes e categorias abaixo organizam a V1; não são estudos de caso ou resultados.
export const projects: Project[] = [
  { slug: 'mimos-e-caprichos', name: 'Mimos & Caprichos', category: 'Presença digital', initials: 'm&c.', color: '#E5BCCF', surface: '#33232E', image: null, imageAlt: '', description: 'Espaço reservado para apresentar o projeto Mimos & Caprichos. As imagens, o escopo e os detalhes serão adicionados após a seleção dos materiais.' },
  { slug: 'fortis', name: 'Fortis', category: 'Projeto selecionado', initials: 'FORTIS', color: '#D8E6BC', surface: '#242D22', image: null, imageAlt: '', description: 'Espaço reservado para apresentar o projeto Fortis. O material e a descrição do trabalho serão adicionados nesta página.' },
  { slug: 'w11-brindes', name: 'W11 Brindes', category: 'Projeto selecionado', initials: 'W11', color: '#B6CBF5', surface: '#20283B', image: null, imageAlt: '', description: 'Espaço reservado para apresentar o projeto W11 Brindes. As imagens e as informações do projeto ainda precisam ser selecionadas.' },
  { slug: 'sensedia', name: 'Sensedia', category: 'Projeto selecionado', initials: 'sensedia', color: '#D2B7FA', surface: '#2A203B', image: null, imageAlt: '', description: 'Espaço reservado para apresentar o projeto Sensedia. Os detalhes do escopo e os materiais visuais serão incluídos posteriormente.' },
  { slug: 'proximo-projeto', name: 'Próximo projeto', category: 'Seleção em aberto', initials: 'Seu próximo capítulo.', color: '#C3A5FF', surface: '#201729', image: null, imageAlt: '', description: 'O quinto espaço do portfólio é configurável. Nome, categoria, imagem e descrição ficam centralizados em src/data/site.ts.' },
];

export const processSteps = [
  { title: 'Descoberta', text: 'Uma boa conversa para entender seu negócio, seu público e o que precisa acontecer.' },
  { title: 'Estratégia', text: 'Organizamos as ideias e definimos o caminho, as prioridades e o escopo do projeto.' },
  { title: 'Criação', text: 'Design e desenvolvimento dão forma à direção, com espaço para sua participação.' },
  { title: 'Entrega', text: 'Revisamos cada detalhe e preparamos o projeto para começar seu próximo capítulo.' },
];
