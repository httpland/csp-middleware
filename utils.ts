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

/** Serialize structured directives into string.
 * @throws {Error} If the directives include invalid member.
 */
export function stringifyDirectives(
  directives: { readonly [k: string]: readonly string[] | string | undefined },
): string {
  const normalized = normalizeDirectives(directives);

  if (!Object.keys(normalized).length) {
    throw Error(Msg.RequiredDirective);
  }

  Object.keys(normalized).forEach((input) =>
    assertDirectiveName(input, `${Msg.InvalidDirectiveKey} "${input}"`)
  );

  const values = Object.values(normalized);

  values.flat().forEach((input) =>
    assertDirectiveValue(input, `${Msg.InvalidVcharWithout} "${input}"`)
  );

  values.forEach((values) => {
    const duplicates = duplicate(values);

    if (duplicates.length) {
      throw Error(
        `${Msg.DuplicatedDirectiveValue} ${duplicates.map(quoted).join(", ")}`,
      );
    }
  });

  const joinBySpace = joinBy.bind(null, " ");

  return Object.entries(mapValues(normalized, joinBySpace))
    .map(stringifyEntry)
    .filter(Boolean)
    .join("; ");
}

export function normalizeDirectives(
  directives: { readonly [k: string]: readonly string[] | string | undefined },
): Record<string, string[]> {
  const filtered = filterValues(directives, not(isUndefined)) as Record<
    string,
    string | string[]
  >;

  const normalized = mapValues(mapKeys(filtered, kebabCase), ensureArray);

  return normalized;
}

function stringifyEntry(entry: readonly [key: string, value: string]): string {
  return entry.filter(Boolean).join(" ");
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
const reDirectiveValue = /^[\x21-\x2B\x2D-\x3A\x3C-\x7E]+$/;

export function isDirectiveValue(input: string): boolean {
  return reDirectiveValue.test(input);
}

function assertDirectiveValue(input: string, message?: string): asserts input {
  if (!isDirectiveValue(input)) {
    throw Error(message);
  }
}

/** Return duplicated elements. */
export function duplicate<T>(input: readonly T[]): T[] {
  const store = new Set<T>();
  const duplicated = new Set<T>();

  for (const value of input) {
    const set = store.has(value) ? duplicated : store;

    set.add(value);
  }

  return [...duplicated];
}

function quoted(input: string): string {
  return `"${input}"`;
}
