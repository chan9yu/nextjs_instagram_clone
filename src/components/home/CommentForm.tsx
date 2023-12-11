'use client';

import { ChangeEvent, useState } from 'react';
import SmileIcon from '../ui/icons/SmileIcon';

type CommentFormProps = {
	onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: CommentFormProps) {
	const [comment, setComment] = useState('');

	const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	const handleCommentSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		onPostComment(comment);
		setComment('');
	};

	return (
		<form className="flex items-center px-3 border-t border-neutral-300" onSubmit={handleCommentSubmit}>
			<SmileIcon />
			<input
				className="w-full ml-2 border-none outline-none p-3"
				type="text"
				placeholder="Add a comment..."
				required
				value={comment}
				onChange={handleChangeComment}
			/>
			<button
				className={`font-bold text-sky-500 ml-2 disabled:text-sky-300`}
				type="submit"
				disabled={comment.length === 0}
			>
				Post
			</button>
		</form>
	);
}
