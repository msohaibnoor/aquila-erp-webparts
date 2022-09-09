import * as React from "react";
import { ToastProvider } from "react-toast-notifications";
import MedicalCalim from "./MedicalClaim";
import { IMedicalClaimProps } from "./IMedicalClaimProps";

const MedicalClaimWrapper = (props: IMedicalClaimProps) => (
  <ToastProvider autoDismissTimeout={5000}>
    <MedicalCalim ClaimProps={props} />
  </ToastProvider>
);
export default MedicalClaimWrapper;
