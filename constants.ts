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
