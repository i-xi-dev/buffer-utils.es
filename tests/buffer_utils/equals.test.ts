import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint8 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.bytesAEqualsBytesB()", () => {
  assertThrows(
    () => {
      BufferUtils.bytesAEqualsBytesB(
        undefined as unknown as Uint8Array,
        [],
      );
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      BufferUtils.bytesAEqualsBytesB(
        [],
        undefined as unknown as Uint8Array,
      );
    },
    TypeError,
    "b",
  );
  assertThrows(
    () => {
      BufferUtils.bytesAEqualsBytesB([-1 as Uint8], []);
    },
    TypeError,
    "a",
  );
  assertThrows(
    () => {
      BufferUtils.bytesAEqualsBytesB([], [256 as Uint8]);
    },
    TypeError,
    "b",
  );

  assertStrictEquals(BufferUtils.bytesAEqualsBytesB([], []), true);
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([], new Uint8Array(0)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([], new Uint8ClampedArray(0)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([], new ArrayBuffer(0)),
    true,
  );

  assertStrictEquals(BufferUtils.bytesAEqualsBytesB([255], []), false);
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8Array.of()),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8ClampedArray.of()),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8Array.of().buffer),
    false,
  );

  assertStrictEquals(BufferUtils.bytesAEqualsBytesB([255], [255]), true);
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8Array.of(255)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8ClampedArray.of(255)),
    true,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8Array.of(255).buffer),
    true,
  );

  assertStrictEquals(BufferUtils.bytesAEqualsBytesB([255, 0], [255]), false);
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255, 0], Uint8Array.of(255)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255, 0], Uint8ClampedArray.of(255)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255, 0], Uint8Array.of(255).buffer),
    false,
  );

  assertStrictEquals(BufferUtils.bytesAEqualsBytesB([255, 0], [0]), false);
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255, 0], Uint8Array.of(0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255, 0], Uint8ClampedArray.of(0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255, 0], Uint8Array.of(0).buffer),
    false,
  );

  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], [255, 0]),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8Array.of(255, 0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8ClampedArray.of(255, 0)),
    false,
  );
  assertStrictEquals(
    BufferUtils.bytesAEqualsBytesB([255], Uint8Array.of(255, 0).buffer),
    false,
  );
});
