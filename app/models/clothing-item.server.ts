import { prisma } from "../db.server";

export async function getClothingItems() {
    return prisma.clothingItem.findMany();
}