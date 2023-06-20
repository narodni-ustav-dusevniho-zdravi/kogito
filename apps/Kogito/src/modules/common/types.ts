export type PartialNever<T extends {[P in keyof T]: unknown}> = Partial<
  Record<keyof T, never>
>;
