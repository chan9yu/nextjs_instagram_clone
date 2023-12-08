import type { OAuthUser } from '../@types/custom/auth';
import type { SearchUser } from '../@types/custom/user';
import { client } from './sanity';

export async function addUser({ email, id, name, username, image }: OAuthUser) {
	return client.createIfNotExists({
		_id: id,
		_type: 'user',
		username,
		email,
		name,
		image,
		following: [],
		followers: [],
		bookmarks: []
	});
}

export async function getUserByUsername(username: string) {
	return client.fetch(
		`*[_type == "user" && username == "${username}"][0]{
			...,
			"id": _id,
			following[] -> { username, image },
			followers[] -> { username, image },
			"bookmarks": bookmarks[] -> _id
		}`
	);
}

export async function searchUsers(keyword?: string): Promise<SearchUser[]> {
	const query = keyword ? `&& (name match "${keyword}") || (username match "${keyword}")` : '';
	return client
		.fetch(
			`*[_type == "user" ${query}]{
				...,
				"following": count(following),
				"followers": count(followers),
			}`
		)
		.then((users: SearchUser[]) =>
			users.map(user => ({
				...user,
				following: user.following ?? 0,
				followers: user.followers ?? 0
			}))
		);
}

export async function getUserForProfile(username: string) {
	return client
		.fetch(
			`*[_type == "user" && username == "${username}"][0]{
				...,
				"id": _id,
				"following": count(following),
				"followers": count(followers),
				"posts": count(*[_type == "post" && author -> username == "${username}"])
			}`
		)
		.then(user => ({
			...user,
			following: user.following ?? 0,
			followers: user.followers ?? 0,
			posts: user.posts ?? 0
		}));
}
