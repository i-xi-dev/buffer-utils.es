import {
  ObjectEx,
  SafeInteger,
  Uint16,
  Uint32,
  Uint64,
  Uint8,
} from "../deps.ts";
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
  if (ObjectEx.isIterableObject(source) !== true) {
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
  if (ObjectEx.isAsyncIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  //TODO Array.fromAsyncが広く実装されたらそちらに変更する
  const gb = new GrowableBuffer();
  for await (const i of source) {
    if (Uint8.isUint8(i) !== true) {
      throw new RangeError("source[*]");
    }
    gb.put(i as Uint8);
  }
  return gb.slice().buffer;
}

export function toUint8Iterable /* as Array */(
  bytes: ArrayBuffer,
): Iterable<Uint8> {
  if ((bytes instanceof ArrayBuffer) !== true) {
    throw new TypeError("bytes");
  }

  return (new Uint8Array(bytes))[Symbol.iterator]() as Iterable<Uint8>;
}

type _Setter<T extends (number | bigint)> = (
  dataView: DataView,
  value: T,
  littleEndian: boolean,
) => void;

function _fromUintNIterable<T extends (number | bigint)>(
  source: Iterable<T>,
  uintNArrayCtor:
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | BigUint64ArrayConstructor,
  elementValidator: (i: unknown) => i is T,
  viewSetter: _Setter<T>,
  byteOrder: ByteOrder,
): ArrayBuffer {
  const sourceLength =
    (("length" in source) && (typeof source.length === "number"))
      ? source.length
      : undefined;

  const gb = new GrowableBuffer(sourceLength);
  const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
  const tmp = new ArrayBuffer(uintNArrayCtor.BYTES_PER_ELEMENT);
  const tmpView = new DataView(tmp);

  for (const i of source) {
    if (elementValidator(i) !== true) {
      throw new RangeError("source[*]");
    }
    viewSetter(tmpView, i, littleEndian);
    gb.putRange(tmpView);
  }
  return gb.slice().buffer;
}

async function _fromAsyncUintNIterable<T extends (number | bigint)>(
  source: AsyncIterable<T>,
  uintNArrayCtor:
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | BigUint64ArrayConstructor,
  elementValidator: (i: unknown) => i is T,
  viewSetter: _Setter<T>,
  byteOrder: ByteOrder,
): Promise<ArrayBuffer> {
  const gb = new GrowableBuffer();
  const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;
  const tmp = new ArrayBuffer(uintNArrayCtor.BYTES_PER_ELEMENT);
  const tmpView = new DataView(tmp);

  for await (const i of source) {
    if (elementValidator(i) !== true) {
      throw new RangeError("source[*]");
    }
    viewSetter(tmpView, i, littleEndian);
    gb.putRange(tmpView);
  }
  return gb.slice().buffer;
}

type _Getter<T extends (number | bigint)> = (
  dataView: DataView,
  pos: SafeInteger,
  littleEndian: boolean,
) => T;

function _toUintNIterable<T extends (number | bigint)>(
  bytes: ArrayBuffer,
  uintNArrayCtor:
    | Uint16ArrayConstructor
    | Uint32ArrayConstructor
    | BigUint64ArrayConstructor,
  viewGetter: _Getter<T>,
  byteOrder?: ByteOrder,
): Iterable<T> {
  const bytesPerElement = uintNArrayCtor.BYTES_PER_ELEMENT;
  if ((bytes instanceof ArrayBuffer) !== true) {
    throw new TypeError("bytes");
  }
  if ((bytes.byteLength % bytesPerElement) !== 0) {
    throw new RangeError("bytes");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    const clone = bytes.slice(0);
    const reader = new DataView(clone);
    const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;

    return (function* () {
      for (let i = 0; i < (clone.byteLength / bytesPerElement); i++) {
        yield viewGetter(reader, i * bytesPerElement, littleEndian);
      }
    })() as Iterable<T>;
  } else {
    // 実行環境のバイトオーダー

    return (new uintNArrayCtor(bytes))[Symbol.iterator]() as Iterable<T>;
  }
}

export function fromUint16Iterable(
  source: Iterable<Uint16>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
  if (ObjectEx.isIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    return _fromUintNIterable<Uint16>(
      source,
      Uint16Array,
      Uint16.isUint16 as (i: unknown) => i is Uint16,
      (v, i, e) => {
        v.setUint16(0, i, e);
      },
      byteOrder!,
    );
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
  if (ObjectEx.isAsyncIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    return _fromAsyncUintNIterable<Uint16>(
      source,
      Uint16Array,
      Uint16.isUint16 as (i: unknown) => i is Uint16,
      (v, i, e) => {
        v.setUint16(0, i, e);
      },
      byteOrder!,
    );
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
): Iterable<Uint16> {
  return _toUintNIterable<Uint16>(bytes, Uint16Array, (v, o, e) => {
    return v.getUint16(o, e);
  }, byteOrder);
}

export function fromUint32Iterable(
  source: Iterable<Uint32>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
  if (ObjectEx.isIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    return _fromUintNIterable<Uint32>(
      source,
      Uint32Array,
      Uint32.isUint32 as (i: unknown) => i is Uint32,
      (v, i, e) => {
        v.setUint32(0, i, e);
      },
      byteOrder!,
    );
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
  if (ObjectEx.isAsyncIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    return _fromAsyncUintNIterable<Uint32>(
      source,
      Uint32Array,
      Uint32.isUint32 as (i: unknown) => i is Uint32,
      (v, i, e) => {
        v.setUint32(0, i, e);
      },
      byteOrder!,
    );
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
): Iterable<Uint32> {
  return _toUintNIterable<Uint32>(bytes, Uint32Array, (v, o, e) => {
    return v.getUint32(o, e);
  }, byteOrder);
}

export function fromBigUint64Iterable(
  source: Iterable<bigint>,
  byteOrder?: ByteOrder,
): ArrayBuffer {
  if (ObjectEx.isIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    return _fromUintNIterable<Uint64>(
      source,
      BigUint64Array,
      Uint64.isUint64 as (i: unknown) => i is Uint64,
      (v, i, e) => {
        v.setBigUint64(0, i, e);
      },
      byteOrder!,
    );
  } else {
    // 実行環境のバイトオーダー

    //XXX ArrayLikeでないとビルドできない、仕様はIterableでは？？
    return BigUint64Array.from(source as unknown as ArrayLike<bigint>, (i) => {
      if (Uint64.isUint64(i) !== true) {
        throw new RangeError("source[*]");
      }
      return i;
    }).buffer;
  }
}

export async function fromAsyncBigUint64Iterable(
  source: AsyncIterable<Uint64>,
  byteOrder?: ByteOrder,
): Promise<ArrayBuffer> {
  if (ObjectEx.isAsyncIterableObject(source) !== true) {
    throw new TypeError("source");
  }

  if (
    Object.values(ByteOrder).includes(byteOrder as ByteOrder) &&
    (byteOrder !== BYTE_ORDER)
  ) {
    return _fromAsyncUintNIterable<Uint64>(
      source,
      BigUint64Array,
      Uint64.isUint64 as (i: unknown) => i is Uint64,
      (v, i, e) => {
        v.setBigUint64(0, i, e);
      },
      byteOrder!,
    );
  } else {
    // 実行環境のバイトオーダー

    //TODO BigUint64Array.fromAsyncが広く実装されたらそちらに変更する
    const gb = new GrowableBuffer();
    const tmpView = new BigUint64Array(1);

    for await (const i of source) {
      if (Uint64.isUint64(i) !== true) {
        throw new RangeError("source[*]");
      }
      tmpView[0] = i;
      gb.putRange(tmpView);
    }
    return gb.slice().buffer;
  }
}

export function toBigUint64Iterable(
  bytes: ArrayBuffer,
  byteOrder?: ByteOrder,
): Iterable<Uint64> {
  return _toUintNIterable<Uint64>(bytes, BigUint64Array, (v, o, e) => {
    return v.getBigUint64(o, e);
  }, byteOrder);
}

type _Uint8s = Uint8Array | Array<Uint8> | ArrayBuffer;

export function bytesStartsWith(a: _Uint8s, b: _Uint8s): boolean {
  let aArray: Uint8Array | Array<Uint8>;
  if (a instanceof ArrayBuffer) {
    aArray = new Uint8Array(a);
  } else if (a instanceof Uint8Array) {
    aArray = a;
  } else if (Array.isArray(a) && a.every((ai) => Uint8.isUint8(ai))) {
    aArray = a;
  } else {
    throw new TypeError("a");
  }

  let bArray: Uint8Array | Array<Uint8>;
  if (b instanceof ArrayBuffer) {
    bArray = new Uint8Array(b);
  } else if (b instanceof Uint8Array) {
    bArray = b;
  } else if (Array.isArray(b) && b.every((bi) => Uint8.isUint8(bi))) {
    bArray = b;
  } else {
    throw new TypeError("b");
  }

  for (let i = 0; i < bArray.length; i++) {
    if (aArray[i] !== bArray[i]) {
      return false;
    }
  }
  return true;
}

//TODO startsWith

/** @deprecated */
export function isArrayOfUint8(value: unknown): value is Array<Uint8> {
  return Array.isArray(value) && value.every((i) => Uint8.isUint8(i));
}
