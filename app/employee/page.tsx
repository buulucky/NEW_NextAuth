"use client";

import { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { fetchEmployees } from "@/lib/api/employees";

export default function EmployeePage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <EmployeeTable employees={employees} />
    </div>
  );
}
