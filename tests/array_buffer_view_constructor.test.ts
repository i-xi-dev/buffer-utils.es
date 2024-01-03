import { assertStrictEquals } from "./deps.ts";
import { ArrayBufferViewConstructor } from "../mod.ts";

// Deno.test("isDataViewConstructor(*)", () => {
//   assertStrictEquals(isDataViewConstructor(Uint8Array), false);
//   assertStrictEquals(isDataViewConstructor(Uint8ClampedArray), false);
//   assertStrictEquals(isDataViewConstructor(Int8Array), false);
//   assertStrictEquals(isDataViewConstructor(Uint16Array), false);
//   assertStrictEquals(isDataViewConstructor(Int16Array), false);
//   assertStrictEquals(isDataViewConstructor(Uint32Array), false);
//   assertStrictEquals(isDataViewConstructor(Int32Array), false);
//   assertStrictEquals(isDataViewConstructor(Float32Array), false);
//   assertStrictEquals(isDataViewConstructor(Float64Array), false);
//   assertStrictEquals(isDataViewConstructor(BigUint64Array), false);
//   assertStrictEquals(isDataViewConstructor(BigInt64Array), false);

//   assertStrictEquals(isDataViewConstructor(DataView), true);
//   assertStrictEquals(isDataViewConstructor(Array), false);
//   assertStrictEquals(isDataViewConstructor(null), false);
//   assertStrictEquals(isDataViewConstructor(new Uint8Array(0)), false);
// });

Deno.test("ArrayBufferViewConstructor.isArrayBufferViewConstructor(*)", () => {
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Uint8Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Uint8ClampedArray),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Int8Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Uint16Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Int16Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Uint32Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Int32Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Float32Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Float64Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(BigUint64Array),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(BigInt64Array),
    true,
  );

  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(DataView),
    true,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(Array),
    false,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(null),
    false,
  );
  assertStrictEquals(
    ArrayBufferViewConstructor.isArrayBufferViewConstructor(new Uint8Array(0)),
    false,
  );
});
