export type Includes<
  Arr extends unknown[],
  Keyword
> = Keyword extends Arr[number] ? true : false;

type TIsPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`

const isPillarMen: TIsPillarMen = false;
