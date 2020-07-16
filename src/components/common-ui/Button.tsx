import React, { FC } from "react";
import MaterialButton, { ButtonProps } from "@material-ui/core/Button";
import styled from "styled-components";

interface Interface extends ButtonProps {
  as?: "span" | "div" | "button" | "undefined";
}

const StyledBtn = styled(({ as, ...other }) => <MaterialButton {...other} />)``;


const Button: FC<Interface> = ({
  children,
  variant = "contained",
  color = "primary",
  as = "button",
  className,
  disabled,
  fullWidth,
  ...rest
}) => {
  return (
    <StyledBtn
      variant={variant}
      color={color}
      className={className}
      disabled={disabled}
      fullWidth={fullWidth}
      // as={as}
      {...rest}
    >
      {children}
    </StyledBtn>
  );
};

export default React.memo<Interface>(Button);
