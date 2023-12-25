type Filter<Key, TargetKey> = Key extends TargetKey ? never : Key;

type MyOmit<Type, TargetKey extends keyof Type> = {
  [Key in Filter<keyof Type, TargetKey>]: Type[Key];
};
