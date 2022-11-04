import { Employee } from '@prisma/client';
import { prisma } from '../prismaCLient';

async function main() {
  const employees: Employee[] = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@teste.com',
      role: 'admin',
      password: '$argon2id$v=19$m=65536,t=3,p=4$IsG95R4GvEPwsEO0r6V+dQ$LCqH34N5tMgrrelcmFORChu2pDygqTnjrMTuIO6JBy0',
      //        123456
    },
  ];

  setTimeout(async () => {
    for (const employee of employees) {
      await prisma.employee.create({
        data: { ...employee },
      });
    }
  }, 1000);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });