// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Msg } from "./constants.ts";
export function assertCSPFormat(input: string): asserts input {
  if (!isCSPFormat(input)) {
    const message = `${Msg.InvalidSerializedPolicyList} "${input}"`;

    throw TypeError(message);
  }
}

const ReCSP =
  // deno-lint-ignore no-control-regex
  /[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?(?:[\x09\x0A\x0C\x0D ]*;(?:[\x09\x0A\x0C\x0D ]*[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?)?)*(?:[\x09\x0A\x0C\x0D ]*,[\x09\x0A\x0C\x0D ]*[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?(?:[\x09\x0A\x0C\x0D ]*;(?:[\x09\x0A\x0C\x0D ]*[\dA-Za-z-]+(?:[\x09\x0A\x0C\x0D ]+(?:[\x09\x0A\x0C\x0D ]+|([\x21-\x2B\x2D-\x3A\x3C-\x7E]))*)?)?)*)*/;

/** Whether the input is Content-Security-Policy header value format or not. */
export function isCSPFormat(input: string): boolean {
  return ReCSP.test(input);
}
