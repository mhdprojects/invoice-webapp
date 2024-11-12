import {Head, useForm} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout";
import BreadcrumbHeader from "@/Components/layout/breadcrumb-header";
import {PageProps} from "@/types";
import {Button} from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {Separator} from "@/Components/ui/separator";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {Textarea} from "@/Components/ui/textarea";
import {InputError} from "@/Components/ui/input-error";
import {Transition} from "@headlessui/react";
import {FormEventHandler} from "react";
import {Product} from "@/Pages/Product/ProductType";

export default function ProductForm({title, form} : PageProps<{
    title: string,
    form?: Product
}>) {
    let breadcrumbLabel: string[] = ["Home", "Product", "Form"]
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        name: form?.name,
        price: form?.price,
        min_qty: form?.min_qty,
        max_qty: form?.max_qty,
        description: form?.description,
        image: form?.image,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if(form === null){
            post(route("product.store"));
        }else{
            put(route("product.update", form?.id));
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
                            <CardTitle className="text-lg">Form Add Product</CardTitle>
                        </CardHeader>
                        <Separator/>
                        <CardContent className="py-4">
                            <div className="grid gap-2">
                                <Label>Product Name</Label>
                                <Input
                                    value={data.name}
                                    required
                                    onChange={(s) => setData('name', s.target.value)}
                                />
                                <InputError className="" message={errors.name}/>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Label>Price</Label>
                                <Input
                                    value={data.price}
                                    required
                                    type="number"
                                    inputMode="numeric"
                                    onChange={(s) => setData('price', parseFloat(s.target.value))}
                                />
                                <InputError className="" message={errors.price}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>Minimal Purchase</Label>
                                <Input
                                    value={data.min_qty}
                                    required
                                    inputMode="numeric"
                                    type="number"
                                    onChange={(s) => setData('min_qty', parseFloat(s.target.value))}
                                />
                                <InputError className="" message={errors.min_qty}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>Maximal Purchase</Label>
                                <Input
                                    value={data.max_qty}
                                    required
                                    type="number"
                                    inputMode="numeric"
                                    onChange={(s) => setData('max_qty', parseFloat(s.target.value))}
                                />
                                <InputError className="" message={errors.min_qty}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={data.description}
                                    onChange={(s) => setData('description', s.target.value)}/>
                                <InputError className="" message={errors.description}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>Image URL</Label>
                                <Input
                                    value={data.image}
                                    onChange={(s) => setData('image', s.target.value)}
                                />
                                <InputError className="" message={errors.image}/>
                            </div>
                        </CardContent>

                        <CardFooter className="mt-4">
                            <Button type="submit" disabled={processing} className="px-8">Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
