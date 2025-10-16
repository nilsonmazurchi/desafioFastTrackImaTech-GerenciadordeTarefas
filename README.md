# Gerenciador de Tarefas - Pacote de Deploy (Koyeb + GitHub Actions + Terraform)

Conteúdo deste pacote:
- Dockerfile (Nginx para servir arquivos estáticos)
- docker-compose.yml (para rodar localmente)
- .github/workflows/ci-cd.yml (GitHub Actions CI/CD integrado com DockerHub e Koyeb)
- infra/ (Terraform para criar app & service no Koyeb)
- README.md (este arquivo)

## Como usar (resumo rápido)

1. Ajuste os arquivos do seu projeto (index.html, style.css, script.js) na raiz do repositório.
2. Crie um repositório GitHub e faça push de todo o conteúdo deste pacote junto com sua aplicação.
3. No GitHub (repositório) adicione os Secrets:
   - DOCKER_PASS : token/senha do Docker Hub
   - KOYEB_TOKEN : API Key do Koyeb
4. No Koyeb, crie um token (Account -> API -> Create API Access Token).
5. Configure o Docker Hub username no workflow (já está definido como 'nilsonmazurchi' por padrão).
6. Ao dar push em qualquer branch, o workflow `CI/CD - Gerenciador de Tarefas` será executado.
   - Ele faz lint básico, validação, build e push da imagem para Docker Hub e em seguida aplica o Terraform para criar/atualizar o app no Koyeb.
7. Para destruir a infraestrutura: rode o job `destroy` do workflow ou execute `terraform destroy` manualmente.

## Observações
- Nome do serviço no Koyeb: **gerenciador-tarefas**
- Docker Hub repo: **nilsonmazurchi/gerenciador-tarefas**

