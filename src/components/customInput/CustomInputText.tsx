/* eslint-disable */
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  useRef,
} from 'react';
import s from './CustomInputText.module.css';

// default input prop type
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  isActiveEditMode?: boolean;
};

const CustomInputText: React.FC<SuperInputTextPropsType> = ({
  type,
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  isActiveEditMode,

  ...restProps
}) => {
  const input = useRef<HTMLInputElement>();

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    onEnter && e.key === 'Enter' && onEnter();
  };

  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
  const finalInputClassName = `${s.input} ${
    error ? s.errorInput : s.superInput
  } ${className}`;

  return (
    <>
      <input
        id="submittext"
        ref={input as any}
        type={'text'}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  );
};

export default CustomInputText;
