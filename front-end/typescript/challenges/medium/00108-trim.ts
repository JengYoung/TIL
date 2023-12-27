type Blank = "\n" | " " | "\t";

export type TrimLeft<Char extends string> = Char extends `${Blank}${infer C}`
  ? TrimLeft<C>
  : Char;

export type TrimRight<Char extends string> = Char extends `${infer C}${Blank}`
  ? TrimRight<C>
  : Char;

export type Trim<Char extends string> = TrimLeft<TrimRight<Char>>;
