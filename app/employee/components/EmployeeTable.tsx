"use client";
import { useState } from "react";
import { useEmployees } from "@/app/employee/hooks/useEmployees";
import { EmployeeSearchBox } from "@/app/employee/components/EmployeeSearchBox";
import { EmployeeTableData } from "@/types/employee-table";

export default function EmployeeTable() {
  const [search, setSearch] = useState("");
  const page = 1;
  const limit = 10;

  const { data, error, isLoading } = useEmployees(search, page, limit);

  const employees = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-600">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-red-600">เกิดข้อผิดพลาด: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      <EmployeeSearchBox onSearch={setSearch} />
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              เลขบัตรประชาชน
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              รหัสพนักงาน
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ชื่อ-นามสกุล
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              เลข PO
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ตำแหน่งงาน
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              วันที่เริ่มงาน
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((emp: EmployeeTableData) => (
            <tr
              key={emp.employee_id}
              className="hover:bg-purple-100 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {emp.personal_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {emp.employee_code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {emp.prefix_th} {emp.first_name_th} {emp.last_name_th}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {emp.po_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {emp.position_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(emp.start_date).toLocaleDateString("th-TH")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
