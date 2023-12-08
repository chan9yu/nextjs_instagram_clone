'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import useSWR from 'swr';

import type { SearchUser } from '../../@types/custom/user';
import useDebounce from '../../hooks/useDebounce';
import GridSpinner from '../ui/GridSpinner';
import UserCard from './UserCard';

export default function UserSearch() {
	const [keyword, setKeyword] = useState('');
	const debounceKeyword = useDebounce(keyword);

	const { data: users, error, isLoading } = useSWR<SearchUser[]>(`/api/search/${debounceKeyword}`);

	const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<section className="w-full max-w-2xl my-4 flex flex-col items-center">
			<form className="w-full mb-4" onSubmit={handleSubmit}>
				<input
					className="w-full text-xl p-3 outline-none border border-gray-400"
					type="text"
					autoFocus
					placeholder="Search for a username or name"
					value={keyword}
					onChange={handleChangeKeyword}
				/>
			</form>
			{isLoading && <GridSpinner />}
			{error && <p>error...</p>}
			{!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
			<ul className="w-full p-4">
				{users &&
					users.map(user => (
						<li key={user.username}>
							<UserCard user={user} />
						</li>
					))}
			</ul>
		</section>
	);
}
