import { withHeader } from "./utils.ts";
import { assert, describe, equalsResponse, it } from "./_dev_deps.ts";

describe("withHeader", () => {
  const field = "x-test";
  const fieldValue = "test";

  it("should return headers with header field", async () => {
    const target = new Response();

    const response = withHeader(target, field, fieldValue);

    assert(target !== response);
    assert(!target.headers.has(field));
    assert(
      await equalsResponse(
        response,
        new Response(null, { headers: { [field]: fieldValue } }),
        true,
      ),
    );
  });

  it("should return same target if the header exists", async () => {
    const value = "before header";
    const target = new Response(null, { headers: { [field]: value } });

    const response = withHeader(target, field, fieldValue);

    assert(target === response);
    assert(target.headers.has(field));
    assert(
      await equalsResponse(
        response,
        new Response(null, { headers: { [field]: value } }),
        true,
      ),
    );
  });
});
