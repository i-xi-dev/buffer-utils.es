import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint16 } from "../../deps.ts";
import { BufferUtils, ByteOrder } from "../../mod.ts";

Deno.test("BufferUtils.fromUint16Iterable(Array<Uint16>)", () => {
  assertThrows(
    () => {
      BufferUtils.fromUint16Iterable(0 as unknown as Array<Uint16>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      BufferUtils.fromUint16Iterable([-1] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint16Iterable(["0"] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint16Iterable([65536] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint16Iterable(
        [0, 65536] as unknown as Array<Uint16>,
      );
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(BufferUtils.fromUint16Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(BufferUtils.fromUint16Iterable(
    [0, 1, 65535],
    ByteOrder.BIG_ENDIAN,
  ));
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = new Uint8Array(BufferUtils.fromUint16Iterable(
    [0, 1, 65535],
    ByteOrder.LITTLE_ENDIAN,
  ));
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = new Uint8Array(BufferUtils.fromUint16Iterable([0, 1, 65535]));
  assertStrictEquals(a1x.length, 6);
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 1);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 1);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  }
});

Deno.test("BufferUtils.fromUint16Iterable(Uint16Array)", () => {
  assertStrictEquals(
    BufferUtils.fromUint16Iterable(Uint16Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(BufferUtils.fromUint16Iterable(
    Uint16Array.of(0, 1, 65535),
    ByteOrder.BIG_ENDIAN,
  ));
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = new Uint8Array(BufferUtils.fromUint16Iterable(
    Uint16Array.of(0, 1, 65535),
    ByteOrder.LITTLE_ENDIAN,
  ));
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = new Uint8Array(
    BufferUtils.fromUint16Iterable(Uint16Array.of(0, 1, 65535)),
  );
  assertStrictEquals(a1x.length, 6);
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 1);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 1);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  }
});

Deno.test("BufferUtils.fromUint16Iterable(Generator<Uint16>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(BufferUtils.fromUint16Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1be = new Uint8Array(
    BufferUtils.fromUint16Iterable(g1, ByteOrder.BIG_ENDIAN),
  );
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1le = new Uint8Array(
    BufferUtils.fromUint16Iterable(g2, ByteOrder.LITTLE_ENDIAN),
  );
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1x = new Uint8Array(BufferUtils.fromUint16Iterable(g3));
  assertStrictEquals(a1x.length, 6);
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 0);
    assertStrictEquals(a1x[3], 1);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  } else {
    assertStrictEquals(a1x[0], 0);
    assertStrictEquals(a1x[1], 0);
    assertStrictEquals(a1x[2], 1);
    assertStrictEquals(a1x[3], 0);
    assertStrictEquals(a1x[4], 255);
    assertStrictEquals(a1x[5], 255);
  }
});
