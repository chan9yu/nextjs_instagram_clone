import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: 'sm' | 'lg';
};

export default function ColorButton(props: ButtonProps) {
	const { children, size = 'sm', ...rest } = props;

	return (
		<div
			className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 ${
				size === 'lg' ? 'p-[0.3rem]' : 'p-[0.15rem]'
			}`}
		>
			<button
				className={`bg-white rounded-sm hover:opacity-90 transition-opacity ${
					size === 'lg' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'
				}`}
				{...rest}
			>
				{children}
			</button>
		</div>
	);
}
