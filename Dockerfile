FROM nginx:alpine

# Copiar arquivos
COPY . /usr/share/nginx/html/

# Configuração OTIMIZADA para Koyeb
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    # Configurações CRÍTICAS para Koyeb
    client_max_body_size 100M;
    client_header_timeout 300s;
    client_body_timeout 300s;
    send_timeout 300s;
    keepalive_timeout 300s;
    
    # Buffer sizes aumentados
    client_body_buffer_size 256k;
    client_header_buffer_size 2k;
    large_client_header_buffers 8 8k;
    
    # Health check robusto
    location /health {
        access_log off;
        add_header Content-Type text/plain;
        add_header Cache-Control "no-cache";
        return 200 "healthy\n";
    }
    
    # Servir arquivos estáticos com headers específicos
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.js$ {
        add_header Content-Type application/javascript;
        add_header Cache-Control "no-cache";
        add_header X-Content-Type-Options "nosniff";
        try_files $uri =404;
    }
    
    location ~* \.css$ {
        add_header Content-Type text/css;
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
    
    location ~* \.(webp|jpg|jpeg|png|gif|ico)$ {
        add_header Cache-Control "public, max-age=3600";
        try_files $uri =404;
    }
    
    location /assets/ {
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
}
EOF

# Criar múltiplos health checks
RUN echo "healthy" > /usr/share/nginx/html/health
RUN mkdir -p /run/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]