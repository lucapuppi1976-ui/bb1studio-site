import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const [, , email, password, roleArg = "OPERATOR", ...rest] = process.argv;
const name = rest.join(" ").trim();

const validRoles = new Set(["SUPER_ADMIN", "OPERATOR"]);

async function main() {
  if (!email || !password) {
    console.error("Uso: node scripts/create-user.mjs EMAIL PASSWORD [SUPER_ADMIN|OPERATOR] [NOME]");
    process.exit(1);
  }

  if (!validRoles.has(roleArg)) {
    console.error("Ruolo non valido. Usa SUPER_ADMIN oppure OPERATOR.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: roleArg,
      name: name || undefined,
    },
    create: {
      email,
      passwordHash,
      role: roleArg,
      name: name || email.split("@")[0],
    },
  });

  console.log("Utente pronto:", {
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
