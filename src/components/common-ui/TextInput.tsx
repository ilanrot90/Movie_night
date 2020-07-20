import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
type variant = 'outlined' | 'filled' | undefined;
interface IProps {
	name: string;
	label: string;
	variant?: variant;
	required?: boolean;
	fullWidth?: boolean;
}

const TextInput = React.forwardRef(({ variant, required, label, fullWidth, name, ...props }: IProps, register) => {
	return (
		<TextField
			id={`${name}_input`}
			name={name}
			label={label}
			fullWidth={fullWidth}
			required={required}
			variant="outlined"
			{...props}
			inputRef={register}
		/>
	);
});

const Input = styled(TextInput)`
	height: 80px;
`;

export default React.memo(Input);
