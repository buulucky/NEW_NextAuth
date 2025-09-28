// app/employee/services/employees.ts
import { EmployeeTableData } from "@/types/employee-table";

export async function fetchEmployees(): Promise<EmployeeTableData[]> {
  const res = await fetch("/api/employees");
  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }
  return res.json();
}