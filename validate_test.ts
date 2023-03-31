import {
  isHashSource,
  isHostSource,
  isKeywordSource,
  isNonceSource,
  isSchemeSource,
  isSourceExpression,
} from "./validate.ts";
import { assert, describe, it } from "./_dev_deps.ts";

describe("isSchemeSource", () => {
  it("should return true if the input is <scheme-source>", () => {
    const table: string[] = [
      "https:",
      "custom-scheme:",
      "another.custom-scheme:",
      "a:",
      "A:",
      "abcdefghijklmnopqrstuvwxyz1234567890+-.:",
    ];

    table.forEach((input) => {
      assert(isSchemeSource(input));
    });
  });

  it("should return false if the input is not <scheme-source> format", () => {
    const table: string[] = [
      "",
      " ",
      "https",
      "'https:'",
      ":",
      " :",
      ": ",
      " : ",
      "0:",
      "-:",
    ];

    table.forEach((input) => {
      assert(!isSchemeSource(input));
    });
  });
});

describe("isHostSource", () => {
  it("should return true if the input is <host-source>", () => {
    const table: string[] = [
      "*",
      "example.com",
      "*.example.com",
      "a:*",
      "h://*:*",
      "h://*:8000",
      "h://abc:8000",
      "h://abc/",
      "abc/",
      "abc/a",
      "abc/a/",
      "abc/a/a",
      "abc/:",
      "abc/@",
      "abc/@@@@",
      "abc/-",
      "abc/.",
      "abc/_",
      "abc/~",
      "abc/%FF",
      "abc/%00",
      "abc/!",
      "a/$",
      "a/&",
      "a/'",
      "a/(",
      "a/)",
      "a/*",
      "a/+",
      "a/=",
      "a/=/",
      "a/=///",
      "a/=/===/==",
      "a/./.",
      "a.com",
      "https://*.example.com:12/path/to/file.js",
      "https://*:8000/test/120/%01",
      "https://example:8000/hoge/",
    ];

    table.forEach((input) => {
      assert(isHostSource(input));
    });
  });

  it("should return false if the input is not <host-source> format", () => {
    const table: string[] = [
      "",
      " ",
      "abc/a ",
      "abc/a /",
      "abc/?",
      "a/;",
      "a/,",
      "**",
      "*a",
      "abc/%GG",
      "abc/%aa",
      "/",
      "///",
      "**/",
      "*/?/?",
      "*/>",
      "'https:'",
    ];

    table.forEach((input) => {
      assert(!isHostSource(input));
    });
  });
});

describe("isNonceSource", () => {
  it("should return true if the input is <nonce-source>", () => {
    const table: string[] = [
      "'nonce-a'",
      "'nonce-abc'",
      "'nonce-abc=='",
      "'nonce-abc='",
      "'nonce-abcdefghijklmnopqrstuvwxyz1234567890+/-=='",
    ];

    table.forEach((input) => {
      assert(isNonceSource(input));
    });
  });

  it("should return false if the input is not <nonce-source> format", () => {
    const table: string[] = [
      "",
      " ",
      "nonce",
      "'nonce'",
      "'nonce-'",
      " 'nonce-a'",
      " 'nonce-?'",
      " 'nonce-a==='",
      "'nonce-a' ",
      "'nonce-'a",
    ];

    table.forEach((input) => {
      assert(!isNonceSource(input));
    });
  });
});

describe("isHashSource", () => {
  it("should return true if the input is <hash-source>", () => {
    const table: string[] = [
      "'sha256-a'",
      "'sha384-a'",
      "'sha512-a'",
      "'sha512-abcdefghijklmnopqrstuvwxyz1234567890+/-=='",
    ];

    table.forEach((input) => {
      assert(isHashSource(input));
    });
  });

  it("should return false if the input is not <hash-source> format", () => {
    const table: string[] = [
      "",
      " ",
      "sha-256-a",
      "'sha-256-a",
      `"sha-256-a"`,
      `'sha-256-?'`,
      `'sha-1-a'`,
      `'sha-256'`,
      `'sha-256-'`,
    ];

    table.forEach((input) => {
      assert(!isHashSource(input));
    });
  });
});

describe("isKeywordSource", () => {
  it("should return true if the input is <keyword-source>", () => {
    const table: string[] = [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "'strict-dynamic'",
      "'unsafe-hashes'",
      "'report-sample'",
      "'unsafe-allow-redirects'",
      "'wasm-unsafe-eval'",
    ];

    table.forEach((input) => {
      assert(isKeywordSource(input));
    });
  });

  it("should return false if the input is not <keyword-source> format", () => {
    const table: string[] = [
      "",
      " ",
      "invalid",
      "self",
    ];

    table.forEach((input) => {
      assert(!isKeywordSource(input));
    });
  });
});

describe("isSourceExpression", () => {
  it("should return true if the input is <source-expression>", () => {
    const table: string[] = [
      "'self'",
      "https:",
      "*.com",
      "https://test.com/",
      "'nonce-a'",
      "'sha256-a'",
    ];

    table.forEach((input) => {
      assert(isSourceExpression(input));
    });
  });

  it("should return false if the input is not <source-expression> format", () => {
    const table: string[] = [
      "",
      " ",
      ",",
      ",,,",
      "'",
      "''",
      "'test'",
      "?/",
    ];

    table.forEach((input) => {
      assert(!isSourceExpression(input));
    });
  });
});
