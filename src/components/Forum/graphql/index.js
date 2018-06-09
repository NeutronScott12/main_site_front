import gql from 'graphql-tag'

export const showAllForums = gql`
	query($limit: Int!, $offset: Int!) {
		showAllForums(limit: $limit, offset: $offset) {
			id
			title
			category
			subjects {
				id
				slug
				title
				threads {
					id
				}
				createdAt
			}
			createdAt
			updatedAt
		}
	}
`

export const ShowSubject = gql`
	query($slug: String!) {
		showSubject(slug: $slug) {
			id
			title
			slug
			threads {
				id
				title
				slug
				createdAt
				updatedAt
				author {
					username
				}
			}
			createdAt
			updatedAt
		}
	}
`

export const createThread = gql`
	mutation($subjectSlug: String!, $title: String!, $body: String!) {
		createThread(subjectSlug: $subjectSlug, title: $title, body: $body) {
			ok
		}
	}
`

export const showThread = gql`
	query($slug: String!) {
		showThread(slug: $slug) {
			id
			slug
			body
			title
			author {
				id
				username
			}
		}
	}
`

export const addThreadComment = gql`
	mutation($threadSlug: String, $body: String!) {
		addThreadComment(threadSlug: $threadSlug, body: $body) {
			id
			body
			author {
				id
				username
			}
			createdAt
			updatedAt
		}
	}
`
