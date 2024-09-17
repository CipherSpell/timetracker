"use client";

import React, { useState } from "react";
import { Input } from "./Input";
// import { login } from "./LoginActions";
import Link from "next/link";

interface FormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const [formInfo, setFormInfo] = useState<FormData>({
        email: "",
        password: "",
    });

    return (
        <div className="bg-black grid place-items-center h-screen">
            <div className="rounded-lg bg-stone-900 px-10 py-10 w-96">
                <h2 className="text-white text-center text-2xl mb-12">
                    Timekeeper 
                </h2>
                <form>
                    <div>
                        <label className="text-white mb-2 block text-sm leading-none">
                            Email address
                        </label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            onChange={(e) =>
                                setFormInfo({
                                    ...formInfo,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="text-white mb-2 block text-sm leading-none">
                            Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="************"
                            type="password"
                            onChange={(e) =>
                                setFormInfo({
                                    ...formInfo,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <button
                            className="bg-white rounded-md w-full text-sm py-1"
                            // formAction={login}
                        >
                            Sign in
                        </button>
                        <hr className="border-subtle my-8" />
                    </div>
                </form>
                <Link href="/signup">
                    <button className="bg-white rounded-md w-full text-sm py-1">
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    );
};
