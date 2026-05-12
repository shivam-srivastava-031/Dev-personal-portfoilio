# Shivam Kumar Srivastava - Personal Portfolio

![Portfolio Preview](./shivam-portfolio/src/assets/hero-bg.jpg)

🚀 Welcome to my professional portfolio repository! This is a sleek, highly-interactive, and premium web application designed to showcase my journey as a **Full Stack Developer** and **Data Analyst**.

## 🌟 Key Features

- **Modern UI/UX**: Designed with a premium dark-theme aesthetic featuring glassmorphism, animated gradients, and floating elements.
- **Dynamic Animations**: Extensive use of Framer Motion for scroll-reveals, staggered element rendering, magnetic buttons, and dynamic progress bars.
- **Interactive Canvas**: Custom particle network background built with HTML5 Canvas.
- **Fully Responsive**: Optimized for seamless viewing across mobile, tablet, and desktop devices.
- **Functional Contact Form**: Integrated with EmailJS for direct, real-time message delivery.
- **Component-Driven**: Built on a modular React architecture utilizing shadcn/ui.

## 🛠️ Technology Stack

- **Frontend Framework**: [React.js](https://reactjs.org/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)

## 📂 Project Structure

```
Dev-personal-portfoilio/
├── shivam-portfolio/
│   ├── public/              # Static assets (including Resume)
│   ├── src/
│   │   ├── assets/          # Images and media files
│   │   ├── components/      # Reusable React components (Hero, About, Projects, etc.)
│   │   ├── components/ui/   # shadcn/ui foundational components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Route pages (Index)
│   │   ├── App.tsx          # Main application wrapper
│   │   └── index.css        # Global CSS and Design System (HSL tokens, keyframes)
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
- **Email**: shivamsrivastava@1307
