# csp-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/csp_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/csp_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/csp-middleware)](https://github.com/httpland/csp-middleware/releases)
[![codecov](https://codecov.io/github/httpland/csp-middleware/branch/main/graph/badge.svg?token=MNFZEQH8OK)](https://codecov.io/gh/httpland/csp-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/csp-middleware)](https://github.com/httpland/csp-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/csp-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/csp-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/csp-middleware.png?mini=true)](https://nodei.co/npm/@httpland/csp-middleware/)

HTTP Content Security Policy(CSP) middleware.

Compliant with
[Content Security Policy Level 3](https://w3c.github.io/webappsec-csp/).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `Content-Security-Policy` header to the response.

```ts
import {
  csp,
  type CSPDirectives,
} from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: (request: Request) => Response;

const directives: CSPDirectives = { defaultSrc: ["'self'"] };
const middleware = csp(directives);
const response = await middleware(request, handler);

assertEquals(
  response.headers.get("content-security-policy", "default-src 'self'"),
);
```

yield:

```http
Content-Security-Policy: default-src 'self'
```

## CSP directives

`CSPDirectives` are structured `Content-Security-Policy` header field objects.

You can declare a CSP directive with a camelCase key and type-safe.

[OWASP recommendation](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html#basic-csp-policy):

```ts
import {
  type CSPDirectives,
} from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";

const directives: CSPDirectives = {
  defaultSrc: `'none'`,
  scriptSrc: [`'self'`],
  connectSrc: [`'self'`],
  imgSrc: [`'self'`],
  styleSrc: [`'self'`],
  frameAncestors: [`'self'`],
  formAction: [`'self'`],
};
```

yield:

```http
Content-Security-Policy: default-src 'none'; script-src 'self'; connect-src
'self'; img-src 'self'; style-src 'self'; frame-ancestors 'self'; form-action
'self';
```

## Report only

With the `reportOnly` flag, switches `Content-Security-Policy` to
`Content-Security-Policy-Report-Only` header.

```ts
import {
  csp,
  type CSPDirectives,
} from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";

declare const directives: CSPDirectives;
declare const request: Request;
declare const handler: (request: Request) => Response;

const middleware = csp(directives, { reportOnly: true });
const response = await middleware(request, handler);

assertEquals(response.headers.has("content-security-policy-report-only"));
```

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Content-Security-Policy

## Conditions

Middleware is executed if all of the following conditions are met:

- `Content-Security-Policy` header does not exists in response

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
