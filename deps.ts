// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export {
  type Handler,
  type Middleware,
} from "https://deno.land/x/http_middleware@1.0.0/mod.ts";
export { isString } from "https://deno.land/x/isx@1.1.1/is_string.ts";
export { mapValues } from "https://deno.land/std@0.181.0/collections/map_values.ts";
export { mapKeys } from "https://deno.land/std@0.181.0/collections/map_keys.ts";
export { default as kebabCase } from "https://esm.sh/kebab-case@1.0.2?pin=v111";

export type ValueOf<T> = T[keyof T];
