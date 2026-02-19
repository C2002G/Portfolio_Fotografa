# 📸 Portfólio Fotográfico - Luiza Lopes

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)
![Status](https://img.shields.io/badge/Status-Online-brightgreen.svg)
![Fly.io](https://img.shields.io/badge/Deploy-Fly.io-blueviolet.svg)

> **Portfólio fotográfico profissional com sistema administrativo completo para gerenciamento de imagens e categorias.**


## 📋 **Sobre o Projeto**

Este é um portfólio fotográfico desenvolvido em Flask, criado para apresentar o trabalho da fotógrafa Luiza Lopes. O sistema conta com:

- **Frontend responsivo** para exibição das fotografias
- **Sistema administrativo** para upload e gerenciamento de imagens
- **Organização por categorias** (Familiares, Joias, POA, etc.)
- **Autenticação segura** com variáveis de ambiente
- **Design moderno** e experiência mobile-first

## 🚀 **Funcionalidades**

### **📷 Portfólio Público**

- ✅ Galeria responsiva com filtros por categoria
- ✅ Visualização otimizada para dispositivos móveis
- ✅ Design elegante com foco na experiência visual
- ✅ Links diretos para categorias específicas

### **🔐 Painel Administrativo**

- ✅ Upload múltiplo de imagens
- ✅ Organização automática por categorias
- ✅ Remoção individual ou em lote
- ✅ Preview de imagens antes do upload
- ✅ Sistema de autenticação seguro

### **🔒 Segurança**

- ✅ Credenciais via variáveis de ambiente
- ✅ Secret key configurável
- ✅ Validação de tipos de arquivo
- ✅ Proteção contra dados sensíveis no código

## 🛠️ **Tecnologias Utilizadas**

- **Backend**: Python 3.8+ com Flask 2.3.3
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Segurança**: python-dotenv para variáveis de ambiente
- **Deploy**: fly.io com deploy automático via GitHub
- **Estilo**: CSS Grid, Flexbox, Design Responsivo
- **Servidor**: Gunicorn para produção

## 📦 **Instalação e Execução**

### **1. Clone o repositório**

```bash
git clone https://github.com/C2002G/Portfolio_Fotografa.git
cd Portfolio_Fotografa
```

### **2. Crie um ambiente virtual**

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

### **3. Instale as dependências**

```bash
pip install -r requirements.txt
```

### **4. Configure as variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
SECRET_KEY=sua_chave_secreta_aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua_senha_segura
FLASK_ENV=development
```

### **5. Execute a aplicação**

```bash
python app.py
```

Acesse: `http://localhost:5000`

## 🔑 **Acesso Administrativo**

Para acessar o painel administrativo:

1. Acesse: `http://localhost:5000/login`
2. Use as credenciais configuradas no arquivo `.env`
3. Gerencie imagens em: `http://localhost:5000/admin`

## 📁 **Estrutura do Projeto**

```
Portfolio_Fotografa/
├── 📄 README.md              # Documentação
├── 🐍 app.py                 # Aplicação Flask principal
├── 🌐 wsgi.py                # Configuração para deploy
├── 📦 requirements.txt       # Dependências Python
├── 🔒 .env.example          # Template de configuração
├── 🚫 .gitignore            # Arquivos ignorados pelo Git
├── 📂 static/
│   ├── 🎨 css/
│   │   └── styles.css       # Estilos principais
│   ├── ⚡ js/
│   │   └── script.js        # Interações JavaScript
│   └── 🖼️ img/
│       ├── logo/            # Logos da marca
│       ├── BookColorado/    # Categoria: Book Colorido
│       ├── Familiares/      # Categoria: Ensaios Familiares
│       ├── Joias/           # Categoria: Fotografia de Joias
│       ├── POA/             # Categoria: Cinematografia POA
│       ├── Museu/           # Categoria: Museu do Inter
│       ├── Torcida/         # Categoria: Torcida do Inter
│       └── Renovação/       # Categoria: Renovação
├── 📄 templates/
│   ├── index.html           # Página principal
│   ├── admin.html           # Painel administrativo
│   ├── login.html           # Tela de login
│   └── galeria.html         # Visualização por categoria
└── 📁 .github/
    └── copilot-instructions.md  # Instruções para AI
```

## 🎯 **Próximas Melhorias**

- [ ] Sistema de backup automático de imagens
- [ ] Integração com cloud storage (AWS S3/Cloudinary)
- [ ] Sistema de comentários para clientes
- [ ] Analytics de visualizações
- [ ] PWA (Progressive Web App)
- [ ] Otimização automática de imagens
- [ ] Domínio personalizado
- [ ] Sistema de watermark automático

## 🤝 **Contribuição**

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 **Contato**

**Desenvolvedor**: [C2002G](https://github.com/C2002G)  
**Portfolio da Fotógrafa**: [Luiza Lopes](**https://luizalopes-portfolio.fly.dev/**)

---

<div align="center">

**⭐ Se este projeto te ajudou, considera dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/C2002G/Portfolio_Fotografa.svg?style=social&label=Star)](https://github.com/C2002G/Portfolio_Fotografa)

</div>
