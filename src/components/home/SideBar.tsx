import type { AuthUser } from '../../@types/custom/user';
import Avatar from '../ui/Avatar';

type SideBarProps = {
	user: AuthUser;
};

const currentYear = new Date().getFullYear();

export default function SideBar({ user: { name, username, image } }: SideBarProps) {
	return (
		<>
			<div className="flex items-center">
				{image && <Avatar image={image} size="lg" />}
				<div className="ml-4">
					<p className="font-bold">{username}</p>
					<p className="text-lg text-neutral-500 leading-4">{name}</p>
				</div>
			</div>
			<p className="text-sm text-neutral-500 mt-8">
				About · Help · Press · API · Jobs · Privacy · Terms · Location · Language
			</p>
			<p className="font-bold text-sm mt-8 text-neutral-500">&copy;{currentYear} chan9yu. All Right Reserved.</p>
		</>
	);
}
