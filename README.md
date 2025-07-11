# Database Management Platform

A modern web application for managing databases with features like SQL editing, table management, schema visualization, and AI assistance.

## Features

- **Schema Visualizer**: Interactive database schema visualization with relationship mapping
- **SQL Editor**: Advanced SQL query editor with syntax highlighting
- **Table Editor**: Visual interface for table creation and management
- **AI Agent**: AI-powered assistance for database operations
- **Authentication System**: Complete user authentication flow
- **Project Management**: Create and manage multiple database projects

## Tech Stack

- **Frontend**: React with Vite
- **Styling**: TailwindCSS
- **State Management**: Redux
- **Routing**: React Router
- **Database Visualization**: React Flow
- **SQL Editor**: Custom implementation
- **API Integration**: Axios

## Project Structure

The project follows a feature-first organization pattern, with shared components and utilities:

```
src/
├── features/           # Feature-based modules
│   ├── AI-Agent/      # AI assistance feature
│   │   ├── actions/   # AI-related actions (sendPrompt, etc.)
│   │   ├── api/       # AI API endpoints
│   │   ├── assets/    # AI assets (images, icons, etc.)
│   │   ├── components/# AI-specific components
│   │   └── utils/     # AI utility functions
│   │
│   ├── auth/          # Authentication feature
│   │
│   ├── dashboard/     # Dashboard & project management
│   │
│   ├── schema-visualizer/  # Database schema visualization
│   │
│   ├── sqlEditor/     # SQL query management
│   │
│   └── TableEditor/   # Table management
│
├── components/        # Shared components
│   └── ui/           # Basic UI components
│
├── pages/            # Page components
│   ├── AI-Agent/     # AI feature pages
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # Dashboard pages
│   └── TableEditor/  # Table editor pages
│
├── store/            # Global state management
│   ├── sidebarSlice  # Sidebar state
│   └── tableEditorSlice # Table editor state
│
├── utils/            # Shared utilities
│   ├── formatting.js # Data formatting
│   ├── validators.js # Form validation
│   └── toastConfig.js# Notification config
│
└── api/              # API configuration
    ├── authToken     # Auth token management
    ├── private.js    # Authenticated requests
    └── public.js     # Public endpoints
```

### Key Directories

- **features/**: Contains all feature-specific code, each feature having its own actions, components, and utilities
- **components/**: Reusable components shared across features
- **pages/**: Route components that compose features and components
- **store/**: Global state management with Redux
- **utils/**: Shared utility functions
- **api/**: API configuration and request handlers

### Feature Structure

Each feature folder typically contains:
- **actions/**: Business logic and API calls
- **api/**: API endpoint definitions
- **components/**: Feature-specific UI components
- **utils/**: Feature-specific utility functions
- **store/**: Feature-specific state management (if needed)
- **routes.jsx**: Feature routing configuration

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd Web
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Development

- **Components**: Located in `src/components/`
- **Pages**: Found in `src/pages/`
- **Features**: Modular feature implementations in `src/features/`
- **State Management**: Redux store configurations in `src/store/`
- **Routing**: Route definitions in feature-specific `routes.jsx` files

## Features in Detail

### Schema Visualizer
- Interactive graph visualization of database schemas
- Relationship mapping between tables
- Zoom and pan capabilities
- Auto-layout functionality

### SQL Editor
- Syntax highlighting
- Query execution
- Result visualization

### Table Editor
- Visual table creation
- Column management
- Foreign key configuration
- Constraint setup

### AI Agent
- Natural language assistance
- Query suggestions
- Schema optimization recommendations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[License Type] - See LICENSE file for details
