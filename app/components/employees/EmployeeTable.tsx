import { EmployeeTableData } from "@/types/employee-table";

interface Props {
  employees: EmployeeTableData[];
}

export default function EmployeeTable({ employees }: Props) {
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
        {employees.map((employee) => (
          <tr key={employee.employee_id} className='hover:bg-purple-100 cursor-pointer'>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {employee.personal_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {employee.employee_code}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {employee.prefix_th} {employee.first_name_th} {employee.last_name_th}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {employee.po_number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {employee.position_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {new Date(employee.start_date).toLocaleDateString('th-TH')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
