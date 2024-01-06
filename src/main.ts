import { Uint8 } from "../deps.ts";
import { ByteOrder } from "./byte_order.ts";

export const BYTE_ORDER = (() => {
  return ((new Uint8Array(Uint16Array.of(0xFEFF).buffer))[0] === 0xFE)
    ? ByteOrder.BIG_ENDIAN
    : ByteOrder.LITTLE_ENDIAN;
})();

export function isBigEndian(): boolean {
  return (BYTE_ORDER === ByteOrder.BIG_ENDIAN);
}

export function isLittleEndian(): boolean {
  return (BYTE_ORDER === ByteOrder.LITTLE_ENDIAN);
}

/**
 * The type of the [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) constructor.
 */
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

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is a [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) constructor.
 */
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

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is a [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) constructor.
 */
export function isDataViewConstructor(
  value: unknown,
): value is DataViewConstructor {
  return value === DataView;
}

// export type ArrayBufferViewConstructor =
//   | TypedArrayConstructor
//   | DataViewConstructor;

/**
 * The type of the [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
 */
export type ArrayBufferViewConstructor<T extends ArrayBufferView> = {
  new (a: ArrayBuffer, b?: number, c?: number): T;
};

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is an [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
 */
export function isArrayBufferViewConstructor(
  value: unknown,
): value is TypedArrayConstructor | DataViewConstructor {
  return isTypedArrayConstructor(value) ? true : isDataViewConstructor(value);
}

/** @deprecated */
export function isArrayOfUint8(value: unknown): value is Array<Uint8> {
  return Array.isArray(value) && value.every((i) => Uint8.isUint8(i));
}
