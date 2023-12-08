import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, style, ...rest }: ButtonProps) {
	return (
		<button
			className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4  ${className}`}
			style={style}
			{...rest}
		>
			{children}
		</button>
	);
}
