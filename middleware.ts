// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { type Middleware, withHeader } from "./deps.ts";
import { CSPHeader, DEFAULT_DIRECTIVES } from "./constants.ts";
import { stringifyDirectives } from "./utils.ts";
import type { Directives } from "./types.ts";

/** Middleware options. */
export interface Options {
  /**
   * @default {@link DEFAULT_DIRECTIVES}
   */
  readonly directives?: Directives;

  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Content-Security-Policy-Report-Only`
   * - `false`: `Content-Security-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create `Content-Security-Policy` header field middleware.
 *
 * The default header is [Starter policy](https://content-security-policy.com/):
 * ```http
 * Content-Security-Policy: default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';base-uri 'self';form-action 'self'
 * ```
 *
 * @example
 * ```ts
 * import {
 *   csp,
 *   type CSPDirectives,
 *   type Handler,
 * } from "https://deno.land/x/csp_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = csp();
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("content-security-policy"));
 * ```
 *
 * @throws {TypeError} If the serialized CSP is invalid [`<serialized-policy-list>`](https://w3c.github.io/webappsec-csp/#grammardef-serialized-policy-list) format.
 */
export function csp(options?: Options): Middleware {
  const {
    directives = DEFAULT_DIRECTIVES,
    reportOnly = false,
  } = options ?? {};
  const fieldValue = stringifyDirectives({ ...directives });

  const fieldName = reportOnly
    ? CSPHeader.ContentSecurityPolicyReportOnly
    : CSPHeader.ContentSecurityPolicy;

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) return response;

    return withHeader(response, fieldName, fieldValue);
  };
}
