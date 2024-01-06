import { assertStrictEquals, assertThrows } from "../deps.ts";
import { ByteOrder, isBigEndian, Uint8ArrayUtils } from "../../mod.ts";

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

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint16sArray(Uint8Array.of()),
    ]),
    "[]",
  );
  if (isBigEndian()) {
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
  }
});
