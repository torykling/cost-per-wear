import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getClothingItem, deleteClothingItem, updateClothingItem } from "~/models/clothing-item.server";
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
    const wornCount = formData.get("wornCount")
    const slug = params.slug || "";

    if (intent === "delete") {
        await deleteClothingItem(slug);
        return redirect("/clothing-items");
    } else if (wornCount) {
        await updateClothingItem(slug, { wornCount: parseInt(wornCount as string) })
        return null;
    }
}

export default function ClothingItem() {
    const { item } = useLoaderData<typeof loader>();
    if (!item) return null;

    return (
        <>
            <div className="card">
                <h1>
                    {item.name}
                </h1>
                <p>{costPerWear(item)}</p>
                <p>Worn {item.wornCount} times</p>
            </div>
            <form method="POST">
                <button
                    type="submit"
                    className="btn btn-delete"
                    value="delete"
                    name="intent"
                >
                    Delete
                </button>
                <button
                    type="submit"
                    className="btn btn-small"
                    value={item.wornCount - 1}
                    name="wornCount"
                    disabled={item.wornCount === 0}
                >
                    -
                </button>
                Update worn count
                <button
                    type="submit"
                    className="btn btn-small"
                    value={item.wornCount + 1}
                    name="wornCount"
                >
                    +
                </button>
            </form>
        </>
    );
}