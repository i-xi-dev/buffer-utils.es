import { assertStrictEquals } from "./deps.ts";
import { isTypedArrayConstructor } from "../mod.ts";

Deno.test("isTypedArrayConstructor(*)", () => {
  assertStrictEquals(
    isTypedArrayConstructor(Uint8Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Int8Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Uint16Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Int16Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Uint32Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Int32Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Float32Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Float64Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(BigUint64Array),
    true,
  );
  assertStrictEquals(
    isTypedArrayConstructor(BigInt64Array),
    true,
  );

  assertStrictEquals(
    isTypedArrayConstructor(DataView),
    false,
  );
  assertStrictEquals(
    isTypedArrayConstructor(Array),
    false,
  );
  assertStrictEquals(
    isTypedArrayConstructor(null),
    false,
  );
  assertStrictEquals(
    isTypedArrayConstructor(new Uint8Array(0)),
    false,
  );
});
