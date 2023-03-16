import { csp } from "./middleware.ts";
import { type CSPDirectives } from "./types.ts";
import { assert, describe, equalsResponse, it } from "./_dev_deps.ts";

describe("csp", () => {
  it("should return response what include csp header", async () => {
    const table: [CSPDirectives, Response][] = [
      [
        { defaultSrc: ["'self'"] },
        new Response(null, {
          headers: { "content-security-policy": "default-src 'self'" },
        }),
      ],
      [
        {
          defaultSrc: "'none'",
          scriptSrc: ["https", "'unsafe-inline'"],
          webrtc: "'block'",
        },
        new Response(null, {
          headers: {
            "content-security-policy":
              "default-src 'none'; script-src https 'unsafe-inline'; webrtc 'block'",
          },
        }),
      ],
    ];

    await Promise.all(table.map(async ([directives, expected]) => {
      const middleware = csp(directives);
      const response = await middleware(
        new Request("test:"),
        () => new Response(),
      );

      assert(
        await equalsResponse(
          response,
          expected,
          true,
        ),
      );
    }));
  });

  it("should return response what include csp report only header", async () => {
    const table: [CSPDirectives, Response][] = [
      [
        { defaultSrc: ["'self'"] },
        new Response(null, {
          headers: {
            "content-security-policy-report-only": "default-src 'self'",
          },
        }),
      ],
      [
        {
          defaultSrc: "'none'",
          scriptSrc: ["https", "'unsafe-inline'"],
          webrtc: "'block'",
        },
        new Response(null, {
          headers: {
            "content-security-policy-report-only":
              "default-src 'none'; script-src https 'unsafe-inline'; webrtc 'block'",
          },
        }),
      ],
    ];

    await Promise.all(table.map(async ([directives, expected]) => {
      const middleware = csp(directives, { reportOnly: true });
      const response = await middleware(
        new Request("test:"),
        () => new Response(),
      );

      assert(
        await equalsResponse(
          response,
          expected,
          true,
        ),
      );
    }));
  });
});
