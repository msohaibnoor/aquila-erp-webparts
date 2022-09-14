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
  const totalSalary =
    parseInt(pay["BasicSalary."]) +
    parseInt(pay["HousingAllowance."]) +
    parseInt(pay["InternetAllowance."]) +
    // parseInt(pay?.PayableOvertime) +
    parseInt(pay["TransportAllowance."]) +
    parseInt(pay["BonusAmount."]);

  let NetDeductions =
    parseFloat(pay["Tax."]) +
    parseFloat(pay["LunchAmount."]) +
    parseFloat(pay["EOBI."]) +
    parseFloat(pay["Advance."]);

  console.log("totalSalary ", totalSalary);
  console.log("Lunch ", pay.LunchAmount);
  console.log("EOBI", pay.EOBI);
  console.log("TAX ", pay["Tax."]);
  console.log("Advance", pay?.Advance);
  console.log("InternetAllowance", pay["InternetAllowance."]);
  console.log("InternetAllowance", pay["InternetAllowance."]);
  console.log("HousingAllowance.", pay["HousingAllowance."]);
  console.log("TransportAllowance.", pay["TransportAllowance."]);
  console.log("overtime.", pay["PayableOvertime.calculated"]);
  console.log("ExpenseClaims.", pay["ExpenseClaims."]);
  const earning = [
    {
      id: 1,
      type: "Basic",
      unitRate: pay["BasicSalary."] / 30,
      payable: commaSeparated(parseFloat(pay["BasicSalary."])),
    },
    {
      id: 2,
      type: "Overtime",
      unitRate: totalSalary / 176,
      payable: commaSeparated(
        parseFloat(pay["PayableOvertime.calculated"].split("#")[1])
      ),
    },
    {
      id: 3,
      type: "Internet Allowance",
      unitRate: "",
      payable: commaSeparated(parseFloat(pay["InternetAllowance."])) || 0,
    },
    {
      id: 3,
      type: "Transport Allowance",
      unitRate: "",
      payable: commaSeparated(parseFloat(pay["TransportAllowance."])) || 0,
    },
    {
      id: 3,
      type: "Housing Allowance",
      unitRate: "",
      payable: commaSeparated(parseFloat(pay["HousingAllowance."])) || 0,
    },
    {
      id: 4,
      type: "Expense Claims",
      unitRate: "",
      payable: commaSeparated(parseFloat(pay["ExpenseClaims."])) || 0,
    },
    {
      id: 5,
      type: "Bonus",
      unitRate: "",
      payable: pay?.BonusAmount || 0,
    },
  ];
  const deductions: any = [
    { id: 1, type: "Tax", unitRate: "", payable: pay?.Tax || 0 },
    { id: 2, type: "Lunch", unitRate: "", payable: pay?.LunchAmount || 0 },
    { id: 3, type: "EOBI", unitRate: "", payable: pay?.EOBI || 0 },
    { id: 3, type: "Advance", unitRate: "", payable: pay?.Advance || 0 },
  ];

  // const earning = [
  //   { id: 1, type: "Basic", unitRate: 100000, payable: 100000 },
  //   { id: 2, type: "Overtime", unitRate: 100000, payable: 100000 },
  //   { id: 3, type: "Tax", unitRate: 100000, payable: 100000 },
  // ];

  let sum = earning.reduce(function (prev, current) {
    return prev + +current.payable;
  }, 0);

  return (
    <div>
      <button className={styles["cta-back"]} onClick={props.onChangeDisplay}>
        <Icon icon="la:long-arrow-alt-left" /> <span> Back to Home</span>
      </button>
      {/* <Button>Bootstrap</Button> */}

      <div className={styles["header-card"]}>
        <div
          style={{ width: "121px", height: "121px" }}
          className={styles.chart}
        >
          <PieChart />
        </div>
        <div className={styles["media-body"]}>
          <h2>
            Paid: {pay?.PayableAmount}
            <i>
              <Icon icon="lucide:check-circle" />
            </i>
          </h2>
          <ul>
            <li>
              <div className={`${styles["chart-label"]} ${styles.yellow}`}>
                <span>Deduction</span>
                <div className={styles.amount}>
                  PKR {NetDeductions && NetDeductions}
                </div>
              </div>
            </li>
            <li>
              <div className={`${styles["chart-label"]} ${styles.green}`}>
                <span>Reimbursements</span>
                <div className={styles.amount}>
                  PKR {commaSeparated(pay?.Reimbursements)}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["printCard"]}>
        <div className={styles["bodySlip"]}>
          <div className={styles["company-info"]}>
            <h2>Aquila360</h2>
            <div className={styles["address"]}>
              High-Q Tower, Jail Road, Lahore, Pakistan
            </div>
          </div>
          <div className={styles["content-slip"]}>
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg9">
                  <div className={styles["info-container"]}>
                    <h2>Payslip for the month of May 2022</h2>
                    <p>Employee Pay Summary</p>
                  </div>
                  <div className={styles["info-employee"]}>
                    <div className="ms-Grid">
                      <div className={styles["ms-Grid-row"]}>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <p>
                            <strong>Employee Name</strong>
                          </p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                          <p>Mohammad Arslan ud Din, *Employee number</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <p>
                            <strong>Designation</strong>
                          </p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                          <p>Senior UI/UX Designer</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <p>
                            <strong>Date of Joining </strong>
                          </p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                          <p>19/04/2022</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <p>
                            <strong>Salary Period</strong>
                          </p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                          <p>April 2022</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <p>
                            <strong>Pay Period </strong>
                          </p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                          <p>May 2022</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                          <p>
                            <strong>Pay Date </strong>
                          </p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                          <p>15/06/2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                  <div className={styles["net-pay"]}>
                    <span>Employee Net Pay</span>
                    <div className={styles["amount"]}>
                      PKR {pay?.PayableAmount}
                    </div>
                    <span>Paid Dayss : 31 | LOP Days : 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["table-responsive"]}>
            <table className={`${styles.table} ${styles["table-secondary"]}`}>
              <thead>
                <tr>
                  <th scope="col">Earnings</th>
                  <th scope="col">Unit Rate</th>
                  <th scope="col">Days</th>
                  <th scope="col">
                    <strong>Payable</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {earning.map((earn) => (
                  <tr style={{ display: earn.payable == "0" ? "none" : "" }}>
                    <td>{earn.type}</td>
                    <td>
                      <strong>
                        {/* PKR{" "}
                        {earn.unitRate
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "} */}
                        {earn.type === "Basic" &&
                          "PKR " + commaSeparated(earn.unitRate)}
                        {earn.type === "Overtime" &&
                          "PKR " + commaSeparated(earn.unitRate)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        {/* PKR{" "}
                        {earn.unitRate
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "} */}
                        {earn.type === "Basic" && pay?.PayableDays}
                      </strong>
                    </td>
                    <td>
                      <strong className="payable">PKR {earn.payable}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className={`${styles["mb-0"]} ${styles["table-secondary"]}`}>
              <thead>
                <tr>
                  <th>Deductions</th>
                  <th></th>
                  <th></th>
                  <th className="payable">Deductible</th>
                </tr>
              </thead>
              <tbody>
                {deductions.map((earn, i) => (
                  <tr
                    key={i}
                    style={{ display: earn.payable == "0" ? "none" : "" }}
                  >
                    <td>{earn.type}</td>
                    <td>
                      <strong>
                        {earn.unitRate
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        {earn.unitRate
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      </strong>
                    </td>
                    <td>
                      <strong className="payable">
                        PKR{" "}
                        {earn.payable
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                    <strong>Net Salary</strong>
                  </td>
                  <td>
                    <div className="total">
                      PKR {commaSeparated(parseInt(pay?.PayableAmount))}
                      .00
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className={styles["total-payment"]}>
            <div className={styles.total}>
              <span>Total Net Payable</span>{" "}
              <span className="amount">PKR 150,000.00 </span>{" "}
              <small>(One hundred fifty thousand Pakistani Rupees)</small>
            </div>
          </div>
          <div className={styles["footer-page"]}>
            <p>**Total Net Payable = Gross Earnings - Total Deductions</p>
            <p className={`${styles["text-center"]} ${styles["mt-5"]}`}>
              -- This is a system generated payslip, hence the signature is not
              required. --
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payslip;
