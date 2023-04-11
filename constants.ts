// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export const enum CSPHeader {
  ContentSecurityPolicy = "content-security-policy",
  ContentSecurityPolicyReportOnly =
    `${CSPHeader.ContentSecurityPolicy}-report-only`,
}

const enum Abnf {
  DirectiveKey = "<directive-key>",
  Vchar = "<VCHAR>",
}

export const enum Msg {
  InvalidVcharWithout = `invalid ${Abnf.Vchar} without ";" and "," format.`,
  InvalidDirectiveKey = `invalid ${Abnf.DirectiveKey} format.`,
  RequiredDirective = "one or more directives are required.",
  DuplicatedDirectiveValue = "duplicated directive value.",
}

/** Representation of [`<keyword-source>`](https://www.w3.org/TR/CSP/#grammardef-keyword-source).
 * @see https://www.w3.org/TR/CSP/#grammardef-keyword-source
 */
export enum KeywordSource {
  Self = "'self'",
  UnsafeInline = "'unsafe-inline'",
  UnsafeEval = "'unsafe-eval'",
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
export const DEFAULT_DIRECTIVES = {
  defaultSrc: "'none'",
  scriptSrc: KeywordSource.Self,
  connectSrc: KeywordSource.Self,
  imgSrc: KeywordSource.Self,
  styleSrc: KeywordSource.Self,
  baseUri: KeywordSource.Self,
  formAction: KeywordSource.Self,
};

/** The `sandbox` attribute.
 * @see https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox
 */
export enum SandboxAttribute {
  AllowDownloads = "allow-downloads",
  AllowForms = "allow-forms",
  AllowModals = "allow-modals",
  AllowOrientationLock = "allow-orientation-lock",
  AllowPointerLock = "allow-pointer-lock",
  AllowPopups = "allow-popups",
  AllowPopupsToEscapeSandbox = "allow-popups-to-escape-sandbox",
  AllowPresentation = "allow-presentation",
  AllowSameOrigin = "allow-same-origin",
  AllowScripts = "allow-scripts",
  AllowTopNavigation = "allow-top-navigation",
  AllowTopNavigationByUserActivation =
    "allow-top-navigation-by-user-activation",
  AllowTopNavigationToCustomProtocols =
    "allow-top-navigation-to-custom-protocols",
}
