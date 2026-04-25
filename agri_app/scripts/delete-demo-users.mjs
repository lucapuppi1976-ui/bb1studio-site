import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_EMAILS = [
  "admin@bb1studio.local",
  "operator@bb1studio.local",
  "admin@finca.local",
  "operatore@finca.local",
  "operator@finca.local",
];

async function main() {
  const deleted = await prisma.user.deleteMany({
    where: {
      email: {
        in: DEMO_EMAILS,
      },
    },
  });

  console.log(`Utenti demo eliminati: ${deleted.count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
