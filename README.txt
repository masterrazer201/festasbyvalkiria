FESTAS BY VALKIRIA — V5.8.3 SHARE PREVIEW FIX

Correção para prévia de compartilhamento:
- removido X-Robots-Tag: noindex, nofollow global dos headers;
- NOINDEX continua no HTML da página, então o Google continua instruído a não indexar;
- imagem Open Graph ganhou um novo URL: og-whatsapp-v2.jpg;
- og:locale pt_BR adicionado;
- Open Graph e Twitter Card preservados.

Objetivo:
permitir que crawlers de compartilhamento tenham uma resposta HTTP menos restritiva
e forçar nova tentativa de cache da imagem social.

IMPORTANTE:
o site continua com meta robots noindex enquanto ainda está em finalização.
