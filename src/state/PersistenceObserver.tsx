import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { themeAtom } from 'state/atoms/styleAtom';
import { authAtom } from 'state/atoms/authAtom';

export default function DebugObserver() {
	useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
		// window.myDebugState = {
		// 	a: snapshot.getLoadable(atomA).contents,
		// 	b: snapshot.getLoadable(atomB).contents,
		// };
		const { key, value } = { key: 'theme', value: snapshot.getLoadable(themeAtom).contents };
		typeof value === 'string' && localStorage.setItem(key, value);
	});
	return null;
}
