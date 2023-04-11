# csp-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/csp_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/csp_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/csp-middleware)](https://github.com/httpland/csp-middleware/releases)
[![codecov](https://codecov.io/github/httpland/csp-middleware/branch/main/graph/badge.svg?token=MNFZEQH8OK)](https://codecov.io/gh/httpland/csp-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/csp-middleware)](https://github.com/httpland/csp-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/csp-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/csp-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/csp-middleware.png?mini=true)](https://nodei.co/npm/@httpland/csp-middleware/)

HTTP content security policy(CSP) middleware.

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

## Options

Middleware factory takes following fields.

| Name       | Type            | Description                            |
| ---------- | --------------- | -------------------------------------- |
| directives | `CSPDirectives` | CSP directives.                        |
| reportOnly | `boolean`       | Whether the policy report only or not. |

### Directives

`directives` can be one of the following.

- `CSPDirective`
- Camel casing `CSPDirective`

#### CSP directives

`CSPDirectives` are structured `Content-Security-Policy` header field objects.

Base types are as follows:

```ts
interface Directives {
  [k: string]: string | string[];
}
```

Each key represents a directive name and each value represents a directive
value.

The Directive supports all directives in
[Content Security Policy Level 3](https://w3c.github.io/webappsec-csp/).

Each directive may be restricted to a more strict type.

For example, a `webrtc` directive is restricted to `'allow'` or `'block'`.

```ts
import { csp } from "https://deno.land/x/csp_middleware@$VERSION/middleware.ts";

const middleware = csp({
  directives: {
    "default-src": "'none'",
    webrtc: "'allow'",
  },
});
```

Check [deno doc](https://doc.deno.land/https/deno.land/x/csp_middleware/mod.ts)
for about `CSPDirectives`.

##### Camel casing

The directive name can also be defined in camel case. Overloading makes it
exclusive.

```ts
import { csp } from "https://deno.land/x/csp_middleware@$VERSION/middleware.ts";

const middleware = csp({
  directives: {
    defaultSrc: "'none'",
    scriptSrc: ["'self'", "*.example.test"],
  },
});
```

### Report Only

The header field changes depending on the value of `reportOnly`.

| Value   | Header field                        |
| ------- | ----------------------------------- |
| `true`  | Content-Security-Policy-Report-Only |
| `false` | Content-Security-Policy             |

The default `reportOnly` is `false`.

```ts
import {
  csp,
  type Handler,
} from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = csp({ reportOnly: true });
const response = await middleware(request, handler);

assert(response.headers.has("content-security-policy-report-only"));
```

### Serializing error

[CSP directives](#csp-directives) will serialize into string.

In Serializing, the directive name and directive value are validated based on
[ABNF](https://w3c.github.io/webappsec-csp/#framework-directives). If they are
invalid, an error may be thrown.

Errors are thrown in the following cases:

- None of the `directive` is present
- Directive key does not compliant with
  [`<directive-name>`](https://w3c.github.io/webappsec-csp/#grammardef-directive-name)
- Directive value does not compliant with
  [<`VCHAR`> without ";" and ","](https://w3c.github.io/webappsec-csp/#grammardef-directive-value)
- Directive values has a duplicate value

```ts
import { csp } from "https://deno.land/x/csp_middleware@$VERSION/middleware.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => csp({ directives: {} }));
assertThrows(() => csp({ directives: { defaultSrc: "<invalid>" } }));
assertThrows(() =>
  csp({ directives: { defaultSrc: ["<duplicate>", "<duplicate>"] } })
);
```

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Content-Security-Policy
  - Content-Security-Policy-Report-Only

## Conditions

Middleware will execute if all of the following conditions are met:

Depends on [reportOnly](#report-only):

- `Content-Security-Policy` header does not exists in response
- `Content-Security-Policy-Report-Only` header does not exists in response

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/csp_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
