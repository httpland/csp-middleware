import { assert, describe, it } from "./_dev_deps.ts";
import { isCSPFormat } from "./utils.ts";

describe("isCSPFormat", () => {
  it("should return true", () => {
    const table: string[] = [
      "test",
    ];

    table.forEach((input) => {
      assert(isCSPFormat(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
    ];

    table.forEach((input) => {
      assert(!isCSPFormat(input));
    });
  });
});
