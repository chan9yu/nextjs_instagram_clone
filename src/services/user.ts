import type { OAuthUser } from '../@types/custom/auth';
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
