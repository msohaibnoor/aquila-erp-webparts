import * as React from "react";
import styles from "./MakeLeaveRequest.module.scss";
import { IMakeLeaveRequestProps } from "./IMakeLeaveRequestProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { useEffect, useState } from "react";
import { IFAQ, ILeaves } from "../../../interfaces";
// import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
// import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
// import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
// import { DynamicForm } from "@pnp/spfx-controls-react/lib/DynamicForm";
import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { useId } from "@fluentui/react-hooks";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import {
  DatePicker,
  DayOfWeek,
  // Dropdown,
  // IDropdownOption,
  mergeStyles,
  defaultDatePickerStrings,
} from "@fluentui/react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import momentBusiness from "moment-business-days";
import * as moment from "moment";

// var july4th = "08-18-2022";
// var laborDay = "09-07-2022";

// momentBusiness.updateLocale("us", {
//   holidays: [july4th, laborDay],
//   holidayFormat: "MM-DD-YYYY",
// });

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const Faq = (props: IMakeLeaveRequestProps) => {
  const LOG_SOURCE = "FAQ Webpart";
  const LIST_NAME = "FAQ";
  let _sp: SPFI = getSP(props.context);

  const leaveTypeOptions = [
    { key: "Annual", text: "Annual" },
    { key: "Sick", text: "Sick" },
    { key: "Unpaid", text: "Unpaid" },
    { key: "Deceased", text: "Deceased" },
    { key: "Compensation", text: "Compensation" },
  ];
  const [errors, setErrors] = useState<any>();
  const [leaves, setLeaves] = useState<ILeaves[]>([]);
  const [Comments, setComments] = useState<string>();
  const [BusinessDays, setBusinessDays] = useState<any>("");
  const [LeaveStartDate, setLeaveStartDate] = useState();
  const [LeaveEndDate, setLeaveEndDate] = useState();
  const [LeaveType, setLeaveType] = React.useState<any>("Annual");
  // console.log(LeaveStartDate);
  // console.log(LeaveEndDate);
  const textFieldId = useId("anInput");
  // console.log(LeaveType);

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setLeaveType(item.key);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
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
        list.items.add(leaveData);
        setComments("");
        setBusinessDays("");
        setLeaveStartDate(null);
        setLeaveEndDate(null);
        setLeaveType("Annual");
      } catch (err) {
        console.error(err);
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
          // defaultSelectedKey="Annual"
          // selectedKey={LeaveType ? LeaveType.key : undefined}
          // eslint-disable-next-line react/jsx-no-bind
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
          // firstDayOfWeek={firstDayOfWeek}
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
          // firstDayOfWeek={firstDayOfWeek}
          label="Leave End Date"
          placeholder="Enter Leave End Date"
          ariaLabel="Enter Leave End Date"
          strings={defaultDatePickerStrings}
          // value={new Date()}
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
            // disabled={disabled}
            // checked={checked}
          />
        </div>
      </form>
    </>
  );
};

export default Faq;
