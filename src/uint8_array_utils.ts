import { ByteOrder } from "./byte_order.ts";
import { BYTE_ORDER } from "./main.ts";
import { Uint16, Uint32, Uint8 } from "../deps.ts";

export namespace Uint8ArrayUtils {

  export function toUint8sArray(bytes: Uint8Array): Array<Uint8> {
    if ((bytes instanceof Uint8Array) !== true) {
      throw new TypeError("bytes");
    }

    return [...bytes] as Array<Uint8>;
  }

  //XXX toUint8sIterator

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
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / Uint16Array.BYTES_PER_ELEMENT,
        )),
      ];
    }
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
          bytes.buffer,
          bytes.byteOffset,
          bytes.byteLength / Uint32Array.BYTES_PER_ELEMENT,
        )),
      ];
    }
  }
}
