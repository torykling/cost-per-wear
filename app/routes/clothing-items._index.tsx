import { json } from "@remix-run/node";
import { getClothingItems } from "~/models/clothing-item.server"
import { Link, useLoaderData } from "@remix-run/react";
import { costPerWear } from '~/utils'

export const loader = async () => {
    return json({ clothingItems: await getClothingItems() });
};

export default function ClothingItems() {
    const { clothingItems } = useLoaderData<typeof loader>();

    return (
        <>
            <h1>Wardrobe</h1>
            <Link to="/clothing-items/new" className="btn">Add clothing item</Link>
            <ul>
                {clothingItems.map(item => (
                    <div key={item.slug} className="card">
                        <Link to={item.slug}>{item.name}</Link>
                        <p>cost per wear: {costPerWear(item)}</p>
                    </div>
                ))}
            </ul>
        </>
    )
}