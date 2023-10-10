import type { ClothingItem } from "@prisma/client";
import { prisma } from "../db.server";

export async function getClothingItems() {
    return prisma.clothingItem.findMany();
}

export async function getClothingItem(slug: string) {
    return prisma.clothingItem.findUnique({ where: { slug } });
}

export async function deleteClothingItem(slug: string) {
    return prisma.clothingItem.delete({ where: { slug } })
}

export async function updateClothingItem(slug: string, item: Pick<ClothingItem, "wornCount">) {
    return prisma.clothingItem.update({ data: item, where: { slug } })
}