import { GiTatteredBanner } from "react-icons/gi";
import TodoList from "@/components/TodoList";
import { getTodoList } from "@/lib/api";
import AddTask from "@/components/AddTask";

export default async function Home() {
  const todoList = await getTodoList();

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-8 flex flex-col gap-4">
        {/* title */}
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-center text-lg font-black tracking-widest	">
            Todo List
          </h1>
          <GiTatteredBanner />
        </div>
        <AddTask />
        <TodoList todoList={todoList} />
      </div>
    </main>
  );
}
