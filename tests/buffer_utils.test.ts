import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Uint8 } from "../deps.ts";
import {
  isArrayOfUint8,
  isBigEndian,
  isLittleEndian,
  uint8sToBytes,
} from "../mod.ts";

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

Deno.test("isBigEndian, isLittleEndian", () => {
  console.log(isBigEndian());
  console.log(isLittleEndian());
  assertStrictEquals(typeof isBigEndian(), "boolean");
  assertStrictEquals(typeof isLittleEndian(), "boolean");
  assertStrictEquals(isBigEndian() === isLittleEndian(), false);
});
