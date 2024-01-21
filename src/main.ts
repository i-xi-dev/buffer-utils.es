import { Uint16, Uint32, Uint8 } from "../deps.ts";
import { ByteOrder } from "./byte_order.ts";
import { GrowableBuffer } from "./growable_buffer.ts";

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

export function fromUint8Iterable(
  source: Iterable<number /* Uint8 */>,
): ArrayBuffer {
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
  }).buffer;
}

export async function fromUint8AsyncIterable(
  source: AsyncIterable<number /* Uint8 */>,
): Promise<ArrayBuffer> {
  if (!source) {
    throw new TypeError("source");
  }
  if ((Symbol.asyncIterator in source) !== true) {
    throw new TypeError("source");
  }

  const gb = new GrowableBuffer();
  for await (const i of source) {
    if (Uint8.isUint8(i) !== true) {
      throw new RangeError("source[*]");
    }
    gb.put(i);
  }
  return gb.slice().buffer;
}

export function fromUint16Iterable(
  source: Iterable<Uint16>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
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

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
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
      gb.putRange(tmpView);
    }

    return gb.slice().buffer;
  } else {
    // 実行環境のバイトオーダー

    return Uint16Array.from(source, (i) => {
      if (Uint16.isUint16(i) !== true) {
        throw new RangeError("source[*]");
      }
      return i;
    }).buffer;
  }
}

export function fromUint32Iterable(
  source: Iterable<Uint32>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
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

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
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
      gb.putRange(tmpView);
    }

    return gb.slice().buffer;
  } else {
    // 実行環境のバイトオーダー

    return Uint32Array.from(source, (i) => {
      if (Uint32.isUint32(i) !== true) {
        throw new RangeError("source[*]");
      }
      return i;
    }).buffer;
  }
}

/** @deprecated */
export function isArrayOfUint8(value: unknown): value is Array<Uint8> {
  return Array.isArray(value) && value.every((i) => Uint8.isUint8(i));
}
