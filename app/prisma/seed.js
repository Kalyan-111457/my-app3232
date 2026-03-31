require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../app/generated/prisma");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be defined");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {
      fullname: "Admin",
      phone: "9876543210",
      bio: "System administrator",
      password: "Admin@123",
      resumeurl: null,
      isAdmin: "admin",
      isDeleted: false
    },
    create: {
      email: "admin@gmail.com",
      fullname: "Admin",
      phone: "9876543210",
      bio: "System administrator",
      password: "Admin@123",
      resumeurl: null,
      isAdmin: "admin",
      isDeleted: false
    }
  });

  console.log("Admin seed completed:", admin.email);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
