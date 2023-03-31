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
  type Handler,
} from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = csp();
const response = await middleware(request, handler);

assert(response.headers.has("content-security-policy"));
```

yield:

```http
Content-Security-Policy: default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'
```

The default header field value is compliant with
[Content Security Policy (CSP)
Quick Reference Guide, Stater policy](https://content-security-policy.com/).

## Policy

Middleware factory takes `policy` as an argument.

`policy` is following structured:

| Name       | Type                            | Description                            |
| ---------- | ------------------------------- | -------------------------------------- |
| directives | `string` &#124; `CSPDirectives` | CSP directives.                        |
| reportOnly | `boolean`                       | Whether the policy report only or not. |

### Directives

`directives` can be one of the following.

- `CSPDirective`.
- Serialized value

#### CSP directives

`CSPDirectives` are structured `Content-Security-Policy` header field objects.

You can declare a CSP directive with a camelCase key and type-safe.

```ts
import { csp } from "https://deno.land/x/csp_middleware@$VERSION/middleware.ts";

const middleware = csp({
  directives: {
    defaultSrc: "'none'",
    scriptSrc: ["'self'", "*.example.test"],
  },
});
```

Check [deno doc](https://doc.deno.land/https/deno.land/x/csp_middleware/mod.ts)
for about `CSPDirectives`.

#### Serialized value

Any string.

Can be used to specify a serialized header field value.

```ts
import { csp } from "https://deno.land/x/csp_middleware@$VERSION/middleware.ts";

const middleware = csp({ directives: "default-src 'none'" });
```

### Disposition

The header field changes depending on the value of disposition.

| Value   | Header field                        |
| ------- | ----------------------------------- |
| `false` | Content-Security-Policy             |
| `true`  | Content-Security-Policy-Report-Only |

The default `reportOnly` is `false`.

```ts
import {
  csp,
  type CSPDirectives,
} from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: (request: Request) => Response;

const middleware = csp({ reportOnly: true });
const response = await middleware(request, handler);

assert(response.headers.has("content-security-policy-report-only"));
```

### Throwing error

[CSP directives](#csp-directives) will serialize into string.

If serialized [directives](#directives) does not follow
[`<serialized-policy-list>`](https://w3c.github.io/webappsec-csp/#grammardef-serialized-policy-list),
it throws a `TypeError`.

```ts
import { csp } from "https://deno.land/x/csp_middleware@$VERSION/middleware.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => csp({ directives: { defaultSrc: "<invalid>" } }));
assertThrows(() => csp({ directives: "<invalid>" }));
```

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Content-Security-Policy
  - Content-Security-Policy-Report-Only

## Conditions

Middleware is executed if all of the following conditions are met:

Depends on [disposition](#disposition):

- `Content-Security-Policy` header does not exists in response
- `Content-Security-Policy-Report-Only` header does not exists in response

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/csp_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
