"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postAddTask, postEditTask } from "@/lib/api";
import { useState } from "react";
import { FileEdit } from "lucide-react";
import { taskDialogInfoTable } from "./dialogInfo";
import { Task } from "@/types/task";
import { useSWRConfig } from "swr";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  job: z.string().min(6).max(50),
  category: z.enum(["green", "red", "yellow"]),
});
type AddAndEditTaskProps = {
  taskType: "add" | "edit";
  task?: Task;
};
const AddAndEditTask = ({ taskType, task }: AddAndEditTaskProps) => {
  const { mutate } = useSWRConfig();

  const [isOpenTask, setIsOpenTask] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task ? task.name : "",
      job: task ? task.job : "",
      category: task ? task.category : "green",
    },
  });

  const dialogTitle = taskDialogInfoTable[taskType].title;
  const dialogDescription = taskDialogInfoTable[taskType].description;

  const closeTaskModal = () => {
    setIsOpenTask(false);
    if (taskType === "add") {
      form.reset();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("here");
    if (taskType === "add") {
      await postAddTask(values);
      mutate("/tasks");
    }
    if (taskType === "edit") {
      const targetTask = task as Task;
      const taskId = targetTask.id;
      await postEditTask(values, taskId);
    }

    closeTaskModal();
  };
  return (
    <>
      <Dialog
        open={isOpenTask}
        onOpenChange={() => {
          setIsOpenTask((pre) => {
            if (taskType === "add" && pre === true) {
              form.reset();
              return false;
            }
            if (taskType === "edit" && pre === true) {
              return false;
            }
            return true;
          });
          // setIsOpenTask();
        }}
      >
        <DialogTrigger asChild>
          {taskType === "add" ? (
            <Button className="flex gap-2" variant="default">
              <FaPlus /> Add new task
            </Button>
          ) : (
            <FileEdit className="cursor-pointer" />
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {taskType === "add" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Job</FormLabel>
                      <FormControl>
                        <Input placeholder="enter your job" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category for your job" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="red">red</SelectItem>
                          <SelectItem value="yellow">yellow</SelectItem>
                          <SelectItem value="green">green</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAndEditTask;
