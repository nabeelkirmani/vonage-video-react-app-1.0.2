# Vonage Video API Reference App for React

## Table of Contents

- [What is it?](#what-is-it)
- [Why use it?](#why-use-it)
- [Requirements](#requirements)
- [Running Locally](#running-locally)
  - [Config](#config)
  - [Running the Project](#running-the-project)
    - [Installing Dependencies](#installing-dependencies)
    - [Dev Mode](#dev-mode)
    - [Production Mode](#production-mode)
- [Deployment to Vonage Cloud Runtime](#deployment-to-vonage-cloud-runtime)
- [Testing](#testing)
  - [Running the Backend and Frontend Test Suites](#running-the-backend-and-frontend-test-suites)
  - [Backend Suite](#backend-suite)
  - [Frontend Suite](#frontend-suite)
- [Code Style](#code-style)
  - [Linting and Auto-formatting](#linting-and-auto-formatting)
  - [File Names](#file-names)
- [Documentation Generation](#documentation-generation)

---

## What is it?

The Vonage Video API Reference App for React is an open-source video conferencing reference application built with [Vonage Video API](https://developer.vonage.com/en/video/client-sdks/web/overview) and React.

This app demonstrates best practices for integrating the Vonage Video API into your application, supporting one-to-one and multi-participant video calls, screen sharing, recording, reactions, and more.

---

## Why use it?

- Quickly start building with Vonage Video API in a React environment.
- Open-source for easy customization and extensibility.
- Uses industry best practices for scalability and security.
- Supports common conferencing use cases, including:

  - Landing page to create/join rooms.
  - Waiting room with A/V previews and name input.
  - Post-call summary and archive display.
  - Full-featured video rooms (up to 25 participants).
  - Device selectors, background blur, noise suppression.
  - Screen sharing, chat, emoji reactions, and active speaker detection.
  - Layout management and participant controls.
  - In-call reporting tool.

---

## Requirements

- [Node.js](https://nodejs.org/en/download/releases/) (version 22)
- [Yarn](https://yarnpkg.com)
- Optional: [nvm](https://github.com/creationix/nvm) (for managing Node versions)

---

## Running Locally

### Config

In the project directory, create the required `.env` files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update the `.env` files with your Vonage Video API credentials.

---

### Running the Project

#### Installing Dependencies

```bash
yarn
```

#### Dev Mode

```bash
yarn dev
```

This starts both:

* Backend server at [http://localhost:3345](http://localhost:3345)
* Frontend Vite dev server at [http://localhost:5173](http://localhost:5173)

#### Production Mode

Builds frontend and copies it to backend to be served by Express.

```bash
yarn start
```

Access the full app at [http://localhost:3345](http://localhost:3345)

---

## Deployment to Vonage Cloud Runtime

> *(Details about deploying to Vonage Cloud Runtime go here. Add steps if needed.)*

---

## Testing

### Running the Backend and Frontend Test Suites

```bash
yarn test
```

### Backend Suite

Run backend tests once:

```bash
yarn test:backend
```

Watch mode:

```bash
yarn test:backend:watch
```

More CLI options: [Jest Docs](https://jestjs.io/docs/cli)

### Frontend Suite

Uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

To run once:

```bash
yarn test:frontend
```

Watch mode:

```bash
yarn test:frontend:watch
```

More CLI options: [Vitest CLI](https://vitest.dev/guide/cli#options)

---

## Code Style

### Linting and Auto-formatting

We use **ESLint** and **Prettier**.

* VSCode Extension: [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Terminal commands:

```bash
yarn lint        # Check issues
yarn lint:fix    # Auto-fix issues and run Prettier
```

### File Names

All file names follow `camelCase`.

---

## Documentation Generation

Uses `typedoc` for generating docs from JSDoc comments.

To generate documentation:

```bash
yarn docs
```

Docs are output to: `frontend/dist`

