import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type ToggleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	offIcon: ReactNode;
	onIcon: ReactNode;
	onToggle: (toggled: boolean) => void;
	toggled: boolean;
};

export default function ToggleButton({ onClick, offIcon, onIcon, onToggle, toggled, ...rest }: ToggleButtonProps) {
	const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
		onToggle(!toggled);
		onClick && onClick(e);
	};

	return (
		<button onClick={handleToggle} {...rest}>
			{toggled ? onIcon : offIcon}
		</button>
	);
}
