import React, { FC } from "react";
import MaterialButton, { ButtonProps } from "@material-ui/core/Button";
import styled from "styled-components";

interface Interface extends ButtonProps {
  onClick: () => void;
}

const StyledBtn = styled(MaterialButton)``;


const Button: FC<Interface> = ({
  children,
  variant = "contained",
  color = "primary",
  className,
  disabled,
  fullWidth,
    onClick,
  ...rest
}) => {
  console.log(color)
  return (
    <StyledBtn
      variant={variant}
      color={color}
      className={className}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledBtn>
  );
};

export default React.memo<Interface>(Button);
