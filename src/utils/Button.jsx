import { cn } from "./cn";
export const Button = ({
    type = "button",
    className,
    text,
    onClick,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                `
          w-full py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold shadow-sm
          transition-colors duration-300

          text-gray-800 

          bg-gradient-to-r from-btnGrFromLight to-btnGrToLight
          hover:from-btnGrFromLightHover hover:to-btnGrToLight
        `,
                className
            )}
        >
            {text}
        </button>
    );
};


export const BackButton = ({
    className,
    text,
    onClick,
}) => {
    return (
        <p className={cn(`text-center text-textGrayMedium text-xs`, className)}>
            <span className="text-base bg-gradient-to-r from-backBtnGrFromLight to-backBtnGrToLight hover:from-backBtnGrToLight hover:to-backBtnGrFromLight  text-transparent cursor-pointer hover:underline transition-colors duration-300" onClick={onClick}>{text}</span>
        </p>
    );
}