export type If<Condition, True, False> = Condition extends true ? True : False;

type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

const a: A = "a";
const b: B = "b";
const c: A = "b";
const d: B = "a";
