export type Task = {
  id: string;
  name: string;
  job: string;
  category: "red" | "yellow" | "green";
  update_time: Date;
};
