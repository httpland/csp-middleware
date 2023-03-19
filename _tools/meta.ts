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
  mappings: {
    "https://esm.sh/kebab-case@1.0.2?pin=v111": {
      name: "kebab-case",
      version: "1.0.2",
    },
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/isx@1.0.0-beta.24/mod.ts": {
      name: "isxx",
      version: "1.0.0-beta.24",
    },
  },
});
