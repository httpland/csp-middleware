// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import {
  HashSource,
  HostSource,
  KeywordSource,
  NonceSource,
  SchemeSource,
  SourceExpression,
} from "./types.ts";

enum KeywordSourceFormat {
  Self = "'self'",
  UnsafeInline = "'unsafe-inline'",
  UnsafeEval = "'unsafe-eval'",
  StrictDynamic = "'strict-dynamic'",
  UnsafeHashes = "'unsafe-hashes'",
  ReportSample = "'report-sample'",
  UnsafeAllowRedirects = "'unsafe-allow-redirects'",
  WasmUnsafeEval = "'wasm-unsafe-eval'",
}

/**
 * @see https://www.rfc-editor.org/rfc/rfc3986#section-3.1
 */
const ReScheme = /^[A-Za-z][A-Za-z\d+.-]*$/;

/** Whether the input is {@link SchemeSource} or not. */
export function isSchemeSource(input: string): input is SchemeSource {
  const result = divideBy(input, ":");

  if (!result || result[1]) return false;

  return ReScheme.test(result[0]);
}

const ReHostSource =
  /^(?:[A-Za-z](?:[A-Za-z]|\d|\+|-|\.)*:\/{2})?(?:\*|(?:\*\.)?(?:[A-Za-z]|\d|-)+(?:\.(?:[A-Za-z]|\d|-)+)*)(?::(?:\d+|\*))?(?:\/(?:(?:[A-Za-z]|\d|-|\.|_|~|%[\dA-F]{2}|!|\$|&|'|\(|\)|\*|\+|=|:|@)+(?:\/(?:[A-Za-z]|\d|-|\.|_|~|%[\dA-F]{2}|!|\$|&|'|\(|\)|\*|\+|=|:|@)*)*)?)?$/;

/** Whether the input is {@link HostSource} or not. */
export function isHostSource(input: string): input is HostSource {
  return ReHostSource.test(input);
}

/** Whether the input is {@link KeywordSource} or not. */
export function isKeywordSource(input: string): input is KeywordSource {
  return (Object.values(KeywordSourceFormat) as string[])
    .includes(input);
}

const ReNonceSource = /^'nonce-(?:[A-Za-z]|\d|\+|\/|-|_)+={0,2}'$/;

/** Whether th input is {@link NonceSource} or not. */
export function isNonceSource(input: string): input is NonceSource {
  return ReNonceSource.test(input);
}

const ReHashSource =
  /^'(?:sha256|sha384|sha512)-(?:[A-Za-z]|\d|\+|\/|-|_)+={0,2}'$/;

/** Whether the input is {@link HashSource} or not. */
export function isHashSource(input: string): input is HashSource {
  return ReHashSource.test(input);
}

const SOURCE_EXPRESSION_VALIDATORS = [
  isSchemeSource,
  isHostSource,
  isKeywordSource,
  isNonceSource,
  isHashSource,
];

/** Whether the input is {@link SourceExpression} or not. */
export function isSourceExpression(input: string): input is SourceExpression {
  return SOURCE_EXPRESSION_VALIDATORS.some((v) => v(input));
}

export function divideBy(
  input: string,
  separator: string,
): [head: string, tail: string] | null {
  const index = input.indexOf(separator);

  if (index === -1) return null;

  const head = input.slice(0, index);
  const tail = input.slice(index + separator.length);

  return [head, tail];
}
