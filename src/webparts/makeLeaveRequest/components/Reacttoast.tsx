import * as React from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";

const ToastDemo = ({ mycontent }) => {
  const { addToast } = useToasts();
  return (
    <>
      <button
        onClick={() =>
          addToast(mycontent, {
            appearance: "success",
            autoDismiss: true,

            PlacementType: "bottom-left",
          })
        }
      >
        success Toast
      </button>
      <button
        onClick={() =>
          addToast(mycontent, {
            appearance: "error",
            autoDismiss: true,
          })
        }
      >
        error Toast
      </button>
      <button
        onClick={() =>
          addToast(mycontent, {
            appearance: "warning",
            autoDismiss: true,
          })
        }
      >
        warning Toast
      </button>
      <button
        onClick={() =>
          addToast(mycontent, {
            appearance: "info",
            autoDismiss: true,
          })
        }
      >
        Info Toast
      </button>
    </>
  );
};
export const MyReactToast = ({ mycontent }) => (
  <ToastProvider autoDismissTimeout={5000}>
    <ToastDemo mycontent={mycontent} />
  </ToastProvider>
);
