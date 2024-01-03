export const ByteOrder = {
  BIG_ENDIAN: Symbol("BIG_ENDIAN"),
  LITTLE_ENDIAN: Symbol("LITTLE_ENDIAN"),
} as const;

export type ByteOrder = typeof ByteOrder[keyof typeof ByteOrder];
