import { assertStrictEquals, assertThrows } from "../deps.ts";
import { BufferUtils, ByteOrder } from "../../mod.ts";

Deno.test("BufferUtils.toUint32Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      BufferUtils.toUint32Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toUint32Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toUint32Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toUint32Iterable(Uint8Array.of(1, 2).buffer);
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toUint32Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "bytes",
  );

  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(
        Uint8Array.of().buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[16777986]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[16777986,84150022]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(
        Uint8Array.of().buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2).buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[33751041]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[33751041,101123077]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...BufferUtils.toUint32Iterable(Uint8Array.of().buffer),
    ]),
    "[]",
  );
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[16777986]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[16777986,84150022]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2).buffer,
        ),
      ]),
      "[33751041]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...BufferUtils.toUint32Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6).buffer,
        ),
      ]),
      "[33751041,101123077]",
    );
  }
});
