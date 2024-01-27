import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint8 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.fromUint8Iterable(Array<Uint8>)", () => {
  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable(0 as unknown as Array<Uint8>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable(1 as unknown as Array<Uint8>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable([-1] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable(["0"] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable([256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable([0, 256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint8Iterable([0, -1] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(BufferUtils.fromUint8Iterable([]).byteLength, 0);

  const a1 = new Uint8Array(BufferUtils.fromUint8Iterable([0, 1, 255]));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("BufferUtils.fromUint8Iterable(Uint8Array)", () => {
  assertStrictEquals(
    BufferUtils.fromUint8Iterable(new Uint8Array(0)).byteLength,
    0,
  );

  const a1 = new Uint8Array(
    BufferUtils.fromUint8Iterable(Uint8Array.from([0, 1, 255])),
  );
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("BufferUtils.fromUint8Iterable(Generator<Uint8>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(BufferUtils.fromUint8Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  const a1 = new Uint8Array(BufferUtils.fromUint8Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});
