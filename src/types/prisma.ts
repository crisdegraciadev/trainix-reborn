import { PrismaClient } from "@prisma/client";

export type PrismaTx = Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0];
