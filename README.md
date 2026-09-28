# Shivam Kumar Srivastava - Personal Portfolio

A single-page, story-driven portfolio. It walks through my path as a **Full Stack Developer** and **Data Analyst** in six chapters and an epilogue, from school and my B.Tech to founding ListenInn Foundation and backend work at Gravityer.

## 🌟 Key Features

- **Chapter-based narrative**: sticky chapter headings, paragraphs that reveal word by word as you scroll, a table of contents, and a chapter rail with reading progress.
- **Case-study project section**: four in-depth projects (context, what I built, architecture flow, key decisions and stack), followed by an archive index of other GitHub repos. Project facts were checked against each repo's source and git history.
- **Editorial design**: a serif and mono type pairing (Fraunces and JetBrains Mono) on a warm dark palette, scoped in `components/story/story.css`.
- **Responsive and accessible**: works from phone to desktop, and respects `prefers-reduced-motion`.

## 🛠️ Technology Stack

- **Frontend Framework**: [React.js](https://reactjs.org/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

```
Dev-personal-portfoilio/
├── shivam-portfolio/
│   ├── public/              # Static assets (including Resume)
│   ├── src/
│   │   ├── assets/          # Portrait photo
│   │   ├── components/story/ # Story page sections; all copy lives in storyData.ts
│   │   ├── components/ui/   # shadcn/ui primitives (toasts, tooltips)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Story (home) and NotFound
│   │   ├── App.tsx          # Main application wrapper
│   │   └── index.css        # Tailwind layers and theme tokens
│   ├── package.json         # Dependencies and scripts
│   └── vite.config.ts       # Vite configuration
└── README.md
```

## 🚀 Local Development Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivam-srivastava-031/Dev-personal-portfoilio.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Dev-personal-portfoilio/shivam-portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📬 Contact Setup (EmailJS)

To use the contact form on your own fork, you will need to set up an account with [EmailJS](https://www.emailjs.com/):
1. Create an Email Service and an Email Template.
2. In `src/components/Contact.tsx`, update the credentials inside the `handleSubmit` function with your own `serviceId`, `templateId`, and `publicKey`.

## 🔗 Connect with me
- **LinkedIn**: [Shivam Kumar Srivastava](https://linkedin.com/in/shivam-kumar-srivastava-675893211)
- **GitHub**: [@shivam-srivastava-031](https://github.com/shivam-srivastava-031)
- **Email**: shivamsrivastava1307@gmail.com
