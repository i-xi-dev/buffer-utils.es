import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint32 } from "../../deps.ts";
import { BufferUtils, ByteOrder } from "../../mod.ts";

Deno.test("BufferUtils.fromUint32Iterable(Array<Uint32>)", () => {
  assertThrows(
    () => {
      BufferUtils.fromUint32Iterable(0 as unknown as Array<Uint32>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      BufferUtils.fromUint32Iterable(1 as unknown as Array<Uint32>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      BufferUtils.fromUint32Iterable([-1] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint32Iterable(["0"] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint32Iterable(
        [0x100000000] as unknown as Array<Uint32>,
      );
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      BufferUtils.fromUint32Iterable(
        [0, 0x100000000] as unknown as Array<Uint32>,
      );
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(BufferUtils.fromUint32Iterable([]).byteLength, 0);

  const a1be = new Uint8Array(BufferUtils.fromUint32Iterable(
    [0, 1, 0xFFFFFFFF],
    ByteOrder.BIG_ENDIAN,
  ));
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

  const a1le = new Uint8Array(BufferUtils.fromUint32Iterable(
    [0, 1, 0xFFFFFFFF],
    ByteOrder.LITTLE_ENDIAN,
  ));
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

  const a1x = new Uint8Array(
    BufferUtils.fromUint32Iterable([0, 1, 0xFFFFFFFF]),
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

Deno.test("BufferUtils.fromUint32Iterable(Uint32Array)", () => {
  assertStrictEquals(
    BufferUtils.fromUint32Iterable(Uint32Array.of()).byteLength,
    0,
  );

  const a1be = new Uint8Array(BufferUtils.fromUint32Iterable(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
    ByteOrder.BIG_ENDIAN,
  ));
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

  const a1le = new Uint8Array(BufferUtils.fromUint32Iterable(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
    ByteOrder.LITTLE_ENDIAN,
  ));
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

  const a1x = new Uint8Array(BufferUtils.fromUint32Iterable(
    Uint32Array.of(0, 1, 0xFFFFFFFF),
  ));
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

Deno.test("BufferUtils.fromUint32Iterable(Generator<Uint32>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(BufferUtils.fromUint32Iterable(g0).byteLength, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1be = new Uint8Array(
    BufferUtils.fromUint32Iterable(g1, ByteOrder.BIG_ENDIAN),
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

  const g2 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1le = new Uint8Array(
    BufferUtils.fromUint32Iterable(g2, ByteOrder.LITTLE_ENDIAN),
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

  const g3 = (function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1x = new Uint8Array(BufferUtils.fromUint32Iterable(g3));
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
