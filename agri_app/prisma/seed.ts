import { PrismaClient, EnvironmentType, InterventionType, PlantStatus, PlantType, TaskPriority, TaskStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@bb1studio.local";
  const operatorEmail = "operator@bb1studio.local";

  const adminPasswordHash = await bcrypt.hash("Admin123!", 10);
  const operatorPasswordHash = await bcrypt.hash("Operator123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: UserRole.SUPER_ADMIN,
      passwordHash: adminPasswordHash,
      name: "Super Admin",
    },
    create: {
      email: adminEmail,
      name: "Super Admin",
      role: UserRole.SUPER_ADMIN,
      passwordHash: adminPasswordHash,
    },
  });

  const operator = await prisma.user.upsert({
    where: { email: operatorEmail },
    update: {
      role: UserRole.OPERATOR,
      passwordHash: operatorPasswordHash,
      name: "Operatore 1",
    },
    create: {
      email: operatorEmail,
      name: "Operatore 1",
      role: UserRole.OPERATOR,
      passwordHash: operatorPasswordHash,
    },
  });

  const lemon = await prisma.plant.upsert({
    where: { code: "TREE-001" },
    update: {},
    create: {
      code: "TREE-001",
      name: "Limone grande",
      type: PlantType.TREE,
      environment: EnvironmentType.OUTDOOR,
      species: "Citrus limon",
      variety: "Femminello",
      zoneName: "Zona A",
      status: PlantStatus.ACTIVE,
      notes: "Albero seed iniziale",
    },
  });

  const tomato = await prisma.plant.upsert({
    where: { code: "PLANT-001" },
    update: {},
    create: {
      code: "PLANT-001",
      name: "Pomodoro serra 1",
      type: PlantType.PLANT,
      environment: EnvironmentType.INDOOR,
      species: "Solanum lycopersicum",
      variety: "Cherry",
      status: PlantStatus.ACTIVE,
      notes: "Pianta indoor seed iniziale",
    },
  });

  const irrigation = await prisma.intervention.findFirst({
    where: { plantId: lemon.id, title: "Irrigazione iniziale" },
  });

  if (!irrigation) {
    await prisma.intervention.create({
      data: {
        plantId: lemon.id,
        type: InterventionType.IRRIGATION,
        title: "Irrigazione iniziale",
        description: "Intervento seed di test",
        waterLiters: 8,
        operatorName: "Super Admin",
      },
    });
  }

  const measurement = await prisma.intervention.findFirst({
    where: { plantId: tomato.id, title: "Misurazione settimanale" },
  });

  if (!measurement) {
    await prisma.intervention.create({
      data: {
        plantId: tomato.id,
        type: InterventionType.MEASUREMENT,
        title: "Misurazione settimanale",
        description: "Controllo altezza pianta indoor",
        heightCm: 32,
        operatorName: "Operatore 1",
      },
    });
  }

  const today = new Date();
  today.setHours(9, 0, 0, 0);

  const existingTask = await prisma.task.findFirst({
    where: {
      plantId: lemon.id,
      title: "Controllo irrigazione limone",
    },
  });

  let taskId = existingTask?.id;

  if (!existingTask) {
    const task = await prisma.task.create({
      data: {
        plantId: lemon.id,
        title: "Controllo irrigazione limone",
        description: "Verifica umidità e irrigazione del limone principale",
        dueDate: today,
        priority: TaskPriority.MANDATORY,
        status: TaskStatus.SCHEDULED,
        assignedToUserId: operator.id,
        createdByUserId: admin.id,
      },
    });
    taskId = task.id;
  }

  if (taskId) {
    const proposal = await prisma.taskProposal.findFirst({
      where: { taskId, title: "Prossimo controllo fitosanitario" },
    });

    if (!proposal) {
      await prisma.taskProposal.create({
        data: {
          taskId,
          plantId: lemon.id,
          proposedByUserId: operator.id,
          title: "Prossimo controllo fitosanitario",
          type: InterventionType.PHYTOSANITARY,
          scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          notes: "Proposta seed per approvazione",
        },
      });
    }
  }

  const notification = await prisma.appNotification.findFirst({
    where: {
      userId: admin.id,
      title: "Benvenuto in Agri App",
    },
  });

  if (!notification) {
    await prisma.appNotification.create({
      data: {
        userId: admin.id,
        title: "Benvenuto in Agri App",
        message: "Sistema inizializzato correttamente.",
        href: "/dashboard",
      },
    });
  }

  console.log("Seed completato.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
