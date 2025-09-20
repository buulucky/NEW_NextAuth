import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const employeeContracts = await prisma.employeeContract.findMany({
      select: {
        employee_code: true,
        start_date: true,
        status: true,
        employee: {
          select: {
            employee_id: true,
            personal_id: true,
            prefix_th: true,
            first_name_th: true,
            last_name_th: true,
          },
        },
        po: {
          select: {
            po_number: true,
            position: {
              select: {
                position_name: true,
              },
            },
          },
        },
      },
    });

    // Transform data to match EmployeeTable expectations
    const transformedData = employeeContracts.map(contract => ({
      employee_id: contract.employee.employee_id,
      personal_id: contract.employee.personal_id,
      prefix_th: contract.employee.prefix_th,
      first_name_th: contract.employee.first_name_th,
      last_name_th: contract.employee.last_name_th,
      employee_code: contract.employee_code,
      po_number: contract.po.po_number,
      position_name: contract.po.position?.position_name || "ไม่ระบุ",
      start_date: contract.start_date,
      training_status: contract.status || "ไม่ระบุ"
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}
