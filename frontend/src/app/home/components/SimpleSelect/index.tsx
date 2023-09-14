import React from 'react';
import { Select } from 'antd';
import { Label } from '../Input/styles';

import { ReactSelectContainer } from './style';

export type Item = {
  label: string;
  value: string | number;
};

interface Props {
  placeholder?: string;
  showSearch?: boolean;
  label?: string;
  options: Item[];
  value?: string | undefined;
  required?: boolean;
  id?: string;
  className?: string;
  width?: string;
  isAble?: boolean;
  data_cy?: string;
  styles?: React.CSSProperties;
  defaultValue?: string;
  setValue?: (value: any) => void;
  onSearch?: (value: string) => void;
}

const SimpleSelect: React.FC<Props> = ({
  placeholder,
  showSearch = true,
  label,
  options,
  value,
  data_cy,
  setValue,
  width,
  required = false,
  onSearch = () => null,
  id,
  className,
  isAble = true,
  styles,
  defaultValue,
}) => {
  const handleChange = (value: string) => {
    setValue?.(value);
  };

  const handleSearch = (value: string) => {
    if (value) {
      onSearch(value);
    }
  };

  return (
    <ReactSelectContainer
      style={{ width, ...styles }}
      aria-required={required}
      className={className}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select
        defaultValue={defaultValue}
        disabled={!isAble}
        data-cy={data_cy}
        showSearch={showSearch}
        id={id}
        options={options}
        onClick={(e) => e.stopPropagation()}
        value={value}
        onSearch={handleSearch}
        onChange={handleChange}
        placeholder={placeholder}
        filterOption={(input, option) => {
          const currentOption = options.find(
            ({ value }) => value === option?.value,
          );
          if (currentOption?.label)
            return (
              currentOption.label.toLowerCase().indexOf(input.toLowerCase()) >=
              0
            );
          return true;
        }}
      />
    </ReactSelectContainer>
  );
};

export default SimpleSelect;
