#  Nexus WMS - Warehouse Management System

Sistema profissional de Gerenciamento de Armazém para controle de estoque e endereçamento logístico.

## Funcionalidades Atuais
- Dashboard Inteligente:** Visualização de KPIs (Total de Itens, Entradas/Saídas do dia).
- Movimentação de Estoque:** Interface para registro de entradas e saídas com histórico em tempo real.
- Gestão de Produtos:** Catálogo estruturado por SKU e Categorias.
- Arquitetura Moderna:** Frontend e Backend totalmente desacoplados via API REST.

## 🛠 Tecnologias
- Frontend:** [React.js](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/) + [Vite](https://vitejs.dev/)
- Backend:** [Python 3.13](https://www.python.org/) + [FastAPI](https://fastapi.tiangolo.com/)
- Banco de Dados:** [MySQL](https://www.mysql.com/) + [SQLAlchemy](https://www.sqlalchemy.org/)
- Ícones:** [Lucide-React](https://lucide.dev/)

## 🔧 Como rodar o projeto localmente

### 1. Backend
```bash
cd backend
python -m venv venv
# Ative o venv (Windows: .\venv\Scripts\activate)
pip install -r requirements.txt
python -m uvicorn main:app --reload
