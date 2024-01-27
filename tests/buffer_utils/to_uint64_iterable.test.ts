import { assertStrictEquals, assertThrows } from "../deps.ts";
import { BufferUtils, ByteOrder } from "../../mod.ts";

Deno.test("BufferUtils.toBigUint64Iterable(Uint8Array)", () => {
  assertThrows(
    () => {
      BufferUtils.toBigUint64Iterable(0 as unknown as ArrayBuffer);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toBigUint64Iterable(1 as unknown as ArrayBuffer);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toBigUint64Iterable(Uint8Array.of(1).buffer);
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toBigUint64Iterable(Uint8Array.of(1, 2).buffer);
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      BufferUtils.toBigUint64Iterable(Uint8Array.of(1, 2, 3).buffer);
    },
    RangeError,
    "bytes",
  );

  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(
        Uint8Array.of().buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ].join(","),
    "",
  );
  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ].join(","),
    "72060901162745856",
  );
  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ByteOrder.BIG_ENDIAN,
      ),
    ].join(","),
    "72060901246895878,72060901162745856",
  );

  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(
        Uint8Array.of().buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ].join(","),
    "",
  );
  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ].join(","),
    "33751041",
  );
  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ByteOrder.LITTLE_ENDIAN,
      ),
    ].join(","),
    "434320308619640833,33751041",
  );

  assertStrictEquals(
    [
      ...BufferUtils.toBigUint64Iterable(Uint8Array.of().buffer),
    ].join(","),
    "",
  );
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(
      [
        ...BufferUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "72060901162745856",
    );
    assertStrictEquals(
      [
        ...BufferUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "72060901246895878,72060901162745856",
    );
  } else {
    assertStrictEquals(
      [
        ...BufferUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "33751041",
    );
    assertStrictEquals(
      [
        ...BufferUtils.toBigUint64Iterable(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6, 1, 0, 3, 2, 0, 0, 0, 0).buffer,
        ),
      ].join(","),
      "434320308619640833,33751041",
    );
  }
});
