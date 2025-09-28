// services/employees.ts
import { EmployeeTableData } from "@/types/employee-table";

export interface EmployeeApiResponse {
  data: EmployeeTableData[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function fetchEmployees(
  search?: string,
  page: number = 1,
  limit: number = 20
): Promise<EmployeeApiResponse> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  params.set("page", page.toString());
  params.set("limit", limit.toString());

  const res = await fetch(`/api/employees?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch employees");

  return res.json();
}
