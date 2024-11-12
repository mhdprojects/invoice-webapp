import { Head } from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout";
import BreadcrumbHeader from "@/Components/layout/breadcrumb-header";
import {PageProps} from "@/types";

export default function Dashboard({title} : PageProps<{title: string}>) {
    let breadcrumbLabel: string[] = ["My Apps", "Dashboard"]

    return (
        <AdminLayout>
            <Head title={title}/>

            <BreadcrumbHeader listItems={breadcrumbLabel}/>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                    <div className="aspect-video rounded-xl bg-muted/50"/>
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"/>
            </div>
        </AdminLayout>
    );
}
