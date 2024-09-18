"use client";

import React, { useState } from "react";
import { Input } from "../../Input";
// import { signup } from './login/LoginActions'
import Link from "next/link";

interface FormData {
    email: string;
    username: string;
    password: string;
}

export const RegistrationForm: React.FC = () => {
    const [formInfo, setFormInfo] = useState<FormData>({
        email: "",
        username: "",
        password: "",
    });

    return (
        <div className="bg-black grid place-items-center h-screen">
            <div className="rounded-lg bg-stone-900 px-10 py-10 w-96">
                <h2 className="text-white text-center text-2xl mb-12">
                    Timetracker 
                </h2>
                {/* <form> */}
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
                            Username
                        </label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={(e) =>
                                setFormInfo({
                                    ...formInfo,
                                    username: e.target.value,
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
                            //   formAction={signup}
                        >
                            Sign Up
                        </button>
                    </div>
                {/* </form> */}
                <hr className="border-subtle my-8" />
                <Link href="/login">
                    <button className="bg-white rounded-md w-full text-sm py-1">
                        Already have an account? Login
                    </button>
                </Link>
            </div>
        </div>
    );
};
