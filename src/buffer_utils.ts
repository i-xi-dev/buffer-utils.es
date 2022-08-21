import {
  Uint8,
  type uint8,
} from "https://raw.githubusercontent.com/i-xi-dev/int.es/1.1.1/mod.ts";

namespace BufferUtils {
  export type TypedArrayConstructor =
    | Uint8ArrayConstructor
    | Uint8ClampedArrayConstructor
    | Int8ArrayConstructor
    | Uint16ArrayConstructor
    | Int16ArrayConstructor
    | Uint32ArrayConstructor
    | Int32ArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor
    | BigUint64ArrayConstructor
    | BigInt64ArrayConstructor;

  export function isTypedArrayConstructor(
    value: unknown,
  ): value is TypedArrayConstructor {
    return ((value === Uint8Array) || (value === Uint8ClampedArray) ||
      (value === Int8Array) || (value === Uint16Array) ||
      (value === Int16Array) || (value === Uint32Array) ||
      (value === Int32Array) || (value === Float32Array) ||
      (value === Float64Array) || (value === BigUint64Array) ||
      (value === BigInt64Array));
  }

  export function isDataViewConstructor(
    value: unknown,
  ): value is DataViewConstructor {
    return value === DataView;
  }

  export type ArrayBufferViewConstructor =
    | TypedArrayConstructor
    | DataViewConstructor;

  export function isArrayBufferViewConstructor(
    value: unknown,
  ): value is ArrayBufferViewConstructor {
    return isTypedArrayConstructor(value) ? true : isDataViewConstructor(value);
  }

  export function isArrayOfUint8(value: unknown): value is Array<uint8> {
    return Array.isArray(value) && value.every((i) => Uint8.isUint8(i));
  }
}

export { BufferUtils };
