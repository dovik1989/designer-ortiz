export type FAQItem = {
  question: string;
  answer: string;
};

export const faqItems: readonly FAQItem[] = [
  {
    question: 'Quanto custa criar um site?',
    answer: 'Cada projeto tem necessidades diferentes. O orçamento considera a estrutura, as funcionalidades e os objetivos do seu negócio.',
  },
  {
    question: 'Quanto tempo leva para desenvolver um site?',
    answer: 'O prazo depende da complexidade do projeto e é definido na proposta, após entendermos o que precisa ser desenvolvido.',
  },
  {
    question: 'Meu site vai funcionar no celular?',
    answer: 'Sim. O projeto é desenvolvido com layout responsivo, adaptado para computadores, tablets e smartphones.',
  },
  {
    question: 'Vou conseguir atualizar meu site depois?',
    answer: 'Podemos definir uma solução que permita atualizar conteúdos com facilidade, de acordo com as necessidades do projeto.',
  },
  {
    question: 'O site será preparado para aparecer no Google?',
    answer: 'A estrutura pode incluir boas práticas de SEO técnico, desempenho e acessibilidade. O posicionamento nas buscas depende também de outros fatores.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'As condições e etapas de pagamento são apresentadas na proposta comercial, antes do início do projeto.',
  },
];
