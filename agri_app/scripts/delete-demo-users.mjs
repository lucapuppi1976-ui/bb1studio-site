import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const standardDemoDomain = "bb1studio.local";
const legacyDemoDomain = "finca.local";

const DEMO_EMAILS = [
  ["admin", standardDemoDomain].join("@"),
  ["operator", standardDemoDomain].join("@"),
  ["admin", legacyDemoDomain].join("@"),
  ["operatore", legacyDemoDomain].join("@"),
  ["operator", legacyDemoDomain].join("@"),
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
