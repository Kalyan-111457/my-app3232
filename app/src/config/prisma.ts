import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../app/generated/prisma";

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL must be defined");
}

const pool = new Pool({
    connectionString
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
    adapter
});
