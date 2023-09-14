import React, { useEffect, useState } from 'react';
import GlobalTheme from '../../global/styles/theme';
import { FlexContainer } from '../../global/styles/components';
import { AlertCard, ExcludeButton, Title, Text, Button, BackgroundDiv } from './styles';

export function GlobalAlert({ title, type, close, text, confirmButton }: { title: string, type: string, close: Function, text: string, confirmButton: Function }) {
  const [color, setColor] = useState('');

  useEffect(() => {
    if (type === 'error') {
      setColor(GlobalTheme.colors.red);
    } else if (type === 'question') {
      setColor('white');
    } else if (type === 'warning') {
      setColor('orange');
    } else {
      setColor('#4FA846');
    }
  }, [type]);

  useEffect(() => {
    if (type !== 'question') {
      setTimeout(() => {
        close()
      }, 4000);
    }
  }, []);

  return (
    <BackgroundDiv data-cy="alert_message_modal" type={type}>
      <AlertCard color={color}>
        {title && <Title color={color}>{title}</Title>}
        {text && <Text color={color}>{text}</Text>}
        {(type === 'question') && (
          <FlexContainer align="center" justify="space-between" className="buttons" direction="row">
            <Button color={'white'} onClick={() => close()}>Cancelar</Button>
            <Button color={GlobalTheme.colors.darkBlue} onClick={() => { confirmButton(); close(); }}>Confirmar</Button>
          </FlexContainer>
        )}
      </AlertCard>
    </BackgroundDiv>
  );
}

