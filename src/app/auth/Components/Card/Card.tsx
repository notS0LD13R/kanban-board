"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./Card.scss";
import { login, register } from "../../services/api";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

type props_T = {
    isRegister: boolean;
    handleSwitch: () => void;
    className: string;
};

export default function Card({ className, handleSwitch, isRegister }: props_T) {
    const {
        register: registerForm,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            ...(isRegister && { confirm_password: "" }),
        },
    });
    const router = useRouter();

    const handleValidation = (values: { [key: string]: string }) => {
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let isError = false;
        if (!emailReg.test(values.email)) {
            isError = true;
            setError("email", { message: "Invalid email" });
        }
        if (values.password === "") {
            isError = true;
            setError("password", { message: "Invalid password" });
        } else if (isRegister) {
            if (!(values.password === values.confirm_password)) {
                isError = true;
                setError("confirm_password", { message: "Password mismatch" });
            }
        }

        return isError;
    };
    const errorHandler = (msg: string) => {
        toast.error(msg);
    };
    const successHandler = (msg: string) => {
        toast.success(msg);
        router.push("/dashboard");
    };
    const onSubmit = handleSubmit((values) => {
        if (handleValidation(values)) return;
        if (isRegister)
            register({
                email: values.email,
                password: values.password,
                success: successHandler,
                error: errorHandler,
            });
        else
            login({
                email: values.email,
                password: values.password,
                success: successHandler,
                error: errorHandler,
            });
    });

    return (
        <>
            <Toaster richColors />
            <div className={`auth-card flex-col ${className}`}>
                <div className="flex-col">
                    <h2>{isRegister ? "Get started" : "Welcome back"}</h2>
                    <span>Enter your email & password</span>
                </div>
                <form onSubmit={onSubmit} className="flex-col">
                    <div className="input-container flex-col">
                        <div className="input-pair">
                            <span className="error-msg">
                                {errors.email?.message}
                            </span>
                            <input
                                type="text"
                                {...registerForm("email")}
                                placeholder="Email"
                                className={errors.email && "error"}
                            />
                        </div>
                        <div className="input-pair">
                            <span className="error-msg">
                                {errors.password?.message}
                            </span>
                            <input
                                type="password"
                                {...registerForm("password")}
                                placeholder="Password"
                                className={errors.password && "error"}
                            />
                        </div>

                        {isRegister && (
                            <div className="input-pair">
                                <span className="error-msg">
                                    {errors.confirm_password?.message}
                                </span>
                                <input
                                    type="password"
                                    {...registerForm("confirm_password")}
                                    placeholder="Confirm Password"
                                    className={
                                        errors.confirm_password && "error"
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="button-container flex-col">
                        <input
                            type="submit"
                            value={isRegister ? "REGISTER" : "LOGIN"}
                        />
                        <span>
                            {!isRegister ? (
                                <>
                                    New here?{" "}
                                    <u
                                        onClick={() => {
                                            reset();
                                            handleSwitch();
                                        }}
                                    >
                                        Register
                                    </u>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <u
                                        onClick={() => {
                                            reset();
                                            handleSwitch();
                                        }}
                                    >
                                        Login
                                    </u>
                                </>
                            )}
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}
