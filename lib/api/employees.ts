import { Employee } from "@/types/employee";

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch("/api/employees");
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
}