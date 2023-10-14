export default interface Loan {
  id?: number;
  name: string;
  phone: string;
  loan_amount: number;
  reason: string;
  status: string;
  approval_date?: Date | null;
  cash_release_date?: Date | null;
  repayment_date?: Date | null;
  unique_token: string;
}
