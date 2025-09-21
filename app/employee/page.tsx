"use client";

import { useEffect, useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import { fetchEmployees } from "@/lib/api/employees/employees";
import { EmployeeTableData } from "@/types/employee-table";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<EmployeeTableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <EmployeeTable employees={employees} />
    </div>
  );
}
