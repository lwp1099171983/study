type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
  ? T
  : never;

type res = First<[1, 2, 3]>;

// const demo:res =

// 联合
type Union = 1 | 2 | 3;
// 交叉
type ObjType = { a: number } & { b: string };

// 映射类型
type MapType<T> = {
  [Key in keyof T]: [T[Key], T[Key], T[Key]];
};

type MapTypeRes = MapType<{ a: 1; b: 2 }>;

type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

type ReplaceStrRes = ReplaceStr<"lwp best friend is ?", "?", "yzq">;
