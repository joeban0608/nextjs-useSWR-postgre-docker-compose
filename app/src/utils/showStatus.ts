import { toast } from "sonner";
import { formattedTimeNow } from "./timeFormat";

export const showGetAllTaskFailed = () => {
  toast.error("Get All Tasks failed, please connect admin", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};

export const showDeletedSuccess = () => {
  toast.success(`Deleted Task has been success`, {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};
export const showDeletedFailed = () => {
  toast.error(`Deleted Task has been failed`, {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};
export const showCreateSuccess = () => {
  toast.success("Task has been created", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};

export const showCreateFailed = () => {
  toast.error("Task creation failed, please try again", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};

export const showEditSuccess = () => {
  toast.success("Task has been Edited", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};

export const showEditFailed = () => {
  toast.error("Task Edited failed, please try again", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};