import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT 1 as ok`;
  console.log("DB smoke test ok:", result);
}

main()
  .catch((error) => {
    console.error("DB smoke test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
