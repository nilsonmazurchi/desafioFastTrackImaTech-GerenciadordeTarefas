FROM nginx:alpine

# Copiar arquivos da aplicação
COPY . /usr/share/nginx/html

# Criar diretório de runtime
RUN mkdir -p /run/nginx

# Configuração do Nginx
RUN echo 'server { \
    listen 80 default_server; \
    listen [::]:80 default_server; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location ~* \.js$ { \
        add_header Content-Type application/javascript; \
        try_files $uri =404; \
    } \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Script de inicialização robusto
CMD ["sh", "-c", "mkdir -p /run/nginx && nginx -g 'daemon off;'"]
