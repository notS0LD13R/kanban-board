import React from "react";
import { useForm } from "react-hook-form";
import "./Card.scss";

type props_T = {
    isRegister: boolean;
    handleSwitch: () => void;
    className: string;
};

export default function Card({ className, handleSwitch, isRegister }: props_T) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});
    const onSubmit = handleSubmit((values) => {
        console.log(values);
    });
    return (
        <div className={`auth-card flex-col ${className}`}>
            <div className="flex-col">
                <h2>{isRegister ? "Get started" : "Welcome back"}</h2>
                <span>Enter your email & password</span>
            </div>
            <form onSubmit={onSubmit} className="flex-col">
                <div className="input-container flex-col">
                    <input
                        type="text"
                        {...register("email")}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                    />
                    {isRegister && (
                        <input
                            type="password"
                            {...register("confirm-password")}
                            placeholder="Confirm Password"
                        />
                    )}
                </div>
                <div className="button-container flex-col">
                    <input
                        type="submit"
                        value={isRegister ? "REGISTER" : "LOGIN"}
                    />
                    <span>
                        {isRegister ? (
                            <>
                                New here? <u onClick={handleSwitch}>Register</u>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <u onClick={handleSwitch}>Login</u>
                            </>
                        )}
                    </span>
                </div>
            </form>
        </div>
    );
}
