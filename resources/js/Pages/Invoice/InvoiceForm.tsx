import {PageProps} from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import {Head,  useForm} from "@inertiajs/react";
import BreadcrumbHeader from "@/Components/layout/breadcrumb-header";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card";
import {Separator} from "@/Components/ui/separator";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {InputError} from "@/Components/ui/input-error";
import {Textarea} from "@/Components/ui/textarea";
import {Button} from "@/Components/ui/button";
import {Transition} from "@headlessui/react";
import {FormEventHandler} from "react";
import { InvoiceType } from "@/Pages/Invoice/InvoiceType";
import DatePicker from "@/Components/layout/date-picker";
import {Client} from "@/Pages/Client/ClientType";
import {Product} from "@/Pages/Product/ProductType";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/ui/table";
import { Trash} from "lucide-react";
import axios from "axios";
import InputNumber from "@/Components/layout/input-number";
import LabelNumber from "@/Components/layout/label-number";

interface InvoiceForm {
    id?: string,
    code?: string,
    date?: Date,
    contact_id?: string,
    ref_no?: string,
    due_date?: Date,
    subtotal?: number,
    disc_type?: string,
    disc_amount?: number,
    disc_percent?: number,
    total?: number,
    description?: string,
    items: Array<InvoiceDetailForm>
}

interface InvoiceDetailForm {
    id?: string,
    product_id?: string,
    qty: number,
    price: number,
    subtotal: number,
}

export default function InvoiceForm({title, form, clients, products, disctypes}: PageProps<{
    title: string,
    form?: InvoiceForm,
    clients: Array<Client>,
    products: Array<Product>
    disctypes: Array<string>
}>){
    const breadcrumbLabel: string[] = ["Home", "Invoice", "Form"]
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm<InvoiceForm>(form)

    console.log(form)

    const addRow = () => {
        let model = data.items
        model.push({
            id: "",
            product_id: "",
            qty: 0,
            price: 0,
            subtotal: 0
        })

        setData('items', model)
    }

    const detailProduct = (val: string, index: number) => {
        const model = data.items
        axios.get<Product>(route('product.show', val))
            .then(response => {
                model[index].product_id  = val
                model[index].price  = response.data.price
                model[index].qty    = response.data.min_qty ?? 1
                model[index].subtotal = model[index].qty * model[index].price

                calculateItems(model)
            })
    }

    const onChangeQtyItem = (val: number, index: number) => {
        const model = data.items
        model[index].qty      = val
        model[index].subtotal = model[index].qty * model[index].price

        calculateItems(model)
    }

    const onChangePrice = (val: number, index: number) => {
        const model = data.items
        model[index].price    = val
        model[index].subtotal = model[index].qty * model[index].price

        calculateItems(model)
    }

    const calculateItems = (list: Array<InvoiceDetailForm>) => {
        let subtotal: number = 0
        list.forEach((value) => {
            subtotal += value.subtotal
        })

        let discAmount: number = data.disc_amount ?? 0
        let discPercent: number = data.disc_percent ?? 0
        if(data.disc_type !== null || data.disc_type === ""){
            if (subtotal > 0 && data.disc_type === 'Percent'){
                discAmount = subtotal * discPercent / 100
            }
        }

        const newData = {
            subtotal: subtotal,
            disc_percent: discPercent,
            disc_amount: discAmount,
            total: subtotal - discAmount,
            items: list
        }

        setData({...data, ...newData})
    }

    const deleteRow = (index: number) => {
        const model = data.items
        model.splice(index, 1)

        calculateItems(model)
    }

    const onChangeDiscAmount = (value: number) => {
        const total = data.subtotal ?? 0 - value

        const newData = {
            disc_amount: value,
            disc_percent: 0,
            total: total,
        }

        setData({...data, ...newData})
    }

    const onChangeDiscPercent = (value: number) => {
        let discAmount: number = 0
        const subtotal: number = data.subtotal ?? 0
        if(value > 0 && subtotal > 0){
            discAmount = subtotal  * value /100
        }
        const total = subtotal - discAmount

        const newData = {
            disc_amount: discAmount,
            disc_percent: value,
            total: total,
        }

        setData({...data, ...newData})
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if(form?.id === ''){
            post(route("invoice.store"));
        }else{
            put(route("invoice.update", form?.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={title}/>

            <BreadcrumbHeader listItems={breadcrumbLabel}/>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Form Add Invoice</CardTitle>
                        </CardHeader>
                        <Separator/>
                        <CardContent className="py-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>No. Transaction</Label>
                                    <Input
                                        className="bg-destructive-foreground"
                                        value={data.code}
                                        placeholder="Auto No. Transaction"
                                        readOnly
                                        onChange={(s) => setData('code', s.target.value)}
                                    />
                                    <InputError className="" message={errors.code}/>
                                </div>

                                <div className="grid gap-2">
                                    <Label>Transaction Date *</Label>
                                    <DatePicker
                                        date={data.date}
                                        onChange={(d?: Date) => setData('date', d)}/>
                                    <InputError className="" message={errors.date}/>
                                </div>
                            </div>

                            <div className="mt-6 grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Client *</Label>
                                    <Select defaultValue={data.contact_id} onValueChange={(s) => setData('contact_id', s)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue defaultValue={data.contact_id} placeholder="Select Client"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                clients.map((item, index) => (
                                                    <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <InputError className="" message={errors.contact_id}/>
                                </div>

                                <div className="grid gap-2">
                                    <Label>No. Ref</Label>
                                    <Input
                                        value={data.ref_no}
                                        placeholder="No. ref"
                                        onChange={(s) => setData('ref_no', s.target.value)}
                                    />
                                    <InputError className="" message={errors.ref_no}/>
                                </div>
                            </div>

                            <div className="mt-6 grid sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Due Date</Label>
                                    <DatePicker
                                        date={data.due_date}
                                        onChange={(d?: Date) => setData('due_date', d)}/>
                                    <InputError className="" message={errors.due_date}/>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Table>
                                    <TableHeader className="bg-secondary text-foreground font-semibold">
                                        <TableRow>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead className="text-right">QTY</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-right">Line Total</TableHead>
                                            <TableHead className="w-[100px]">#</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            data.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">
                                                        <Select defaultValue={item.product_id} onValueChange={(s) => detailProduct(s, index)}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue defaultValue={item.product_id} placeholder="Select Product"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    products.map((item, index) => (
                                                                        <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <InputNumber value={item.qty} onChangeValue={(s) => onChangeQtyItem(s, index)}/>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <InputNumber value={item.price} onChangeValue={(s) => onChangePrice(s, index)}/>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <LabelNumber value={item.subtotal}/>
                                                    </TableCell>
                                                    <TableCell className="text-right flex items-center gap-1">
                                                        <Button type="button" onClick={() => deleteRow(index)} variant="destructive" size="icon"><Trash/></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                                <Separator/>
                                <div className="mt-1 w-full">
                                    <Button onClick={addRow} type="button" variant="ghost" className="w-full">Add Row</Button>
                                </div>
                            </div>

                            <div className="mt-4 grid sm:grid-cols-2 gap-4 items-start">
                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={data.description}
                                        onChange={(s) => setData('description', s.target.value)}/>
                                    <InputError className="" message={errors.description}/>
                                </div>

                                <div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label>Disc Type</Label>
                                            <Select defaultValue={data.disc_type} onValueChange={(s) => setData('disc_type', s)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue defaultValue={data.disc_type}
                                                                 placeholder="Select Disc Type"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        disctypes.map((item, index) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <InputError className="" message={errors.disc_type}/>
                                        </div>
                                        {
                                            data.disc_type !== null && <div className="grid gap-2">
                                                {
                                                    data.disc_type === 'Fixed' && <>
                                                        <Label>Discount</Label>
                                                        <InputNumber value={data.disc_amount ?? 0}
                                                                     onChangeValue={(s) => onChangeDiscAmount(s)}/>
                                                        <InputError className="" message={errors.disc_type}/>
                                                    </>
                                                }

                                                {
                                                    data.disc_type === 'Percent' && <>
                                                        <Label>Discount</Label>
                                                        <InputNumber value={data.disc_percent ?? 0}
                                                                     onChangeValue={(s) => onChangeDiscPercent(s)}/>
                                                        <InputError className="" message={errors.disc_percent}/>
                                                    </>
                                                }
                                            </div>
                                        }
                                    </div>

                                    <Separator className="mt-2"/>
                                    <div className="grid grid-cols-2 py-4 items-center">
                                        <Label>Subtotal</Label>
                                        <LabelNumber value={data.subtotal ?? 0}/>
                                    </div>
                                    <Separator/>
                                    <div className="grid grid-cols-2 py-4 items-center">
                                        <Label>Discount</Label>
                                        <LabelNumber value={data.disc_amount ?? 0}/>
                                    </div>
                                    <Separator/>
                                    <div className="grid grid-cols-2 py-4 items-center">
                                        <Label>Total</Label>
                                        <LabelNumber value={data.total ?? 0}/>
                                    </div>
                                    <Separator/>
                                </div>
                            </div>

                        </CardContent>

                        <CardFooter className="mt-4">
                            <Button type="submit" disabled={processing} className="px-8">Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0">
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    )
}
