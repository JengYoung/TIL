type Todo = {
  title: string;
  description: string;
};

type MyReadonly<Type> = {
  readonly [Key in keyof Type]: Type[Key];
};

export const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
