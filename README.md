# My Reminder 📝

A modern, minimalist todo list application built with cutting-edge web technologies. My Reminder helps you stay organized with a clean, intuitive interface that focuses on what matters most - getting things done.

![My Reminder Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

## ✨ Features

- **🎯 Clean & Modern UI** - Minimalist black and white design that reduces distractions
- **⚡ Lightning Fast** - Built with Qwik.js for optimal performance and instant loading
- **📱 Fully Responsive** - Perfect experience across desktop, tablet, and mobile devices
- **🔄 Real-time Updates** - Seamless CRUD operations with instant feedback
- **✅ Task Management** - Create, edit, complete, and delete tasks effortlessly
- **🎨 Smooth Animations** - Polished interactions with subtle animations
- **🚀 Type Safety** - Full TypeScript support for robust development
- **🔒 Reliable Backend** - Powered by Hono.js with Prisma ORM and Supabase

## 🛠️ Tech Stack

### Frontend
- **[Qwik.js](https://qwik.builder.io/)** - Resumable web framework for instant loading
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **TypeScript** - Type-safe development experience

### Backend
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Hono.js](https://hono.dev/)** - Lightweight web framework for edge
- **[Prisma](https://prisma.io/)** - Next-generation ORM for type-safe database access
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [Supabase](https://supabase.com/) account (for database)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/henryjonathnn/my-reminder.git
   cd my-reminder/backend
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="your_supabase_database_url"
   DIRECT_URL="your_supabase_direct_url"
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   bun run db:generate
   bun run db:push
   ```

5. **Start the backend server**
   ```bash
   bun run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Update API Configuration**
   
   Edit `src/routes/index.tsx` and update the API URL:
   ```typescript
   const API_BASE_URL = 'http://localhost:3000'; // Your backend URL
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see your application running!

## 📁 Project Structure

```
my-reminder/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.ts     # Task CRUD operations
│   │   ├── services/
│   │   │   └── taskService.ts        # Business logic layer
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts       # Global error handling
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript interfaces
│   │   └── index.ts                  # Application entry point
│   ├── prisma/
│   │   └── schema.prisma             # Database schema
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── routes/
    │   │   └── index.tsx             # Main application component
    │   └── ...
    ├── package.json
    └── tailwind.config.js
```

## 🔧 API Reference

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Retrieve all tasks |
| `GET` | `/tasks/:id` | Retrieve a specific task |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task |

### Task Object Structure

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Request/Response Examples

#### Create Task
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Learn Qwik.js",
  "description": "Complete the official Qwik.js tutorial"
}
```

#### Response
```json
{
  "id": "clp1234567890",
  "title": "Learn Qwik.js",
  "description": "Complete the official Qwik.js tutorial",
  "isCompleted": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🎨 Design Philosophy

My Reminder follows a minimalist design approach with:

- **Monochromatic Color Scheme** - Clean black and white interface
- **Typography-First** - Clear, readable fonts and proper text hierarchy
- **Whitespace** - Generous spacing for better visual breathing room
- **Subtle Interactions** - Smooth animations that enhance user experience
- **Mobile-First** - Responsive design that works perfectly on all devices

## 🚦 Scripts

### Backend Scripts
```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run db:generate  # Generate Prisma client
bun run db:push      # Push schema to database
bun run db:migrate   # Create and apply migrations
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🧪 Testing

```bash
# Backend tests
cd backend
bun test

# Frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Deploy to your preferred platform**
   - [Railway](https://railway.app/)
   - [Fly.io](https://fly.io/)
   - [Vercel](https://vercel.com/)

### Frontend Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   - [Vercel](https://vercel.com/)
   - [Netlify](https://netlify.com/)
   - [Cloudflare Pages](https://pages.cloudflare.com/)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add appropriate comments and documentation
- Include tests for new features
- Ensure all tests pass before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Henry Jonathan Chandra**
- GitHub: [@henryjonathnn](https://github.com/henryjonathnn)
- Email: henryjonathanchandra12@gmail.com

## 🙏 Acknowledgments

- [Qwik.js Team](https://qwik.builder.io/) for the amazing framework
- [Hono.js Team](https://hono.dev/) for the lightweight backend framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [Supabase](https://supabase.com/) for the backend-as-a-service platform

## 📊 Project Status

- ✅ Core CRUD functionality
- ✅ Responsive design
- ✅ Error handling
- ✅ TypeScript support
- 🔄 Tests (In Progress)
- 📝 Documentation improvements
- 🚀 Performance optimizations

---

<div align="center">
  <p>Made with ❤️ and lots of ☕</p>
  <p>If you find this project helpful, please consider giving it a ⭐</p>
</div>
