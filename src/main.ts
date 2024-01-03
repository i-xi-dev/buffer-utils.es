import { Uint16, Uint8 } from "../deps.ts";
import { ByteOrder } from "./byte_order.ts";

const _BYTE_ORDER = (() => {
  return ((new Uint8Array(Uint16Array.of(0xFEFF).buffer))[0] === 0xFE)
    ? ByteOrder.BIG_ENDIAN
    : ByteOrder.LITTLE_ENDIAN;
})();

export function isBigEndian(): boolean {
  return (_BYTE_ORDER === ByteOrder.BIG_ENDIAN);
}

export function isLittleEndian(): boolean {
  return (_BYTE_ORDER === ByteOrder.LITTLE_ENDIAN);
}

/** @deprecated */
export function isArrayOfUint8(value: unknown): value is Array<Uint8> {
  return Array.isArray(value) && value.every((i) => Uint8.isUint8(i));
}

export function uint8sToBytes(source: Iterable<Uint8>): Uint8Array {
  if (!source) {
    throw new TypeError("source");
  }
  if ((Symbol.iterator in source) !== true) {
    throw new TypeError("source");
  }

  return Uint8Array.from(source, (i) => {
    if (Uint8.isUint8(i)) {
      return i;
    }
    throw new RangeError("source[*]");
  });
}

// export function uint16sToBytes(source: Iterable<Uint16>): Uint8Array {
//   if (Array.isArray(source) !== true) {
//     throw new TypeError("source");
//   }

// }
