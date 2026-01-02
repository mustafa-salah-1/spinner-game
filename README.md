# 🎡 Spinner Game

An interactive, feature-rich spinner wheel application built with modern React and smooth animations. Perfect for random selections, giveaways, team activities, or making decisions fun!

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)

## ✨ Features

- 🎯 **Smooth Spinning Animation** - Physics-based rotation with customizable duration
- 🎨 **Beautiful UI** - Modern gradient backgrounds with animated particles
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📝 **Entry Management** - Add, edit, remove, shuffle, and sort entries
- 🎊 **Winner Celebration** - Confetti animation and modal display
- 📊 **Results History** - Track all previous spins and winners
- ⚙️ **Customizable Settings**
  - Adjustable spin duration (2-10 seconds)
  - Optional auto-removal of winners
  - Sound effects toggle
- 🎵 **Audio Feedback** - Optional sound effects for enhanced experience
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔒 **Cryptographically Secure** - Uses Web Crypto API for truly random selections

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/spinner-game.git
cd spinner-game
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🛠️ Technology Stack

### Core

- **React 19.2** - Latest React with functional components
- **Vite 7.2** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework

### Libraries

- **React Hook Form** - Performant form validation
- **React Hot Toast** - Beautiful notification system
- **@tsparticles/react** - Particle animations for background effects

### Development Tools

- **React Compiler** - Automatic optimization (enabled)
- **ESLint** - Code quality and consistency
- **Babel Plugin React Compiler** - Enhanced React optimizations

## 📁 Project Structure

```
spinner-game/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── EntryList.jsx
│   │   ├── ParticlesBackground.jsx
│   │   ├── ResultsHistory.jsx
│   │   ├── Wheel.jsx
│   │   └── WinnerModal.jsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useSpinnerGame.js
│   │   └── useTheme.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles
├── eslint.config.js    # ESLint configuration
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 🎮 How to Use

1. **Add Entries**: Type names or items in the input field and click "Add Entry"
2. **Manage Entries**: Edit, remove, shuffle, or sort entries as needed
3. **Customize Settings**: Adjust spin duration, winner removal, and sound preferences
4. **Spin the Wheel**: Click "Spin" to randomly select a winner
5. **View Results**: Check the history panel to see all previous winners
6. **Change Theme**: Toggle between dark and light modes using the theme button

## 🎨 Customization

### Wheel Colors

The wheel uses a predefined color palette of 20 vibrant colors. To customize, edit the `DEFAULT_COLORS` array in [src/hooks/useSpinnerGame.js](src/hooks/useSpinnerGame.js).

### Default Entries

Modify the `DEFAULT_ENTRIES` array in [src/hooks/useSpinnerGame.js](src/hooks/useSpinnerGame.js) to set your preferred starting entries.

### Animations

Particle effects can be customized in [src/components/ParticlesBackground.jsx](src/components/ParticlesBackground.jsx).

## 🏗️ Code Quality Standards

This project follows strict code quality guidelines:

- ✅ Functional components only (no class components)
- ✅ React Compiler enabled (automatic optimization)
- ✅ Self-documenting code with clear naming
- ✅ No code comments (code structure speaks for itself)
- ✅ Single responsibility principle
- ✅ Proper component composition
- ✅ Custom hooks for reusable logic

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework and React Compiler
- Tailwind CSS for the utility-first approach
- Vite for the blazing-fast developer experience
- TSParticles for beautiful particle animations

---

**Made with ❤️ using React, Vite, and Tailwind CSS**
