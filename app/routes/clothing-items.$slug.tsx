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
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {item?.name}
            </h1>
            <p>{item?.slug}</p>
        </main>
    );
}