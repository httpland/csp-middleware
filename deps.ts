// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

export {
  type Handler,
  type Middleware,
} from "https://deno.land/x/http_middleware@1.0.0/mod.ts";
export { isString } from "https://deno.land/x/isx@1.1.1/is_string.ts";
export { isUndefined } from "https://deno.land/x/isx@1.1.1/is_undefined.ts";
export { filterValues } from "https://deno.land/std@0.182.0/collections/filter_values.ts";
export { mapValues } from "https://deno.land/std@0.182.0/collections/map_values.ts";
export { mapKeys } from "https://deno.land/std@0.182.0/collections/map_keys.ts";
export { withHeader } from "https://deno.land/x/http_utils@1.0.0/message.ts";
export { default as kebabCase } from "https://esm.sh/kebab-case@1.0.2?pin=v114";

export type CamelCase<S extends string> = S extends `${infer L}${infer R}`
  ? `${L}${(R extends `-${infer X}` ? CamelCase<Capitalize<X>> : CamelCase<R>)}`
  : "";

export type CamelCasing<T> = {
  [k in keyof T as k extends string ? CamelCase<k> : k]: T[k];
};
