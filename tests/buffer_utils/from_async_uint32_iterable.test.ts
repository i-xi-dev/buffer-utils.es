import { assertRejects, assertStrictEquals } from "../deps.ts";
import { Uint32 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.fromAsyncUint32Iterable(Array<Uint32>)", () => {
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        0 as unknown as AsyncIterable<Uint32>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        1 as unknown as AsyncIterable<Uint32>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        [-1] as unknown as AsyncIterable<Uint32>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        ["0"] as unknown as AsyncIterable<Uint32>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        [256] as unknown as AsyncIterable<Uint32>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        [0, 256] as unknown as AsyncIterable<Uint32>,
      );
    },
    TypeError,
    "source",
  );
});

Deno.test("BufferUtils.fromAsyncUint32Iterable(AsyncGenerator<Uint32>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await BufferUtils.fromAsyncUint32Iterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 0xFFFFFFFF;
  })();

  const a1 = new Uint32Array(await BufferUtils.fromAsyncUint32Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 0xFFFFFFFF);
});

Deno.test("BufferUtils.fromAsyncUint32Iterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(
        g1 as unknown as AsyncGenerator<Uint32>,
      );
    },
    RangeError,
    "source[*]",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x100000000;
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(g2);
    },
    RangeError,
    "source[*]",
  );

  const g3 = (async function* () {
    yield 0;
    yield 1;
    yield -1;
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint32Iterable(g3);
    },
    RangeError,
    "source[*]",
  );
});
