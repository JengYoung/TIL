export const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TupleToObject<Type extends readonly string[]> = {
  [Key in Type[number]]: Key;
};

type Result = TupleToObject<typeof tuple>; // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

const result: Result = {
  tesla: "tesla",
  "model 3": "model 3",
  "model X": "model X",
  "model Y": "model Y",
};
