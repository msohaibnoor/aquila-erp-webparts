import { Link, TooltipHost } from "@fluentui/react";
import { DetailsList } from "@fluentui/react/lib/DetailsList";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { getSP } from "../../../pnpjsConfig";
import { commaSeparated, toMonthName } from "../../../utils";
import Payslip from "./Payslip";

function Salaries(props) {
  const { user } = props;
  let _sp: SPFI = getSP(props.context);
  const [data, setData] = React.useState([]);
  const [salary, setSalary] = React.useState<any>()
  const [isDisplay, setIsDisplay] = React.useState(true);

  const onChangeDisplay = () =>{
    setIsDisplay(!isDisplay);
  }
  const renderItemColumn = (item: any, index: any, column: any) => {
    let fieldContent = item[column.fieldName];
    switch (column.key) {
      case "view":
        return (
          <span onClick={props.onChange}>
            <TooltipHost content={`Detailssssssss`}>
              <Link>View</Link>
            </TooltipHost>
          </span>
        );
      case "month":
        let date: any = new Date(item.Period);
        date = date.toLocaleDateString("en-US");
        date = date.split("/");
        return <span>{`${toMonthName(parseInt(date[0]))} ${date[2]}`}</span>;

      case "Deductions":
        let deductions =
          parseInt(item?.LunchAmount) +
          parseInt(item?.EOBI) +
          parseInt(item["Tax."]) +
          parseInt(item?.Advance);
        return <span>Rs {commaSeparated(deductions)}</span>;
      case "TaxWorkSheet":
        return (
          <span onClick={props.onChange}>
            <TooltipHost content={`Tax`}>
              <Link>View</Link>
            </TooltipHost>
          </span>
        );
      case "Payslip":
        return (
          <span onClick={() => {
            setSalary(item)
            onChangeDisplay()}}>
            <TooltipHost content={`Payslip`}>
              <Link>View</Link>
            </TooltipHost>
          </span>
        );

      default:
        return <span>{fieldContent}</span>;
    }
  };

  const [columns, setColumns] = React.useState([
    {
      key: "month",
      name: "Month",
      fieldName: "month",
      minWidth: 0,
      maxWidth: 90,
    },
    {
      key: "Gross Salary",
      name: "Gross Salary",
      fieldName: "PayableAmount",
      minWidth: 0,
      maxWidth: 180,
      // isRowHeader: true,
      // isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      // sortAscendingAriaLabel: "Sorted A to Z",
      // sortDescendingAriaLabel: "Sorted Z to A",
      data: "number",
      isPadded: true,
    },
    {
      key: "Deductions",
      name: "Deductions",
      fieldName: "Deductions",
      minWidth: 80,
      maxWidth: 60,
      isResizable: true,
      data: "string",
      isPadded: true,
    },
    {
      key: "Payslip",
      name: "Payslip",
      fieldName: "Payslip",
      minWidth: 80,
      maxWidth: 60,
      isResizable: true,
      data: "string",
      isPadded: true,
    },
    {
      key: "TaxWorkSheet",
      name: "Tax WorkSheet",
      fieldName: "TaxWorkSheet",
      minWidth: 80,
      maxWidth: 60,
      isResizable: true,
      data: "string",
      isPadded: true,
    },
  ]);

  React.useEffect(() => {
    _getListOfLeaves();
  }, []);
  const _getListOfLeaves = async () => {
    let salariesData = await _sp.web.lists
      .getByTitle("SalariesNew")
      .renderListDataAsStream({
        FolderServerRelativeUrl: `/sites/SPFxDevs/Lists/SalariesNew/${user.email}`,
      });

    setData(salariesData?.Row);
  };
  return (
    <>
      {isDisplay && (
        <DetailsList
          items={data}
          columns={columns}
          onRenderItemColumn={renderItemColumn}
        />
      )}
      {!isDisplay && salary && <Payslip pay={salary} onChangeDisplay={onChangeDisplay} />}
    </>
  );
}

export default Salaries;
