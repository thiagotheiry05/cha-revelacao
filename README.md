# Site do Chá Revelação

Site estático com contagem regressiva e vídeo do YouTube, sem Firebase e sem banco de dados.

## Configuração

1. Envie o vídeo ao YouTube como **não listado**, aguarde o processamento e permita incorporação.
2. Abra `script.js` e substitua `VIDEO_ID` pelo ID de 11 caracteres do link do YouTube.
3. Altere `DATA_REVELACAO` para a data e horário desejados. Exemplo: `2026-11-15T17:00:00-03:00` (horário de Brasília).
4. Abra `index.html` no navegador para conferir o visual. Para testar a revelação, coloque um horário de 1 ou 2 minutos à frente e um ID de vídeo válido.
5. Envie os arquivos para a raiz de um repositório no GitHub. Em **Settings > Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve. Aguarde a publicação.
6. Compartilhe o link do GitHub Pages como QR Code.

## Observações importantes

- Depois de publicado com o ID e horário corretos, não precisa de novo push nem atualização manual na hora: o JavaScript troca a tela automaticamente quando o horário chegar.
- A contagem usa o relógio do celular. Relógios errados podem liberar antes/depois; abas suspensas podem atrasar até o retorno à página.
- O vídeo NÃO fica protegido antes do horário: qualquer pessoa pode descobrir seu ID inspecionando `script.js` e assistir antecipadamente se ele estiver como não listado.
- A reprodução começa quando o convidado aperta Play; não é sincronizada entre dispositivos.
- Se a confidencialidade do resultado for essencial, use uma Estreia agendada do YouTube em vez desta solução.
- Teste no celular e com boa conexão antes da festa.


## Tema beleza e tecnologia
Os detalhes discretos aparecem em `index.html` nas classes `family-details` e `footer`. Você pode personalizar os textos sem modificar o JavaScript.
