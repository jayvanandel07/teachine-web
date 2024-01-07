import { FC, PropsWithChildren } from "react";

interface ButtonProps {
    onClick: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, onClick }) => {
    return (
        <div className={"button-styles"} onClick={onClick}>
            {children}
        </div>
    );
};

export default Button;
