# Desafio Cadeconsig - Julia

Projeto desenvolvido como parte do processo seletivo para Desenvolvedor Full Stack na Cadeconsig.

## 📋 Sobre o Projeto

Sistema de gestão de contratos com funcionalidades de:
- Autenticação de usuários (JWT)
- Upload de contratos via CSV
- Listagem de contratos com filtros e paginação

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn UI** - Componentes de interface
- **React Hook Form + Zod** - Formulários e validação
- **TanStack Query** - Gerenciamento de estado e cache
- **Nuqs** - Gerenciamento de query params na URL

## 📁 Estrutura do Projeto
```
desafio-cade-consig-julia/
├── upload-contratos/     # Projeto Next.js
│   ├── app/
│   │   ├── (auth)/       # Páginas de autenticação
│   │   └── (dashboard)/  # Páginas protegidas
│   ├── components/       # Componentes reutilizáveis
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilitários e API
│   ├── providers/        # Context providers
│   └── types/            # Tipos TypeScript
└── README.md
```

## ⚙️ Como Executar

### Pré-requisitos
- Node.js 18+
- Backend do desafio rodando em `http://localhost:3000`

### Instalação
```bash
# Clone o repositório
git clone https://github.com/juziss/desafio-cade-consig-julia.git

# Entre na pasta do projeto
cd desafio-cade-consig-julia/upload-contratos

# Instale as dependências
npm install

# Execute o projeto
npm run dev -- -p 3001
```

Acesse `http://localhost:3001` no navegador.

### Credenciais de teste
```
Usuário: admin
Senha: admin123
```

## ✨ Funcionalidades

### Tela de Login
- Autenticação via API
- Validação de formulário com Zod
- Feedback visual de erros

### Tela de Upload
- Upload de arquivos CSV (drag and drop)
- Validação de formato
- Feedback de sucesso/erro com quantidade de registros

### Tela de Contratos
- Listagem com paginação
- Filtros por nome, email, plano e status
- Filtros persistidos na URL
- Estados de loading, erro e lista vazia

## 👩‍💻 Autora

**Julia** - [GitHub](https://github.com/juziss)