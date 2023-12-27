type MyCapitalize<Char extends string> =
  Char extends `${infer Head}${infer Tail}`
    ? `${Uppercase<Head>}${Tail}`
    : Char;
