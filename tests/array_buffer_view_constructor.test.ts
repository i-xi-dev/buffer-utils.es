import { assertStrictEquals } from "./deps.ts";
import { isArrayBufferViewConstructor, isDataViewConstructor } from "../mod.ts";

Deno.test("isDataViewConstructor(*)", () => {
  assertStrictEquals(isDataViewConstructor(Uint8Array), false);
  assertStrictEquals(isDataViewConstructor(Uint8ClampedArray), false);
  assertStrictEquals(isDataViewConstructor(Int8Array), false);
  assertStrictEquals(isDataViewConstructor(Uint16Array), false);
  assertStrictEquals(isDataViewConstructor(Int16Array), false);
  assertStrictEquals(isDataViewConstructor(Uint32Array), false);
  assertStrictEquals(isDataViewConstructor(Int32Array), false);
  assertStrictEquals(isDataViewConstructor(Float32Array), false);
  assertStrictEquals(isDataViewConstructor(Float64Array), false);
  assertStrictEquals(isDataViewConstructor(BigUint64Array), false);
  assertStrictEquals(isDataViewConstructor(BigInt64Array), false);

  assertStrictEquals(isDataViewConstructor(DataView), true);
  assertStrictEquals(isDataViewConstructor(Array), false);
  assertStrictEquals(isDataViewConstructor(null), false);
  assertStrictEquals(isDataViewConstructor(new Uint8Array(0)), false);
});

Deno.test("isArrayBufferViewConstructor(*)", () => {
  assertStrictEquals(isArrayBufferViewConstructor(Uint8Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Uint8ClampedArray), true);
  assertStrictEquals(isArrayBufferViewConstructor(Int8Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Uint16Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Int16Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Uint32Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Int32Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Float32Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(Float64Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(BigUint64Array), true);
  assertStrictEquals(isArrayBufferViewConstructor(BigInt64Array), true);

  assertStrictEquals(isArrayBufferViewConstructor(DataView), true);
  assertStrictEquals(isArrayBufferViewConstructor(Array), false);
  assertStrictEquals(isArrayBufferViewConstructor(null), false);
  assertStrictEquals(isArrayBufferViewConstructor(new Uint8Array(0)), false);
});
