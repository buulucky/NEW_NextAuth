"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>

  if (!session) {
    return (
      <div>
        <p>คุณยังไม่ได้เข้าสู่ระบบ</p>
        <button onClick={() => signIn()}>เข้าสู่ระบบ</button>
      </div>
    )
  }

  return (
    <div>
      <p>สวัสดี {session.user.name}</p>
      <p>Role: {session.user.role}</p>
      <button onClick={() => signOut()}>ออกจากระบบ</button>
    </div>
  )
}
