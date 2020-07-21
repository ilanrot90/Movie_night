import React from 'react';
import { useForm } from 'react-hook-form';
import { FormValues, LoginTypes } from 'types';
import { FormBlock, LoginButton } from './style';
import TextInput from 'components/common-ui/TextInput';
import { get, startCase } from 'utils/lodash.utils';

const SimpleForm = ({ fields, onSubmit }: { onSubmit: (values: FormValues) => void; fields: Array<LoginTypes> }) => {
	const {
		register,
		handleSubmit,
		errors,
		// formState: { isSubmitting },
		// setError,
	} = useForm<FormValues>({});

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

			<LoginButton type={'submit'} fullWidth onClick={handleSubmit(onSubmit)}>
				log in
			</LoginButton>
		</FormBlock>
	);
};

export default React.memo(SimpleForm);
