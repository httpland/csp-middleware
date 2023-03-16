import { assertEquals, describe, it } from "./_dev_deps.ts";
import { stringify, stringifyValue } from "./csp.ts";
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
