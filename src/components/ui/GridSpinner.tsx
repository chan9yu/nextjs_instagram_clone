import dynamic from 'next/dynamic';

const GridLoader = dynamic(() => import('react-spinners').then(lib => lib.GridLoader), {
	ssr: false
});

type GridSpinnerProps = {
	color?: string;
};

export default function GridSpinner({ color = 'red' }: GridSpinnerProps) {
	return <GridLoader color={color} />;
}
