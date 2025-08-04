# Todo Application

A modern, elegant Todo application built with React, TypeScript, and Tailwind CSS, integrated with the JSONPlaceholder API for full CRUD operations.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete todos
- 🎨 **Modern UI**: Beautiful and responsive design with Tailwind CSS
- 📊 **Real-time Statistics**: Track completion rates and progress
- 🔍 **Smart Filtering**: Filter todos by All, Completed, or Pending
- ⚡ **Performance Optimized**: Uses React.memo, useCallback, and useMemo
- 🎯 **TypeScript**: Full type safety and better development experience
- 🔄 **API Integration**: Seamless integration with JSONPlaceholder API
- 📱 **Responsive Design**: Works perfectly on all device sizes

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JSONPlaceholder API** - RESTful API for todo operations
- **React Hooks** - useState, useEffect, useCallback, useMemo

## API Endpoints Used

- `GET /todos` - Fetch all todos
- `GET /todos/:id` - Fetch a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo completely
- `PATCH /todos/:id` - Partially update a todo
- `DELETE /todos/:id` - Delete a todo

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoItem.tsx    # Individual todo item
│   ├── TodoList.tsx    # List of todos
│   ├── TodoForm.tsx    # Form for adding todos
│   ├── TodoStats.tsx   # Statistics display
│   ├── TodoFilter.tsx  # Filter controls
│   └── ErrorMessage.tsx # Error display
├── hooks/              # Custom React hooks
│   └── useTodos.ts     # Todo management hook
├── services/           # API services
│   └── todoApi.ts      # API integration
├── types/              # TypeScript interfaces
│   └── Todo.ts         # Todo type definitions
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Key Features Explained

### 1. Custom Hook (useTodos)
- Manages all todo-related state and operations
- Uses `useCallback` for performance optimization
- Implements error handling and loading states
- Provides filtered todos and statistics

### 2. API Integration
- Complete CRUD operations with JSONPlaceholder API
- Error handling for network requests
- Optimistic updates for better UX

### 3. Component Architecture
- Modular component design
- Props-based communication
- Memoized components for performance
- Responsive and accessible UI

### 4. State Management
- Local state with React hooks
- Optimized re-renders with useMemo
- Proper dependency management

## Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes functions to prevent recreation
- **useMemo**: Memoizes expensive calculations
- **Optimistic Updates**: Immediate UI feedback
- **Lazy Loading**: Components load only when needed

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Modern color schemes
- Smooth transitions and animations
- Consistent spacing and typography
- Beautiful gradients and shadows

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the amazing framework
- [TypeScript](https://www.typescriptlang.org/) for type safety 