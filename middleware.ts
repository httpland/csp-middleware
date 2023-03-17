// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { CSPDirectives } from "./types.ts";
import { isCSPFormat, stringify } from "./csp.ts";
import { CSPHeader, type Middleware, withHeader } from "./deps.ts";

export interface Options {
  /** Switch header to report only.
   * - `true` - `Content-Security-Policy-Report-Only`
   * - `false` - `Content-Security-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create `Content-Security-Policy` header field middleware.
 *
 * @example
 * ```ts
 * import {
 *   csp,
 *   type CSPDirectives,
 * } from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: (request: Request) => Response;
 *
 * const directives: CSPDirectives = { defaultSrc: ["'self'"] };
 * const middleware = csp(directives);
 * const response = await middleware(request, handler);
 *
 * assertEquals(
 *   response.headers.get("content-security-policy"),
 *   "default-src 'self'"
 * );
 * ```
 *
 * @throws {TypeError} If the serialized CSP is invalid format.
 */
export function csp(directives: CSPDirectives, options?: Options): Middleware {
  const fieldValue = stringify(directives);

  if (!isCSPFormat(fieldValue)) {
    throw TypeError(Msg.InvalidSerializedCsp);
  }

  const { reportOnly = false } = options ?? {};
  const fieldName = reportOnly
    ? CSPHeader.ContentSecurityPolicyReportOnly
    : CSPHeader.ContentSecurityPolicy;

  return async (request, next) => {
    const response = await next(request);

    return withHeader(response, fieldName, fieldValue);
  };
}

const enum Msg {
  InvalidSerializedCsp = "invalid serialized CSP format.",
}
