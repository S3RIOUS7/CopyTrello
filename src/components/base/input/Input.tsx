import { memo, useEffect, useRef, type ChangeEvent, type InputHTMLAttributes } from "react";
import '../../../styles/baseComponentsStyles/inputContainer.scss'
import { SearchIcon } from "../../../assets/img/icon/SearchIcon";


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  withSearchIcon?: boolean;
}
export const Input = memo((props: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const {
    className,
    type = 'text',
    value,
    onChange,
    placeholder,
    autofocus,
    withSearchIcon = false,
    ...otherProps
  } = props;

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="input-container">
      {withSearchIcon && (
        <div className="search-icon">
          <SearchIcon />
        </div>
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={`inputField ${className} ${withSearchIcon ? 'with-search-icon' : ''}`}
        {...otherProps} 
        min={type === 'number' ? '1' : undefined}
      />
    </div>
  );
});