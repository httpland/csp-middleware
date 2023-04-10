import {
  assert,
  assertEquals,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";
import {
  ensureArray,
  isDirectiveName,
  isDirectiveValue,
  stringifyDirectives,
} from "./utils.ts";

describe("ensureArray", () => {
  it("should return array wrapped", () => {
    const table: [unknown, unknown[]][] = [
      ["", [""]],
      [0, [0]],
      [{}, [{}]],
      [[], []],
      [[1, 2, 3], [1, 2, 3]],
      [[[[]]], [[[]]]],
      [new Set(), [new Set()]],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(ensureArray(input), expected);
    });
  });
});

describe("isDirectiveName", () => {
  it("should return true", () => {
    const table: string[] = [
      "a",
      "abcdefghijklmnopqrstuvwxyz0123456789-",
    ];

    table.forEach((input) => {
      assert(isDirectiveName(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      "",
      " ",
      "!",
    ];

    table.forEach((input) => {
      assert(!isDirectiveName(input));
    });
  });
});

describe("isDirectiveValue", () => {
  it("should return true", () => {
    const table: string[] = [
      "a",
      "",
      " ",
    ];

    table.forEach((input) => {
      assert(isDirectiveValue(input));
    });
  });

  it("should return false", () => {
    const table: string[] = [
      ";",
      ";;",
      ",",
      ",,",
      " ;;",
    ];

    table.forEach((input) => {
      assert(!isDirectiveValue(input));
    });
  });
});

describe("ensureArray", () => {
  it("should return array wrapped", () => {
    const table: [unknown, unknown[]][] = [
      ["", [""]],
      [0, [0]],
      [{}, [{}]],
      [[], []],
      [[1, 2, 3], [1, 2, 3]],
      [[[[]]], [[[]]]],
      [new Set(), [new Set()]],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(ensureArray(input), expected);
    });
  });
});

describe("stringifyDirectives", () => {
  it("should return serialized string", () => {
    const table: [...Parameters<typeof stringifyDirectives>, string][] = [
      [{ a: "b" }, "a b"],
      [{ a: ["a", "b", "c"] }, "a a b c"],
      [{ a: ["a", "b", "c"], "b": "b" }, "a a b c; b b"],
      [{ a: ["a", "b", "c"], "b": "b", "aB": "cd" }, "a a b c; b b; a-b cd"],
      [{ "a-b": "a", "aB": "b" }, "a-b b"],
      [
        {
          "default-src": "'none'",
          "script-src": ["'self'", "https"],
          "img-src": ["cdn.test.com", "https"],
          "x": "",
        },
        "default-src 'none'; script-src 'self' https; img-src cdn.test.com https; x ",
      ],
      [
        {
          "a": "",
          "b": [""],
          "c": " ",
          "d": [" "],
          "e": [" ", ""],
        },
        "a ; b ; c  ; d  ; e   ",
      ],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(stringifyDirectives(input), expected);
    });
  });

  it("should throw error", () => {
    const table: Parameters<typeof stringifyDirectives>[0][] = [
      {},
      { "": "" },
      { "a": ";" },
      { "a": "a ;b b" },
      { "a": "a ;b b" },
      { "a": "a," },
      { "a": ["a,"] },
      { "a": ["a,"] },
      { "a": ["a; a"] },
    ];

    table.forEach((input) => {
      assertThrows(() => stringifyDirectives(input));
    });
  });
});
