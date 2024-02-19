export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  departmentId?: string;
  hall?: string;
  hallId?: string;
}