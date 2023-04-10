import {
  assert,
  assertEquals,
  assertIsError,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";
import {
  duplicate,
  ensureArray,
  isDirectiveName,
  isDirectiveValue,
  normalizeDirectives,
  stringifyDirectives,
} from "./utils.ts";
import { DEFAULT_DIRECTIVES } from "./constants.ts";

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

describe("duplicate", () => {
  it("should return empty array if the input is not duplicated", () => {
    const table: unknown[][] = [
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [{}, {}, {}],
    ];

    table.forEach((input) => {
      assertEquals(duplicate(input), []);
    });
  });

  it("should return array what include duplicated members", () => {
    const table: [unknown[], unknown[]][] = [
      [["", ""], [""]],
      [[1, 2, 3, 1, 2, 3], [1, 2, 3]],
      [[1, 3, 3, 1, 2, 3], [3, 1]],
      [[1, 2, 3, 2, 1], [2, 1]],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(duplicate(input), expected);
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
      " a",
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
      `abcdefghijklmnopqrstuvwxyz0123456789-!@#$%^&*()_+=-}{][|\\'":?/>.<`,
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
      "",
      " ",
      "a b",
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

describe("normalizeDirectives", () => {
  it("should return normalized record", () => {
    const table: [
      ...Parameters<typeof normalizeDirectives>,
      ReturnType<typeof normalizeDirectives>,
    ][] = [
      [{}, {}],
      [{ a: undefined }, {}],
      [{ a: "", b: "" }, { a: [""], b: [""] }],
      [{ a: [""], b: "" }, { a: [""], b: [""] }],
      [{ a: ["", "", "", "a"], b: "" }, { a: ["", "", "", "a"], b: [""] }],
      [{ "a-b": "0", "aB": "1" }, { "a-b": ["1"] }],
      [{ "a-b": "0", "aB": "1", "A-b": ["2"] }, {
        "a-b": ["1"],
        "-a-b": ["2"],
      }],
      [{ "a-b": "0", "aB": undefined }, { "a-b": ["0"] }],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(normalizeDirectives(input), expected);
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
          "x": "x",
        },
        "default-src 'none'; script-src 'self' https; img-src cdn.test.com https; x x",
      ],
      [
        {
          "a": [],
          "b": [],
          "c": [],
          "d": [],
          "e": [],
        },
        "a; b; c; d; e",
      ],
      [
        DEFAULT_DIRECTIVES,
        "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'",
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
      { "a": [""] },
      { "a": ";" },
      { "a": "a ;b b" },
      { "a": "a ;b b" },
      { "a": "a," },
      { "a": ["a,"] },
      { "a": ["a,"] },
      { "a": ["a; a"] },
      { "a": ["a", "a"] },
    ];

    table.forEach((input) => {
      assertThrows(() => stringifyDirectives(input));
    });
  });

  it("should be error message if the normalized directives are empty", () => {
    let err;

    try {
      stringifyDirectives({ a: undefined });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, "one or more directives are required.");
    }
  });

  it("should be error message if the key of normalized directive is invalid", () => {
    let err;

    try {
      stringifyDirectives({ "": "" });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, `invalid <directive-key> format. ""`);
    }
  });

  it("should be error message if the value of normalized directive is invalid", () => {
    let err;

    try {
      stringifyDirectives({ "a": "," });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(
        err,
        Error,
        `invalid <VCHAR> without ";" and "," format. ","`,
      );
    }
  });

  it("should be error message if the value of normalized directive is duplicated", () => {
    let err;

    try {
      stringifyDirectives({ "a": ["a", "b", "c", "b", "a"] });
    } catch (e) {
      err = e;
    } finally {
      assertIsError(
        err,
        Error,
        `duplicated directive value. "b", "a"`,
      );
    }
  });
});
