// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export const enum CSPHeader {
  ContentSecurityPolicy = "content-security-policy",
  ContentSecurityPolicyReportOnly = "content-security-policy-report-only",
}

const enum Abnf {
  SerializedPolicyList = "<serialized-policy-list>",
}

export const enum Msg {
  InvalidSerializedPolicyList = `invalid ${Abnf.SerializedPolicyList} format.`,
}

export const DEFAULT_DIRECTIVE =
  "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'";

/**
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
