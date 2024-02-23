import { Task } from "@/types/task";

const baseUrl = "http://localhost:3001";

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
