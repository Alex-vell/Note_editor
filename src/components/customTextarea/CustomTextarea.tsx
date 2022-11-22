/* eslint-disable */
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  KeyboardEvent, TextareaHTMLAttributes,
  useRef,
} from 'react';
import s from './CustomTextarea.module.css';

// default input prop type
type DefaultTextareaPropsType = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
    >;

type SuperInputTextPropsType = DefaultTextareaPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  isActiveEditMode?: boolean;
};

const CustomTextarea: React.FC<SuperInputTextPropsType> = ({
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
  const input = useRef<HTMLTextAreaElement>();

  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyPress && onKeyPress(e);

    onEnter && e.key === 'Enter' && onEnter();
  };

  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
  const finalInputClassName = `${s.textarea} ${
    error ? s.errorInput : s.customTextarea
  } ${className}`;

  return (
    <>
      <textarea
        id="submittext"
        rows={5}
        ref={input as any}
        onChange={onChangeCallback}
        // value={value}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  );
};

export default CustomTextarea;
