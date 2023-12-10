export type Comment = {
	comment: string;
	username: string;
	image: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
	comments: number;
};

export type FullPost = {
	createdAt: string;
	id: string;
	likes: string[];
	text: string;
	comments: Comment[];
	username: string;
	userImage: string;
	image: string;
};
