import { assertStrictEquals, assertThrows } from "../deps.ts";
import { ByteOrder, BufferUtils, Uint8ArrayUtils } from "../../mod.ts";

Deno.test("Uint8ArrayUtils.toUint32sArray(Uint8Array)", () => {
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint32sArray(0 as unknown as Uint8Array);
    },
    TypeError,
    "bytes",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint32sArray(Uint8Array.of(1));
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint32sArray(Uint8Array.of(1, 2));
    },
    RangeError,
    "bytes",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint32sArray(Uint8Array.of(1, 2, 3));
    },
    RangeError,
    "bytes",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(Uint8Array.of(), ByteOrder.BIG_ENDIAN),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(
        Uint8Array.of(1, 0, 3, 2),
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[16777986]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ByteOrder.BIG_ENDIAN,
      ),
    ]),
    "[16777986,84150022]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(
        Uint8Array.of(),
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(
        Uint8Array.of(1, 0, 3, 2),
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[33751041]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(
        Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ByteOrder.LITTLE_ENDIAN,
      ),
    ]),
    "[33751041,101123077]",
  );

  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint32sArray(Uint8Array.of()),
    ]),
    "[]",
  );
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint32sArray(
          Uint8Array.of(1, 0, 3, 2),
        ),
      ]),
      "[16777986]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint32sArray(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ),
      ]),
      "[16777986,84150022]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint32sArray(
          Uint8Array.of(1, 0, 3, 2),
        ),
      ]),
      "[33751041]",
    );
    assertStrictEquals(
      JSON.stringify([
        ...Uint8ArrayUtils.toUint32sArray(
          Uint8Array.of(1, 0, 3, 2, 5, 4, 7, 6),
        ),
      ]),
      "[33751041,101123077]",
    );
  }
});
