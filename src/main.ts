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

/*TODO
fromInt8Iterable
fromAsyncInt8Iterable
toInt8Iterable
fromInt16Iterable
fromAsyncInt16Iterable
toInt16Iterable
fromInt32Iterable
fromAsyncInt32Iterable
toInt32Iterable
fromBigInt64Iterable
fromAsyncBigInt64Iterable
toBigInt64Iterable
fromBigUint64Iterable
fromAsyncBigUint64Iterable
toBigUint64Iterable
fromFloat32Iterable
fromAsyncFloat32Iterable
toFloat32Iterable
fromFloat64Iterable
fromAsyncFloat64Iterable
toFloat64Iterable
*/

export function fromUint8Iterable(
  source: Iterable<number /* Uint8 */>,
): ArrayBuffer {
  if (!source) {
    throw new TypeError("source");
  }
  if (((typeof source === "object") && (Symbol.iterator in source)) !== true) {
    throw new TypeError("source");
  }

  return Uint8Array.from(source, (i) => {
    if (Uint8.isUint8(i)) {
      return i;
    }
    throw new RangeError("source[*]");
  }).buffer;
}

export async function fromAsyncUint8Iterable(
  source: AsyncIterable<number /* Uint8 */>,
): Promise<ArrayBuffer> {
  if (!source) {
    throw new TypeError("source");
  }
  if (
    ((typeof source === "object") && (Symbol.asyncIterator in source)) !== true
  ) {
    throw new TypeError("source");
  }

  //TODO Array.fromAsyncが広く実装されたらそちらに変更する
  const gb = new GrowableBuffer();
  for await (const i of source) {
    if (Uint8.isUint8(i) !== true) {
      throw new RangeError("source[*]");
    }
    gb.put(i);
  }
  return gb.slice().buffer;
}

export function toUint8Iterable /* as Array */(
  bytes: ArrayBuffer,
): Iterable<Uint8> {
  if ((bytes instanceof ArrayBuffer) !== true) {
    throw new TypeError("bytes");
  }

  return [...new Uint8Array(bytes)] as Array<Uint8>;
}

export function fromUint16Iterable(
  source: Iterable<Uint16>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
  if (!source) {
    throw new TypeError("source");
  }
  if (((typeof source === "object") && (Symbol.iterator in source)) !== true) {
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

export async function fromAsyncUint16Iterable(
  source: AsyncIterable<Uint16>,
  byteOrder?: ByteOrder,
): Promise<ArrayBuffer> {
  if (!source) {
    throw new TypeError("source");
  }
  if (
    ((typeof source === "object") && (Symbol.asyncIterator in source)) !== true
  ) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    const gb = new GrowableBuffer();
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
    const tmp = new ArrayBuffer(Uint16Array.BYTES_PER_ELEMENT);
    const tmpView = new DataView(tmp);

    for await (const i of source) {
      if (Uint16.isUint16(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView.setInt16(0, i, littleEndian);
      gb.putRange(tmpView);
    }

    return gb.slice().buffer;
  } else {
    // 実行環境のバイトオーダー

    //TODO Uint16Array.fromAsyncが広く実装されたらそちらに変更する
    const gb = new GrowableBuffer();
    const tmpView = new Uint16Array(1);

    for await (const i of source) {
      if (Uint16.isUint16(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView[0] = i;
      gb.putRange(tmpView);
    }
    return gb.slice().buffer;
  }
}

export function toUint16Iterable(
  bytes: ArrayBuffer,
  byteOrder?: ByteOrder,
): Array<Uint16> {
  if ((bytes instanceof ArrayBuffer) !== true) {
    throw new TypeError("bytes");
  }
  if ((bytes.byteLength % Uint16.BYTES) !== 0) {
    throw new RangeError("bytes");
    //XXX ゼロで埋める？
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    const result: Array<Uint16> = [];
    const reader = new DataView(bytes);
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;

    for (let i = 0; i < (bytes.byteLength / Uint16.BYTES); i++) {
      result.push(reader.getUint16(i * Uint16.BYTES, littleEndian));
    }

    return result;
  } else {
    // 実行環境のバイトオーダー

    return [...(new Uint16Array(bytes))];
  }
}

export function fromUint32Iterable(
  source: Iterable<Uint32>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
  if (!source) {
    throw new TypeError("source");
  }
  if (((typeof source === "object") && (Symbol.iterator in source)) !== true) {
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

export async function fromAsyncUint32Iterable(
  source: AsyncIterable<Uint32>,
  byteOrder?: ByteOrder,
): Promise<ArrayBuffer> {
  if (!source) {
    throw new TypeError("source");
  }
  if (
    ((typeof source === "object") && (Symbol.asyncIterator in source)) !== true
  ) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    const gb = new GrowableBuffer();
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
    const tmp = new ArrayBuffer(Uint32Array.BYTES_PER_ELEMENT);
    const tmpView = new DataView(tmp);

    for await (const i of source) {
      if (Uint32.isUint32(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView.setInt32(0, i, littleEndian);
      gb.putRange(tmpView);
    }

    return gb.slice().buffer;
  } else {
    // 実行環境のバイトオーダー

    //TODO Uint32Array.fromAsyncが広く実装されたらそちらに変更する
    const gb = new GrowableBuffer();
    const tmpView = new Uint32Array(1);

    for await (const i of source) {
      if (Uint32.isUint32(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView[0] = i;
      gb.putRange(tmpView);
    }
    return gb.slice().buffer;
  }
}

export function toUint32Iterable(
  bytes: ArrayBuffer,
  byteOrder?: ByteOrder,
): Array<Uint32> {
  if ((bytes instanceof ArrayBuffer) !== true) {
    throw new TypeError("bytes");
  }
  if ((bytes.byteLength % Uint32.BYTES) !== 0) {
    throw new RangeError("bytes");
    //XXX ゼロで埋める？
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    const result: Array<Uint32> = [];
    const reader = new DataView(bytes);
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;

    for (let i = 0; i < (bytes.byteLength / Uint32.BYTES); i++) {
      result.push(reader.getUint32(i * Uint32.BYTES, littleEndian));
    }

    return result;
  } else {
    // 実行環境のバイトオーダー

    return [...(new Uint32Array(bytes))];
  }
}

/** @deprecated */
export function isArrayOfUint8(value: unknown): value is Array<Uint8> {
  return Array.isArray(value) && value.every((i) => Uint8.isUint8(i));
}
