import { assertStrictEquals } from "./deps.ts";
import { isArrayOfUint8, isBigEndian, isLittleEndian } from "../mod.ts";

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
