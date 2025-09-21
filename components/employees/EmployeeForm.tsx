"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, EmployeeFormData } from "@/lib/validations/employee";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  loading?: boolean;
};

export function EmployeeForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* เลขที่บัตรประชาชน */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          เลขที่บัตรประชาชน
        </label>
        <Input
          type="text"
          maxLength={13}
          placeholder="0123456789"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            const value = target.value.replace(/[^0-9]/g, "");
            target.value = value;
            setValue("personal_id", value, { shouldValidate: true });
          }}
          {...register("personal_id", {
            required: "กรุณากรอกเลขที่บัตรประชาชน",
            validate: (value) =>
              value.length === 13 || "เลขที่บัตรประชาชนต้องมี 13 หลัก",
          })}
        />
        {errors.personal_id && (
          <p className="text-sm text-red-500">{errors.personal_id.message}</p>
        )}
      </div>

      {/* คำนำหน้า + ชื่อ + นามสกุล */}
      <div className="grid grid-cols-12 gap-1">
        {/* คำนำหน้า */}
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            คำนำหน้า
          </label>
          <Select>
            <SelectTrigger className="w-full border border-gray-300 rounded px-3 py-2">
              <SelectValue placeholder="-- เลือกคำนำหน้า --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="นาย">นาย</SelectItem>
              <SelectItem value="นาง">นาง</SelectItem>
              <SelectItem value="นางสาว">นางสาว</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ชื่อ */}
        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700">
            ชื่อ
          </label>
          <Input placeholder="ชื่อ" {...register("first_name_th")} />
          {errors.first_name_th && (
            <p className="text-sm text-red-500">
              {errors.first_name_th.message}
            </p>
          )}
        </div>

        {/* นามสกุล */}
        <div className="col-span-5">
          <label className="block text-sm font-medium text-gray-700">
            นามสกุล
          </label>
          <Input placeholder="นามสกุล" {...register("last_name_th")} />
          {errors.last_name_th && (
            <p className="text-sm text-red-500">
              {errors.last_name_th.message}
            </p>
          )}
        </div>
      </div>

      {/* คำนำหน้า (ภาษาอังกฤษ) + ชื่อ (ภาษาอังกฤษ) + นามสกุล (ภาษาอังกฤษ) */}
      <div className="grid grid-cols-12 gap-1">
        {/* คำนำหน้า (ภาษาอังกฤษ) */}
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            คำนำหน้า (EN)
          </label>
          <Select>
            <SelectTrigger className="w-full border border-gray-300 rounded px-3 py-2">
              <SelectValue placeholder="-- เลือกคำนำหน้า --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MR">MR</SelectItem>
              <SelectItem value="MRS">MRS</SelectItem>
              <SelectItem value="MISS">MISS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ชื่อ (ภาษาอังกฤษ) */}
        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700">
            ชื่อ (EN)
          </label>
          <Input
            placeholder="ชื่อ (ภาษาอังกฤษ)"
            {...register("first_name_en")}
          />
          {errors.first_name_en && (
            <p className="text-sm text-red-500">
              {errors.first_name_en.message}
            </p>
          )}
        </div>

        {/* นามสกุล (ภาษาอังกฤษ) */}
        <div className="col-span-5">
          <label className="block text-sm font-medium text-gray-700">
            นามสกุล (EN)
          </label>
          <Input
            placeholder="นามสกุล (ภาษาอังกฤษ)"
            {...register("last_name_en")}
          />
          {errors.last_name_en && (
            <p className="text-sm text-red-500">
              {errors.last_name_en.message}
            </p>
          )}
        </div>
      </div>

      {/* วันเกิด */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          วันเกิด
        </label>
        <Input placeholder="วันเกิด" {...register("birth_date")} />
        {errors.birth_date && (
          <p className="text-sm text-red-500">{errors.birth_date.message}</p>
        )}
      </div>

      {/* ปุ่มบันทึก */}
      <Button type="submit" disabled={loading}>
        {loading ? "กำลังบันทึก..." : "บันทึก"}
      </Button>
    </form>
  );
}
