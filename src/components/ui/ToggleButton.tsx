import { ReactNode } from 'react';

type ToggleButtonProps = {
	offIcon: ReactNode;
	onIcon: ReactNode;
	onToggle: (toggled: boolean) => void;
	toggled: boolean;
};

export default function ToggleButton({ offIcon, onIcon, onToggle, toggled }: ToggleButtonProps) {
	const handleToggle = () => {
		onToggle(!toggled);
	};

	return <button onClick={handleToggle}>{toggled ? onIcon : offIcon}</button>;
}
