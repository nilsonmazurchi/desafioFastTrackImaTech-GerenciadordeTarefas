FROM nginx:alpine

# Copiar arquivos
COPY . /usr/share/nginx/html/

# Configuração que evita cache problemático
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    # Desabilitar cache durante desenvolvimento
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Arquivos estáticos
    location ~* \.(js|css|webp|html)$ {
        add_header Cache-Control "no-cache";
        try_files $uri =404;
    }
}
EOF

RUN mkdir -p /run/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]