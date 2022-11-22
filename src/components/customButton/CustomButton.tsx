/* eslint-disable */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import s from './CustomButton.module.scss';

// default button prop type
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

const CustomButton: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  ...restProps
}) => {
  const finalClassName = `${red ? s.red : s.default} ${className}`;

  return <button className={finalClassName} {...restProps} />;
};

export default CustomButton;
