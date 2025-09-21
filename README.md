//ลบ migrations ทั้งหมด
rm -rf prisma/migrations

//รีเซ็ตฐานข้อมูล (ล้างทุก table + data)
npx prisma migrate reset

//รัน migrations
npx prisma migrate dev --name init

npx prisma studio


///////// library /////////

npm install react-hook-form
npm install zod 
npm install @hookform/resolvers

npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input