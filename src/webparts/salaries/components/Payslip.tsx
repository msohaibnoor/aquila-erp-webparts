import * as React from "react";
import { Icon } from "@iconify/react";
import styles from "./Salaries.module.scss";

// import Button from "react-bootstrap/Button";
import { commaSeparated } from "../../../utils";
import notificationSvc from "../../../notificationService";

import PieChart from "./PieChart";
// import "bootstrap/dist/css/bootstrap.min.css";
function Payslip(props) {
  console.log(props.pay);
  const { pay } = props;
  let deductions =
    parseFloat(pay["Tax."]) +
    parseFloat(pay["LunchAmount."]) +
    parseFloat(pay["EOBI."]) +
    parseFloat(pay["Advance."]);

  console.log({ deductions });
  console.log(pay.LunchAmount);
  console.log(pay.EOBI);
  console.log(pay["Tax."]);
  console.log(pay?.Advance);

  return (
    <div>
      <button onClick={props.onChangeDisplay}>Back</button>
      {/* <Button>Bootstrap</Button> */}
      <div style={{ width: "200px", height: "200px" }} className="chart">
        <PieChart />
      </div>
      <div className="media-body">
        <h2>
          Paid: {pay?.PayableAmount}
          <i>
            <Icon icon="lucide:check-circle" />
          </i>
        </h2>
        <ul>
          <li>
            <div className="chart-label yellow">
              <span>Deduction</span>
              <div className="amount">PKR {deductions && deductions}</div>
            </div>
          </li>
          <li>
            <div className="chart-label green">
              <span>Reimbursements</span>
              <div className="amount">
                PKR {commaSeparated(pay?.Reimbursements)}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="employee-info">
        <div className="head">
          <h2>Aquila360</h2>
          <p>High-Q Tower, Jail Road, Lahore, Pakistan</p>
        </div>
        <div className="info-container">
          <h2>Payslip for the month of May 2022</h2>
          <p>Employee Pay Summary</p>
        </div>
      </div>
    </div>
  );
}

export default Payslip;
