"use client";
import { useEmployees } from "@/app/employee/hooks/useEmployees";

export default function EmployeeTable() {
  const { data, isLoading, error } = useEmployees();

  if (isLoading) return <p>กำลังโหลด...</p>;
  if (error) return <p>เกิดข้อผิดพลาด: {error.message}</p>;
  if (!data || data.length === 0) return <p>ไม่พบข้อมูลพนักงาน</p>;
  
  return (
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
        {data.map((emp) => (
          <tr key={emp.employee_id} className='hover:bg-purple-100 cursor-pointer'>
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
              {new Date(emp.start_date).toLocaleDateString('th-TH')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
