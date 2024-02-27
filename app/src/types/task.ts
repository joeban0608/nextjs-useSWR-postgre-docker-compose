export type Category = "red" | "yellow" | "green"
export type Task = {
  id: string;
  name: string;
  job: string;
  category: Category;
  update_time: Date;
};

