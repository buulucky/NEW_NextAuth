project-root/
│── app/                     # Next.js App Router (routes อยู่ที่นี่)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── employees/           # route สำหรับพนักงาน
│   │   └── page.tsx
│   └── api/                 # API routes
│       ├── employees/route.ts
│       └── companies/route.ts
│
│── components/              # UI components ที่ reusable
│   ├── EmployeeTable.tsx
│   └── Layout/
│       └── Navbar.tsx
│
│── lib/                     # Business logic / utilities
│   ├── api/                 # service สำหรับ fetch API
│   │   ├── employees.ts
│   │   └── companies.ts
│   ├── prisma.ts            # Prisma client
│   └── auth.ts              # Auth.js config
│
│── types/                   # TypeScript types (interfaces)
│   ├── employee.ts
│   └── company.ts
│
│── prisma/                  # Prisma schema + migrations
│   ├── schema.prisma
│   └── migrations/
│
│── styles/                  # global styles (ถ้าใช้ tailwind ก็อยู่ global.css)
│── tsconfig.json            # path alias config
│── package.json

//ลบ migrations ทั้งหมด
rm -rf prisma/migrations

//รีเซ็ตฐานข้อมูล (ล้างทุก table + data)
npx prisma migrate reset

//รัน migrations
npx prisma migrate dev --name init

npx prisma studio