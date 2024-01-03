import { TypedArrayConstructor } from "./typed_array_constructor.ts";

/**
 * @param value - The value to be tested
 * @returns Whether the passed value is a [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) constructor.
 */
function _isDataViewConstructor(
  value: unknown,
): value is DataViewConstructor {
  return value === DataView;
}

// export type ArrayBufferViewConstructor =
//   | TypedArrayConstructor
//   | DataViewConstructor;

/**
 * The type of the [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
 */
export type ArrayBufferViewConstructor<T extends ArrayBufferView> = {
  new (a: ArrayBuffer, b?: number, c?: number): T;
};

export namespace ArrayBufferViewConstructor {
  /**
   * @param value - The value to be tested
   * @returns Whether the passed value is an [`ArrayBufferView`](https://webidl.spec.whatwg.org/#ArrayBufferView) constructor.
   */
  export function isArrayBufferViewConstructor(
    value: unknown,
  ): value is TypedArrayConstructor | DataViewConstructor {
    return TypedArrayConstructor.isTypedArrayConstructor(value)
      ? true
      : _isDataViewConstructor(value);
  }
}
