import { assertRejects, assertStrictEquals } from "../deps.ts";
import { Uint16 } from "../../deps.ts";
import { BufferUtils } from "../../mod.ts";

Deno.test("BufferUtils.fromAsyncUint16Iterable(Array<Uint16>)", () => {
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        0 as unknown as AsyncIterable<Uint16>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        1 as unknown as AsyncIterable<Uint16>,
      );
    },
    TypeError,
    "source",
  );

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        [-1] as unknown as AsyncIterable<Uint16>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        ["0"] as unknown as AsyncIterable<Uint16>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        [256] as unknown as AsyncIterable<Uint16>,
      );
    },
    TypeError,
    "source",
  );
  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        [0, 256] as unknown as AsyncIterable<Uint16>,
      );
    },
    TypeError,
    "source",
  );
});

Deno.test("BufferUtils.fromAsyncUint16Iterable(AsyncGenerator<Uint16>)", async () => {
  const g0 = (async function* () {
  })();
  assertStrictEquals(
    (await BufferUtils.fromAsyncUint16Iterable(g0)).byteLength,
    0,
  );

  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield 0xFFFF;
  })();

  const a1 = new Uint16Array(await BufferUtils.fromAsyncUint16Iterable(g1));
  assertStrictEquals(a1.length, 3);
  assertStrictEquals(a1[0], 0);
  assertStrictEquals(a1[1], 1);
  assertStrictEquals(a1[2], 0xFFFF);
});

Deno.test("BufferUtils.fromAsyncUint16Iterable(AsyncGenerator<any>)", () => {
  const g1 = (async function* () {
    yield 0;
    yield 1;
    yield "a";
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(
        g1 as unknown as AsyncGenerator<Uint16>,
      );
    },
    RangeError,
    "source[*]",
  );

  const g2 = (async function* () {
    yield 0;
    yield 1;
    yield 0x10000;
  })();

  assertRejects(
    async () => {
      await BufferUtils.fromAsyncUint16Iterable(g2);
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
      await BufferUtils.fromAsyncUint16Iterable(g3);
    },
    RangeError,
    "source[*]",
  );
});
