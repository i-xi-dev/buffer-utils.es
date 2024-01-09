import { assertStrictEquals, assertThrows } from "../deps.ts";
import { ByteOrder, BufferUtils, Uint8ArrayUtils } from "../../mod.ts";

Deno.test("Uint8ArrayUtils.toUint16sArray(Uint8Array)", () => {
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint16sArray(0 as unknown as Uint8Array);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint16sArray(Uint8Array.of(1));
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint16sArray(Uint8Array.of(1, 2, 3));
    },
    RangeError,
    "bytes",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(Uint8Array.of(), ByteOrder.BIG_ENDIAN),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(
        Uint8Array.of(1, 0, 3, 2),
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[256,770]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[256,770,1284,1798]",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 5, 4, 7, 6, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 8);
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(b2b, ByteOrder.BIG_ENDIAN),
    ]),
    "[256,770,1284,1798]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(
        Uint8Array.of(),
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(
        Uint8Array.of(1, 0, 3, 2),
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[1,515]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[1,515,1029,1543]",
  );
  const b3 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 5, 4, 7, 6, 1, 1, 1, 1);
  const b3b = new Uint8Array(b3.buffer, 4, 8);
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(b3b, ByteOrder.LITTLE_ENDIAN),
    ]),
    "[1,515,1029,1543]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(Uint8Array.of()),
    ]),
    "[]",
  );
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint16sArray(
          Uint8Array.of(1, 0, 3, 2),
        ),
      ]),
      "[256,770]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint16sArray(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ),
      ]),
      "[256,770,1284,1798]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint16sArray(b2b),
      ]),
      "[256,770,1284,1798]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint16sArray(
          Uint8Array.of(1, 0, 3, 2),
        ),
      ]),
      "[1,515]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint16sArray(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ),
      ]),
      "[1,515,1029,1543]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint16sArray(b3b),
      ]),
      "[1,515,1029,1543]",
    );
  }
});
