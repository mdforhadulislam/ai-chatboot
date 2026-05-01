import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@inbocart.ai';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'Admin';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, name: adminName },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
    },
  });

  console.log('Admin user created/updated:', admin.email);
  await prisma.$disconnect();
}

createAdmin().catch((error) => {
  console.error('Error creating admin:', error);
  process.exit(1);
});

