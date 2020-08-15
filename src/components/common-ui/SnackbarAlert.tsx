import React, { FC } from 'react';
// components
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => {
	return <MuiAlert data-testid={'error-msg'} elevation={6} variant="filled" {...props} />;
};

type Props = {
	open: boolean;
	error: string | null;
	handleResetError: () => void;
	autoHideDuration?: number;
};

const SnackbarAlert: FC<Props> = ({ open, autoHideDuration = 3000, handleResetError, error }) => (
	<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleResetError}>
		<Alert onClose={handleResetError} severity="error">
			{error}
		</Alert>
	</Snackbar>
);

export default React.memo(SnackbarAlert);
