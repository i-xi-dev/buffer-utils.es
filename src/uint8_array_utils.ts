import { ByteOrder } from "./byte_order.ts";
import { BYTE_ORDER } from "./main.ts";
import { GrowableBuffer } from "./growable_buffer.ts";
import { Uint16, Uint32, Uint8 } from "../deps.ts";

export namespace Uint8ArrayUtils {
  export function fromUint8s(
    source: Iterable<number /* Uint8 */>,
  ): Uint8Array {
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

  //XXX fromUint8sAsync

  export function toUint8sArray(bytes: Uint8Array): Array<Uint8> {
    if ((bytes instanceof Uint8Array) !== true) {
      throw new TypeError("bytes");
    }

    return [...bytes] as Array<Uint8>;
  }

  //XXX toUint8sIterator

  export function fromUint16s(
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

  //XXX fromUint16sAsync

  export function toUint16sArray(
    bytes: Uint8Array,
    byteOrder?: ByteOrder,
  ): Array<Uint16> {
    if ((bytes instanceof Uint8Array) !== true) {
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
      const reader = new DataView(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength,
      );
      const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;

      for (let i = 0; i < (bytes.byteLength / Uint16.BYTES); i++) {
        result.push(reader.getUint16(i * Uint16.BYTES, littleEndian));
      }

      return result;
    } else {
      // 実行環境のバイトオーダー

      return [
        ...(new Uint16Array(
          bytes.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
            .buffer,
        )),
      ];
    }
  }

  export function fromUint32s(
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

  //XXX fromUint32sAsync

  export function toUint32sArray(
    bytes: Uint8Array,
    byteOrder?: ByteOrder,
  ): Array<Uint32> {
    if ((bytes instanceof Uint8Array) !== true) {
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
      const reader = new DataView(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength,
      );
      const littleEndian = byteOrder === ByteOrder.LITTLE_ENDIAN;

      for (let i = 0; i < (bytes.byteLength / Uint32.BYTES); i++) {
        result.push(reader.getUint32(i * Uint32.BYTES, littleEndian));
      }

      return result;
    } else {
      // 実行環境のバイトオーダー

      return [
        ...(new Uint32Array(
          bytes.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
            .buffer,
        )),
      ];
    }
  }
}
