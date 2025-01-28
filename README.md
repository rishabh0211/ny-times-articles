# React NYT Articles App

This is a React application that fetches and displays articles from the New York Times Most Popular Articles API. The app is built using React, Tanstack Query, and Tailwind CSS. It also includes unit and end-to-end tests using Vitest and Cypress.

## Features

- Fetch and display articles from the New York Times API
- Filter articles by time period (1, 7, or 30 days)
- View article details in a modal
- Error handling with retry functionality
- Fully responsive UI
- Unit testing with Vitest and React Testing Library
- e2e testing with Cypress

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-nyt-articles.git
   ```
   ```
   cd react-nyt-articles
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Create a `.env` file in the root directory and add your NY Times API key:

   ```env
   VITE_NYT_API_KEY=your_api_key_here
   ```

   You can get the API key by signing up on [NY Times Developer site](https://developer.nytimes.com/get-started)

5. Start the development server:

   ```bash
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

7. Open the app in your browser at `http://localhost:5173`.

## Scripts

- **`npm run dev`**: Start the development server
- **`npm run build`**: Build the app for production
- **`npm run preview`**: Preview the production build
- **`npm run test`**: Run unit tests with Vitest
- **`npm run cypress:open`**: Open the Cypress test runner
- **`npm run cypress:run`**: Run Cypress tests in headless mode

## Project Structure

```plaintext
src
├── components
│   ├── ArticleDetails
│   ├── ArticleList
│   └── Header
├── hooks
│   └── useFetchArticles.ts
├── pages
│   └── Home.tsx
├── services
│   └── articles.ts
├── types
│   └── Article.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Testing

### Unit Tests

Unit tests are written using Vitest and React Testing Library. To run the tests:

```bash
npm run test
```

### End-to-End Tests

Cypress is used for E2E tests. To open the Cypress test runner:

```bash
npm run cypress:open
```

To run tests in headless mode:

```bash
npm run cypress:run
```

## Deployment

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder.
