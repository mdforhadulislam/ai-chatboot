import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedBusinessSettings() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.businessSettings.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        businessName: 'My Business',
        autoReplyEnabled: true,
        aiModel: 'gpt-4.1-mini',
      },
    });
  }

  console.log('Business settings seeded');
  await prisma.$disconnect();
}

seedBusinessSettings().catch((error) => {
  console.error('Error seeding business settings:', error);
  process.exit(1);
});

