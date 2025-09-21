"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, EmployeeFormData } from "@/lib/validations/employee";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  loading?: boolean;
};

export function EmployeeForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="ชื่อ" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Input placeholder="อีเมล" type="email" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input placeholder="ตำแหน่ง" {...register("position")} />
        {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "กำลังบันทึก..." : "บันทึก"}
      </Button>
    </form>
  );
}
