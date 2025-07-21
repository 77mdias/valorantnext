<div align="center">
  
# 🎮 NextValorant - Escola de Valorant

<img src="./public/Valorant-Academy.png" alt="NextValorant Logo" width="200"/>

### 🚀 A melhor plataforma para aprender técnicas avançadas de Valorant

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

---

</div>

## 📖 Sobre o Projeto

**NextValorant** é uma simulação de escola online para Valorant, desenvolvida como projeto de estudo para praticar **Next.js**, **React**, **Supabase** e **TypeScript**.

O projeto oferece uma experiência completa de aprendizado com:

- 🎯 **Páginas interativas** sobre agentes, mapas e estratégias
- 🔐 **Sistema de autenticação** completo (cadastro, login, recuperação de senha)
- 🎨 **Tema claro/escuro** adaptável
- 📱 **Design responsivo** para todos os dispositivos
- 🎮 **Interface moderna** inspirada no design do Valorant

> **Nota:** Este é um projeto educacional/portfólio, não oferece aulas reais do jogo.

---

## ✨ Features

### 🎮 **Experiência do Usuário**

- ✅ Landing page com design moderno e animações
- ✅ Navegação responsiva com dropdown menu mobile
- ✅ Tema claro/escuro com transições suaves
- ✅ Cards interativos de agentes e mapas
- ✅ Seção de contatos e redes sociais

### 🔐 **Autenticação Completa**

- ✅ Cadastro de usuários
- ✅ Login/Logout
- ✅ Recuperação de senha
- ✅ Páginas protegidas
- ✅ Middleware de autenticação
- ✅ Persistência de sessão

### 🛠️ **Tecnologias e Recursos**

- ✅ Next.js 15 com App Router
- ✅ Server-side rendering (SSR)
- ✅ TypeScript para type safety
- ✅ Supabase para backend/banco de dados
- ✅ SCSS/CSS Modules para estilização
- ✅ Componentes shadcn/ui
- ✅ Responsive design
- ✅ Deploy automático na Vercel

---

## 🚀 Deploy & Demo

🌐 **Acesse a aplicação:** [nextvalurant.vercel.app](https://seu-projeto.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/nextvalorant)

---

## 🛠️ Stack Tecnológica

| Tecnologia                                                                   | Versão | Uso              |
| ---------------------------------------------------------------------------- | ------ | ---------------- |
| ![Next.js](https://img.shields.io/badge/-Next.js-black?logo=nextdotjs)       | 15.x   | Framework React  |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript) | 5.x    | Linguagem        |
| ![Supabase](https://img.shields.io/badge/-Supabase-green?logo=supabase)      | Latest | Backend/Database |
| ![Sass](https://img.shields.io/badge/-Sass-pink?logo=sass)                   | 1.89.x | Estilização      |
| ![Tailwind](https://img.shields.io/badge/-Tailwind-cyan?logo=tailwindcss)    | 3.x    | CSS Framework    |
| ![Vercel](https://img.shields.io/badge/-Vercel-black?logo=vercel)            | Latest | Deploy           |

---

## 🗂️ Estrutura do Projeto

```
📦 NextValorant/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 13+)
│   │   ├── 📁 auth/               # Páginas de autenticação
│   │   ├── 📁 protected/          # Páginas protegidas
│   │   ├── layout.tsx             # Layout raiz
│   │   ├── page.tsx               # Página inicial
│   │   └── globals.scss           # Estilos globais
│   ├── 📁 components/             # Componentes reutilizáveis
│   │   ├── 📁 auth/               # Componentes de auth
│   │   ├── 📁 ui/                 # Componentes UI base
│   │   ├── 📁 Navbar/             # Navegação
│   │   └── 📁 Sociais/            # Links sociais
│   ├── 📁 lib/                    # Utilitários e configurações
│   │   └── 📁 supabase/           # Cliente Supabase
│   ├── 📁 context/                # React Context
│   ├── 📁 hooks/                  # Custom hooks
│   └── 📁 scss/                   # Estilos SCSS organizados
├── 📁 public/                     # Assets estáticos
│   ├── 📁 cards/                  # Imagens dos agentes
│   ├── 📁 maps/                   # Imagens dos mapas
│   └── 📁 logoPage/               # Logos e ícones
├── middleware.ts                  # Middleware de autenticação
├── package.json                   # Dependências
└── README.md                      # Este arquivo
```

---

## ⚙️ Como rodar localmente

### 1️⃣ **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/nextvalorant.git
cd nextvalorant
```

### 2️⃣ **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3️⃣ **Configure o Supabase**

1. Crie um projeto no [Supabase](https://supabase.com)
2. Renomeie `.env.example` para `.env.local`
3. Adicione suas variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 4️⃣ **Execute o projeto**

```bash
npm run dev
```

🌐 Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🎨 Screenshots

<div align="center">
  
### 🌙 Tema Escuro
![Tema Escuro](./public/screenshots/dark-theme.png)

### ☀️ Tema Claro

![Tema Claro](./public/screenshots/light-theme.png)

### 📱 Mobile Responsivo

![Mobile](./public/screenshots/mobile.png)

</div>

---

## 🚀 Deploy na Vercel

### Deploy Automático

1. Fork este repositório
2. Conecte com a Vercel
3. Configure as variáveis de ambiente
4. Deploy! 🎉

### Variáveis de Ambiente (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 🛣️ Roadmap

- [ ] 📊 Dashboard do usuário
- [ ] 🎯 Sistema de progresso/conquistas
- [ ] 📚 Mais conteúdo educacional
- [ ] 🎮 Integração com API do Valorant
- [ ] 👥 Sistema de comunidade/fórums
- [ ] 🏆 Ranking de usuários
- [ ] 🎥 Upload de vídeos/tutoriais
- [ ] 📧 Sistema de notificações

---

## 🤝 Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Add: nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### 📋 Padrão de Commits

```
✨ Add: Nova funcionalidade
🐛 Fix: Correção de bug
📚 Docs: Documentação
🎨 Style: Formatação/estilo
♻️ Refactor: Refatoração
🚀 Perf: Performance
✅ Test: Testes
```

---

## 📱 Contato & Redes Sociais

<div align="center">

[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?logo=instagram&logoColor=white&style=for-the-badge)](https://instagram.com/seu-instagram)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?logo=linkedin&logoColor=white&style=for-the-badge)](https://linkedin.com/in/seu-linkedin)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=for-the-badge)](https://github.com/seu-usuario)
[![Email](https://img.shields.io/badge/-Email-D14836?logo=gmail&logoColor=white&style=for-the-badge)](mailto:seu-email@gmail.com)

</div>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🎮 Créditos

- **Valorant**: Propriedade da Riot Games
- **Design**: Inspirado no universo visual do Valorant
- **Desenvolvimento**: Projeto pessoal de estudo
- **Tecnologias**: Next.js, Supabase, Vercel

---

<div align="center">

### 🌟 Se gostou do projeto, deixe uma ⭐!

**Feito com 💜 para a comunidade dev**

_Este projeto é apenas para fins educacionais e não possui afiliação oficial com a Riot Games_

</div>
