interface Item {
    wornCount: number;
    priceCents: number;
}

export const costPerWear = <T extends Item>(item: T): string => {
    const wornCount = item.wornCount || 1
    return centsToDollarString((item.priceCents / wornCount))
}

const centsToDollarString = (cents: number): string => `$${(cents / 100).toFixed(2)}`

export const dollarsToCents = (dollars: string): number => parseInt(dollars) * 100