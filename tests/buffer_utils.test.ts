import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint8 } from "../deps.ts";
import {
  arrayToUint8Array,
  isArrayBufferViewConstructor,
  isArrayOfUint8,
  isDataViewConstructor,
  isTypedArrayConstructor,
} from "../mod.ts";

Deno.test("isTypedArrayConstructor(*)", () => {
  assertStrictEquals(isTypedArrayConstructor(Uint8Array), true);
  assertStrictEquals(isTypedArrayConstructor(Uint8ClampedArray), true);
  assertStrictEquals(isTypedArrayConstructor(Int8Array), true);
  assertStrictEquals(isTypedArrayConstructor(Uint16Array), true);
  assertStrictEquals(isTypedArrayConstructor(Int16Array), true);
  assertStrictEquals(isTypedArrayConstructor(Uint32Array), true);
  assertStrictEquals(isTypedArrayConstructor(Int32Array), true);
  assertStrictEquals(isTypedArrayConstructor(Float32Array), true);
  assertStrictEquals(isTypedArrayConstructor(Float64Array), true);
  assertStrictEquals(isTypedArrayConstructor(BigUint64Array), true);
  assertStrictEquals(isTypedArrayConstructor(BigInt64Array), true);

  assertStrictEquals(isTypedArrayConstructor(DataView), false);
  assertStrictEquals(isTypedArrayConstructor(Array), false);
  assertStrictEquals(isTypedArrayConstructor(null), false);
  assertStrictEquals(
    isTypedArrayConstructor(new Uint8Array(0)),
    false,
  );
});

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

Deno.test("isArrayOfUint8(*)", () => {
  assertStrictEquals(isArrayOfUint8([]), true);
  assertStrictEquals(isArrayOfUint8([0]), true);
  assertStrictEquals(isArrayOfUint8([255]), true);
  assertStrictEquals(isArrayOfUint8([-0]), true);
  assertStrictEquals(isArrayOfUint8([-1]), false);
  assertStrictEquals(isArrayOfUint8([256]), false);
  assertStrictEquals(isArrayOfUint8(0), false);
  assertStrictEquals(isArrayOfUint8(256), false);
  assertStrictEquals(isArrayOfUint8([0, 255]), true);
  assertStrictEquals(isArrayOfUint8([0, 255, -1]), false);
  assertStrictEquals(isArrayOfUint8(["0"]), false);
});

Deno.test("arrayToUint8Array(*)", () => {
  assertThrows(
    () => {
      arrayToUint8Array(0 as unknown as Array<Uint8>);
    },
    TypeError,
    "source",
  );
  
  assertThrows(
    () => {
      arrayToUint8Array([-1] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      arrayToUint8Array(["0"] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      arrayToUint8Array([256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      arrayToUint8Array([0,256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(arrayToUint8Array([]).length, 0);
  const a1 = arrayToUint8Array([0,1,255]);
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});
