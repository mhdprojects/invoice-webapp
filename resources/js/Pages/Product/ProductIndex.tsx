import {Head, Link, useForm} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout";
import BreadcrumbHeader from "@/Components/layout/breadcrumb-header";
import {PageProps} from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {Button} from "@/Components/ui/button";
import {Pencil, Trash} from "lucide-react";
import { useState} from "react";
import ConfirmDelete from "@/Components/layout/confirm-delete";
import {Product} from "@/Pages/Product/ProductType";

export default function ProductIndex({title, data, flash} : PageProps<{
    title: string,
    data: Array<Product>
}>) {
    let breadcrumbLabel: string[] = ["Home", "Product"]
    const [showDelete, setShowDelete] = useState(false)
    const [deleteModel, setDeleteModel] = useState<Product | null>(null)

    const {
        delete: destroy,
        processing,
    } = useForm({});

    const deleted = () => {
        if (deleteModel !== null){
            destroy(route('product.delete', deleteModel.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModel(null)
                    setShowDelete(false)
                },
            })
        }
    }

    return (
        <AdminLayout>
            <Head title={title}/>

            <BreadcrumbHeader listItems={breadcrumbLabel}/>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={route('product.form')}>Add Product</Link>
                    </Button>
                </div>

                <div className="bg-background rounded-md border border-foreground/20">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[100px]">#</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{ item.name }</TableCell>
                                        <TableCell>{ item.price }</TableCell>
                                        <TableCell>{ item.description }</TableCell>
                                        <TableCell className="text-right flex items-center gap-1">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={route('product.edit', item.id)}><Pencil/></Link>
                                            </Button>
                                            <Button onClick={() => {
                                                setDeleteModel(item)
                                                setShowDelete(true)
                                            }} variant="destructive" size="icon"><Trash/></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

            <ConfirmDelete open={showDelete} setOpen={() => setShowDelete(!showDelete)} processing={processing} onConfirm={async () =>  deleted()}/>
        </AdminLayout>
    );
}
