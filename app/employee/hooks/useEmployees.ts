// app/employee/hooks/useEmployees.ts
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../services/employees";
import { EmployeeTableData } from "@/types/employee-table";

export function useEmployees() {
  return useQuery<EmployeeTableData[], Error>({
    queryKey: ["employees"], // key ที่ใช้แคช
    queryFn: fetchEmployees, // ฟังก์ชันดึงข้อมูล
    staleTime: 1000 * 30, // 30 วิ ก่อนรีเฟรชข้อมูล
    initialData: [],
  });
}