"use client";
import React, { useContext, useState } from "react";

import { QueryTodoListContext } from "@/providers/QueryTodoListProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
/* 
 "name": "joebantest",
      "job": "go to test",
      "category": "red",
      "update_time": "2024-02-27-17:47",
      "id": "e01edb8d-04b9-4b5a-b7c7-e0e506e9e30d"
*/
const formSchema = z.object({
  name: z.string().min(0).max(50),
  job: z.string().min(0).max(50),
  category: z.enum(["green", "red", "yellow", ""]),
});
const QueryTools = () => {
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const { setQueryCategory, setQueryName, setQueryJob } =
    useContext(QueryTodoListContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      job: "",
      category: "",
    },
  });
  // const { data } = useSWR(["/tasks"], () => getTodoList(queryParams));
  // console.log("data", data);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("click submit");
    const { name, job, category } = values;
    if (job) {
      setQueryJob(job);
    }
    if (category) {
      setQueryCategory(category);
    }
    if (name) {
      setQueryName(name);
    }
    setIsSubmitDisable(true);
    setTimeout(() => {
      setIsSubmitDisable(false);
    }, 5000);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start border border-solid border-gray-400 p-8 gap-4"
      >
        <h1>Query tools</h1>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex justify-center items-center gap-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="search by name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem className="flex justify-center items-center gap-4">
                <FormLabel>Job</FormLabel>
                <FormControl>
                  <Input placeholder="search by job" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <FormItem className="flex justify-center items-center gap-4">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a category for your job"
                          defaultValue=""
                        />
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
        </div>
        <Button disabled={isSubmitDisable} type="submit">
          Query Now
        </Button>
      </form>
    </Form>
  );
};

export default QueryTools;
