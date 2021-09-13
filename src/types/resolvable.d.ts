export type Resolvable<T> = Promise<T> & {
  resolve: (v: T) => void,
  reject: (v: T) => void,
};
