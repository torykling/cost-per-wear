import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getClothingItem, deleteClothingItem } from "~/models/clothing-item.server";
import { costPerWear } from "~/utils";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    const item = await getClothingItem(params.slug || "");
    return json({ item });
};

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "delete") {
        await deleteClothingItem(params.slug || "");
        return redirect("/clothing-items");
    }
}

export default function ClothingItem() {
    const { item } = useLoaderData<typeof loader>();
    if (!item) return null;

    return (
        <>
            <h1>
                {item.name}
            </h1>
            <p>{item.slug}</p>
            <p>{costPerWear(item)}</p>
            <form method="POST">
                <button type="submit" value="delete" name="intent">Delete</button>
            </form>
        </>
    );
}