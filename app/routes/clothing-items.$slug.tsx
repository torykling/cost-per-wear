import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getClothingItem } from "~/models/clothing-item.server";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    const item = await getClothingItem(params.slug || "");
    return json({ item });
};

export default function ClothingItem() {
    const { item } = useLoaderData<typeof loader>();
    return (
        <>
            <h1>
                {item?.name}
            </h1>
            <p>{item?.slug}</p>
        </>
    );
}