import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { hash } from 'bcryptjs';
import path from 'path';

const dbPath = path.join(__dirname, 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Seeding database...');

  // Create social platforms
  const platforms = await Promise.all([
    prisma.socialPlatform.upsert({
      where: { name: 'Instagram' },
      update: {},
      create: {
        name: 'Instagram',
        icon: 'instagram',
        color: '#E4405F',
        maxCaptionLength: 2200,
        supportsVideo: true,
        supportsCarousel: true,
        isActive: true,
      },
    }),
    prisma.socialPlatform.upsert({
      where: { name: 'Facebook' },
      update: {},
      create: {
        name: 'Facebook',
        icon: 'facebook',
        color: '#1877F2',
        maxCaptionLength: 63206,
        supportsVideo: true,
        supportsCarousel: true,
        isActive: true,
      },
    }),
    prisma.socialPlatform.upsert({
      where: { name: 'LinkedIn' },
      update: {},
      create: {
        name: 'LinkedIn',
        icon: 'linkedin',
        color: '#0A66C2',
        maxCaptionLength: 3000,
        supportsVideo: true,
        supportsCarousel: true,
        isActive: true,
      },
    }),
  ]);

  console.log('Created platforms:', platforms.map(p => p.name));

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@socialscheduler.com' },
    update: {},
    create: {
      email: 'admin@socialscheduler.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('Created admin user:', admin.email);

  // Create moderator user
  const moderatorPassword = await hash('moderator123', 12);
  const moderator = await prisma.user.upsert({
    where: { email: 'moderator@socialscheduler.com' },
    update: {},
    create: {
      email: 'moderator@socialscheduler.com',
      password: moderatorPassword,
      name: 'Moderator User',
      role: 'MODERATOR',
      isActive: true,
    },
  });

  console.log('Created moderator user:', moderator.email);

  // Create sample clients
  const clients = await Promise.all([
    prisma.client.upsert({
      where: { id: 'client-1' },
      update: {},
      create: {
        id: 'client-1',
        name: 'TechStart Inc.',
        email: 'contact@techstart.com',
        company: 'TechStart Inc.',
        brandTone: 'PROFESSIONAL',
        industry: 'Technology',
        website: 'https://techstart.com',
        description: 'A cutting-edge technology startup focused on AI solutions',
        userId: admin.id,
        isActive: true,
      },
    }),
    prisma.client.upsert({
      where: { id: 'client-2' },
      update: {},
      create: {
        id: 'client-2',
        name: 'Fresh Eats',
        email: 'hello@fresheats.com',
        company: 'Fresh Eats Restaurant',
        brandTone: 'FRIENDLY',
        industry: 'Food & Beverage',
        website: 'https://fresheats.com',
        description: 'Farm-to-table restaurant serving organic cuisine',
        userId: admin.id,
        isActive: true,
      },
    }),
    prisma.client.upsert({
      where: { id: 'client-3' },
      update: {},
      create: {
        id: 'client-3',
        name: 'FitLife Gym',
        email: 'info@fitlifegym.com',
        company: 'FitLife Fitness',
        brandTone: 'INSPIRATIONAL',
        industry: 'Health & Fitness',
        website: 'https://fitlifegym.com',
        description: 'Premium fitness center with personal training',
        userId: admin.id,
        isActive: true,
      },
    }),
  ]);

  console.log('Created clients:', clients.map(c => c.name));

  // Create social accounts for each client
  for (const client of clients) {
    for (const platform of platforms) {
      await prisma.socialAccount.create({
        data: {
          accountName: `${client.name} ${platform.name}`,
          username: `@${client.name.toLowerCase().replace(/\s+/g, '')}`,
          clientId: client.id,
          platformId: platform.id,
          isConnected: true, // Mock connected status
          followerCount: Math.floor(Math.random() * 50000) + 1000,
        },
      });
    }
  }

  console.log('Created social accounts for all clients');

  // Create sample posts for the first client
  const instagramAccount = await prisma.socialAccount.findFirst({
    where: {
      clientId: 'client-1',
      platform: { name: 'Instagram' },
    },
    include: { platform: true },
  });

  if (instagramAccount) {
    const post = await prisma.post.create({
      data: {
        title: 'Product Launch Announcement',
        caption: 'Excited to announce our latest innovation! Stay tuned for more details. #TechStart #Innovation #AI',
        hashtags: '#TechStart #Innovation #AI #Technology',
        mediaType: 'IMAGE',
        status: 'SCHEDULED',
        aiGenerated: false,
        clientId: 'client-1',
        createdById: admin.id,
        platformSchedules: {
          create: {
            scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            status: 'SCHEDULED',
            socialAccountId: instagramAccount.id,
            platformId: instagramAccount.platformId,
          },
        },
      },
    });

    console.log('Created sample post:', post.title);
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
