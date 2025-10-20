#!/usr/bin/env python3.10

"""
WSGI config para deploy no PythonAnywhere

Para usar este arquivo:
1. Faça upload de todos os arquivos para sua conta PythonAnywhere
2. Configure as variáveis de ambiente no console bash:
   echo 'export SECRET_KEY="sua_chave_secreta_aqui"' >> ~/.bashrc
   echo 'export ADMIN_USERNAME="admin"' >> ~/.bashrc
   echo 'export ADMIN_PASSWORD="sua_senha_aqui"' >> ~/.bashrc
   source ~/.bashrc
3. Configure este arquivo como WSGI file na aba Web
"""

import sys
import os

# Adicionar o diretório do projeto ao Python path
project_home = "/home/seuusuario/Portfolio_Fotografa"  # Altere para seu username
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Importar a aplicação Flask
from app import app as application

if __name__ == "__main__":
    application.run()
