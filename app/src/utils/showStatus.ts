import { toast } from "sonner";
import { formattedTimeNow } from "./timeFormat";

export const showCreateSuccess = () => {
  toast("Event has been created", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};
export const showCreateFailed = () => {
  toast("Event creation failed, please try again", {
    description: formattedTimeNow,
    action: {
      label: "Close",
      onClick: () => console.log("close"),
    },
  });
};
