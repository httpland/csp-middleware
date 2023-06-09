// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { KeywordSource, SandboxAttribute } from "./constants.ts";
import { CamelCasing } from "./deps.ts";

/** Representation of [`<serialized-source-list>`](https://www.w3.org/TR/CSP/#grammardef-serialized-source-list).
 * @see https://w3c.github.io/webappsec-csp/#grammardef-serialized-source-list
 */
export type SourceList =
  | [SourceExpression, ...SourceExpression[]]
  | SourceExpression
  | "'none'";

/** Representation of [`<source-expression>`](https://www.w3.org/TR/CSP/#grammardef-source-expression).
 * @see https://www.w3.org/TR/CSP/#grammardef-source-expression
 */
export type SourceExpression =
  | SchemeSource
  | HostSource
  | `${KeywordSource}`
  | NonceSource
  | HashSource;

/** Representation of [`<scheme-source>`](https://www.w3.org/TR/CSP/#grammardef-scheme-source).
 * @see https://www.w3.org/TR/CSP/#grammardef-scheme-source
 */
export type SchemeSource = `${string}:`;

/** Representation of [`<host-source>`](https://www.w3.org/TR/CSP/#grammardef-host-source).
 * @see https://www.w3.org/TR/CSP/#grammardef-host-source
 */

// deno-lint-ignore ban-types
export type HostSource = string & {};

/** Representation of [`<nonce-source>`](https://www.w3.org/TR/CSP/#grammardef-nonce-source).
 * @see https://www.w3.org/TR/CSP/#grammardef-nonce-source
 */
export type NonceSource = `'nonce-${Base64Value}'`;

/** Representation of [`<base64-value>`](https://www.w3.org/TR/CSP/#grammardef-base64-value).
 * @see https://www.w3.org/TR/CSP/#grammardef-base64-value
 */
export type Base64Value = string;

/** Representation of [`<hash-source>`](https://www.w3.org/TR/CSP/#grammardef-hash-source).
 * @see https://www.w3.org/TR/CSP/#grammardef-hash-source
 */
export type HashSource = `'${HashAlgorithm}-${Base64Value}'`;

/** Representation of [`<hash-algorithm>`](https://www.w3.org/TR/CSP/#grammardef-hash-algorithm).
 * @see https://www.w3.org/TR/CSP/#grammardef-hash-algorithm
 */
export type HashAlgorithm = "sha256" | "sha384" | "sha512";

/** Fetch directives control the locations from which certain resource types may be loaded.
 * @see [Content Security Policy Level 3, 6.1. Fetch Directives](https://www.w3.org/TR/CSP/#directives-fetch)
 */
export interface FetchDirectives {
  /** It governs the creation of [child navigables](https://html.spec.whatwg.org/multipage/document-sequences.html#child-navigable) and Worker execution contexts. Represent `<child-src>`.
   * @see https://www.w3.org/TR/CSP/#directive-child-src
   */
  readonly "child-src"?: SourceList;

  /** It restricts the URLs which can be loaded using script interfaces.
   * @see https://www.w3.org/TR/CSP/#directive-connect-src
   */
  readonly "connect-src"?: SourceList;

  /** It serves as a fallback for the other [fetch directives](https://www.w3.org/TR/CSP/#fetch-directives).
   * @see https://www.w3.org/TR/CSP/#directive-default-src
   */
  readonly "default-src"?: SourceList;

  /** It restricts the URLs from which font resources may be loaded.
   * @see https://www.w3.org/TR/CSP/#directive-font-src
   */
  readonly "font-src"?: SourceList;

  /** It restricts the URLs which may be loaded into [child navigables](https://html.spec.whatwg.org/multipage/document-sequences.html#child-navigable).
   * @see https://www.w3.org/TR/CSP/#directive-frame-src
   */
  readonly "frame-src"?: SourceList;

  /** It restricts the URLs from which image resources may be loaded.
   * @see https://www.w3.org/TR/CSP/#directive-img-src
   */
  readonly "img-src"?: SourceList;

  /** It restricts the URLs from which application manifests may be loaded [Web Application Manifest](https://www.w3.org/TR/appmanifest/).
   * @see https://www.w3.org/TR/CSP/#directive-manifest-src
   */
  readonly "manifest-src"?: SourceList;

  /** It restricts the URLs from which video, audio, and associated text track resources may be loaded.
   * @see https://www.w3.org/TR/CSP/#directive-media-src
   */
  readonly "media-src"?: SourceList;

  /** It restricts the URLs from which plugin content may be loaded.
   * @see https://www.w3.org/TR/CSP/#directive-object-src
   */
  readonly "object-src"?: SourceList;

  /** It restricts the locations from which scripts may be executed.
   * @see https://www.w3.org/TR/CSP/#directive-script-src
   */
  readonly "script-src"?: SourceList;

  /** It applies to all script requests and script blocks.
   * @see https://www.w3.org/TR/CSP/#directive-script-src-elem
   */
  readonly "script-src-elem"?: SourceList;

  /** It applies to event handlers and, if present, it will override the script-src directive for relevant checks.
   * @see https://www.w3.org/TR/CSP/#directive-script-src-attr
   */
  readonly "script-src-attr"?: SourceList;

  /** It restricts the locations from which style may be applied to a [Document](https://dom.spec.whatwg.org/#document).
   * @see https://www.w3.org/TR/CSP/#directive-style-src
   */
  readonly "style-src"?: SourceList;

  /** It governs the behaviour of styles except for styles defined in inline attributes.
   * @see https://www.w3.org/TR/CSP/#directive-style-src-elem
   */
  readonly "style-src-elem"?: SourceList;

  /** It governs the behaviour of style attributes.
   * @see https://www.w3.org/TR/CSP/#directive-style-src-attr
   */
  readonly "style-src-attr"?: SourceList;
}

/** [Content Security Policy Level 3, 6.2. Other Directives](https://www.w3.org/TR/CSP/#directives-other)
 */
export interface OtherDirectives {
  /** It restricts whether connections may be established via WebRTC.
   * @see https://www.w3.org/TR/CSP/#directive-webrtc
   */
  readonly webrtc?: "'allow'" | "'block'";

  /** It restricts the URLs which may be loaded as a [Worker](https://html.spec.whatwg.org/multipage/workers.html#worker), [SharedWorker](https://html.spec.whatwg.org/multipage/workers.html#sharedworker), or [ServiceWorker](https://www.w3.org/TR/service-workers/#serviceworker).
   * @see https://www.w3.org/TR/CSP/#directive-worker-src
   */
  readonly "worker-src"?: SourceList;
}

/** It governs the properties of a document or worker environment to which a policy applies.
 * @see https://www.w3.org/TR/CSP/#directives-document
 */
export interface DocumentDirectives {
  /** It restricts the [URL](https://url.spec.whatwg.org/#url)s which can be used in a [Document](https://dom.spec.whatwg.org/#document)'s [base](https://html.spec.whatwg.org/multipage/semantics.html#the-base-element) element.
   * @see https://www.w3.org/TR/CSP/#directive-base-uri
   */
  readonly "base-uri"?: SourceList;

  /** It specifies an HTML sandbox policy which the user agent will apply to a resource, just as though it had been included in an [iframe](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element) with a [sandbox](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox) property.
   * @see https://www.w3.org/TR/CSP/#directive-sandbox
   */
  readonly sandbox?: `${SandboxAttribute}` | [
    `${SandboxAttribute}`,
    ...`${SandboxAttribute}`[],
  ];
}

/** [Content Security Policy Level 3, 6.4. Navigation Directives](https://www.w3.org/TR/CSP/#directives-navigation)
 */
export interface NavigationDirectives {
  /** It restricts the [URL](https://url.spec.whatwg.org/#url)s which can be used as the target of a form submissions from a given context.
   * @see https://www.w3.org/TR/CSP/#directive-form-action
   */
  readonly "form-action"?: SourceList;

  /** It restricts the [URL](https://url.spec.whatwg.org/#url)s which can embed the resource using [frame](https://html.spec.whatwg.org/multipage/obsolete.html#frame), [iframe](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element), [object](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element), or [embed](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element).
   * @see https://www.w3.org/TR/CSP/#directive-frame-ancestors
   */
  readonly "frame-ancestors"?: AncestorSourceList;
}

/** Various algorithms in this document hook into the reporting process by constructing a [violation](https://www.w3.org/TR/CSP/#violation) object via [2.4.2 Create a violation object for request, and policy](https://www.w3.org/TR/CSP/#create-violation-for-request).
 * @see https://www.w3.org/TR/CSP/#directives-reporting
 */
export interface ReportingDirectives {
  /** It defines a set of endpoints to which [csp violation reports](https://www.w3.org/TR/CSP/#csp-violation-report) will be sent when particular behaviors are prevented.
   *
   * @deprecated Use {@link ReportingDirectives.reportTo} instead.
   *
   * @see https://www.w3.org/TR/CSP/#directive-report-uri
   */
  readonly "report-uri"?: UriReference | [UriReference, ...UriReference[]];

  /** It defines a [reporting endpoint](https://www.w3.org/TR/reporting-1/#endpoint) to which violation reports ought to be sent [Reporting API](https://w3c.github.io/reporting/).
   * @see https://www.w3.org/TR/CSP/#directive-report-to
   */
  readonly "report-to"?: string;
}

/** Representation of [`<ancestor-source-list>`](https://www.w3.org/TR/CSP/#grammardef-ancestor-source-list).
 * @see https://www.w3.org/TR/CSP/#grammardef-ancestor-source-list
 */
export type AncestorSourceList =
  | [AncestorSource, ...AncestorSource[]]
  | AncestorSource
  | "'none'";

/** Representation of [`<ancestor-source>`](https://www.w3.org/TR/CSP/#grammardef-ancestor-source).
 * @see https://www.w3.org/TR/CSP/#grammardef-ancestor-source
 */
export type AncestorSource = SchemeSource | HostSource | "'self'";

/** Representation of [`<uri-reference>`](https://www.rfc-editor.org/rfc/rfc3986#section-4.1).
 * @see https://www.rfc-editor.org/rfc/rfc3986#section-4.1
 */
export type UriReference = string;

/** Content security policy directive name and directive values pair. */
export type CSPDirectives =
  | FetchDirectives
  | OtherDirectives
  | NavigationDirectives
  | DocumentDirectives
  | ReportingDirectives;

/** Camel casing {@link CSPDirectives}. */
export type CamelCasingCSPDirectives = CamelCasing<CSPDirectives>;
