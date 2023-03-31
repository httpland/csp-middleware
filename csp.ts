// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import type { CSPDirectives, CSPValues } from "./types.ts";
import { isString, kebabCase, mapKeys, mapValues, ValueOf } from "./deps.ts";

/** Serializes {@link CSPDirectives} into string. */
export function stringify(
  directives: { [k: string]: ValueOf<CSPDirectives> },
): string {
  const record = mapKeys(
    mapValues({ ...directives }, stringifyValue),
    kebabCase,
  );

  return Object
    .entries(record)
    .map(([key, value]) => `${key} ${value}`)
    .join("; ");
}

/** Serializes {@link CSPValue} into string. */
export function stringifyValue(value: CSPValues): string {
  if (isString(value)) return value;

  return value?.join(" ") ?? "";
}

const ReCSP =
  // deno-lint-ignore no-control-regex
  /[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?(?:[\x09\x0A\x0C\x0D ]*;(?:[\x09\x0A\x0C\x0D ]*[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?)?)*(?:[\x09\x0A\x0C\x0D ]*,[\x09\x0A\x0C\x0D ]*[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?(?:[\x09\x0A\x0C\x0D ]*;(?:[\x09\x0A\x0C\x0D ]*[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?)?)*)*/;

/** Whether the input is Content-Security-Policy header value format or not. */
export function isCSPFormat(input: string): boolean {
  return ReCSP.test(input);
}
