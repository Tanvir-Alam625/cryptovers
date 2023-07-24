import { FiChevronDown, FiX } from 'react-icons/fi';
import ReactSelect, {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  Props,
  components as Base,
} from 'react-select';
import { twMerge } from 'tailwind-merge';

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  size?: 'sm' | 'md' | 'lg';
  isValid?: boolean;
  classConfig?: Props<Option, IsMulti, Group>['classNames'];
} & Omit<Props<Option, IsMulti, Group>, 'classNames'>;

const classMap = {
  control:
    'relative w-full text-sm rounded bg-transparent flex relative items-center border border-dark-200 dark:border-dark-600',

  menuList: 'mt-1 text-sm border text-dark-800 bg-white shadow-lg rounded dark:bg-dark-700 dark:text-dark-100',
  input: 'text-sm',
  placeholder: 'text-dark-400',
  singleValue: 'text-dark-800 dark:text-dark-100',
  valueContainer: 'px-4 flex gap-1',
  groupHeading: 'text-xs text-dark-600 uppercase tracking-wider px-3 py-2 font-bold',
  size: {
    sm: {
      placeholder: 'text-xs leading-5',
      control: 'py-1',
      input: 'text-xs py-1 leading-5',
    },
    md: {
      placeholder: 'text-sm',
      control: 'py-2',
      input: 'text-sm py-2',
    },
    lg: {
      placeholder: 'text-base',
      control: 'py-2',
      input: 'text-base py-2',
    },
  },
};

const Select = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
  className,
  components,
  classConfig,
  placeholder = 'Select',
  isSearchable = false,
  size = 'md',
  isValid,
  ...rest
}: SelectProps<Option, IsMulti, Group>) => {
  const IndicatorSeparator = () => null;

  const DropdownIndicator = (props: DropdownIndicatorProps<Option, IsMulti, Group>) => {
    return (
      <Base.DropdownIndicator {...props} className="px-2">
        <FiChevronDown className="h-5 text-dark-400 group-hover:text-dark-500" />
      </Base.DropdownIndicator>
    );
  };

  const ClearIndicator = (props: ClearIndicatorProps<Option, IsMulti, Group>) => (
    <Base.ClearIndicator {...props}>
      <FiX className="text-dark-400 hover:text-dark-500" />
    </Base.ClearIndicator>
  );

  return (
    <ReactSelect
      components={{
        IndicatorSeparator,
        DropdownIndicator,
        ClearIndicator,
        ...components,
      }}
      className={twMerge('react-select group w-full', className)}
      classNames={{
        input: () => twMerge(classMap.input, classMap.size[size].input),
        menu: () => '!z-10',
        menuList: () => classMap.menuList,
        control: ({ isFocused, isDisabled }) =>
          twMerge(
            classMap.control,
            classMap.size[size].control,
            isFocused && '!border-primary-500 ring-1 ring-primary-500',
            isValid && '!border-success-500',
            isValid === false && '!border-danger-500',
            isValid && isFocused && '!ring-1 !ring-success-500',
            isValid === false && isFocused && '!ring-1 !ring-danger-500',
            isDisabled && 'bg-dark-100 dark:bg-dark-700',
            isSearchable && 'py-0'
          ),
        container: ({ isDisabled }) => (isDisabled ? '!pointer-events-auto cursor-not-allowed' : ''),
        placeholder: () => twMerge(classMap.placeholder, classMap.size[size].placeholder),
        option: ({ isFocused, isSelected }) =>
          twMerge(
            'px-4 py-2',
            isFocused && 'bg-primary-100 dark:bg-dark-600',
            isSelected && '!bg-primary-500 !text-primary-100'
          ),
        singleValue: () => classMap.singleValue,
        multiValue: () => 'text-xs rounded bg-primary-100 text-primary-500 overflow-hidden',
        multiValueLabel: () => 'px-1.5 py-0.5',
        multiValueRemove: () => 'cursor-pointer hover:bg-primary-200 px-0.5',
        valueContainer: () => classMap.valueContainer,
        groupHeading: () => classMap.groupHeading,
        ...classConfig,
      }}
      placeholder={placeholder}
      isSearchable={isSearchable}
      styles={{
        control: () => ({}),
      }}
      unstyled
      {...rest}
    />
  );
};

export default Select;
