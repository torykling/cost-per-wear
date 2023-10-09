import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const clothingItems = [
    {
        slug: "my-first-item",
        name: "My First clothing item",
        priceCents: 400,
        wornCount: 1,
    },
    {
        slug: "blue-shirt",
        name: "A blue shirt",
        priceCents: 1500,
        wornCount: 2
    },
];

async function seed() {
    for (const item of clothingItems) {
        await prisma.clothingItem.upsert({
            where: { slug: item.slug },
            update: item,
            create: item,
        });
    }
}

seed().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })