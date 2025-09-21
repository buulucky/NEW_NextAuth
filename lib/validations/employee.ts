import { z } from "zod";

export const employeeSchema = z.object({
  personal_id: z.string().min(13, "เลขที่บัตรประชาชนต้องมี 13 ตัวอักษร"),
  prefix_th: z.string().min(2, "เลือกคำนำหน้า"),
  first_name_th: z.string().min(2, "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร"),
  last_name_th: z.string().min(2, "กรุณากรอกนามสกุลอย่างน้อย 2 ตัวอักษร"),
  prefix_en: z.string().min(2, "เลือกคำนำหน้า"),
  first_name_en: z.string().min(2, "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร"),
  last_name_en: z.string().min(2, "กรุณากรอกนามสกุลอย่างน้อย 2 ตัวอักษร"),
  birth_date: z.string().nullable().optional(),
  position: z.string().min(2, "กรุณากรอกตำแหน่ง"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
