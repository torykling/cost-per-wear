import { json } from "@remix-run/node";
import { getClothingItems } from "~/models/clothing-item.server"
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
    return json({ clothingItems: await getClothingItems() });
};

export default function ClothingItems() {
    const { clothingItems } = useLoaderData<typeof loader>();

    return (
        <main>
            <h1>Wardrobe</h1>
            <Link to="/clothing-items/new">Add clothing item</Link>
            <ul>
                {clothingItems.map(item => (
                    <Link
                        to={item.slug}
                        key={item.slug}
                    >
                        {item.name}
                    </Link>
                ))}
            </ul>
        </main>
    )
}