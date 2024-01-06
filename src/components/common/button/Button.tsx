import { FC, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, onClick }) => {
  return (
    <div className={styles["button-styles"]} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
