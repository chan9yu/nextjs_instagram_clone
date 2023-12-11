import type { FullPost, SimplePost } from '../@types/custom/post';
import { assetsURL, client, urlFor } from './sanity';

const simplePostProjection = `
  ...,
  "username": author -> username,
  "userImage": author -> image,
  "image": photo,
  "likes": likes[] -> username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt
`;

function mapPosts(posts: SimplePost[]) {
	return posts.map((post: SimplePost) => ({
		...post,
		likes: post.likes ?? [],
		image: urlFor(post.image)
	}));
}

export async function getFollowingPostsOf(username: string) {
	const query = `
		*[_type == "post" && author -> username == "${username}" || author._ref in *[_type == "user" && username == "${username}"].following[]._ref] | order(_createdAt desc){
			${simplePostProjection}
		}`;

	return client.fetch(query).then(mapPosts);
}

export async function getPost(id: string): Promise<FullPost> {
	const query = `
		*[_type == "post" && _id == "${id}"][0]{
			...,
			comments[]{
				comment, 
				"username": author -> username,
				"image": author -> image
			},
			"createdAt":_creatdAt,
			"id":_id,
			"image": photo,
			"likes": likes[] -> username,
			"userImage": author -> image,
			"username": author -> username,
		}`;

	return client.fetch(query).then(post => ({
		...post,
		image: urlFor(post.image)
	}));
}

export async function getPostsOf(username: string) {
	const query = `
		*[_type == "post" && author -> username == "${username}"] | order(_createdAt desc){${simplePostProjection}}`;

	return client.fetch(query).then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
	const query = `
		*[_type == "post" && "${username}" in likes[] -> username] | order(_createdAt desc){${simplePostProjection}}`;

	return client.fetch(query).then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
	const query = `
		*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref] | order(_createdAt desc){${simplePostProjection}}`;

	return client.fetch(query).then(mapPosts);
}

export async function likePost(postId: string, userId: string) {
	return client
		.patch(postId)
		.setIfMissing({ likes: [] })
		.append('likes', [
			{
				_ref: userId,
				_type: 'reference'
			}
		])
		.commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
	return client
		.patch(postId)
		.unset([`likes[_ref=="${userId}"]`])
		.commit();
}

export async function addComment(postId: string, userId: string, comment: string) {
	return client
		.patch(postId)
		.setIfMissing({ comments: [] })
		.append('comments', [
			{
				comment,
				author: { _ref: userId, _type: 'reference' }
			}
		])
		.commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
	const result = await fetch(assetsURL, {
		method: 'POST',
		headers: {
			'content-type': file.type,
			authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`
		},
		body: file
	}).then(res => res.json());

	return client.create(
		{
			_type: 'post',
			author: { _ref: userId },
			photo: { asset: { _ref: result.document._id } },
			comments: [
				{
					comment: text,
					author: { _ref: userId, _type: 'reference' }
				}
			],
			likes: []
		},
		{ autoGenerateArrayKeys: true }
	);
}
