import React, { FC, unstable_useTransition, useCallback } from 'react';
import MaterialButton, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
type social = 'facebook' | 'google' | 'github' | undefined;

interface Interface extends ButtonProps {
	onClick: () => void;
	socialType?: social;
	loading?: boolean;
	testId?: string;
}

const StyledBtn = styled(({ socialType, ...props }: Interface) => <MaterialButton {...props} />)<{ socialType: social }>`
	height: 40px;
	background-color: ${({ socialType }) =>
		socialType &&
		{
			facebook: '#3b5998',
			google: '#dd4b39',
			github: '#333333',
		}[socialType]};
	&:hover {
		background-color: ${({ socialType, theme }) =>
			socialType
				? {
						facebook: '#2b56b1',
						google: '#e23824',
						github: '#2d2c2c',
				  }[socialType]
				: theme.light};
		box-shadow: 0 14px 26px -12px rgba(51, 51, 51, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12),
			0 8px 10px -5px rgba(51, 51, 51, 0.2);
	}
	&.MuiButton-contained.Mui-disabled {
		color: ${({ theme }) => theme.contrastText};
		opacity: 0.5;
		background-color: ${({ theme }) => theme.main};
	}
`;

const Button: FC<Interface> = ({
	children,
	testId = 'btn',
	loading = false,
	variant = 'contained',
	color = 'primary',
	className,
	disabled,
	fullWidth,
	onClick,
	socialType,
	type,
	...rest
}) => {
	const [startTransition] = unstable_useTransition({
		timeoutMs: 5000,
	});

	const handleClick = useCallback(() => {
		startTransition(() => {
			onClick();
		});
	}, [onClick, startTransition]);
	return (
		<StyledBtn
			data-testid={testId}
			variant={variant}
			color={color}
			className={className}
			disabled={disabled}
			fullWidth={fullWidth}
			onClick={handleClick}
			socialType={socialType}
			{...rest}
		>
			{loading ? <CircularProgress color={'secondary'} /> : children}
		</StyledBtn>
	);
};

export default React.memo<Interface>(Button);
