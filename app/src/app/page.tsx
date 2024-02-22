import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GiTatteredBanner } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";

export default function Home() {
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
        <TodoList />
      </div>
    </main>
  );
}
