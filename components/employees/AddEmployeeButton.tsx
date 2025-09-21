"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "../providers/ModalProvider";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeFormData } from "@/lib/validations/employee";
import { useState } from "react";

export default function AddEmployeeButton() {
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: EmployeeFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");

      alert("เพิ่มพนักงานสำเร็จ");
      closeModal();
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={() =>
        openModal(
          <>
            <EmployeeForm onSubmit={handleCreate} loading={loading} />
          </>,
          "เพิ่มพนักงาน",
          "กรุณากรอกข้อมูลพนักงานให้ครบทุกช่อง"
        )
      }
    >
      + เพิ่มพนักงาน
    </Button>
  );
}
