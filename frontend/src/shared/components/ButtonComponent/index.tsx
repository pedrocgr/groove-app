import React from "react";
import { ButtonWrapper } from "./style";

interface ButtonProps {
  primary?: boolean;
  customStyle?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  data_cy-topRated?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  primary,
  customStyle,
  children,
  onClick,
  isActive,
  data_cy-topRated,
}) => {
  return (
    <ButtonWrapper
      primary={primary}
      style={{
        ...customStyle,
      }}
      onClick={onClick}
      data-cy={data_cy-topRated}
    >
      {children}
    </ButtonWrapper>
  );
};

export default ButtonComponent;
