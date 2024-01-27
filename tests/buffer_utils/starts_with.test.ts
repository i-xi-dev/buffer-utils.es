import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint8 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.bytesAStartsWithBytesB()", () => {
  assertThrows(
    () => {
      BufferUtils.bytesAStartsWithBytesB(
        undefined as unknown as Uint8Array,
        [],
      );
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      BufferUtils.bytesAStartsWithBytesB(
        [],
        undefined as unknown as Uint8Array,
      );
    },
    TypeError,
    "b",
  );
  assertThrows(
    () => {
      BufferUtils.bytesAStartsWithBytesB([-1 as Uint8], []);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      BufferUtils.bytesAStartsWithBytesB([], [256 as Uint8]);
    },
    TypeError,
    "b",
  );

  assertStrictEquals(BufferUtils.bytesAStartsWithBytesB([], []), true);
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([], new Uint8Array(0)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([], new Uint8ClampedArray(0)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([], new ArrayBuffer(0)),
    true,
  );

  assertStrictEquals(BufferUtils.bytesAStartsWithBytesB([255], []), true);
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8Array.of()),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8ClampedArray.of()),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8Array.of().buffer),
    true,
  );

  assertStrictEquals(BufferUtils.bytesAStartsWithBytesB([255], [255]), true);
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8Array.of(255)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8ClampedArray.of(255)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8Array.of(255).buffer),
    true,
  );

  assertStrictEquals(BufferUtils.bytesAStartsWithBytesB([255, 0], [255]), true);
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255, 0], Uint8Array.of(255)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255, 0], Uint8ClampedArray.of(255)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255, 0], Uint8Array.of(255).buffer),
    true,
  );

  assertStrictEquals(BufferUtils.bytesAStartsWithBytesB([255, 0], [0]), false);
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255, 0], Uint8Array.of(0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255, 0], Uint8ClampedArray.of(0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255, 0], Uint8Array.of(0).buffer),
    false,
  );

  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], [255, 0]),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8Array.of(255, 0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8ClampedArray.of(255, 0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAStartsWithBytesB([255], Uint8Array.of(255, 0).buffer),
    false,
  );
});
