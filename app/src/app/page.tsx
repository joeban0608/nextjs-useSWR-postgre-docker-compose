"use client";
import { GiTatteredBanner } from "react-icons/gi";
import TodoList from "@/components/TodoList";
// import { getTodoList } from "@/lib/api";
import AddAndEditTask from "@/components/AddAndEditTask";
import QueryTools from "@/components/QueryTools";
import QueryTodoListProvider from "@/providers/QueryTodoListProvider";

export default function Home() {
  // const todoList = await getTodoList();

  return (
    <QueryTodoListProvider>
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-8 flex flex-col gap-4">
          {/* title */}
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-center text-lg font-black tracking-widest	">
              Todo List
            </h1>
            <GiTatteredBanner />
          </div>
          <AddAndEditTask taskType="add" />
          <QueryTools />
          <TodoList
          //  todoList={todoList}
          />
        </div>
      </main>
    </QueryTodoListProvider>
  );
}
