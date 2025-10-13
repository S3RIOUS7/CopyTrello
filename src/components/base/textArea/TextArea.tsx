import { memo, useEffect, useRef, type TextareaHTMLAttributes } from "react";
import '../../../styles/baseComponentsStyles/textAreaStyle.scss'


type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

interface TextAreaProps extends HTMLTextAreaProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  autoResize?: boolean;
}

export const TextArea = memo((props: TextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const {
    className,
    value,
    onChange,
    placeholder,
    autofocus,
    autoResize = false,
    ...otherProps
  } = props;

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  useEffect(() => {
    if (autoResize && ref.current) {
      const textarea = ref.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="text-area-container">
      <textarea
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={`textAreaField ${className}`}
        {...otherProps}
      />
    </div>
  );
});