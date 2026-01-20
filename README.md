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

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/faf24b0e-1c52-4d90-802a-ed2f427d3290" />
Visualização de KPIs logísticos em tempo real.
Layout responsivo construído com Tailwind CSS.
Gerenciamento de estado global no React para exibição de métricas.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5ea9c622-cc4d-47c0-99a9-5def8c9a988e" />
Lógica de Input/Output integrada: ao registrar uma movimentação, o sistema atualiza automaticamente o saldo na tabela de estoque e gera um log na tabela de movimentacoes.
Feedback instantâneo ao usuário com estados de sucesso/erro.
Consumo de API REST utilizando Fetch API com tratamento de concorrência.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/516a0fc8-2a45-4edc-ada1-49c4a61795a9" />
Estrutura de dados normalizada no MySQL (Relacionamento entre Produtos e Categorias).
Filtro dinâmico em tela: busca por SKU ou Nome sem recarregar a página.
Uso de Lucide-React para uma interface intuitiva e profissional.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5b439aa7-669e-4101-9b66-272c1059637e" />
Backend desenvolvido com FastAPI, garantindo alta performance e tipagem forte com Pydantic.
Documentação automática seguindo o padrão OpenAPI.
Endpoints estruturados para operações de CRUD completo e lógica de negócio logística.


