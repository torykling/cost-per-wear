type ClothingItem = {
    name: string;
    slug: string;
    priceCents: number;
    wornCount: number;
};

export async function getClothingItems(): Promise<Array<ClothingItem>> {
    return [
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
}