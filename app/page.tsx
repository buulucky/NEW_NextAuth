"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state
  if (status === "loading") return <p>Loading...</p>;

  // ถ้ายังไม่ได้ login
  if (!session) {
    return (
      <div>
        <p>คุณยังไม่ได้เข้าสู่ระบบ</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => signIn()}
        >
          เข้าสู่ระบบ
        </button>
      </div>
    );
  }

  // Logged in
  return (
    <div>
      <p>สวัสดี {session.user.name}</p>
      <p>Role: {session.user.role}</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}
