import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Uint8 } from "../../deps.ts";
import { Uint8ArrayUtils } from "../../mod.ts";

Deno.test("Uint8ArrayUtils.fromUint8s(Array<Uint8>)", () => {
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint8s(0 as unknown as Array<Uint8>);
    },
    TypeError,
    "source",
  );

  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint8s([-1] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint8s(["0"] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint8s([256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );
  assertThrows(
    () => {
      Uint8ArrayUtils.fromUint8s([0, 256] as unknown as Array<Uint8>);
    },
    RangeError,
    "source[*]",
  );

  assertStrictEquals(Uint8ArrayUtils.fromUint8s([]).length, 0);

  const a1 = Uint8ArrayUtils.fromUint8s([0, 1, 255]);
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("Uint8ArrayUtils.fromUint8s(Uint8Array)", () => {
  assertStrictEquals(
    Uint8ArrayUtils.fromUint8s(new Uint8Array(0)).length,
    0,
  );

  const a1 = Uint8ArrayUtils.fromUint8s(Uint8Array.from([0, 1, 255]));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("Uint8ArrayUtils.fromUint8s(Generator<Uint8>)", () => {
  const g0 = (function* () {
  })();
  assertStrictEquals(Uint8ArrayUtils.fromUint8s(g0).length, 0);

  const g1 = (function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  const a1 = Uint8ArrayUtils.fromUint8s(g1);
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});
