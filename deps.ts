// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export {
  type Handler,
  type Middleware,
} from "https://deno.land/x/http_middleware@1.0.0/mod.ts";
export { isString } from "https://deno.land/x/isx@1.0.0-beta.24/mod.ts";
export { mapValues } from "https://deno.land/std@0.179.0/collections/map_values.ts";
export { mapKeys } from "https://deno.land/std@0.179.0/collections/map_keys.ts";
import { type Headered } from "https://deno.land/std@0.179.0/http/cookie_map.ts";
export { default as kebabCase } from "https://esm.sh/kebab-case@1.0.2?pin=v111";

export function withHeader<T extends Headered>(
  headered: T,
  field: string,
  fieldValue: string,
): T {
  if (!headered.headers.has(field)) {
    headered.headers.set(field, fieldValue);
  }

  return headered;
}

export type ValueOf<T> = T[keyof T];

export const enum CSPHeader {
  ContentSecurityPolicy = "content-security-policy",
  ContentSecurityPolicyReportOnly = "content-security-policy-report-only",
}
