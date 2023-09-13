import styled from 'styled-components';
import Theme from '../../global/styles/theme';
import GlobalTheme from '../../global/styles/theme';
import { flexcc, flex } from '../../global/styles/variables'

interface AlertProps{
  color: string,
}

interface ButtonProps{
  color: string,
}
interface backgroundDiv {
  type: string,
}

export const BackgroundDiv = styled.div`
width: ${(props: backgroundDiv) => props.type == 'question' ? `100vw`: 0};
height: ${(props: backgroundDiv) => props.type == 'question' ? `100vw`: 0};;
background-color: ${(props: backgroundDiv) => props.type == 'question'? `rgba(0,0,0,0.5)`: null };
position: fixed;
z-index: 5000;
`

export const AlertCard = styled.div`
  background-color: ${(props: AlertProps) => props.color};
  position: fixed;
  ${flex('center', 'center', 'column')};
  bottom: 60px;
  padding: 20px;
  transition: transform .3s ease-in-out, opacity .3s ease-in-out;
  left: 33%;

  z-index: 5001;
  width: 500px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  svg g path {
    fill: ${(props: AlertProps) => props.color !== 'white' ? `${Theme.colors.white}` : 'black' };
  }

  .buttons {
    width: 50%;
  }
`;

export const Text = styled.p`
  color: ${(props: AlertProps) => props.color !== 'white' ? `${Theme.colors.white}` : 'black' };
  font-size: 0.9rem;

  text-align: center;
`;

export const Title = styled.h1`
  color: ${(props: AlertProps) => props.color !== 'white' ? `${Theme.colors.white}` : 'black' };
  font-size: 1rem;
  margin-bottom: 10px;

  font-weight: 600;
  text-align: center;
`;

export const ExcludeButton = styled.button`
  width: 30px;
  height: 30px;
  transition: transform .3s ease-in-out;
  padding: 4px;
  align-self: flex-end;

  justify-self: flex-start;
  margin-left: 30px;
  outline: none;
  border-radius: 100px;
  ${flexcc};
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${flexcc};

  :hover {
    background-color: ${Theme.colors.gray};

    svg g path {
      fill: ${Theme.colors.black};
    }
  };
`;

export const Button = styled.button`
  height: 36px;
  width: 88px;
  cursor: pointer;
  background-color: ${(props: ButtonProps) => props.color};
  border: none;

  font-weight: 600;
  font-size: 13px;
  color: ${(props: ButtonProps) => props.color === 'white' ? `${GlobalTheme.colors.darkBlue}` : 'white'};
  border: 1px solid ${(props: ButtonProps) => props.color === 'white' && `${GlobalTheme.colors.darkBlue}`};
  outline: none;
  :hover {
    opacity: 0.7;
  }
`;