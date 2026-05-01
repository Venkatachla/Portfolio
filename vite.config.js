import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: process.env.VERCEL ? "/" : command === "build" ? "/Portfolio/" : "/",
}));