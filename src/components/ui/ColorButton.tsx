import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ColorButton(props: ButtonProps) {
	const { children, ...rest } = props;

	return (
		<div className="rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]">
			<button className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity" {...rest}>
				{children}
			</button>
		</div>
	);
}
