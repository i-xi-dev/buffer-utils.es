import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint16, Uint32, Uint8 } from "../deps.ts";
import {
  ByteOrder,
  isArrayOfUint8,
  isBigEndian,
  isLittleEndian,
  uint16sToBytes,
  uint32sToBytes,
  uint8sToBytes,
} from "../mod.ts";

Deno.test("isBigEndian, isLittleEndian", () => {
  console.log(isBigEndian());
  console.log(isLittleEndian());
  assertStrictEquals(typeof isBigEndian(), "boolean");
  assertStrictEquals(typeof isLittleEndian(), "boolean");
  assertStrictEquals(isBigEndian() === isLittleEndian(), false);
});

Deno.test("isArrayOfUint8(*)", () => {
  assertStrictEquals(isArrayOfUint8([]), true);
  assertStrictEquals(isArrayOfUint8([0]), true);
  assertStrictEquals(isArrayOfUint8([255]), true);
  assertStrictEquals(isArrayOfUint8([-0]), true);
  assertStrictEquals(isArrayOfUint8([-1]), false);
  assertStrictEquals(isArrayOfUint8([256]), false);
  assertStrictEquals(isArrayOfUint8(0), false);
  assertStrictEquals(isArrayOfUint8(256), false);
  assertStrictEquals(isArrayOfUint8([0, 255]), true);
  assertStrictEquals(isArrayOfUint8([0, 255, -1]), false);
  assertStrictEquals(isArrayOfUint8(["0"]), false);
});

Deno.test("uint8sToBytes(*)", () => {
  assertThrows(
    () => {
      uint8sToBytes(0 as unknown as Array<Uint8>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      uint8sToBytes([-1] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint8sToBytes(["0"] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint8sToBytes([256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint8sToBytes([0, 256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(uint8sToBytes([]).length, 0);

  const a1 = uint8sToBytes([0, 1, 255]);
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("uint16sToBytes(*)", () => {
  assertThrows(
    () => {
      uint16sToBytes(0 as unknown as Array<Uint16>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      uint16sToBytes([-1] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint16sToBytes(["0"] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint16sToBytes([65536] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint16sToBytes([0, 65536] as unknown as Array<Uint16>);
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(uint16sToBytes([]).length, 0);

  const a1be = uint16sToBytes([0, 1, 65535], ByteOrder.BIG_ENDIAN);
  assertStrictEquals(a1be.length, 6);
  assertStrictEquals(a1be[0], 0);
  assertStrictEquals(a1be[1], 0);
  assertStrictEquals(a1be[2], 0);
  assertStrictEquals(a1be[3], 1);
  assertStrictEquals(a1be[4], 255);
  assertStrictEquals(a1be[5], 255);

  const a1le = uint16sToBytes([0, 1, 65535], ByteOrder.LITTLE_ENDIAN);
  assertStrictEquals(a1le.length, 6);
  assertStrictEquals(a1le[0], 0);
  assertStrictEquals(a1le[1], 0);
  assertStrictEquals(a1le[2], 1);
  assertStrictEquals(a1le[3], 0);
  assertStrictEquals(a1le[4], 255);
  assertStrictEquals(a1le[5], 255);

  const a1x = uint16sToBytes([0, 1, 65535]);
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

Deno.test("uint32sToBytes(*)", () => {
  assertThrows(
    () => {
      uint32sToBytes(0 as unknown as Array<Uint32>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      uint32sToBytes([-1] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint32sToBytes(["0"] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint32sToBytes([0x100000000] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      uint32sToBytes([0, 0x100000000] as unknown as Array<Uint32>);
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(uint32sToBytes([]).length, 0);

  const a1be = uint32sToBytes([0, 1, 0xFFFFFFFF], ByteOrder.BIG_ENDIAN);
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

  const a1le = uint32sToBytes([0, 1, 0xFFFFFFFF], ByteOrder.LITTLE_ENDIAN);
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

  const a1x = uint32sToBytes([0, 1, 0xFFFFFFFF]);
  assertStrictEquals(a1x.length, 12);
  if (isBigEndian()) {
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
