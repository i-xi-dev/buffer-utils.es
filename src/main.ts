import { Uint16, Uint32, Uint8 } from "../deps.ts";
import { ByteOrder } from "./byte_order.ts";
import { GrowableBuffer } from "./growable_buffer.ts";

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

export function uint16sToBytes(
  source: Iterable<Uint16>,
  byteOrder?: ByteOrder,
): Uint8Array {
  if (!source) {
    throw new TypeError("source");
  }
  if ((Symbol.iterator in source) !== true) {
    throw new TypeError("source");
  }
  const sourceLength =
    (("length" in source) && (typeof source.length === "number"))
      ? source.length
      : undefined;

  let buffer: ArrayBuffer;
  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== _BYTE_ORDER)
  ) {
    const gb = new GrowableBuffer(sourceLength);
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
    const tmp = new ArrayBuffer(Uint16Array.BYTES_PER_ELEMENT);
    const tmpView = new DataView(tmp);

    for (const i of source) {
      if (Uint16.isUint16(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView.setInt16(0, i, littleEndian);
      gb.put(tmpView);
    }

    buffer = gb.slice().buffer;
  } else {
    // 実行環境のバイトオーダー

    buffer = Uint16Array.from(source, (i) => {
      if (Uint16.isUint16(i) !== true) {
        throw new RangeError("source[*]");
      }
      return i;
    }).buffer;
  }
  return new Uint8Array(buffer);
}

export function uint32sToBytes(
  source: Iterable<Uint32>,
  byteOrder?: ByteOrder,
): Uint8Array {
  if (!source) {
    throw new TypeError("source");
  }
  if ((Symbol.iterator in source) !== true) {
    throw new TypeError("source");
  }
  const sourceLength =
    (("length" in source) && (typeof source.length === "number"))
      ? source.length
      : undefined;

  let buffer: ArrayBuffer;
  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== _BYTE_ORDER)
  ) {
    const gb = new GrowableBuffer(sourceLength);
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
    const tmp = new ArrayBuffer(Uint32Array.BYTES_PER_ELEMENT);
    const tmpView = new DataView(tmp);

    for (const i of source) {
      if (Uint32.isUint32(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView.setInt32(0, i, littleEndian);
      gb.put(tmpView);
    }

    buffer = gb.slice().buffer;
  } else {
    // 実行環境のバイトオーダー

    buffer = Uint32Array.from(source, (i) => {
      if (Uint32.isUint32(i) !== true) {
        throw new RangeError("source[*]");
      }
      return i;
    }).buffer;
  }
  return new Uint8Array(buffer);
}
