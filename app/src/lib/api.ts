import { Task } from "@/types/task";
import { formattedCurrentTimeISO } from "@/utils/timeFormat";

const baseUrl = "http://localhost:3001";
import { v4 as uuidv4 } from "uuid";

export const getTodoList = async (): Promise<Task[]> => {
  try {
    const url = `${baseUrl}/tasks`;
    const res = await fetch(url, { cache: "no-cache" });
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
  task: Omit<Task, "id" | "update_time">
): Promise<Task | Error> => {
  try {
    const url = `${baseUrl}/tasks`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        ...task,
        update_time: formattedCurrentTimeISO,
      }),
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
