import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

const AddTask = () => {
  return (
    <Button className="flex gap-2">
      <FaPlus /> Add new task
    </Button>
  );
};

export default AddTask;
