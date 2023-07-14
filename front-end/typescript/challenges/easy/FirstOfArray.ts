type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];
type arr3 = [true, false, false];

type First<List extends List[number][]> = List[0];
type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
type head3 = First<arr3>;

const result1: head1 = "a";
export const result2: head2 = 3;
export const result3: head3 = true;
