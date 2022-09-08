import * as React from "react";
import styles from "./SalariesFolder.module.scss";
import { ISalariesFolderProps } from "./ISalariesFolderProps";
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
import { folderFromServerRelativePath } from "@pnp/sp/folders";

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import * as moment from "moment";

const Salaries = (props: ISalariesFolderProps) => {
  let _sp: SPFI = getSP(props.context);

  const getFAQItems = async () => {
    // const claims = _sp.web.lists
    //   .getById("66d0c729-4678-44ec-9698-09b63c748607")
    //   .items();
    // list's folder
    const url = "/sites/SPFxDevs/Lists/Employees/sohaib";
    // const listRootFolder = await _sp.web.lists
    //   .getByTitle("SalariesNew")
    //   .rootFolder.folders();
    // const folder = await folderFromServerRelativePath(
    //   _sp.web,
    //   url
    // ).listItemAllFields();
    // const userList = await _sp.web.lists
    //   .getByTitle("Employees")
    //   .rootFolder.folders();
    // // const userFolders = await userList.items
    // // .filter("FSObjType eq 1 and Title eq " + "sohaib.noor@aquila360.com").getItemByStringId('1')
    // // console.log(userList);

    // // console.log(folder);
    // const itemFields = await _sp.web
    //   .getFolderById("bd9b617c-d65a-4376-99fa-9f521faaca78")
    //   // .getFolderByServerRelativePath("/sites/SPFxDevs/Lists/Employees/sohaib")
    //   .listItemAllFields();
    // console.log(itemFields);
    // const userList = _sp.web.lists.getByTitle("Employees");
    // const userFolders = await userList.items
    //   .filter("FSObjType eq 1 and Title eq " + "sohaib")
    //   .getById(1)
    // console.log(userFolders);
    const listUri = "/sites/SPFxDevs/Lists/Employees";
    // const folder = _sp.web
    //   .getList(listUri)
    //   .items.filter(`FileDirRef eq '${listUri}/sohaib'`)
    //   .getItemByStringId("1");
    // const folder = await _sp.web
    //   .getFolderByServerRelativePath("/sites/SPFxDevs/Lists/Employees/sohaib")
    //   .expand("Folders");
    // console.log(folder);
    let data = await _sp.web.lists
      .getByTitle("SalariesNew")
      .renderListDataAsStream({
        FolderServerRelativeUrl:
          "/sites/SPFxDevs/Lists/SalariesNew/sohaib.noor@aquila360.com",
      });

    console.log("Folders", data);
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
          // setFiles(files);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <h1>Here are your salaries </h1>
    </>
  );
};

export default Salaries;
