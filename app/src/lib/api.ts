import { Task } from "@/types/task";

const baseUrl = "http://localhost:3001";
import { v4 as uuidv4 } from "uuid";

export const getTodoList = async (): Promise<Task[]> => {
  try {
    const url = `${baseUrl}/tasks`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("getTodoList error", e);
    return [];
  }
};

type Error = {
  error: string;
};
export const postAddTask = async (
  task: Omit<Task, "id">
): Promise<Task | Error> => {
  try {
    const url = `${baseUrl}/tasks`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uuidv4(), ...task }),
    });
    const newTodo = await res.json();
    return newTodo;
  } catch (e) {
    console.log("post add task error", e);
    return {
      error: JSON.stringify(e),
    };
  }
};
