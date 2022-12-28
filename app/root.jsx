import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';

import styles from '~/styles/main.css';
import MainNavigation from './components/MainNavigation';

export const meta = () => ({
  charset: 'utf-8',
  title: 'First Jacob Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const CatchBoundary = ({ error }) => {
  const caughtResponse = useCatch();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export const ErrorBoundary = ({ error }) => (
  <html lang="en">
    <head>
      <Meta />
      <Links />
      <title>An error occurred!!</title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className="error">
        <h1>An error occurred!!</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export const links = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];