import { ColorType, SizeType } from '@/types';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  variant?: 'solid' | 'outline' | 'soft' | 'plain';
  size?: SizeType;
  color?: ColorType;
  rounded?: boolean;
  block?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, disabled, variant = 'solid', size = 'md', color = 'primary', rounded, block, ...rest },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          `btn btn-${color}-${variant} btn-${size}`,
          rounded && 'rounded-full',
          block && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
