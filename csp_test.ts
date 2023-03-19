import { assert, assertEquals, describe, it } from "./_dev_deps.ts";
import { isCSPFormat, stringify, stringifyValue } from "./csp.ts";
import type { CSPDirectives, CSPValue } from "./types.ts";

describe("stringify", () => {
  it("should return string if the directives is valid", () => {
    const table: [CSPDirectives, string][] = [
      [{ baseUri: "'none'" }, "base-uri 'none'"],
      [{ baseUri: ["'self'", "https"] }, "base-uri 'self' https"],
      [
        { baseUri: ["'self'", "https"], childSrc: "'none'" },
        "base-uri 'self' https; child-src 'none'",
      ],
      [
        { baseUri: ["'self'", "https"], webrtc: "'allow'" },
        "base-uri 'self' https; webrtc 'allow'",
      ],
    ];

    table.forEach(([directives, expected]) => {
      assertEquals(stringify(directives), expected);
    });
  });
});

describe("stringifyValue", () => {
  it("should return string if the directives is valid", () => {
    const table: [CSPValue, string][] = [
      ["abc", "abc"],
      [[`'self'`], "'self'"],
      [[`'self'`, `'strict-dynamic'`], "'self' 'strict-dynamic'"],
      [[`https`, `data`], "https data"],
      [undefined, ""],
    ];

    table.forEach(([value, expected]) => {
      assertEquals(stringifyValue(value), expected);
    });
  });
});

describe("isCSPFormat", () => {
  it("should return true if the input is CSP format", () => {
    const table: string[] = [
      "default-src 'self'",
      " default-src 'self' ",
      "default-src 'self'; script-src 'none'",
      "a",
      "a;",
      "a; b",
      "a; b b",
      "a; b b b",
      "default-src https://example.test/",
      "default-src https://あ.test/",
    ];

    table.forEach((input) => {
      assert(isCSPFormat(input));
    });
  });

  it("should return false if the input is not CSP format", () => {
    const table: string[] = [
      "",
      "    ",
      "?",
      "あ",
      ",",
      ",,,",
    ];

    table.forEach((input) => {
      assert(!isCSPFormat(input));
    });
  });
});
