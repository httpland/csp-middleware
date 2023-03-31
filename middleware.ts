// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Policy } from "./types.ts";
import { isCSPFormat, stringify } from "./csp.ts";
import { isString, type Middleware } from "./deps.ts";
import { CSPHeader, DEFAULT_POLICY, Msg } from "./constants.ts";
import { withHeader } from "./utils.ts";

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
export function csp(policy?: Partial<Policy>): Middleware {
  const {
    directives = DEFAULT_POLICY.directives,
    reportOnly = DEFAULT_POLICY.reportOnly,
  } = policy ?? DEFAULT_POLICY;
  const fieldValue = isString(directives)
    ? directives
    : stringify({ ...directives });

  if (!isCSPFormat(fieldValue)) {
    const message = `${Msg.InvalidSerializedPolicyList} "${fieldValue}"`;

    throw TypeError(message);
  }

  const fieldName = reportOnly
    ? CSPHeader.ContentSecurityPolicyReportOnly
    : CSPHeader.ContentSecurityPolicy;

  return async (request, next) => {
    const response = await next(request);

    return withHeader(response, fieldName, fieldValue);
  };
}
