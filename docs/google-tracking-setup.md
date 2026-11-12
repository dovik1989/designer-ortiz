# Google Analytics e Google Ads — LUDOVIK

Status: nenhum código de rastreamento foi instalado ou ativado. Os cadastros e os identificadores reais ainda dependem do titular da Conta Google.

Guia conferido na documentação oficial em 11/11/2026. Primeiro precisamos confirmar a URL pública principal do site; não usar `localhost` nem presumir o endereço da Vercel.

## 1. Criar o Google Analytics

1. Abra [Google Analytics](https://analytics.google.com/) e faça login com a conta Google que será proprietária dos dados.
2. Clique em **Começar a usar**. Se já houver uma conta, use **Administrador → Criar → Conta**. Nome sugerido: **LUDOVIK — Estúdio Digital**.
3. Crie a propriedade **LUDOVIK**. Selecione **Brasil / São Paulo**, fuso **America/Sao_Paulo**, e moeda **Real brasileiro (BRL)**.
4. Preencha categoria e porte com os dados reais. No objetivo de negócio, selecione **Gerar leads**. O próprio titular deve revisar e aceitar os termos exibidos pelo Google.
5. Adicione um fluxo **Web**, com a URL pública confirmada e nome **LUDOVIK — Site**. Mantenha a medição otimizada ativada e crie o fluxo.
6. Em **Administrador → Coleta e modificação de dados → Fluxos de dados → seu fluxo Web**, copie o ID de métricas, normalmente `G-…`.
7. Em **Tag do Google → Ver instruções da tag → Instalar manualmente**, copie o código completo para a instalação no site. [Instruções oficiais do Analytics](https://support.google.com/analytics/answer/9304153?hl=pt-BR).

## 2. Criar o Google Ads sem iniciar campanha

1. Abra [Google Ads](https://ads.google.com/), use a conta Google proprietária e informe **LUDOVIK — Estúdio Digital** e a URL pública confirmada.
2. Durante a inscrição, escolha a opção de **criar a conta sem uma campanha** ou pular a criação recomendada. O Google documenta esse caminho. Se sua tela não permitir pular, envie o nome da etapa antes de prosseguir para uma campanha. [Criação da conta](https://support.google.com/google-ads/answer/6366720?hl=pt-BR).
3. Confira **Brasil**, **São Paulo / America/Sao_Paulo** e **Real brasileiro (BRL)**. Fuso e moeda são definidos na criação da conta. Preenchimento de dados da conta e aceite de termos ficam com o titular. [Configurações de fuso e moeda](https://support.google.com/google-ads/answer/9842104?hl=pt-BR).

## 3. Criar a conversão de clique no WhatsApp

1. No Ads, abra **Metas → Resumo → + Criar ação de conversão**.
2. Em **Conversões em um site**, edite a fonte de dados, informe o domínio confirmado e selecione **Verificar**. A ausência da tag agora é esperada; ela será instalada depois.
3. Escolha a categoria **Contato** e a fonte **tag do Google**. Crie a ação **Clique no WhatsApp — Site** com a opção **Manualmente usando código**.
4. Para essa primeira medição de intenção, deixe a ação como **Secundária**, para observação. Em **Contabilizar**, escolha **Uma**. Não atribua um valor financeiro fictício; use **Não usar um valor** se ainda não houver um valor definido para essa ação.
5. Salve. Em **Resumo e próximas etapas**, copie o código da **tag do Google** e abra **Ver snippet de evento**. Para o evento, escolha **Clique**, não carregamento de página. Precisamos do destino completo, no formato `AW-…/rótulo`, ou dos dois trechos completos. [Fluxo atual de conversões](https://support.google.com/google-ads/answer/16560108?hl=pt-BR), [configuração manual](https://support.google.com/google-ads/answer/12718882?hl=pt-BR), [conversão por clique](https://support.google.com/google-ads/answer/6331304?hl=pt-BR).

Essa conversão registra a abertura do WhatsApp por um botão do site. Ela não confirma envio de mensagem, conversa iniciada ou lead qualificado. Evitaremos contar a mesma ação duas vezes se ela também for configurada no Analytics.

## O que enviar para concluir a instalação

- A **URL pública principal**, confirmada por você.
- O **ID e o código de instalação do Analytics**.
- O **código da tag do Ads e o snippet de evento do clique**, incluindo `AW-…/rótulo`.

Login e aceite dos termos são feitos por você, nas telas oficiais. Com os códigos reais, a instalação e os testes ficam por nossa conta; não é necessário editar o HTML manualmente. A validação será feita com [Tag Assistant](https://tagassistant.google.com/) e o relatório de tempo real do Analytics.
