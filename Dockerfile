FROM nginx:alpine

# Instalar envsubst para substituir variáveis de ambiente
RUN apk add --no-cache gettext

# Copiar arquivos
COPY . /usr/share/nginx/html/

# Criar template de configuração
RUN cat > /etc/nginx/conf.d/default.conf.template << 'EOF'
server {
    listen ${PORT};
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    # Configurações otimizadas
    sendfile on;
    tcp_nopush on;
    keepalive_timeout 65;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Arquivos estáticos
    location ~* \.(js|css|webp)$ {
        try_files $uri =404;
    }
}
EOF

# Variável de ambiente padrão
ENV PORT=80

EXPOSE 80

# Script de inicialização que processa o template
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]