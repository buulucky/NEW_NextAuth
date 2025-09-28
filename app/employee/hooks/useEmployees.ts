// app/employee/hooks/useEmployees.ts
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, EmployeeApiResponse } from "../services/employees";

export function useEmployees(search?: string, page: number = 1, limit: number = 20) {
  return useQuery<EmployeeApiResponse, Error>({
    queryKey: ["employees", search, page, limit],
    queryFn: () => fetchEmployees(search, page, limit),
    placeholderData: (previousData) => previousData, // ทำให้ pagination ลื่น ไม่กระพริบ
    staleTime: 30 * 1000,   // 30 วินาทียังถือว่า fresh
  });
}
