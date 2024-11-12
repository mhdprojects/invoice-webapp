import {Client} from "@/Pages/Client/ClientType";
import {Product} from "@/Pages/Product/ProductType";

export interface InvoiceType{
    id: string,
    code: string,
    date: Date,
    contact: Client,
    ref_no?: string,
    due_date?: Date,
    subtotal: number,
    disc_type?: string,
    disc_amount: number,
    disc_percent: number,
    total: number,
    description: string,
    items: Array<InvoiceItem>
}

export interface InvoiceItem{
    id: string,
    product: Product,
    qty: number,
    price: number,
    subtotal: number,
}
