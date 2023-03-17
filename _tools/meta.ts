import { BuildOptions } from "https://deno.land/x/dnt@0.33.1/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "esnext", "dom.iterable"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/csp-middleware",
    version,
    description: "HTTP Content Security Policy(CSP) middleware",
    keywords: [
      "http",
      "middleware",
      "csp",
      "content-security-policy",
      "fetch-api",
      "security",
      "request",
      "response",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/csp-middleware",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/csp-middleware.git",
    },
    bugs: {
      url: "https://github.com/httpland/csp-middleware/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
});
