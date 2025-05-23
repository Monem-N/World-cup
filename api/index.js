// Vercel serverless function to handle React Router v7 SSR
import { createRequestHandler } from "@react-router/node";

// Import the server build
let build;
try {
  build = await import("../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js");
} catch (error) {
  console.error("Failed to import server build:", error);
  throw error;
}

// Create the request handler
const requestHandler = createRequestHandler({
  build,
  mode: "production",
});

// Export the handler for Vercel
export default requestHandler;
