import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" car le site est déployé à la racine d'un site utilisateur GitHub
// Pages (https://baDrsh531.github.io/). Pour un dépôt-projet servi sous
// /nom-du-repo/, mettre base: "/nom-du-repo/".
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: { port: 5174, open: false },
});
