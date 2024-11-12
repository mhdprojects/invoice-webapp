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
import {Client} from "@/Pages/Client/ClientType";

export default function ClientForm({title, form} : PageProps<{
    title: string,
    form?: Client
}>) {
    let breadcrumbLabel: string[] = ["Home", "Client", "Form"]
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        name: form?.name,
        email: form?.email,
        phone: form?.phone,
        address: form?.address,
        city: form?.city,
        province: form?.province,
        country: form?.country,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if(form === null){
            post(route("client.store"));
        }else{
            put(route("client.update", form?.id));
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
                            <CardTitle className="text-lg">Form Add Client</CardTitle>
                        </CardHeader>
                        <Separator/>
                        <CardContent className="py-4">
                            <div className="grid gap-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={data.name}
                                    required
                                    onChange={(s) => setData('name', s.target.value)}
                                />
                                <InputError className="" message={errors.name}/>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Label>Email Address</Label>
                                <Input
                                    value={data.email}
                                    required
                                    onChange={(s) => setData('email', s.target.value)}
                                />
                                <InputError className="" message={errors.email}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>Phone Number</Label>
                                <Input
                                    value={data.phone}
                                    required
                                    onChange={(s) => setData('phone', s.target.value)}
                                />
                                <InputError className="" message={errors.phone}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>Address</Label>
                                <Textarea
                                    value={data.address}
                                    onChange={(s) => setData('address', s.target.value)}/>
                                <InputError className="" message={errors.address}/>
                            </div>

                            <div className="mt-4 grid gap-2">
                                <Label>City</Label>
                                <Input
                                    value={data.city}
                                    onChange={(s) => setData('city', s.target.value)}
                                />
                                <InputError className="" message={errors.city}/>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Label>State / Province</Label>
                                <Input
                                    value={data.province}
                                    onChange={(s) => setData('province', s.target.value)}
                                />
                                <InputError className="" message={errors.province}/>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Label>Country</Label>
                                <Input
                                    value={data.country}
                                    onChange={(s) => setData('country', s.target.value)}
                                />
                                <InputError className="" message={errors.country}/>
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
