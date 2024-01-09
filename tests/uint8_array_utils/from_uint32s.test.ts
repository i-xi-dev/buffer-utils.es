import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint32 } from "../../deps.ts";
import { ByteOrder, BufferUtils, Uint8ArrayUtils } from "../../mod.ts";

Deno.test("Uint8ArrayUtils.fromUint32s(Array<Uint32>)", () => {
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint32s(0 as unknown as Array<Uint32>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint32s([-1] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint32s(["0"] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint32s(
        [0x100000000] as unknown as Array<Uint32>,
      );
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint32s(
        [0, 0x100000000] as unknown as Array<Uint32>,
      );
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(Uint8ArrayUtils.fromUint32s([]).length, 0);

  const a1be = Uint8ArrayUtils.fromUint32s(
    [0, 1, 0xFFFFFFFF],
    ByteOrder.BIG_ENDIAN,
  );
  assertStrictEquals(a1be.length, 12);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 1);
  assertStrictEquals(a1be[8], 255);
  assertStrictEquals(a1be[9], 255);
  assertStrictEquals(a1be[10], 255);
  assertStrictEquals(a1be[11], 255);

  const a1le = Uint8ArrayUtils.fromUint32s(
    [0, 1, 0xFFFFFFFF],
    ByteOrder.LITTLE_ENDIAN,
  );
  assertStrictEquals(a1le.length, 12);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 1);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 255);
  assertStrictEquals(a1le[9], 255);
  assertStrictEquals(a1le[10], 255);
  assertStrictEquals(a1le[11], 255);

  const a1x = Uint8ArrayUtils.fromUint32s([0, 1, 0xFFFFFFFF]);
  assertStrictEquals(a1x.length, 12);
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(a1be[0], 0);
    assertStrictEquals(a1be[1], 0);
    assertStrictEquals(a1be[2], 0);
    assertStrictEquals(a1be[3], 0);
    assertStrictEquals(a1be[4], 0);
    assertStrictEquals(a1be[5], 0);
    assertStrictEquals(a1be[6], 0);
    assertStrictEquals(a1be[7], 1);
    assertStrictEquals(a1be[8], 255);
    assertStrictEquals(a1be[9], 255);
    assertStrictEquals(a1be[10], 255);
    assertStrictEquals(a1be[11], 255);
  } else {
    assertStrictEquals(a1le[0], 0);
    assertStrictEquals(a1le[1], 0);
    assertStrictEquals(a1le[2], 0);
    assertStrictEquals(a1le[3], 0);
    assertStrictEquals(a1le[4], 1);
    assertStrictEquals(a1le[5], 0);
    assertStrictEquals(a1le[6], 0);
    assertStrictEquals(a1le[7], 0);
    assertStrictEquals(a1le[8], 255);
    assertStrictEquals(a1le[9], 255);
    assertStrictEquals(a1le[10], 255);
    assertStrictEquals(a1le[11], 255);
  }
});

Deno.test("Uint8ArrayUtils.fromUint32s(Uint32Array)", () => {
  assertStrictEquals(
    Uint8ArrayUtils.fromUint32s(Uint32Array.of()).length,
    0,
  );

  const a1be = Uint8ArrayUtils.fromUint32s(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
    ByteOrder.BIG_ENDIAN,
  );
  assertStrictEquals(a1be.length, 12);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 1);
  assertStrictEquals(a1be[8], 255);
  assertStrictEquals(a1be[9], 255);
  assertStrictEquals(a1be[10], 255);
  assertStrictEquals(a1be[11], 255);

  const a1le = Uint8ArrayUtils.fromUint32s(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
    ByteOrder.LITTLE_ENDIAN,
  );
  assertStrictEquals(a1le.length, 12);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 1);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 255);
  assertStrictEquals(a1le[9], 255);
  assertStrictEquals(a1le[10], 255);
  assertStrictEquals(a1le[11], 255);

  const a1x = Uint8ArrayUtils.fromUint32s(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
  );
  assertStrictEquals(a1x.length, 12);
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(a1be[0], 0);
    assertStrictEquals(a1be[1], 0);
    assertStrictEquals(a1be[2], 0);
    assertStrictEquals(a1be[3], 0);
    assertStrictEquals(a1be[4], 0);
    assertStrictEquals(a1be[5], 0);
    assertStrictEquals(a1be[6], 0);
    assertStrictEquals(a1be[7], 1);
    assertStrictEquals(a1be[8], 255);
    assertStrictEquals(a1be[9], 255);
    assertStrictEquals(a1be[10], 255);
    assertStrictEquals(a1be[11], 255);
  } else {
    assertStrictEquals(a1le[0], 0);
    assertStrictEquals(a1le[1], 0);
    assertStrictEquals(a1le[2], 0);
    assertStrictEquals(a1le[3], 0);
    assertStrictEquals(a1le[4], 1);
    assertStrictEquals(a1le[5], 0);
    assertStrictEquals(a1le[6], 0);
    assertStrictEquals(a1le[7], 0);
    assertStrictEquals(a1le[8], 255);
    assertStrictEquals(a1le[9], 255);
    assertStrictEquals(a1le[10], 255);
    assertStrictEquals(a1le[11], 255);
  }
});

Deno.test("Uint8ArrayUtils.fromUint32s(Generator<Uint32>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(Uint8ArrayUtils.fromUint32s(g0).length, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1be = Uint8ArrayUtils.fromUint32s(g1, ByteOrder.BIG_ENDIAN);
  assertStrictEquals(a1be.length, 12);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 0);
  assertStrictEquals(a1be[4], 0);
  assertStrictEquals(a1be[5], 0);
  assertStrictEquals(a1be[6], 0);
  assertStrictEquals(a1be[7], 1);
  assertStrictEquals(a1be[8], 255);
  assertStrictEquals(a1be[9], 255);
  assertStrictEquals(a1be[10], 255);
  assertStrictEquals(a1be[11], 255);

  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1le = Uint8ArrayUtils.fromUint32s(g2, ByteOrder.LITTLE_ENDIAN);
  assertStrictEquals(a1le.length, 12);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 0);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 1);
  assertStrictEquals(a1le[5], 0);
  assertStrictEquals(a1le[6], 0);
  assertStrictEquals(a1le[7], 0);
  assertStrictEquals(a1le[8], 255);
  assertStrictEquals(a1le[9], 255);
  assertStrictEquals(a1le[10], 255);
  assertStrictEquals(a1le[11], 255);

  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1x = Uint8ArrayUtils.fromUint32s(g3);
  assertStrictEquals(a1x.length, 12);
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(a1be[0], 0);
    assertStrictEquals(a1be[1], 0);
    assertStrictEquals(a1be[2], 0);
    assertStrictEquals(a1be[3], 0);
    assertStrictEquals(a1be[4], 0);
    assertStrictEquals(a1be[5], 0);
    assertStrictEquals(a1be[6], 0);
    assertStrictEquals(a1be[7], 1);
    assertStrictEquals(a1be[8], 255);
    assertStrictEquals(a1be[9], 255);
    assertStrictEquals(a1be[10], 255);
    assertStrictEquals(a1be[11], 255);
  } else {
    assertStrictEquals(a1le[0], 0);
    assertStrictEquals(a1le[1], 0);
    assertStrictEquals(a1le[2], 0);
    assertStrictEquals(a1le[3], 0);
    assertStrictEquals(a1le[4], 1);
    assertStrictEquals(a1le[5], 0);
    assertStrictEquals(a1le[6], 0);
    assertStrictEquals(a1le[7], 0);
    assertStrictEquals(a1le[8], 255);
    assertStrictEquals(a1le[9], 255);
    assertStrictEquals(a1le[10], 255);
    assertStrictEquals(a1le[11], 255);
  }
});
