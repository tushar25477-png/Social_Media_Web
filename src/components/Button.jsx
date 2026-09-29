function Button({ 
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    hoverBgColor = "hover:bg-blue-600",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${hoverBgColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;