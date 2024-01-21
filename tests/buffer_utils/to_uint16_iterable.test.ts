import { assertStrictEquals, assertThrows } from "../deps.ts";
import { BufferUtils, ByteOrder } from "../../mod.ts";

Deno.test("BufferUtils.toUint16Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      BufferUtils.toUint16Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toUint16Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toUint16Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "bytes",
  );

  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(
        Uint8Array.of().buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[256,770]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[256,770,1284,1798]",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 5, 4, 7, 6, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 8);
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(b2b.buffer, ByteOrder.BIG_ENDIAN),
    ]),
    "[0,0,256,770,1284,1798,257,257]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(
        Uint8Array.of().buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[1,515]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[1,515,1029,1543]",
  );
  const b3 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 5, 4, 7, 6, 1, 1, 1, 1);
  const b3b = new Uint8Array(b3.buffer, 4, 8);
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(b3b.buffer, ByteOrder.LITTLE_ENDIAN),
    ]),
    "[0,0,1,515,1029,1543,257,257]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint16Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[256,770]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[256,770,1284,1798]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint16Iterable(b2b.buffer),
      ]),
      "[0,0,256,770,1284,1798,257,257]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[1,515]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint16Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[1,515,1029,1543]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint16Iterable(b3b.buffer),
      ]),
      "[0,0,1,515,1029,1543,257,257]",
    );
  }
});
