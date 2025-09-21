import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  position: z.string().min(2, "กรุณากรอกตำแหน่ง"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
