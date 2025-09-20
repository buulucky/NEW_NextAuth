import { Employee } from "@/types/employee";

interface Props {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: Props) {
  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Prefix</th>
          <th className="border border-gray-300 px-4 py-2">First Name</th>
          <th className="border border-gray-300 px-4 py-2">Last Name</th>
          <th className="border border-gray-300 px-4 py-2">Birth Date</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.employee_id}>
            <td className="border border-gray-300 px-4 py-2">{employee.prefix_th}</td>
            <td className="border border-gray-300 px-4 py-2">{employee.first_name_th}</td>
            <td className="border border-gray-300 px-4 py-2">{employee.last_name_th}</td>
            <td className="border border-gray-300 px-4 py-2">
              {employee.birth_date
                ? new Date(employee.birth_date).toLocaleDateString()
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
