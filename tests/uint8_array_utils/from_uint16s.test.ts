import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint16 } from "../../deps.ts";
import { ByteOrder, isBigEndian, Uint8ArrayUtils } from "../../mod.ts";

Deno.test("Uint8ArrayUtils.fromUint16s(Array<Uint16>)", () => {
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint16s(0 as unknown as Array<Uint16>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint16s([-1] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint16s(["0"] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint16s([65536] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint16s(
        [0, 65536] as unknown as Array<Uint16>,
      );
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(Uint8ArrayUtils.fromUint16s([]).length, 0);

  const a1be = Uint8ArrayUtils.fromUint16s(
    [0, 1, 65535],
    ByteOrder.BIG_ENDIAN,
  );
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = Uint8ArrayUtils.fromUint16s(
    [0, 1, 65535],
    ByteOrder.LITTLE_ENDIAN,
  );
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = Uint8ArrayUtils.fromUint16s([0, 1, 65535]);
  assertStrictEquals(a1x.length, 6);
  if (isBigEndian()) {
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

Deno.test("Uint8ArrayUtils.fromUint16s(Uint16Array)", () => {
  assertStrictEquals(
    Uint8ArrayUtils.fromUint16s(Uint16Array.of()).length,
    0,
  );

  const a1be = Uint8ArrayUtils.fromUint16s(
    Uint16Array.of(0, 1, 65535),
    ByteOrder.BIG_ENDIAN,
  );
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = Uint8ArrayUtils.fromUint16s(
    Uint16Array.of(0, 1, 65535),
    ByteOrder.LITTLE_ENDIAN,
  );
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = Uint8ArrayUtils.fromUint16s(Uint16Array.of(0, 1, 65535));
  assertStrictEquals(a1x.length, 6);
  if (isBigEndian()) {
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

Deno.test("Uint8ArrayUtils.fromUint16s(Generator<Uint16>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(Uint8ArrayUtils.fromUint16s(g0).length, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 65535;
  })();

  const a1be = Uint8ArrayUtils.fromUint16s(g1, ByteOrder.BIG_ENDIAN);
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

  const a1le = Uint8ArrayUtils.fromUint16s(g2, ByteOrder.LITTLE_ENDIAN);
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

  const a1x = Uint8ArrayUtils.fromUint16s(g3);
  assertStrictEquals(a1x.length, 6);
  if (isBigEndian()) {
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
