FROM nginx:alpine

# Copiar arquivos da aplicação
COPY . /usr/share/nginx/html

# Criar diretório de runtime e configurar
RUN mkdir -p /run/nginx && \
    echo 'server { \
        listen 80 default_server; \
        listen [::]:80 default_server; \
        server_name _; \
        root /usr/share/nginx/html; \
        index index.html; \
        \
        # Configuração de encoding \
        charset utf-8; \
        \
        # Headers de segurança e performance \
        add_header X-Content-Type-Options nosniff; \
        \
        location ~* \.js$ { \
            add_header Content-Type "application/javascript; charset=utf-8"; \
            try_files $uri =404; \
        } \
        \
        location ~* \.css$ { \
            add_header Content-Type "text/css; charset=utf-8"; \
        } \
        \
        location /assets/ { \
            try_files $uri =404; \
        } \
        \
        location / { \
            try_files $uri $uri/ /index.html; \
        } \
    }' > /etc/nginx/conf.d/default.conf

# Garantir que arquivos estão com encoding correto
RUN apk add --no-cache file && \
    find /usr/share/nginx/html -name "*.js" -exec sh -c "file -i {} | grep -q utf-8 || echo '⚠️  Encoding errado: {}'" \;

EXPOSE 80

CMD ["sh", "-c", "mkdir -p /run/nginx && nginx -g 'daemon off;'"]