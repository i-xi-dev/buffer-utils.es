import { assertStrictEquals } from "std/testing/asserts";
import { BufferUtils } from "../mod.ts";

Deno.test("BufferUtils.isTypedArrayConstructor(*)", () => {
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Uint8Array), true);
  assertStrictEquals(
    BufferUtils.isTypedArrayConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Int8Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Uint16Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Int16Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Uint32Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Int32Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Float32Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Float64Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(BigUint64Array), true);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(BigInt64Array), true);

  assertStrictEquals(BufferUtils.isTypedArrayConstructor(DataView), false);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(Array), false);
  assertStrictEquals(BufferUtils.isTypedArrayConstructor(null), false);
  assertStrictEquals(
    BufferUtils.isTypedArrayConstructor(new Uint8Array(0)),
    false,
  );
});

Deno.test("BufferUtils.isDataViewConstructor(*)", () => {
  assertStrictEquals(BufferUtils.isDataViewConstructor(Uint8Array), false);
  assertStrictEquals(
    BufferUtils.isDataViewConstructor(Uint8ClampedArray),
    false,
  );
  assertStrictEquals(BufferUtils.isDataViewConstructor(Int8Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Uint16Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Int16Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Uint32Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Int32Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Float32Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Float64Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(BigUint64Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(BigInt64Array), false);

  assertStrictEquals(BufferUtils.isDataViewConstructor(DataView), true);
  assertStrictEquals(BufferUtils.isDataViewConstructor(Array), false);
  assertStrictEquals(BufferUtils.isDataViewConstructor(null), false);
  assertStrictEquals(
    BufferUtils.isDataViewConstructor(new Uint8Array(0)),
    false,
  );
});

Deno.test("BufferUtils.isArrayBufferViewConstructor(*)", () => {
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Uint8Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(BufferUtils.isArrayBufferViewConstructor(Int8Array), true);
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Uint16Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Int16Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Uint32Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Int32Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Float32Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(Float64Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(BigUint64Array),
    true,
  );
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(BigInt64Array),
    true,
  );

  assertStrictEquals(BufferUtils.isArrayBufferViewConstructor(DataView), true);
  assertStrictEquals(BufferUtils.isArrayBufferViewConstructor(Array), false);
  assertStrictEquals(BufferUtils.isArrayBufferViewConstructor(null), false);
  assertStrictEquals(
    BufferUtils.isArrayBufferViewConstructor(new Uint8Array(0)),
    false,
  );
});

Deno.test("BufferUtils.isArrayOfUint8(*)", () => {
  assertStrictEquals(BufferUtils.isArrayOfUint8([]), true);
  assertStrictEquals(BufferUtils.isArrayOfUint8([0]), true);
  assertStrictEquals(BufferUtils.isArrayOfUint8([255]), true);
  assertStrictEquals(BufferUtils.isArrayOfUint8([-0]), true);
  assertStrictEquals(BufferUtils.isArrayOfUint8([-1]), false);
  assertStrictEquals(BufferUtils.isArrayOfUint8([256]), false);
  assertStrictEquals(BufferUtils.isArrayOfUint8(0), false);
  assertStrictEquals(BufferUtils.isArrayOfUint8(256), false);
  assertStrictEquals(BufferUtils.isArrayOfUint8([0, 255]), true);
  assertStrictEquals(BufferUtils.isArrayOfUint8([0, 255, -1]), false);
  assertStrictEquals(BufferUtils.isArrayOfUint8(["0"]), false);
});
