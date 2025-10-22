FROM nginx:alpine

# Copiar arquivos
COPY . /usr/share/nginx/html/

# Configuração específica para Koyeb
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 8080;  # Koyeb usa porta 8080 internamente
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    # Configurações para Koyeb
    client_max_body_size 100M;
    client_header_timeout 60s;
    client_body_timeout 60s;
    send_timeout 60s;
    
    # Headers de segurança
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    
    # Servir arquivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Arquivos JavaScript
    location ~* \.js$ {
        add_header Content-Type application/javascript;
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
    
    # CSS
    location ~* \.css$ {
        add_header Content-Type text/css;
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
    
    # Imagens
    location ~* \.(webp|jpg|jpeg|png|gif|ico)$ {
        add_header Cache-Control "public, max-age=3600";
        try_files $uri =404;
    }
}
EOF

# Criar diretórios necessários
RUN mkdir -p /run/nginx

# Expor a porta que o Koyeb espera
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]