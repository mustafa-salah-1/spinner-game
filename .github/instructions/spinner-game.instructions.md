---
applyTo: "**"
---

# Spinner Game - Project Instructions

## Project Overview

Build an interactive spinner/wheel game using React.js with modern best practices and optimal performance.

## Technology Stack

- React 19+ (functional components only)
- Vite for build tooling
- Tailwind CSS v4 for styling
- React Hook Form for form management (if forms are needed)
- React Hot Toast for notifications and user feedback

## Code Quality Standards

### Performance Best Practices

- React Compiler is enabled - no need for manual useMemo or useCallback optimizations
- Avoid unnecessary re-renders through proper state management
- Implement code splitting for larger components if needed
- Use proper key props in lists for efficient reconciliation
- Let React Compiler handle memoization automatically

### React Patterns

- Functional components only (no class components)
- Custom hooks for reusable logic
- Proper component composition and separation of concerns
- Controlled components for forms
- Lift state up when multiple components need shared state

### Code Style

- Write self-documenting code with clear, descriptive names
- NO code comments - code should be readable through naming and structure
- Use meaningful variable and function names
- Keep functions small and focused on single responsibility
- Use destructuring for cleaner code

### File Organization

- Create separate component files ONLY for components reused across multiple parents
- Keep single-use components in the same file as their parent component
- Group related components in feature folders
- Keep components small and focused
- Extract reusable logic into custom hooks
- Separate business logic from presentation

## Technical Requirements

- Modern ES6+ JavaScript syntax
- Async/await for asynchronous operations
- Proper error handling
- Responsive design with Tailwind CSS
- Smooth animations and transitions for spinner mechanics
- Accessible UI components

## Form Management

- Use react-hook-form for all form implementations
- Leverage built-in validation
- Minimize re-renders with proper form configuration

## Notifications

- Use react-hot-toast for all user notifications
- Provide clear feedback for user actions
- Use appropriate toast types (success, error, info)

## State Management

- Use useState for local component state
- Use useReducer for complex state logic
- Consider Context API for shared state across multiple components
- Avoid prop drilling through proper component architecture
