import { assertNotStrictEquals, assertStrictEquals } from "./deps.ts";
import { BufferUtils, GrowableBuffer } from "../mod.ts";

Deno.test("new GrowableBuffer()/capacity/position/put()", () => {
  const b = new GrowableBuffer(2);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.position, 0);

  b.put(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.position, 1);
  assertStrictEquals(b.slice().byteLength, 1);

  b.put(255);
  assertStrictEquals(b.capacity, 2);
  assertStrictEquals(b.position, 2);
  assertStrictEquals(b.slice().byteLength, 2);

  b.put(255);
  assertStrictEquals(b.capacity, (1048576 * 10) + 2);
  assertStrictEquals(b.position, 3);
  assertStrictEquals(b.slice().byteLength, 3);
});

Deno.test("new GrowableBuffer()/capacity/position/putRange()", () => {
  const b = new GrowableBuffer();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.position, 0);

  b.putRange(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.position, 12);

  b.putRange(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.position, 24);

  const b2 = b.slice();
  assertStrictEquals(
    JSON.stringify(Array.from(b2)),
    "[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12]",
  );
});

Deno.test("new GrowableBuffer()/capacity/position/putRange() - 2", () => {
  const b = new GrowableBuffer();

  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.position, 0);

  b.putRange(Uint16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.position, 24);

  b.putRange(Uint16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 1_048_576);
  assertStrictEquals(b.position, 48);

  const b2 = b.slice();
  if (BufferUtils.isBigEndian()) {
    assertStrictEquals(
      JSON.stringify(Array.from(b2)),
      "[0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12]",
    );
  } else {
    assertStrictEquals(
      JSON.stringify(Array.from(b2)),
      "[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0]",
    );
  }
});

Deno.test("new GrowableBuffer(number)/capacity/position/putRange()", () => {
  const b = new GrowableBuffer(10);

  assertStrictEquals(b.capacity, 10);
  assertStrictEquals(b.position, 0);

  b.putRange(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 10485760);
  assertStrictEquals(b.position, 12);

  b.putRange(Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  assertStrictEquals(b.capacity, 10485760);
  assertStrictEquals(b.position, 24);

  const copy1 = b.subarray();
  assertStrictEquals(copy1.buffer, b.subarray().buffer);
  assertStrictEquals(copy1.byteLength, 24);
  assertStrictEquals(copy1.buffer.byteLength, 10485760);
  assertStrictEquals(
    [...copy1].map((b) => b.toString(10)).join(","),
    "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12",
  );

  const copy2 = b.slice();
  assertNotStrictEquals(copy2.buffer, copy1.buffer);
  assertStrictEquals(copy2.byteLength, 24);
  assertStrictEquals(copy2.buffer.byteLength, 24);
  assertStrictEquals(
    [...copy2].map((b) => b.toString(10)).join(","),
    "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12",
  );
});
