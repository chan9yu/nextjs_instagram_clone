export type Comment = {
	comment: string;
	username: string;
	image?: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
	comments: number;
};

export type FullPost = {
	comments: Comment[];
	createdAt: string;
	id: string;
	image: string;
	likes: string[];
	text: string;
	userImage: string;
	username: string;
};
