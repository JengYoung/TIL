type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

type MyPick<Type, Keys extends keyof Type> = {
  [Key in Keys]: Type[Key];
};

type TodoPreview = MyPick<Todo, "title" | "completed">;

export const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
