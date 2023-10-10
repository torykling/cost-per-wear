import { redirect, ActionFunctionArgs } from "@remix-run/node"
import { prisma } from '~/db.server'
import { dollarsToCents } from '~/utils'

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    const name = form.get('name') as string || '';
    const slug = name.replace(/[\s_]+/g, '-')
        .toLowerCase();
    const priceCents = dollarsToCents(form.get('priceCents') as string || '')

    const fields = { name, slug, priceCents, wornCount: 0 }

    const item = await prisma.clothingItem.create({ data: { ...fields } })

    return redirect(`/clothing-items/${item.slug}`)
}

export default function New() {
    return (<>
        <h1>New Clothing Item</h1>
        <form method='POST' className="card">
            <div>
                <label htmlFor='name'>Item Name </label>
                <input
                    type='text'
                    name='name'
                    id='name'
                />
            </div>
            <div>
                <label htmlFor='priceCents'>Cost $</label>
                <input
                    type='number'
                    name='priceCents'
                    id='priceCents'
                />
            </div>
            <button type='submit' className="btn">
                Add
            </button>
        </form>
    </>)
}