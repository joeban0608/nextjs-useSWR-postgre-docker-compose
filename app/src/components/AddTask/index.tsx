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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  job: z.string().min(6).max(50),
  category: z.string().min(2).max(50),
});
const AddTask = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      job: "",
      category: "green",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2" variant="default">
            <FaPlus /> Add new task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
            <DialogDescription>
              Create your task. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your job" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
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
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job" className="text-right">
                Job
              </Label>
              <Input id="job" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                className="col-span-3"
                defaultValue="green"
                required
              />
            </div>
          </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTask;
