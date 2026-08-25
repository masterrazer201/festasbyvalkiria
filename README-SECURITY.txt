FESTAS BY VALKIRIA — V5.1 HARDENED

Revisão:
- Site estático, sem backend, sem banco de dados e sem login.
- Nenhum dado do formulário é enviado ao servidor; a mensagem é aberta no WhatsApp.
- Não há bibliotecas JavaScript externas.
- Não há chaves, tokens ou segredos necessários no projeto.

Proteções adicionadas:
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy
- Permissions-Policy
- Cross-Origin-Opener-Policy
- HSTS para HTTPS
- rel=noopener noreferrer em links externos
- window.open com opener=null
- object-src none
- frame-ancestors none
- upgrade-insecure-requests
- security.txt

Importante:
O arquivo _headers funciona diretamente em Cloudflare Pages e Netlify.
Em outra hospedagem, configure os mesmos cabeçalhos no servidor/painel.
