import type { ButtonHTMLAttributes, FC, ReactElement, ReactNode } from "react";

import '../../../styles/baseComponentsStyles/buttonStyles.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  buttonStyle: VariantButton;
  type?: ButtonType;
  isActive?: boolean; 
  icon?: ReactNode;
  label?:string;
  customClassName?: string;
}
type VariantButton = 'search' | 'icon' | 'create' | 'addCartButton'| 'addList';
type ButtonType = 'submit' | 'reset' | 'button';

const Button: FC<ButtonProps> = ({
  children,
  buttonStyle,
  type = 'button', // Меняем дефолтное значение на 'button'
  isActive = false,
  icon,
  label,
  customClassName,
  ...otherProps
}): ReactElement => {
 const buttonClassName = `buttonContainer ${buttonStyle} ${type} ${isActive ? 'active' : ''} ${customClassName || ''}`;

  return (
    <button className={buttonClassName} type={type} {...otherProps}>
      {icon && <span className="button-icon">{icon}</span>}
      {label || children}
    </button>
  );
};

export default Button;