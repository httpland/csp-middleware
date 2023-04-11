import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/csp-middleware",
    version,
    description: "HTTP content security policy(CSP) middleware",
    keywords: [
      "http",
      "middleware",
      "csp",
      "content-security-policy",
      "csp",
      "csp-level3",
      "fetch-api",
      "security",
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
    "https://esm.sh/kebab-case@1.0.2?pin=v114": {
      name: "kebab-case",
      version: "1.0.2",
    },
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/isx@1.1.1/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.1.1",
      subPath: "is_string",
    },
    "https://deno.land/x/isx@1.1.1/is_undefined.ts": {
      name: "@miyauci/isx",
      version: "1.1.1",
      subPath: "is_undefined",
    },
    "https://deno.land/x/http_utils@1.0.0/message.ts": {
      name: "@httpland/http-utils",
      version: "1.0.0",
      subPath: "message.js",
    },
  },
});
