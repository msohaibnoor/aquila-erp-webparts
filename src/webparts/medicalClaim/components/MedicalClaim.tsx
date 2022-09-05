import * as React from "react";
import styles from "./MedicalClaim.module.scss";
import { IMedicalClaimProps } from "./IMedicalClaimProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { useEffect, useState } from "react";
import { IItem } from "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { useId } from "@fluentui/react-hooks";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { DatePicker, defaultDatePickerStrings } from "@fluentui/react";

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import * as moment from "moment";

const MedicalClaim = (props: IMedicalClaimProps) => {
  let _sp: SPFI = getSP(props.context);

  const patientRelationOptions = [
    { key: "Self", text: "Self" },
    { key: "Spouse", text: "Spouse" },
    { key: "Child", text: "Child" },
    { key: "Parent", text: "Parent" },
  ];
  const [errors, setErrors] = useState<any>();
  const [submitting, setSubmitting] = useState(false);
  const textFieldId = useId("anInput");

  const [Comments, setComments] = useState<string>();
  const [Amount, setAmount] = useState();
  const [Pharmacy, setPharmacy] = useState<string>();
  const [Files, setFiles] = useState<any>();
  const [InvoiceDate, setInvoiceDate] = useState();
  const [PatientRelation, setPatientRelation] = React.useState<any>();
  console.log(PatientRelation, InvoiceDate, Pharmacy, Amount, Comments);

  const handlePatientRelation = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    setPatientRelation(item.key);
  };

  const handleSubmit = async () => {
    let date = moment(InvoiceDate);
    if (validateForm()) {
      setSubmitting(true);
      const leaveData = {
        Title: "Mr",
        EmployeeName: props.userDisplayName,
        EmployeeEmail: props.userEmail,
        PatientRelation: PatientRelation,
        InvoiceDate: moment(date).add(1, "days"),
        Amount,
        Comments,
        ApprovalStatus: "Pending",
        Status: "Unpaid",
        Hospital_x002f_PharmacyName: Pharmacy,
      };
      const list = _sp.web.lists.getById(
        "66d0c729-4678-44ec-9698-09b63c748607"
      );
      try {
        const res = await list.items.add(leaveData);
        setSubmitting(false);
        if (Files && Files.length !== 0 && res.data) {
          const item: IItem = _sp.web.lists
            .getById("66d0c729-4678-44ec-9698-09b63c748607")
            .items.getById(res.data.Id);
          Files.forEach(async (file: any, i: number) => {
            setTimeout(async () => {
              let buffer = await file.arrayBuffer();
              await item.attachmentFiles.add(file.name, buffer);
            }, 500);
          });
          setSubmitting(false);
          setAmount(undefined);
          setComments(undefined);
          setPharmacy(undefined);
          setPatientRelation(undefined);
          setAmount(undefined);
          setInvoiceDate(undefined);
        }
      } catch (err) {
        console.error(err);
        setSubmitting(false);
      }
    }
  };

  const validateForm = () => {
    let err: any = {};
    if (!PatientRelation) {
      err.PatientRelation = "Please select your relation with the Patient";
    }
    if (!InvoiceDate) {
      err.InvoiceDate = "Please Select invoice date";
    }
    if (!Amount) {
      err.Amount = "Please enter a valid amount";
    }
    if (!Comments) {
      err.Comments = "Explain your claim";
    }
    if (!Pharmacy) {
      err.Pharmacy = "Please enter pharmacy or hospital";
    }
    if (Files?.length <= 0 || !Files) {
      err.Files = "Please upload relevant documents";
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
  const getFAQItems = async () => {
    const claims = _sp.web.lists
      .getById("66d0c729-4678-44ec-9698-09b63c748607")
      .items();
  };
  useEffect(() => {
    getFAQItems();
  }, []);

  const changeHandler = (e: any) => {
    //@ts-ignore
    const files = Array.from(e.target.files);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFiles(files);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <h1>Claim your medical expense</h1>
      <form onSubmit={handleSubmit}>
        <Dropdown
          defaultSelectedKey={PatientRelation}
          label="Patient Relation"
          onChange={handlePatientRelation}
          placeholder="Patient Relation"
          options={patientRelationOptions}
          className={styles["ms-Dropdown-container"]}
          required
          onBlur={() => handleBlur("PatientRelation")}
        />
        {errors?.PatientRelation && (
          <small className={styles.error}>{errors?.PatientRelation}</small>
        )}

        <DatePicker
          label="Invoice Date"
          ariaLabel="Invoice Date"
          strings={defaultDatePickerStrings}
          onSelectDate={(date: any) => setInvoiceDate(date)}
          onBlur={() => handleBlur("InvoiceDate")}
        />
        {errors?.InvoiceDate && (
          <small className={styles.error}>{errors?.InvoiceDate}</small>
        )}

        <TextField
          required
          label="Amount"
          value={Amount}
          type="number"
          min="1"
          onChange={(e: any) => setAmount(e.target.value)}
          onBlur={() => handleBlur("Amount")}
        />
        {errors?.Amount && (
          <small className={styles.error}>{errors?.Amount}</small>
        )}
        <TextField
          required
          label="Pharmacy / Hospital Name"
          value={Pharmacy}
          onChange={(e: any) => setPharmacy(e.target.value)}
          onBlur={() => handleBlur("Pharmacy")}
        />
        {errors?.Pharmacy && (
          <small className={styles.error}>{errors?.Pharmacy}</small>
        )}

        <TextField
          required
          id={textFieldId}
          label="Comments"
          value={Comments}
          validateOnFocusOut={true}
          multiline
          autoAdjustHeight
          onChange={(e: any) => setComments(e.target.value)}
          onBlur={() => handleBlur("Comments")}
        />
        {errors?.Comments && (
          <small className={styles.error}>{errors?.Comments}</small>
        )}
        {/* <DragDropFiles
          dropEffect="move"
          enable={true}
          iconName="Upload"
          labelMessage="Drag you prescription here"
        >
          <div
            style={{ width: "300px", height: "300px", backgroundColor: "teal" }}
          ></div>
        </DragDropFiles> */}
        {/* <FilePicker
          bingAPIKey="<BING API KEY>"
          accepts={[
            ".gif",
            ".jpg",
            ".jpeg",
            ".bmp",
            ".dib",
            ".tif",
            ".tiff",
            ".ico",
            ".png",
            ".jxr",
            ".svg",
          ]}
          label="Upload your prescription"
          buttonLabel="Upload your prescription"
          buttonIcon="FileImage"
          onSave={(filePickerResult: IFilePickerResult[]) => {
            // setState({ filePickerResult });
          }}
          onChange={(filePickerResult: IFilePickerResult[]) => {
            // setState({ filePickerResult });
          }}
          context={props.context}
        /> */}
        <Label>Upload Prescription</Label>
        <input
          type="file"
          placeholder="Upload prescription"
          accept=".gif,.jpg,.jpeg,.png,.doc,.docx,.pdf"
          multiple
          onChange={(e) => changeHandler(e)}
          onBlur={() => handleBlur("Files")}
        />
        {errors?.Files && (
          <small className={styles.error}>{errors?.Files}</small>
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
        <DefaultButton
          className={styles["mt-10"]}
          text="Reset"
          allowDisabledFocus
          disabled={submitting}
        />
      </form>
    </>
  );
};

export default MedicalClaim;
