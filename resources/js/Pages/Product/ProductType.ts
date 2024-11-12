export interface Product{
    id: string,
    name: string,
    price: number,
    min_qty: number,
    max_qty: number,
    description?: string,
    image?: string,
}
