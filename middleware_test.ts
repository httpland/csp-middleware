import { csp } from "./middleware.ts";
import {
  assert,
  assertIsError,
  assertThrows,
  describe,
  equalsResponse,
  it,
} from "./_dev_deps.ts";
import { CamelCasingCSPDirectives, CSPDirectives } from "./types.ts";

describe("csp", () => {
  it("should return response what include default csp header", async () => {
    const middleware = csp();

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            "content-security-policy":
              "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'",
          },
        }),
        true,
      ),
    );
  });
  it("should return response what include csp header", async () => {
    const table: [CamelCasingCSPDirectives, Response][] = [
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
      const middleware = csp({ directives });
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

  it("should return response what include csp header with kebab case", async () => {
    const table: [CSPDirectives, Response][] = [
      [
        { "default-src": ["'self'"] },
        new Response(null, {
          headers: { "content-security-policy": "default-src 'self'" },
        }),
      ],
      [
        {
          "default-src": "'none'",
          "script-src": ["https", "'unsafe-inline'"],
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
      const middleware = csp({ directives });
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
    const middleware = csp({ reportOnly: true });

    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(
      await equalsResponse(
        response,
        new Response(null, {
          headers: {
            "content-security-policy-report-only":
              "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'",
          },
        }),
        true,
      ),
    );
  });

  it("should throw error if policy.directives is invalid", () => {
    assertThrows(() => csp({ directives: {} }));
    assertThrows(() =>
      csp({
        directives: {
          "default-src": ";",
        },
      })
    );
  });

  it("should be error message", () => {
    let err;

    try {
      csp({ directives: {} });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(
        err,
        Error,
        `one or more directives are required.`,
      );
    }
  });
});
