import { prisma } from "../db.server";

export async function getClothingItems() {
    return prisma.clothingItem.findMany();
}

export async function getClothingItem(slug: string) {
    return prisma.clothingItem.findUnique({ where: { slug } });
}