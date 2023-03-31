// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export interface Cloneable {
  clone(): this;
}

/** An object which contains a `headers` property which has a value of an
 * instance of {@linkcode Headers}, like {@linkcode Request} and
 * {@linkcode Response}. */
export interface Headered {
  readonly headers: Headers;
}

export function withHeader<T extends Headered & Cloneable>(
  target: T,
  field: string,
  fieldValue: string,
): T {
  if (target.headers.has(field)) return target;

  target = target.clone();
  target.headers.set(field, fieldValue);

  return target;
}
