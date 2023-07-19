import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: React.ReactNode;
  bordered?: boolean;
  clickable?: boolean;
  onClick?: () => void;
};

const Card = ({ className, children, bordered, clickable, onClick, ...rest }: CardProps) => {
  return (
    <div
      className={twMerge(
        'w-full rounded-primary bg-white transition-all duration-300 dark:bg-slate-800',
        bordered ? 'border dark:border-slate-700' : 'shadow',
        clickable && 'cursor-pointer hover:shadow-lg',
        className
      )}
      onClick={() => clickable && onClick?.()}
      {...rest}
    >
      {children}
    </div>
  );
};

// Card Header
type CardHeaderProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Header = ({ className, children, ...rest }: CardHeaderProps) => {
  return (
    <div className={twMerge('border-b px-6 py-4 first:rounded-t-primary dark:border-slate-700', className)} {...rest}>
      {children}
    </div>
  );
};

// Card Title
type CardTitleProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const Title = ({ className, children, ...rest }: CardTitleProps) => {
  return (
    <h4 className={twMerge('text-lg font-semibold', className)} {...rest}>
      {children}
    </h4>
  );
};

// Card Subtitle
type CardSubtitleProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

const Subtitle = ({ className, children, ...rest }: CardSubtitleProps) => {
  return (
    <p className={twMerge('text-sm text-slate-400', className)} {...rest}>
      {children}
    </p>
  );
};

// Card Text
type CardTextProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

const Text = ({ className, children, ...rest }: CardTextProps) => {
  return (
    <div className={twMerge('text-sm text-slate-600 dark:text-slate-300', className)} {...rest}>
      {children}
    </div>
  );
};

// Card Body
type CardBodyProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Body = ({ className, children, ...rest }: CardBodyProps) => {
  return (
    <div className={twMerge('p-6 first:rounded-t-primary', className)} {...rest}>
      {children}
    </div>
  );
};

// Card Footer
type CardFooterProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Footer = ({ className, children, ...rest }: CardFooterProps) => {
  return (
    <div className={twMerge('border-t px-6 py-4 last:rounded-b-primary dark:border-slate-700', className)} {...rest}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Text = Text;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
