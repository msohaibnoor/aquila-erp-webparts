import * as React from "react";
import { ToastProvider } from "react-toast-notifications";
import MakeLeaveRequest from "./MakeLeaveRequest";
import { IMakeLeaveRequestProps } from "./IMakeLeaveRequestProps";

const MakeLeaveRequestWrapper = (props: IMakeLeaveRequestProps) => (
  <ToastProvider autoDismissTimeout={5000}>
    <MakeLeaveRequest LeaveProps={props} />
  </ToastProvider>
);
export default MakeLeaveRequestWrapper;
