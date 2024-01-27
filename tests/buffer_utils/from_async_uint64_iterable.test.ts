import { assertRejects, assertStrictEquals } from "../deps.ts";
import { Uint64 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.fromAsyncBigUint64Iterable(Array<Uint64>)", () => {
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        0 as unknown as AsyncIterable<Uint64>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        1 as unknown as AsyncIterable<Uint64>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        [-1] as unknown as AsyncIterable<Uint64>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        ["0"] as unknown as AsyncIterable<Uint64>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        [256] as unknown as AsyncIterable<Uint64>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        [0, 256] as unknown as AsyncIterable<Uint64>,
      );
    },
    TypeError,
    "source",
  );
});

Deno.test("BufferUtils.fromAsyncBigUint64Iterable(AsyncGenerator<Uint64>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await BufferUtils.fromAsyncBigUint64Iterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0n;
    yield 1n;
    yield 0xFFFF_FFFF_FFFF_FFFFn;
  })();

  const a1 = new BigUint64Array(await BufferUtils.fromAsyncBigUint64Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0n);
  assertStrictEquals(a1[1], 1n);
  assertStrictEquals(a1[2], 0xFFFF_FFFF_FFFF_FFFFn);
});

Deno.test("BufferUtils.fromAsyncBigUint64Iterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0n;
    yield 1n;
    yield "a";
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(
        g1 as unknown as AsyncGenerator<Uint64>,
      );
    },
    RangeError,
    "source[*]",
  );

  const g2 = (async function* () {
    yield 0n;
    yield 1n;
    yield 0x1_0000_0000_0000_0000n;
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncBigUint64Iterable(g2);
    },
    RangeError,
    "source[*]",
  );
});
