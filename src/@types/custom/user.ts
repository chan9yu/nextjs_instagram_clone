export type AuthUser = {
	email: string;
	id: string;
	name: string;
	username: string;
	image?: string;
};

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
	bookmarks: string[];
	followers: SimpleUser[];
	following: SimpleUser[];
};

export type SearchUser = AuthUser & {
	followers: number;
	following: number;
};

export type ProfileUser = SearchUser & {
	posts: number;
};
