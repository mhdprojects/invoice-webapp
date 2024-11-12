import { InputHTMLAttributes } from 'react';
import {SidebarTrigger} from "@/Components/ui/sidebar";
import {Separator} from "@/Components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/Components/ui/breadcrumb"

export default function BreadcrumbHeader({listItems} : { listItems: string[] }) {
    return (
        <header
            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Breadcrumb>
                    <BreadcrumbList>
                        {
                            listItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <BreadcrumbItem className="hidden md:block">
                                        {
                                            (index+1 < listItems.length) ? <BreadcrumbLink href="#">
                                                {item}
                                            </BreadcrumbLink> : <BreadcrumbPage>{item}</BreadcrumbPage>
                                        }
                                    </BreadcrumbItem>
                                    {
                                        (index + 1 < listItems.length) && <BreadcrumbSeparator className="hidden md:block"/>
                                    }
                                </div>
                            ))
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
