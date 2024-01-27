import { assertRejects, assertStrictEquals } from "../deps.ts";
import { Uint8 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.fromAsyncUint8Iterable(Array<Uint8>)", () => {
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        0 as unknown as AsyncIterable<Uint8>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        1 as unknown as AsyncIterable<Uint8>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        [-1] as unknown as AsyncIterable<Uint8>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        ["0"] as unknown as AsyncIterable<Uint8>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        [256] as unknown as AsyncIterable<Uint8>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        [0, 256] as unknown as AsyncIterable<Uint8>,
      );
    },
    TypeError,
    "source",
  );
});

Deno.test("BufferUtils.fromAsyncUint8Iterable(AsyncGenerator<Uint8>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await BufferUtils.fromAsyncUint8Iterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 255;
  })();

  const a1 = new Uint8Array(await BufferUtils.fromAsyncUint8Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 255);
});

Deno.test("BufferUtils.fromAsyncUint8Iterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(
        g1 as unknown as AsyncGenerator<Uint8>,
      );
    },
    RangeError,
    "source[*]",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 256;
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint8Iterable(g2);
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
      await BufferUtils.fromAsyncUint8Iterable(g3);
    },
    RangeError,
    "source[*]",
  );
});
