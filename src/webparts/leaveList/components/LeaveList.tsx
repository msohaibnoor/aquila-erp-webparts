import * as React from "react";
import { Link } from "@fluentui/react";
import { DetailsList } from "@fluentui/react/lib/DetailsList";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { TooltipHost } from "@fluentui/react";

function LeaveList(props) {
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
      key: "LeaveType",
      name: "LeaveType",
      fieldName: "LeaveType",
      minWidth: 16,
      maxWidth: 80,
      // onColumnClick: this._onColumnClick,
      // onRender: (item: any) => (
      //   <TooltipHost content={`${item.fileType} file`}>
      //     <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
      //   </TooltipHost>
      // ),
    },
    {
      key: "LeaveStartDate",
      name: "LeaveStartDate",
      fieldName: "LeaveStartDate",
      minWidth: 0,
      maxWidth: 150,
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
      key: "LeaveEndDate",
      name: "LeaveEndDate",
      fieldName: "LeaveEndDate",
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      data: "date",
      isPadded: true,
    },
    {
      key: "RequestStatus",
      name: "RequestStatus",
      fieldName: "RequestStatus",
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      isCollapsible: true,
      data: "string",
      isPadded: true,
    },
    {
      key: "Comments",
      name: "Comments",
      fieldName: "Comments",
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      isCollapsible: true,
      data: "number",
    },
    
  ]);

  React.useEffect(() => {
    _getListOfLeaves();
  }, []);
  const _getListOfLeaves = async () => {
    const list = await _sp.web.lists.getByTitle("LeaveRequests").items();
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

export default LeaveList;