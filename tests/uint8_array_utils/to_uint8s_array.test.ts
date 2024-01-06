import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint8ArrayUtils } from "../../mod.ts";

Deno.test("Uint8ArrayUtils.toUint8sArray(Uint8Array)", () => {
  assertThrows(
    () => {
      Uint8ArrayUtils.toUint8sArray(0 as unknown as Uint8Array);
    },
    TypeError,
    "bytes",
  );

  assertStrictEquals(
    JSON.stringify([...Uint8ArrayUtils.toUint8sArray(Uint8Array.of())]),
    "[]",
  );
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint8sArray(Uint8Array.of(1, 0, 3, 2)),
    ]),
    "[1,0,3,2]",
  );
  const b2 = Uint8Array.of(0, 0, 0, 0, 1, 0, 3, 2, 1, 1, 1, 1);
  const b2b = new Uint8Array(b2.buffer, 4, 4);
  assertStrictEquals(
    JSON.stringify([
      ...Uint8ArrayUtils.toUint8sArray(b2b),
    ]),
    "[1,0,3,2]",
  );
});
