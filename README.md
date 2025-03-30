# ETasks - Task Management System

## Overview

**ETasks** is a comprehensive task management application built with Next.js, designed to help individuals and teams organize, track, and complete their tasks efficiently. It provides features such as task categorization, prioritization, deadline tracking, and drag-and-drop task management.

## Features
- User authentication with Firebase (Email/Password & Google Login)
- Task creation, editing, and deletion
- Task status tracking (Open, In Progress, Closed)
- Drag-and-drop task management using hello-pangea/dnd
- Task priority levels (High, Medium, Low)
- Real-time updates with MongoDB and Mongoose
- Responsive UI with Tailwind CSS
- Admin dashboard for managing tasks
- Calendar integration for task deadlines
## Tech Stack
- Next.js (App Router, TSX)=
- Apollo Client for GraphQL
- Authentication: Firebase Authentication 
- UI Library: Tailwind CSS, PrimeIcons, Primereact
- Drag-and-Drop: hello-pangea/dnd

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/NjiruClinton/tts_front.git
   cd tts_front
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables: this is the url for the backend
   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
   ```

## Usage
### Running the Application
To run the application in development mode:
```sh
npm run dev
```

To build the application for production (**Vercel**):
```sh
npm install && npm run build
```

To start the production server (**Vercel**):
```sh
npm start
```

### Directory Structure
- `src/`: Contains the source code of the application.
    - `components/`: Reusable React components.
    - `context/`: Context providers for global state management.
    - `pages/`: Next.js pages.
    - `styles/`: CSS and styling files.
    - `utils/`: Utility functions and helpers.
- `public/`: Static assets such as images and icons.
- `__tests__`: Contains test files for components and utilities.

## Components
- LoginPage
- Navbar
- AllTasks
- Dashboard
- Calendar
- Tasks
- Settings


## API
### GraphQL Client
The GraphQL client is configured in `src/utils/graphqlClient.ts`:
```typescript
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`)

export default client
```

### Authentication
The `login` & `signup` functions in `src/utils/auth.ts` handles user authentication:

```

## Testing
### Setting Up Tests
1. Install the necessary dependencies:
   ```sh
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

2. Configure Jest by creating a `jest.config.js` file:
   ```javascript
   module.exports = {
       testEnvironment: 'jsdom',
       setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
       moduleNameMapper: {
           '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
       },
   };
   ```

3. Create a `jest.setup.js` file:
   ```javascript
   import '@testing-library/jest-dom/extend-expect';
   ```

### Writing Tests
Example test for the `AllTasks` component:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import AllTasks from '@/components/admin/dashboard/AllTasks';

describe('AllTasks Component', () => {
    it('renders the All Tasks header', () => {
        render(<AllTasks />);
        const headerElement = screen.getByText(/All Tasks/i);
        expect(headerElement).toBeInTheDocument();
    });

    it('opens the Create Task dialog when the button is clicked', () => {
        render(<AllTasks />);
        const buttonElement = screen.getByText(/Create Task/i);
        fireEvent.click(buttonElement);
        const dialogElement = screen.getByText(/Create Task Dialog/i);
        expect(dialogElement).toBeInTheDocument();
    });
});
```

### Running Tests
To run the tests:
```sh
npm test
```
