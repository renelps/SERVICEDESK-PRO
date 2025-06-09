import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : globalForPrisma.prisma ?? (globalForPrisma.prisma = new PrismaClient());

export default prisma;