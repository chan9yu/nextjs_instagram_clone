import type { OAuthUser } from '../@types/custom/auth';
import type { SearchUser } from '../@types/custom/user';
import { client } from './sanity';

export async function addUser({ email, id, name, username, image }: OAuthUser) {
	return client.createIfNotExists({
		_id: id,
		_type: 'user',
		email,
		name,
		username,
		image,
		bookmarks: [],
		followers: [],
		following: []
	});
}

export async function getUserByUsername(username: string) {
	const query = `
		*[_type == "user" && username == "${username}"][0]{
			...,
			"id": _id,
			"bookmarks": bookmarks[] -> _id
			followers[] -> { username, image },
			following[] -> { username, image },
		}`;

	return client.fetch(query);
}

export async function searchUsers(keyword?: string): Promise<SearchUser[]> {
	const query = `
		*[_type == "user" ${keyword ? `&& (name match "${keyword}") || (username match "${keyword}")` : ''}]{
			...,
			"followers": count(followers),
			"following": count(following),
		}`;

	return client.fetch(query).then((users: SearchUser[]) =>
		users.map(user => ({
			...user,
			followers: user.followers ?? 0,
			following: user.following ?? 0
		}))
	);
}

export async function getUserForProfile(username: string) {
	const query = `
		*[_type == "user" && username == "${username}"][0]{
			...,
			"id": _id,
			"posts": count(*[_type == "post" && author -> username == "${username}"]),
			"followers": count(followers),
			"following": count(following),
		}`;

	return client.fetch(query, undefined, { cache: 'no-store' }).then(user => ({
		...user,
		posts: user.posts ?? 0,
		followers: user.followers ?? 0,
		following: user.following ?? 0
	}));
}

export async function addBookmark(userId: string, postId: string) {
	return client
		.patch(userId)
		.setIfMissing({ bookmarks: [] })
		.append('bookmarks', [
			{
				_ref: postId,
				_type: 'reference'
			}
		])
		.commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
	return client
		.patch(userId)
		.unset([`bookmarks[_ref == "${postId}"]`])
		.commit();
}

export async function follow(myId: string, targetId: string) {
	return client
		.transaction()
		.patch(myId, user =>
			user.setIfMissing({ following: [] }).append('following', [{ _ref: targetId, _type: 'reference' }])
		)
		.patch(targetId, user =>
			user.setIfMissing({ followers: [] }).append('followers', [{ _ref: myId, _type: 'reference' }])
		)
		.commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
	return client
		.transaction()
		.patch(myId, user => user.unset([`following[_ref == "${targetId}"]`]))
		.patch(targetId, user => user.unset([`followers[_ref == "${myId}"]`]))
		.commit({ autoGenerateArrayKeys: true });
}
