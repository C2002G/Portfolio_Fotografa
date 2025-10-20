# Instruções para IA - Portfólio Fotográfico Luiza Lopes

## Visão Geral da Arquitetura

Este é um portfólio fotográfico Flask com sistema de administração para gerenciamento de imagens. A aplicação está estruturada em duas partes principais:

- **Frontend público**: Apresentação do portfólio (`index.html`)
- **Sistema administrativo**: Upload e gerenciamento de fotos (`admin.html`, `login.html`)
- **Deploy**: Configurado para PythonAnywhere com `wsgi.py`

## Estrutura de Arquivos Crítica

```
Portfolio_Fotografa/               # Raiz do projeto
├── app.py                        # Aplicação Flask principal
├── wsgi.py                       # Configuração WSGI para deploy
├── requirements.txt              # Dependências Python
├── .env.example                  # Template de variáveis de ambiente
├── .gitignore                    # Arquivos ignorados pelo Git
├── static/
│   ├── css/
│   │   └── styles.css           # CSS principal da aplicação
│   ├── js/
│   │   └── script.js            # JavaScript para interações
│   └── img/                     # Imagens organizadas por categoria
│       ├── BookColorado/        # Cada subpasta = categoria de fotos
│       ├── Familiares/
│       ├── Joias/
│       ├── logo/               # Logos da marca (logo.png, arte.png)
│       ├── POA/
│       ├── Museu/
│       ├── Torcida/
│       └── Renovação/
├── templates/                   # Templates Jinja2
│   ├── index.html              # Página principal do portfólio
│   ├── admin.html              # Painel administrativo
│   ├── galeria.html            # Visualização de categoria específica
│   └── login.html              # Tela de login
└── .github/
    └── copilot-instructions.md # Este arquivo
```

## Padrões Específicos do Projeto

### Sistema de Categorias

- **Categorias = subpastas em `static/img/`**: Cada pasta representa uma categoria fotográfica
- **Descoberta automática**: `os.listdir(IMG_FOLDER)` lista categorias dinamicamente
- **URLs de galeria**: `/galeria/<categoria>` para visualizar fotos por categoria

### Autenticação e Segurança

- **Variáveis de ambiente**: `SECRET_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` via `.env`
- **Template público**: `.env.example` demonstra configuração sem expor dados
- **Session-based**: Usa `session['logged_in']` para controle de acesso
- **Imports seguros**: `from dotenv import load_dotenv` carrega configurações

### Gerenciamento de Imagens

- **Upload múltiplo**: `request.files.getlist("arquivo")` para múltiplas imagens
- **Validação de formato**: Aceita apenas `.png`, `.jpg`, `.jpeg`, `.gif`
- **Remoção**: Individual via `/delete/<categoria>/<imagem>` ou múltipla via checkbox

### Frontend Patterns

- **CSS organizado**: Separado em `static/css/styles.css`
- **JavaScript modular**: `static/js/script.js` para interações
- **CSS inline nos templates**: `admin.html` tem CSS específico no `<style>`
- **Grid responsivo**: `.admin-grid` usa CSS Grid para layout de imagens
- **Menu hamburger**: JavaScript para navegação móvel
- **Scroll suave**: `scroll-behavior: smooth` para navegação entre seções

## Deploy e Configuração

### Comandos de Desenvolvimento

```bash
# Executar aplicação local
python app.py

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com credenciais reais
```

### Deploy PythonAnywhere

```bash
# Configurar variáveis no servidor
echo 'export SECRET_KEY="sua_chave"' >> ~/.bashrc
echo 'export ADMIN_USERNAME="admin"' >> ~/.bashrc
echo 'export ADMIN_PASSWORD="senha"' >> ~/.bashrc
source ~/.bashrc

# WSGI file: wsgi.py
# Static files: /static/ → /home/username/Portfolio_Fotografa/static/
```

## Convenções de Código

- **Rotas RESTful**: GET para visualização, POST para ações (upload/delete)
- **Flash messages**: `flash()` para feedback de operações
- **URL building**: Sempre usar `url_for()` para links e assets
- **Template inheritance**: Não utilizada - cada template é independente

## Integração de Assets

- **CSS**: `{{ url_for('static', filename='css/styles.css') }}`
- **JavaScript**: `{{ url_for('static', filename='js/script.js') }}`
- **Imagens**: `{{ url_for('static', filename='img/categoria/imagem.jpg') }}`
- **Logos da marca**: Sempre em `static/img/logo/` (logo.png, arte.png)

## Padrões de Segurança Implementados

✅ **Boas práticas aplicadas**:

- Credenciais via variáveis de ambiente (.env)
- Secret key configurável e segura
- Template .env.example para setup
- Arquivo .env ignorado pelo .gitignore
- Validação de tipos de arquivo por extensão

## Fluxo de Dados Principal

1. **Categorias descobertas** via filesystem scan
2. **Imagens listadas** por categoria via `os.listdir()`
3. **HTML gerado dinamicamente** no backend (variável `grid_html`)
4. **Templates renderizados** com dados processados do Python

Ao trabalhar neste projeto, sempre considere a estrutura baseada em filesystem para categorias e o padrão de geração de HTML no backend do Flask.
