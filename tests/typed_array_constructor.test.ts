import { assertStrictEquals } from "./deps.ts";
import { TypedArrayConstructor } from "../mod.ts";

Deno.test("TypedArrayConstructor.isTypedArrayConstructor(*)", () => {
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Uint8Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Int8Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Uint16Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Int16Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Uint32Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Int32Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Float32Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Float64Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(BigUint64Array),
    true,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(BigInt64Array),
    true,
  );

  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(DataView),
    false,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(Array),
    false,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(null),
    false,
  );
  assertStrictEquals(
    TypedArrayConstructor.isTypedArrayConstructor(new Uint8Array(0)),
    false,
  );
});
