// app/api/employees/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// /api/employees?search=xxxx&page=1&limit=20
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100); // กัน user ยิง limit 9999

    const skip = (page - 1) * limit;

    // where เงื่อนไข search
    const where = search
      ? {
          OR: [
            { employee: { first_name_th: { contains: search } } },
            { employee: { last_name_th: { contains: search } } },
            { employee: { personal_id: { contains: search } } },
            { employee_code: { contains: search } },
            { po: { po_number: { contains: search } } },
            { po: { position: { position_name: { contains: search } } } },
          ],
        }
      : undefined;

    // ดึงข้อมูลพนักงาน
    const [employees, total] = await Promise.all([
      prisma.employeeContract.findMany({
        where,
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
              position: { select: { position_name: true } },
            },
          },
        },
        orderBy: { start_date: "desc" },
        skip,
        take: limit,
      }),
      prisma.employeeContract.count({ where }),
    ]);

    // แปลงข้อมูล
    const data = employees.map((c) => ({
      employee_id: c.employee.employee_id,
      personal_id: c.employee.personal_id,
      prefix_th: c.employee.prefix_th,
      first_name_th: c.employee.first_name_th,
      last_name_th: c.employee.last_name_th,
      employee_code: c.employee_code,
      po_number: c.po.po_number,
      position_name: c.po.position?.position_name || "ไม่ระบุ",
      start_date: c.start_date,
      status: c.status,
    }));

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("API /employees error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลพนักงานได้" },
      { status: 500 }
    );
  }
}
