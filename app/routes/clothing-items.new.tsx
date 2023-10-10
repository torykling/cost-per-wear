import { useActionData } from '@remix-run/react'
import { redirect } from "@remix-run/node"
import { prisma } from '~/db.server'

export const action = async ({ request }) => {
    const form = await request.formData()
    const name = form.get('name');
    const slug = name.replace(/[\s_]+/g, '-')
        .toLowerCase();
    const priceCents = parseInt(form.get('priceCents'))

    const fields = { name, slug, priceCents, wornCount: 0 }

    const item = await prisma.clothingItem.create({ data: { ...fields } })

    return redirect(`/clothing-items/${item.slug}`)
}

export default function New() {
    const actionData = useActionData()
    return (<>
        <h1>New Clothing Item</h1>
        <form method='POST'>
            <div>
                <label htmlFor='name'>Item Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    defaultValue={actionData?.fields?.name}
                />
            </div>
            <div>
                <label htmlFor='priceCents'>Cost</label>
                <input
                    type='number'
                    name='priceCents'
                    id='priceCents'
                    defaultValue={actionData?.fields?.priceCents}
                />
            </div>
            <button type='submit' >
                Add
            </button>
        </form>
    </>)
}