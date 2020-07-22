import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, LoginTypes } from 'types';
import { FormBlock, LoginButton } from './style';
import TextInput from 'components/common-ui/TextInput';
import { get, startCase } from 'utils/lodash.utils';
import { ErrorOption } from 'react-hook-form/dist/types/form';

type SetError = (name: 'displayName' | 'email' | 'password' | 'passwordConfirm', errorOption: ErrorOption) => void;
const SimpleForm = ({
	fields,
	onSubmit,
	buttonText,
	buttonProps,
}: {
	onSubmit: (values: FormValues, setError: SetError) => void;
	fields: Array<LoginTypes>;
	buttonText: string;
	buttonProps?: { disabled: boolean };
}) => {
	const {
		register,
		handleSubmit,
		errors,
		// formState: { isSubmitting },
		setError,
	} = useForm<FormValues>({});

	const submitFormWithProps = useCallback(
		(data: FormValues) => {
			onSubmit(data, setError);
		},
		[setError, onSubmit]
	);

	return (
		<FormBlock>
			{fields.map(({ name, placeholder = name, registerProps, type, label }) => (
				<TextInput
					key={name}
					placeholder={placeholder}
					fullWidth
					type={type}
					label={startCase(label || name)}
					name={name}
					error={!!errors[name]}
					helperText={get(errors, `${name}.message`)}
					ref={register(registerProps)}
				/>
			))}

			<LoginButton type={'submit'} fullWidth onClick={handleSubmit(submitFormWithProps)} {...buttonProps}>
				{buttonText}
			</LoginButton>
		</FormBlock>
	);
};

export default React.memo(SimpleForm);
