import { EmployeeTableData } from "@/types/employee-table";

export async function fetchEmployees(): Promise<EmployeeTableData[]> {
  const response = await fetch("/api/employees");
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
}