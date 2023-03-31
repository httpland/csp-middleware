// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { CSPDirectives, Policy } from "./types.ts";

export const enum CSPHeader {
  ContentSecurityPolicy = "content-security-policy",
  ContentSecurityPolicyReportOnly = "content-security-policy-report-only",
}

const enum KeywordSource {
  Self = "'self'",
  UnsafeInline = "'unsafe-inline'",
  StrictDynamic = "'strict-dynamic'",
  UnsafeHashes = "'unsafe-hashes'",
  ReportSample = "'report-sample'",
  UnsafeAllowRedirects = "'unsafe-allow-redirects'",
  WasmUnsafeEval = "'wasm-unsafe-eval'",
}

/** The default {@link CSPDirectives}.
 * ```http
 * default-src 'none';
 * script-src 'self';
 * connect-src 'self';
 * img-src 'self';
 * style-src 'self';
 * base-uri 'self';
 * form-action 'self'
 * ```
 */
export const DEFAULT_DIRECTIVES: CSPDirectives = {
  defaultSrc: "'none'",
  scriptSrc: KeywordSource.Self,
  connectSrc: KeywordSource.Self,
  imgSrc: KeywordSource.Self,
  styleSrc: KeywordSource.Self,
  baseUri: KeywordSource.Self,
  formAction: KeywordSource.Self,
};

export const DEFAULT_POLICY: Policy = {
  directives: DEFAULT_DIRECTIVES,
  reportOnly: false,
};
