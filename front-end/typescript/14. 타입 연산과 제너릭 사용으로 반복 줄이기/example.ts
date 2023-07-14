class Ball {
  radius: number;
  weight: number;
}

interface BasketBall<Brand> extends Ball {
  brand: Brand;
  meta: Record<string, number>;
}

enum EBasketballBrand {
  sparding = "sparding",
  nike = "nike",
  adidas = "adidas",
  star = "star",
}

type BrandBasketballs = {
  [k in keyof EBasketballBrand]: Ball;
};

interface Name {
  first: string;
  last: string;
}

type DancingDuo<T extends Name> = [T, T];
const dancingDuo = <T extends Name>(x: DancingDuo<T>) => x;

const couple = dancingDuo([
  { first: "1", last: "2" },
  { first: "3", last: "4" },
]);

type A = (a: string | number) => string | number;

// Pick, Partial, Exclude, Omit
type TPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type TPartial<T> = {
  [key in keyof T]?: T[key];
};

type E1 = "1" | "2" | "3" | "4" | "5";
type E2 = "2" | "4";
type E3 = "3";

const e3: Partial<E1, E2 | E3> = "1";

type TExclude<T1, T2> = T1 extends T2 ? never : T1;
type TOmit<T, K> = TPick<T, TExclude<keyof T, K>>;

type TOmit2<T, K> = TPick<T, keyof T extends K ? never : keyof T>;

const testName1: TOmit<Name, "last"> = {
  first: "3",
  last: "1",
};

const testName2: TOmit2<Name, "last"> = {
  first: "3",
  last: "1",
};
