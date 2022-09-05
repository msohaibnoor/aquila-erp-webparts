export interface IFAQ {
  Id: number;
  Title: string;
  Body: string;
  Letter: string;
}
export interface ILeaves {
  Id: number;
  //   Title: string;
  LeaveType: string;
  LeaveStartDate: string;
  LeaveEndDate: string;
}
export interface IMedicalClaim {
  Id: number;
  EmployeeName: string;
  PatientRelation: string;
  Hospital: string;
  InvoiceDate: Date;
  Amount: number;
}
