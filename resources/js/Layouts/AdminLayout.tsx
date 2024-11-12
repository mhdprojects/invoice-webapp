import {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {
    BadgeCheck, ChevronRightIcon,
    ChevronsUpDown, Columns4Icon,
    GalleryVerticalEnd, GridIcon, LaptopMinimalIcon,
    LogOut,
    SquareUserRoundIcon,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
} from "@/Components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
} from "@/Components/ui/sidebar"
import {Link, usePage} from "@inertiajs/react";
import {Toaster} from "@/Components/ui/toaster";
import {useToast} from "@/hooks/use-toast";

const data = {
    app: {
        name: "Invoice App",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    },
    navMain: [
        {
            title: "Dashboard",
            url: route('dashboard'),
            icon: GridIcon,
            isActive: true,
        },
        {
            title: "Client",
            url: route('client.index'),
            icon: SquareUserRoundIcon,
            isActive: false,
        },
        {
            title: "Product",
            url: route('product.index'),
            icon: Columns4Icon,
            isActive: false,
        },
        {
            title: "Invoice",
            url: route('invoice.index'),
            icon: LaptopMinimalIcon,
            isActive: false,
        },
    ],
}

export default function AdminLayout({children,}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user
    const flash = usePage().props.flash

    const { toast } = useToast()

    useEffect(() => {
        if(flash.type !== null){
            if (flash.type === 'success'){
                toast({
                    variant: "default",
                    title: "Notification.",
                    description: flash.message,
                })
            }else{
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: flash.message,
                })
            }
        }
    }, [flash]);

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <data.app.logo className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {data.app.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {data.app.plan}
                                            </span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton tooltip={item.title} asChild>
                                        <Link href={item.url}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRightIcon className="ml-auto transition-transform duration-200" />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarFallback className="rounded-lg">
                                                    {user.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <Link className="w-full cursor-pointer" href={route('profile.edit')}>
                                                <BadgeCheck />
                                                Account
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link className="w-full cursor-pointer" method="post"
                                              href={route('logout')}
                                              as="button">
                                            <LogOut />
                                            Log out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                {children}

                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    )
}
