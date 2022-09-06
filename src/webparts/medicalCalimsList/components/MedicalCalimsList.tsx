import * as React from "react";
import { Link } from "@fluentui/react";
import { DetailsList } from "@fluentui/react/lib/DetailsList";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { TooltipHost } from "@fluentui/react";
function MedicalClaimsList(props) {
  let _sp: SPFI = getSP(props.context);
  const [data, setData] = React.useState([]);
  const renderItemColumn = (item: any, index: any, column: any) => {
    let fieldContent = item[column.fieldName];
    // switch (column.key) {
    //   case "view":
    //     return (
    //       <span onClick={props.onChange}>
    //         <TooltipHost content={`Detailssssssss`}>
    //           <Link>View</Link>
    //         </TooltipHost>
    //       </span>
    //     );

    //   default:
    //     return <span>{fieldContent}</span>;
    // }
    return <span>{fieldContent}</span>;
  };

  const [columns, setColumns] = React.useState([
    {
      key: "EmployeeName",
      name: "EmployeeName",
      fieldName: "EmployeeName",
      minWidth: 0,
      maxWidth: 90,
      // onColumnClick: this._onColumnClick,
      // onRender: (item: any) => (
      //   <TooltipHost content={`${item.fileType} file`}>
      //     <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
      //   </TooltipHost>
      // ),
    },
    {
      key: "PatientRelation",
      name: "PatientRelation",
      fieldName: "PatientRelation",
      minWidth: 0,
      maxWidth: 20,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "date",
      isPadded: true,
    },
    {
      key: "Hospital_x002f_PharmacyName",
      name: "Hospital_x002f_PharmacyName",
      fieldName: "Hospital_x002f_PharmacyName",
      minWidth: 40,
      maxWidth: 40,
      isResizable: true,
      data: "date",
      isPadded: true,
    },
    {
      key: "InvoiceDate",
      name: "InvoiceDate",
      fieldName: "InvoiceDate",
      minWidth: 40,
      maxWidth: 40,
      isResizable: true,
      isCollapsible: true,
      data: "string",
      isPadded: true,
    },
    {
      key: "Amount",
      name: "Amount",
      fieldName: "Amount",
      minWidth: 40,
      maxWidth: 40,
      isResizable: true,
      isCollapsible: true,
      data: "number",
    },
    {
      key: "Status",
      name: "Status",
      fieldName: "Status",
      minWidth: 40,
      maxWidth: 40,
      isResizable: true,
      isCollapsible: true,
      data: "number",
    },
    {
      key: "ApprovalStatus",
      name: "ApprovalStatus",
      fieldName: "ApprovalStatus",
      minWidth: 40,
      maxWidth: 40,
      isResizable: true,
      isCollapsible: true,
      data: "number",
    },
  ]);

  React.useEffect(() => {
    _getListOfLeaves();
  }, []);
  const _getListOfLeaves = async () => {
    const list = await _sp.web.lists.getByTitle("MedicalExpenseClaims").items();
    console.log("List ",list)
    setData(list);
  };

  const _onItemInvoked = (item: any): void => {
    console.log("item on Click", item);
  };


  return (  <div>
  <DetailsList
    items={data}
    columns={columns}
    onRenderItemColumn={renderItemColumn}
    // isHeaderVisible={true}
    // onItemInvoked={_onItemInvoked}
    // onActiveItemChanged ={_onItemInvoked}
  />
</div> );
}

export default MedicalClaimsList;