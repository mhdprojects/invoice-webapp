import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Head title="Login"/>

            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your email below to register to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Full Name</Label>
                                <Input
                                    value={data.name}
                                    onChange={(s) => setData('name', s.target.value)}
                                    id="email"
                                    type="text"
                                    required
                                />
                                <InputError className="" message={errors.name}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={data.email}
                                    onChange={(s) => setData('email', s.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                <InputError className="" message={errors.email}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password"
                                       value={data.password}
                                       onChange={(s) => setData('password', s.target.value)}
                                       type="password" required/>
                                <InputError className="" message={errors.password}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Confirmastion Password</Label>
                                <Input id="password_confirmation"
                                       value={data.password_confirmation}
                                       onChange={(s) => setData('password_confirmation', s.target.value)}
                                       type="password_confirmation" required/>
                                <InputError className="" message={errors.password_confirmation}/>
                            </div>
                            <Button disabled={processing} type="submit" className="w-full">
                                Register
                            </Button>
                            <Button variant="outline" className="w-full">
                                Sign Up with Google
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Do have an account?{" "}
                        <Link href={route('login')} className="underline">
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
