import React from 'react';
import CounterContainer from './styles';
import { Label } from '../Input/styles';
import { FlexContainer } from '../../global/styles/components';
import { InputNumber } from 'antd';

function Counter({ label, value, setValue, id, max, className, data_cy }: { label: string, value: number,
  data_cy: string ,setValue: Function, id?: string, max?: number, className?: string }){

  const handleChange = (value?: number | string) => {
    console.log('---------2312-12-123123')
    
    console.log(value)
    console.log('---------2312-12-123123')
    setValue(value)
  }

  return(
    <FlexContainer className={className} justify='flex-start' align='flex-start' direction='column' >
      {label && (
        <Label htmlFor={id}>
          {label}
        </Label>
      )}
      <CounterContainer>
        <InputNumber
          data-cy={data_cy}
          id={id}
          min={1}
          max={max}
          placeholder='0'
          size='small'
          value={value}
          //@ts-ignore
          onChange={(value) => handleChange(value)}
        />
      </CounterContainer>
    </FlexContainer>
  );
}

export default Counter;