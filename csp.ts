// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import type { CSPDirectives, CSPValue } from "./types.ts";
import { isString, kebabCase, mapKeys, mapValues } from "./deps.ts";

/** Serializes {@link CSPDirectives} into string. */
export function stringify(directives: CSPDirectives): string {
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
export function stringifyValue(value: CSPValue): string {
  if (isString(value)) return value;

  return value?.join(" ") ?? "";
}
