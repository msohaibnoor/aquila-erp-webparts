import * as React from "react";
import styles from "./MakeLeaveRequest.module.scss";
import { IMakeLeaveRequestProps } from "./IMakeLeaveRequestProps";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { useEffect, useState } from "react";
import { ILeaves } from "../../../interfaces";
import { useToasts } from "react-toast-notifications";
import { TextField } from "@fluentui/react/lib/TextField";
import { useId } from "@fluentui/react-hooks";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";
import { Dropdown, IDropdownOption } from "@fluentui/react/lib/Dropdown";
import momentBusiness from "moment-business-days";
import * as moment from "moment";

const MakeLeaveRequest = (props: any) => {
  const { LeaveProps } = props;
  let _sp: SPFI = getSP(LeaveProps.context);

  const leaveTypeOptions = [
    { key: "Annual", text: "Annual" },
    { key: "Sick", text: "Sick" },
    { key: "Unpaid", text: "Unpaid" },
    { key: "Deceased", text: "Deceased" },
    { key: "Compensation", text: "Compensation" },
  ];
  const { addToast } = useToasts();

  const [errors, setErrors] = useState<any>();
  const [Comments, setComments] = useState<string>();
  const [BusinessDays, setBusinessDays] = useState<any>("");
  const [LeaveStartDate, setLeaveStartDate] = useState();
  const [LeaveEndDate, setLeaveEndDate] = useState();
  const [LeaveType, setLeaveType] = React.useState<any>("Annual");
  const [submitting, setSubmitting] = useState(false);

  const textFieldId = useId("anInput");

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setLeaveType(item.key);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setSubmitting(true);
      let startDate = moment(LeaveStartDate);
      let endDate = moment(LeaveEndDate);
      const leaveData = {
        LeaveType: LeaveType,
        LeaveStartDate: moment(startDate).add(1, "days"),
        LeaveEndDate: moment(endDate).add(1, "days"),
        Comments,
        BusinessDays,
      };
      console.log(leaveData);

      const list = _sp.web.lists.getById(
        "a6c01299-d275-43b9-9b3d-26b8bd0a76d9"
      );
      try {
        let res = await list.items.add(leaveData);
        if (res.data) {
          setComments("");
          setBusinessDays("");
          setLeaveStartDate(null);
          setLeaveEndDate(null);
          setLeaveType("Annual");
          addToast("Your request has been sent", {
            appearance: "success",
            autoDismiss: true,
            PlacementType: "bottom-left",
          });
          setSubmitting(false);
        }
      } catch (err) {
        addToast("Something went wrong on the server. Please try again", {
          appearance: "error",
          autoDismiss: true,
          PlacementType: "bottom-left",
        });
        setSubmitting(false);
      }
    }
  };
  const validateForm = () => {
    let err: any = {};
    if (!Comments) {
      err.Comments = "Reason of Leave";
    }
    if (!BusinessDays) {
      err.BusinessDays = "Please Select business date";
    }
    if (!LeaveStartDate) {
      err.LeaveStartDate = "Please enter a valid leave start date";
    }
    if (!Comments) {
      err.Comments = "Explain your claim";
    }
    if (!LeaveEndDate) {
      err.LeaveEndDate = "Please enter valid leave end date";
    }
    if (!LeaveType) {
      err.LeaveType = "Please select leave type";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };
  const handleBlur = (key: any) => {
    let err: any = {};
    if (errors[key]) {
      err[key] = "";
    }
    setErrors({ ...errors, ...err });
  };

  useEffect(() => {
    if (LeaveStartDate && LeaveEndDate) {
      let diff = momentBusiness(LeaveStartDate, "MM-DD-YYYY").businessDiff(
        momentBusiness(LeaveEndDate, "MM-DD-YYYY")
      );
      setBusinessDays(diff + 1);
    }
  }, [LeaveStartDate, LeaveEndDate]);

  return (
    <>
      <h1>Make A Leave Request</h1>
      <form onSubmit={handleSubmit}>
        <Dropdown
          defaultSelectedKey={LeaveType}
          label="Select leave type"
          onChange={onChange}
          placeholder="Select leave type"
          options={leaveTypeOptions}
          className={styles["ms-Dropdown-container"]}
          onBlur={() => handleBlur("LeaveType")}
        />
        {errors?.LeaveType && (
          <small className={styles.error}>{errors?.LeaveType}</small>
        )}
        <DatePicker
          label="Leave Start Date"
          placeholder="Enter Leave Start Date"
          ariaLabel="Enter Leave Start Date"
          strings={defaultDatePickerStrings}
          onSelectDate={(date: any) => setLeaveStartDate(date)}
          onBlur={() => handleBlur("LeaveStartDate")}
          value={LeaveStartDate}
        />
        {errors?.LeaveStartDate && (
          <small className={styles.error}>{errors?.LeaveStartDate}</small>
        )}
        <DatePicker
          label="Leave End Date"
          placeholder="Enter Leave End Date"
          ariaLabel="Enter Leave End Date"
          strings={defaultDatePickerStrings}
          minDate={LeaveStartDate || new Date()}
          onSelectDate={(date: any) => {
            setLeaveEndDate(date);
          }}
          onBlur={() => handleBlur("LeaveEndDate")}
          value={LeaveEndDate}
        />
        {errors?.LeaveEndDate && (
          <small className={styles.error}>{errors?.LeaveEndDate}</small>
        )}
        <TextField
          label="Business days"
          placeholder="read only"
          readOnly
          value={BusinessDays}
        />

        <TextField
          id={textFieldId}
          value={Comments}
          label="Comments"
          multiline
          autoAdjustHeight
          onChange={(e: any) => setComments(e.target.value)}
          onBlur={() => handleBlur("Comments")}
        />
        {errors?.Comments && (
          <small className={styles.error}>{errors?.Comments}</small>
        )}
        <div>
          <PrimaryButton
            className={styles["mt-10"]}
            text="Submit"
            onClick={handleSubmit}
            allowDisabledFocus
            disabled={submitting}
          />
        </div>
      </form>
    </>
  );
};

export default MakeLeaveRequest;
