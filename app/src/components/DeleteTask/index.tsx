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
import { postDeleteTask } from "@/lib/api";
import { Task } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  deleteText: z.string(),
});

const DeleteTask = ({ task }: { task: Task }) => {
  const [inputDeleteText, setInputDeleteText] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const closeDialog = () => {
    setIsOpenDialog(false);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const deleteTask = async () => {
    await postDeleteTask(task.id);
    closeDialog();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    deleteTask();
  };
  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={() => {
        setIsOpenDialog((pre) => {
          if (pre === true) {
            return false;
          }
          return true;
        });
      }}
    >
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer" color="red" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>
          <DialogDescription>Make should to delete task.</DialogDescription>
          <DialogDescription>
            please input <strong className="text-red-500">{`"DELETE"`}</strong>{" "}
            to continue delete task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="deleteText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="deleteText"
                      className="col-span-3"
                      defaultValue={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e.target.value);
                        setInputDeleteText(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="destructive"
                type="submit"
                disabled={inputDeleteText !== "DELETE"}
              >
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTask;
