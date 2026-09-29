import React, {useId} from "react";

const Input = React.forwardRef(function Input({ label, type = "text", className="", ...props }, ref) {
    const id = useId();
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                type={type}
                className={`rounded-md border text-black border-blue-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${className}`}
                {...props}
            />
        </div>
    )
});

export default Input;