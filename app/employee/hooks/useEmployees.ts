// app/employee/hooks/useEmployees.ts
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../services/employees";
import { EmployeeTableData } from "@/types/employee-table";

export function useEmployees() {
  return useQuery<EmployeeTableData[], Error>({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
    staleTime: 30 * 1000,
  });
}
