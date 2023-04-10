// deno-lint-ignore-file no-explicit-any
// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Msg } from "./constants.ts";
import {
  filterValues,
  isUndefined,
  kebabCase,
  mapKeys,
  mapValues,
} from "./deps.ts";

export function stringifyDirectives(
  directives: { readonly [k: string]: readonly string[] | string | undefined },
): string {
  const filtered = filterValues(directives, not(isUndefined)) as Record<
    string,
    string | readonly string[]
  >;

  const normalized = mapKeys(
    mapValues(filtered, ensureArray),
    kebabCase,
  );

  if (!Object.keys(normalized).length) {
    throw TypeError("one or more directives are required.");
  }

  Object.keys(normalized).forEach((input) =>
    assertDirectiveName(input, "invalid <directive-key> format.")
  );

  Object.values(normalized).flat().forEach((input) =>
    assertDirectiveValue(input, "invalid <directive-value> format.")
  );

  const joinBySpace = joinBy.bind(null, " ");

  return Object.entries(mapValues(normalized, joinBySpace)).map(stringifyEntry)
    .join("; ");
}

function stringifyEntry(entry: readonly [key: string, value: string]): string {
  return `${entry[0]} ${entry[1]}`;
}

function joinBy(
  separator: string | undefined,
  input: readonly unknown[],
): string {
  return input.join(separator);
}

export function not<T extends (...args: any) => boolean>(fn: T) {
  return (...args: Parameters<T>): boolean => {
    return !fn.apply(null, args);
  };
}

export function ensureArray<T>(input: T): T extends readonly any[] ? T : [T] {
  return Array.isArray(input) ? input as never : [input] as never;
}

/**
 * ```abnf
 * directive-name = 1*( ALPHA / DIGIT / "-" )
 * ```
 */
const reDirectiveName = /^[a-zA-Z\d-]+$/;

export function isDirectiveName(input: string): boolean {
  return reDirectiveName.test(input);
}

function assertDirectiveName(input: string, message?: string): asserts input {
  if (!isDirectiveName(input)) {
    throw Error(message);
  }
}

/**
 * ```abnf
 * directive-value = *( required-ascii-whitespace / ( %x21-%x2B / %x2D-%x3A / %x3C-%x7E ) )
 * ```
 */
const reDirectiveValue =
  // deno-lint-ignore no-control-regex
  /^([\x09\x0A\x0C\x0D\x20]+|[\x21-\x2B\x2D-\x3A\x3C-\x7E])*$/;

export function isDirectiveValue(input: string): boolean {
  return reDirectiveValue.test(input);
}

function assertDirectiveValue(input: string, message?: string): asserts input {
  if (!isDirectiveValue(input)) {
    throw Error(message);
  }
}
