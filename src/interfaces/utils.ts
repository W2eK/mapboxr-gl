export type List<T> = T | T[];

export type Extract<T, U extends T> = T extends U ? T : never;

export type AnyFunction = (...args: any[]) => any;

// https://stackoverflow.com/questions/56863875/typescript-how-do-you-filter-a-types-properties-to-those-of-a-certain-type
export type KeysMatching<T extends object, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

// https://stackoverflow.com/questions/57103834/typescript-omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-s
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

// https://stackoverflow.com/questions/49401866/all-possible-keys-of-an-union-type
export type KeysOfUnion<T> = T extends T ? keyof T : never;

export type X<T extends object, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export type FilterKeyByValueType<T extends object, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
