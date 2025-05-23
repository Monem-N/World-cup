// Vercel serverless function entry point for React Router v7
import { createRequestHandler } from "@react-router/node";
import * as build from "../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js";

const requestHandler = createRequestHandler({
  build,
  mode: "production",
});

export default requestHandler;
