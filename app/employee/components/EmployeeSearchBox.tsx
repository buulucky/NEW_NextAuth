// app/employee/components/EmployeeSearchBox.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


interface Props {
  onSearch: (value: string) => void;
}

export function EmployeeSearchBox({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ค้นหาพนักงาน..."
        className="border rounded px-3 py-2 w-64"
      />
      <Button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ค้นหา
      </Button>
    </form>
  );
}
