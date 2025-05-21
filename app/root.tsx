import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router-dom";

import type { Route } from "./+types/root";
import "./app.css";
import { TripProvider } from "./lib/tripContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
          {children}
          <ScrollRestoration />
          <Scripts />
      </body>
    </html>
  );
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n/i18n';
import { useEffect, useState } from 'react';
import { GoogleMapsLoader } from './components/maps/GoogleMapsLoader';

const queryClient = new QueryClient();

export default function App() {
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    // Check if i18n is initialized
    if (i18n.isInitialized) {
      setI18nInitialized(true);
    } else {
      // Add event listener for initialization
      const handleInitialized = () => {
        setI18nInitialized(true);
      };

      i18n.on('initialized', handleInitialized);

      // If already initialized but event didn't fire
      if (i18n.isInitialized) {
        setI18nInitialized(true);
      }

      return () => {
        i18n.off('initialized', handleInitialized);
      };
    }
  }, []);

  // Show loading state while i18n is initializing
  if (!i18nInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <GoogleMapsLoader>
          <TripProvider>
            <Outlet />
          </TripProvider>
        </GoogleMapsLoader>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
