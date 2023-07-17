import { ChangeEventHandler, InputHTMLAttributes, KeyboardEventHandler, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export interface Props {
  isFocused?: boolean;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
}

const SearchBox = ({ isFocused, defaultValue, className, placeholder, onChange, onKeyDown, input }: Props) => {
  const element = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isFocused && element.current) {
      element.current.focus();
    }
  }, []);
  return (
    <div
      className={twMerge(
        'group inline-flex h-10 w-full items-center overflow-hidden rounded-primary border border-slate-300 shadow-sm focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 dark:border-slate-600',
        className
      )}
    >
      <div className={'flex h-full items-center px-3'}>
        <FiSearch className="text-slate-400 group-focus-within:text-primary-500 " />
      </div>
      <input
        ref={element}
        className={
          'h-full w-full border-transparent bg-transparent px-0 text-sm placeholder-slate-400 placeholder:text-sm focus:border-transparent focus:outline-none focus:ring-0'
        }
        placeholder={placeholder || 'Search'}
        type="text"
        defaultValue={defaultValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...input}
      />
    </div>
  );
};

export default SearchBox;
