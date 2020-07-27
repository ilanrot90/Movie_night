import React, { useState, useCallback, FC, useRef } from 'react';
import styled from 'styled-components';
import Icon from 'components/common-ui/icon';
import IconButton from '@material-ui/core/IconButton';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { isEmpty } from 'utils/lodash.utils';

interface IProps {
	callBack: (v: string) => void;
	placeholder?: string;
}

const SearchInput: FC<IProps> = ({ callBack, placeholder = 'Search' }) => {
	const [value, setValue] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const containerRef = useOnClickOutside(
		useCallback(() => {
			isEmpty(value) && setOpen(false);
		}, [value])
	);

	const inputRef = useRef<HTMLInputElement>(null);

	const focusInput = useCallback(() => {
		setOpen(true);
		inputRef?.current?.focus();
	}, []);

	const useValue = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
			callBack(event.target.value);
		},
		[setValue, callBack]
	);

	return (
		<Styled.fieldWrapper ref={containerRef}>
			<Styled.textInput ref={inputRef} onChange={useValue} value={value} placeholder={placeholder} open={open} />
			<Styled.icon onClick={focusInput}>
				<Icon name={'search'} />
			</Styled.icon>
		</Styled.fieldWrapper>
	);
};

interface ITextInput {
	placeholder?: string;
	open: boolean;
}
const Styled = {
	fieldWrapper: styled.div`
		position: relative;
		display: flex;
		align-items: center;
		width: 140px;
	`,
	textInput: styled.input.attrs(({ placeholder, open }: ITextInput) => ({
		type: 'text',
		placeholder: open ? placeholder : '',
	}))<ITextInput>`
		position: absolute;
		right: 0;
		padding: 6px 12px;
		height: 28px;
		border-radius: 40px;
		background-color: ${({ theme }) => theme.background};
		color: ${({ theme }) => theme.contrastText};
		outline: none;
		border: none;
		transition: width 0.2s ease-in;
		width: ${({ open }) => (open ? 120 : 17)}px;
	`,
	icon: styled(IconButton)`
		position: absolute;
		right: 0;
		width: 40px;
		height: 40px;
		background-color: ${({ theme }) => theme.background};
	`,
};

export default React.memo(SearchInput);
